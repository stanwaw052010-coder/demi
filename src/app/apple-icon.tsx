import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** The mark alone, on paper, at the size iOS asks for. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FCFDFA",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 48 48" fill="none" strokeLinecap="round">
          <circle cx="24" cy="24" r="15.4" stroke="#9FBE96" strokeWidth="1.8" />
          <path d="M18.7 7.4 16.5 40.6" stroke="#2E4A3A" strokeWidth="1.8" />
          <path d="M31.5 7.4 29.3 40.6" stroke="#2E4A3A" strokeWidth="1.8" />
          <path d="M7.4 18.7 40.6 16.9" stroke="#2E4A3A" strokeWidth="1.8" />
          <path d="M7.4 30.9 40.6 29.1" stroke="#2E4A3A" strokeWidth="1.8" />
          <path
            d="M24 19.4c3.2 2.4 3.2 6.7 0 9.1-3.2-2.4-3.2-6.7 0-9.1Z"
            stroke="#9FBE96"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
