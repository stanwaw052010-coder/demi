import { ImageResponse } from "next/og";

export const alt = "Well’s of Yunnan — Chinese tea with year, mountain and garden";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Drawn with the site's own vocabulary: the 井 mark, a hairline rule, and a
 * band of the liquor scale along the bottom. No photograph, because there is
 * none, and no gradient except as liquor.
 */
export default function OgImage() {
  const liquors = [
    "#D8DCA6",
    "#DFCE87",
    "#EBE4C0",
    "#7FA23F",
    "#D9A85C",
    "#A44A2A",
    "#C9942F",
    "#4A2318",
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FCFDFA",
          color: "#16211B",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <svg width="86" height="86" viewBox="0 0 48 48" fill="none" strokeLinecap="round">
          <circle cx="24" cy="24" r="15.4" stroke="#9FBE96" strokeWidth="1.5" />
          <path d="M18.7 7.4 16.5 40.6" stroke="#2E4A3A" strokeWidth="1.5" />
          <path d="M31.5 7.4 29.3 40.6" stroke="#2E4A3A" strokeWidth="1.5" />
          <path d="M7.4 18.7 40.6 16.9" stroke="#2E4A3A" strokeWidth="1.5" />
          <path d="M7.4 30.9 40.6 29.1" stroke="#2E4A3A" strokeWidth="1.5" />
          <path
            d="M24 19.4c3.2 2.4 3.2 6.7 0 9.1-3.2-2.4-3.2-6.7 0-9.1Z"
            stroke="#9FBE96"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div style={{ fontSize: 96, letterSpacing: "-0.02em", lineHeight: 1 }}>
            Well’s of Yunnan
          </div>
          <div style={{ fontSize: 34, color: "#2E4A3A", marginTop: 22 }}>
            Thee met een adres. Berg, jaar, tuin.
          </div>
          <div
            style={{
              display: "flex",
              gap: 28,
              fontSize: 22,
              color: "#78857B",
              marginTop: 34,
              paddingTop: 26,
              borderTop: "1px solid #9FBE96",
            }}
          >
            <span>Kortrijk, België</span>
            <span>30 partijen</span>
            <span>oogst 2015 tot 2026</span>
            <span>wellsofyunnan.be</span>
          </div>
        </div>

        {/* The liquor scale, in processing order, as the signature band. */}
        <div style={{ display: "flex", position: "absolute", bottom: 0, left: 0, right: 0 }}>
          {liquors.map((colour) => (
            <div key={colour} style={{ flex: 1, height: 14, background: colour }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
