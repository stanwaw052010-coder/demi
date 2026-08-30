import { promises as fs } from "node:fs";
import path from "node:path";
import { orderNumber, type StoredOrder } from "../order";

/**
 * Orders are kept in a JSON file so the project runs with no database and no
 * native modules. The interface is deliberately narrow; swapping in Drizzle and
 * SQLite means reimplementing these four functions and nothing else.
 */

const DATA_DIR = path.join(process.cwd(), ".data");
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

/** Next order number for the current year, and the reserved sequence. */
export async function nextOrderNumber(): Promise<string> {
  const data = await read();
  const year = new Date().getFullYear();
  const next = (data.sequence[String(year)] ?? 0) + 1;
  data.sequence[String(year)] = next;
  await write(data);
  return orderNumber(year, next);
}

export async function saveOrder(order: StoredOrder): Promise<void> {
  const data = await read();
  data.orders = [order, ...data.orders].slice(0, 5000);
  await write(data);
}

export async function getOrder(numberOrId: string): Promise<StoredOrder | undefined> {
  const data = await read();
  return data.orders.find((o) => o.number === numberOrId || o.id === numberOrId);
}

export async function listOrders(limit = 50): Promise<StoredOrder[]> {
  const data = await read();
  return data.orders.slice(0, limit);
}
