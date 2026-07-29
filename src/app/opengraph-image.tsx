import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { MANROPE_500_BASE64, MANROPE_800_BASE64 } from "./og-fonts";

export const alt = "ProfiTime — подологія, манікюр і педикюр у Вишгороді";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const medium = Buffer.from(MANROPE_500_BASE64, "base64");
  const extraBold = Buffer.from(MANROPE_800_BASE64, "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0a1b44 0%, #16368c 55%, #1f53dc 100%)",
          fontFamily: "Manrope",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(154,217,255,0.42) 0%, rgba(154,217,255,0) 70%)",
            display: "flex",
          }}
        />

        {/* верх */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="76" height="76" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 41.2C9.6 30.4 4.4 21.6 9.4 15.1c4.2-5.4 11.4-4.5 14.6.9 3.2-5.4 10.4-6.3 14.6-.9 5 6.5-.2 15.3-14.6 26.1Z"
              stroke="#ffffff"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            <g transform="translate(18.48 16.8) scale(0.46)" fill="#ffffff">
              <path d="M12 10c4.4 0 7.3 2.6 7.3 6 0 2.9-2 4.4-3.1 6.2-.9 1.5-.9 2.4-.9 3.6 0 2.6-1.4 4.4-3.7 4.4s-3.9-1.8-3.9-4.4c0-1.3.1-2.1-.8-3.6C5.8 20.4 4.7 18.9 4.7 16c0-3.4 2.9-6 7.3-6Z" />
              <ellipse cx="4.6" cy="6.6" rx="2" ry="2.3" />
              <ellipse cx="8.9" cy="3.7" rx="1.85" ry="2.15" />
              <ellipse cx="13" cy="3.3" rx="1.7" ry="2" />
              <ellipse cx="16.6" cy="4.7" rx="1.5" ry="1.8" />
              <ellipse cx="19.6" cy="7.2" rx="1.3" ry="1.55" />
            </g>
          </svg>

          <div style={{ display: "flex", flexDirection: "column", marginLeft: 22 }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em" }}>
              ProfiTime
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.22em",
                marginTop: 6,
              }}
            >
              ПОДОЛОГІЯ · МАНІКЮР
            </div>
          </div>
        </div>

        {/* заголовок */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.04,
              letterSpacing: "-0.045em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Здорові стопи</span>
            <span style={{ color: "#9ad9ff" }}>та естетика нігтів</span>
          </div>
          <div
            style={{
              fontSize: 27,
              fontWeight: 500,
              color: "rgba(255,255,255,0.62)",
              marginTop: 26,
              lineHeight: 1.4,
            }}
          >
            Кабінет подології та нігтьового сервісу у Вишгороді
          </div>
        </div>

        {/* низ */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "18px 32px",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              fontSize: 25,
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            {site.phone.display}
          </div>
          <div style={{ fontSize: 25, fontWeight: 500, color: "rgba(255,255,255,0.6)", display: "flex" }}>
            {site.address.city} · {site.address.street}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: medium, weight: 500, style: "normal" },
        { name: "Manrope", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
