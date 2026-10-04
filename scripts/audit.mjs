import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import lighthouse from "lighthouse";

// Audit the production build. Run `npm run build` first.
const port = 3003,
  debugPort = 9223;
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "-p",
    String(port),
    "-H",
    "0.0.0.0",
  ],
  { stdio: ["ignore", "pipe", "pipe"] },
);
let browser;
try {
  await mkdir("qa", { recursive: true });
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}`);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  if (!ready) throw new Error("Production server did not become ready.");
  browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH }
      : {}),
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      `--remote-debugging-port=${debugPort}`,
    ],
  });
  const scores = {};
  for (const mode of ["mobile", "desktop"]) {
    const result = await lighthouse(
      `http://127.0.0.1:${port}`,
      {
        port: debugPort,
        logLevel: "error",
        output: ["json", "html"],
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      },
      mode === "desktop"
        ? {
            extends: "lighthouse:default",
            settings: {
              formFactor: "desktop",
              screenEmulation: {
                mobile: false,
                width: 1440,
                height: 1000,
                deviceScaleFactor: 1,
                disabled: false,
              },
              throttling: {
                rttMs: 40,
                throughputKbps: 10240,
                cpuSlowdownMultiplier: 1,
                requestLatencyMs: 0,
                downloadThroughputKbps: 0,
                uploadThroughputKbps: 0,
              },
            },
          }
        : undefined,
    );
    if (!result) throw new Error("Lighthouse returned no result.");
    await writeFile(`qa/lighthouse-${mode}.json`, result.report[0]);
    await writeFile(`qa/lighthouse-${mode}.html`, result.report[1]);
    scores[mode] = {
      scores: Object.fromEntries(
        Object.entries(result.lhr.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      ),
      metrics: Object.fromEntries(
        [
          "first-contentful-paint",
          "largest-contentful-paint",
          "cumulative-layout-shift",
          "total-blocking-time",
          "speed-index",
        ].map((id) => [
          id,
          {
            value: result.lhr.audits[id]?.numericValue,
            display: result.lhr.audits[id]?.displayValue,
          },
        ]),
      ),
      warnings: result.lhr.runWarnings,
    };
    console.log(mode, JSON.stringify(scores[mode]));
  }
  await writeFile(
    "qa/performance-summary.json",
    JSON.stringify(scores, null, 2) + "\n",
  );
  const page = await browser.newPage();
  for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`http://127.0.0.1:${port}/portfolio/bloom-hair-place`, {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => document.fonts.ready);
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    if (scrollWidth > width)
      throw new Error(`Case study overflows at ${width}px.`);
    await page.screenshot({ path: `qa/case-${width}.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`http://127.0.0.1:${port}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: "qa/desktop-preview.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "qa/mobile-preview.png" });
  const social = await fetch(`http://127.0.0.1:${port}/api/og`);
  if (
    !social.ok ||
    !social.headers.get("content-type")?.startsWith("image/png")
  )
    throw new Error("Social image is not a PNG.");
  await writeFile(
    "qa/social-preview.png",
    Buffer.from(await social.arrayBuffer()),
  );
  console.log(
    "Case-study responsive checks, preview screenshots and social image passed.",
  );
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
