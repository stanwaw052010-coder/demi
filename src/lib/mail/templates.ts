import type { StoredOrder } from "../order";
import { formatPrice, formatDate } from "../format";

type Locale = "nl" | "en";

const copy = {
  nl: {
    subject: (n: string) => `Uw bestelling ${n} bij Well’s of Yunnan`,
    preview: "Wij hebben uw bestelling genoteerd.",
    hello: (name: string) => `Dag ${name},`,
    intro:
      "Dank u. Hieronder staat wat u besteld hebt. Zodra het pakket is afgegeven, sturen wij u het volgnummer.",
    orderNumber: "Bestelnummer",
    date: "Datum",
    items: "Bestelde artikelen",
    subtotal: "Subtotaal",
    discount: "Korting",
    shipping: "Verzending",
    net: "Netto",
    vat: "Btw",
    total: "Totaal",
    delivery: "Levering",
    brewing: "Zetadvies staat op elke productpagina, met een timer die de infusies meetelt.",
    questions: "Vragen? Antwoord gewoon op deze mail.",
    signoff: "Well’s of Yunnan, Kortrijk",
    vault: (years: number) => `In de Vault, ${years} jaar`,
  },
  en: {
    subject: (n: string) => `Your order ${n} at Well’s of Yunnan`,
    preview: "We have your order.",
    hello: (name: string) => `Hello ${name},`,
    intro:
      "Thank you. Below is what you ordered. As soon as the parcel is handed over we will send you the tracking number.",
    orderNumber: "Order number",
    date: "Date",
    items: "Items ordered",
    subtotal: "Subtotal",
    discount: "Discount",
    shipping: "Shipping",
    net: "Net",
    vat: "VAT",
    total: "Total",
    delivery: "Delivery",
    brewing: "Brewing advice is on every product page, with a timer that counts the infusions.",
    questions: "Questions? Just reply to this email.",
    signoff: "Well’s of Yunnan, Kortrijk",
    vault: (years: number) => `In the Vault, ${years} years`,
  },
} as const;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Order confirmation, in the brand's own typography and colours. */
export function orderConfirmationHtml(order: StoredOrder, baseUrl: string): string {
  const locale = order.input.locale as Locale;
  const t = copy[locale];
  const money = (cents: number) => formatPrice(cents, locale);
  const orderPath = locale === "nl" ? "bedankt" : "thank-you";

  const rows = order.input.lines
    .map(
      (line) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #E7EFE3;">
          <div style="font:400 16px/1.4 Georgia,'Times New Roman',serif;color:#16211B;">${esc(line.name)}</div>
          <div style="font:400 13px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:#78857B;">
            ${line.grams} g${line.vaultYears ? ` &middot; ${esc(t.vault(line.vaultYears))}` : ""} &times; ${line.quantity}
          </div>
        </td>
        <td align="right" style="padding:12px 0;border-bottom:1px solid #E7EFE3;font:400 15px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;color:#16211B;white-space:nowrap;">
          ${money((line.price + (line.vaultFee ?? 0)) * line.quantity)}
        </td>
      </tr>`,
    )
    .join("");

  const totalRow = (label: string, value: string, strong = false) => `
      <tr>
        <td style="padding:4px 0;font:${strong ? "600" : "400"} 14px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:${strong ? "#16211B" : "#78857B"};">${esc(label)}</td>
        <td align="right" style="padding:4px 0;font:${strong ? "600" : "400"} 14px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:${strong ? "#16211B" : "#78857B"};white-space:nowrap;">${value}</td>
      </tr>`;

  return `<!doctype html>
<html lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(t.subject(order.number))}</title></head>
<body style="margin:0;background:#FCFDFA;">
<span style="display:none;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${esc(t.preview)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FCFDFA;padding:32px 16px;">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
      <tr><td style="padding-bottom:28px;">
        <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="24" cy="24" r="15.5" stroke="#9FBE96" stroke-width="1.4"/>
          <path d="M18.4 9.5 16.6 38.5M31.4 9.5 29.6 38.5M9.5 18.6h29M9.5 29.4h29" stroke="#2E4A3A" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        <div style="font:400 20px/1.2 Georgia,'Times New Roman',serif;color:#16211B;padding-top:10px;">Well&rsquo;s of Yunnan</div>
      </td></tr>
      <tr><td style="font:400 17px/1.65 Georgia,'Times New Roman',serif;color:#16211B;padding-bottom:8px;">${esc(t.hello(order.input.firstName))}</td></tr>
      <tr><td style="font:400 16px/1.7 Georgia,'Times New Roman',serif;color:#16211B;padding-bottom:24px;">${esc(t.intro)}</td></tr>
      <tr><td style="border-top:1px solid #9FBE96;padding-top:16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${totalRow(t.orderNumber, `<span style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:#16211B;">${esc(order.number)}</span>`)}
          ${totalRow(t.date, esc(formatDate(order.createdAt, locale)))}
        </table>
      </td></tr>
      <tr><td style="padding-top:24px;font:600 13px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;color:#2E4A3A;letter-spacing:0.02em;">${esc(t.items)}</td></tr>
      <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
      <tr><td style="padding-top:16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${totalRow(t.subtotal, money(order.totals.subtotal))}
          ${order.totals.discount ? totalRow(t.discount, `&minus;${money(order.totals.discount)}`) : ""}
          ${totalRow(t.shipping, order.totals.shipping === 0 ? "&mdash;" : money(order.totals.shipping))}
          ${totalRow(t.net, money(order.totals.net))}
          ${order.totals.vatLines.map((l) => totalRow(`${t.vat} ${l.rate} %`, money(l.vat))).join("")}
          ${totalRow(t.total, money(order.totals.total), true)}
        </table>
      </td></tr>
      <tr><td style="padding-top:24px;border-top:1px solid #E7EFE3;font:400 14px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:#78857B;">
        <strong style="color:#16211B;font-weight:600;">${esc(t.delivery)}</strong><br>
        ${esc(order.input.firstName)} ${esc(order.input.lastName)}<br>
        ${esc(order.input.street)} ${esc(order.input.houseNumber)}${order.input.bus ? ` bus ${esc(order.input.bus)}` : ""}<br>
        ${esc(order.input.postcode)} ${esc(order.input.city)}
      </td></tr>
      <tr><td style="padding-top:24px;">
        <a href="${baseUrl}/${locale}/${orderPath}/${encodeURIComponent(order.number)}"
           style="display:inline-block;background:#2E4A3A;color:#FCFDFA;text-decoration:none;padding:12px 20px;font:500 15px/1 -apple-system,Segoe UI,Roboto,sans-serif;">
          ${esc(t.orderNumber)} ${esc(order.number)}
        </a>
      </td></tr>
      <tr><td style="padding-top:24px;font:400 14px/1.7 Georgia,'Times New Roman',serif;color:#78857B;">${esc(t.brewing)}</td></tr>
      <tr><td style="padding-top:20px;font:400 14px/1.7 Georgia,'Times New Roman',serif;color:#78857B;">${esc(t.questions)}</td></tr>
      <tr><td style="padding-top:28px;border-top:1px solid #E7EFE3;font:400 13px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:#78857B;">
        ${esc(t.signoff)} &middot; wellsofyunnan.be
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

export function orderConfirmationSubject(order: StoredOrder): string {
  return copy[order.input.locale as Locale].subject(order.number);
}
