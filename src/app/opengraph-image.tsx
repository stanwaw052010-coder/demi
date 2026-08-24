import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Clinic Stomatology — Центр здоровʼя та естетики, Львів";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** OG-картинка генерується на білді — окремий JPG підтримувати не треба. */
export default function OpengraphImage() {
  // Знак вшивається в картинку як data URI: зовнішніх запитів у next/og немає.
  const mark = readFileSync(join(process.cwd(), "public/images/logo.png")).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={`data:image/png;base64,${mark}`} width={84} height={84} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 22, letterSpacing: 8, color: "#111111" }}>CLINIC</span>
            <span style={{ fontSize: 22, letterSpacing: 8, color: "#8D8D88" }}>STOMATOLOGY</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 82, color: "#111111", letterSpacing: -2, lineHeight: 1.05 }}>
            Центр здоров’я
          </span>
          <span style={{ fontSize: 82, color: "#111111", letterSpacing: -2, lineHeight: 1.05 }}>
            та естетики
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8D8D88" }}>
          <span>Стоматологія · {site.city}</span>
          <span>{site.phone.label}</span>
        </div>
      </div>
    ),
    size,
  );
}
