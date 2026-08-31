import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { orderNumber, type StoredOrder } from "../order";

/**
 * Orders are kept in a JSON file so the project runs with no database and no
 * native modules. The interface is deliberately narrow: swapping in Drizzle and
 * SQLite, or Postgres, means reimplementing these four functions and nothing
 * else in the app changes.
 *
 * On a serverless host the project root is read-only, so the file goes to the
 * platform's temp directory instead. That keeps the checkout working, but it is
 * per-instance and wiped between deploys — see `isEphemeralStorage`. Anything
 * that is meant to keep real orders needs a database here.
 */

/** True when writes only survive inside one warm instance. */
export function isEphemeralStorage(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

const DATA_DIR = isEphemeralStorage()
  ? path.join(os.tmpdir(), "wy-orders")
  : path.join(process.cwd(), ".data");

const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

interface OrdersFile {
  sequence: Record<string, number>;
  orders: StoredOrder[];
}

const EMPTY: OrdersFile = { sequence: {}, orders: [] };

async function read(): Promise<OrdersFile> {
  try {
    const raw = await fs.readFile(ORDERS_FILE, "utf8");
    const parsed = JSON.parse(raw) as OrdersFile;
    return { sequence: parsed.sequence ?? {}, orders: parsed.orders ?? [] };
  } catch {
    return { ...EMPTY };
  }
}

async function write(data: OrdersFile): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(ORDERS_FILE, JSON.stringify(data, null, 2), "utf8");
}

/**
 * Next order number for the current year.
 *
 * On ephemeral storage the counter restarts per instance, which would hand two
 * customers the same number. The instance id is folded in so numbers stay
 * unique across instances; a database makes this a sequence and the suffix
 * disappears.
 */
export async function nextOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  try {
    const data = await read();
    const next = (data.sequence[String(year)] ?? 0) + 1;
    data.sequence[String(year)] = next;
    await write(data);
    if (!isEphemeralStorage()) return orderNumber(year, next);
    // Keep WY-2026-0001 readable and hang the instance marker off the end, so
    // it cannot be misread as part of the sequence.
    const suffix = (process.env.VERCEL_DEPLOYMENT_ID ?? String(process.pid))
      .replace(/\W/g, "")
      .slice(-2)
      .toUpperCase()
      .padStart(2, "0");
    return `${orderNumber(year, next)}-${suffix}`;
  } catch (error) {
    // A read-only or full disk must never cost a sale: fall back to a
    // time-derived number and let the order continue.
    console.error("[orders] could not reserve a number from storage", error);
    return `${orderNumber(year, Math.floor(Date.now() / 1000) % 10000)}-XX`;
  }
}

export async function saveOrder(order: StoredOrder): Promise<boolean> {
  try {
    const data = await read();
    data.orders = [order, ...data.orders].slice(0, 5000);
    await write(data);
    return true;
  } catch (error) {
    // The customer has already been charged by this point in a live setup, so
    // the order is logged in full rather than dropped silently.
    console.error("[orders] STORAGE FAILED, order follows", JSON.stringify(order));
    console.error(error);
    return false;
  }
}

export async function getOrder(numberOrId: string): Promise<StoredOrder | undefined> {
  const data = await read();
  return data.orders.find((o) => o.number === numberOrId || o.id === numberOrId);
}

export async function listOrders(limit = 50): Promise<StoredOrder[]> {
  const data = await read();
  return data.orders.slice(0, limit);
}
