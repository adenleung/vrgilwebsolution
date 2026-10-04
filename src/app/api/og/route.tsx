import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
const size = { width: 1200, height: 630 };
export const dynamic = "force-static";
export async function GET() {
  const logo = await readFile(join(process.cwd(), "public/vrgil-logo.png"));
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#263c33",
        color: "#f8f7f4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "65px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 20, letterSpacing: 4 }}>
        INDEPENDENT WEB STUDIO · SINGAPORE
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 72,
          lineHeight: 1.12,
          letterSpacing: -3,
        }}
      >
        <span>We build websites.</span>
        <span style={{ color: "#c7d9c7" }}>You focus on your business.</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* The exact original logo is embedded without distortion. */}
        {/* ImageResponse requires a plain image; this generates a PNG, not a web page. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="VRGIL"
          src={`data:image/png;base64,${logo.toString("base64")}`}
          width={194}
          height={116}
        />
        <span style={{ fontSize: 20 }}>Websites from S$599</span>
      </div>
    </div>,
    size,
  );
}
