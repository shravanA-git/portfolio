import { ImageResponse } from "next/og";
import { PERSON } from "@/lib/content";

export const alt = `${PERSON.name} — ${PERSON.subtitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#f4f6f9",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#4d8dff",
            marginBottom: 24,
          }}
        >
          {PERSON.kicker}
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.1 }}>
          {PERSON.name}
        </div>
        <div style={{ fontSize: 36, color: "#c7ccd6", marginTop: 24 }}>
          {PERSON.subtitle}
        </div>
      </div>
    ),
    { ...size }
  );
}
