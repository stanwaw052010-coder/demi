import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { MANROPE_500_BASE64, MANROPE_800_BASE64 } from "./og-fonts";
import { LOGO_PATHS } from "@/components/ui/logo-paths";

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
          <svg width="80" height="80" viewBox="0 0 64 64">
            {LOGO_PATHS.map((d) => (
              <path key={d.slice(0, 24)} d={d} fill="#ffffff" />
            ))}
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
            Простір подології та нігтьового сервісу у Вишгороді
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
