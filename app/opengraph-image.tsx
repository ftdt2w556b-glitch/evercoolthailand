import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Evercool Thailand — IAQ & HVAC Specialists";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "60px",
          background: "linear-gradient(135deg, #003554 0%, #001e2e 60%, #00b2d4 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 60,
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "rgba(0,178,212,0.15)",
            border: "2px solid rgba(0,178,212,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 900,
            color: "#00b2d4",
          }}
        >
          EC
        </div>

        {/* Tag */}
        <div
          style={{
            background: "rgba(0,178,212,0.2)",
            border: "1px solid rgba(0,178,212,0.4)",
            borderRadius: 30,
            padding: "6px 18px",
            marginBottom: 20,
            fontSize: 16,
            color: "#00b2d4",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          HVAC · IAQ · Thailand
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Ever<span style={{ color: "#00b2d4" }}>Cool</span>
          <br />Thailand
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.65)", marginBottom: 40, fontWeight: 400 }}>
          Breathing Life into Your Indoors
        </div>

        {/* Trust chips */}
        <div style={{ display: "flex", gap: 12 }}>
          {["20+ Years Experience", "ISO Certified", "Bangkok · Koh Tao · Surat Thani"].map((chip) => (
            <div
              key={chip}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 20,
                padding: "8px 16px",
                fontSize: 14,
                color: "rgba(255,255,255,0.7)",
                fontWeight: 500,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
