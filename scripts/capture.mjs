import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const stage = process.argv[2] || "after";
if (!["before", "after"].includes(stage))
  throw new Error("Use before or after.");
const out = `qa/${stage}`;
const origin = "http://127.0.0.1:3004";
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", "3004", "-H", "127.0.0.1"],
  { stdio: "ignore" },
);
let browser;
try {
  await mkdir(out, { recursive: true });
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(origin)).ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  if (!ready) throw new Error("Server unavailable");
  browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_EXECUTABLE_PATH,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  const results = [];
  for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 701 ? 844 : 1000 });
    await page.goto(origin, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const measurement = await page.evaluate(() => {
      const preview = document
        .querySelector(".hero-project .browser-frame")
        .getBoundingClientRect();
      const selectors = [
        ".main-navigation a",
        ".hero-copy > p",
        ".service-grid p",
        ".pricing-notes p",
        ".journey p",
        ".journey-milestone",
        ".form-grid label",
        ".faq-list summary",
      ];
      return {
        scrollWidth: document.documentElement.scrollWidth,
        previewWidth: preview.width,
        fonts: Object.fromEntries(
          selectors.map((s) => [
            s,
            getComputedStyle(document.querySelector(s)).fontSize,
          ]),
        ),
      };
    });
    results.push({ width, ...measurement });
    await page.screenshot({ path: `${out}/home-${width}.png`, fullPage: true });
    await page.screenshot({ path: `${out}/hero-${width}.png` });
    if ([390, 1440].includes(width)) {
      await page
        .locator(".site-header, .skip-link")
        .evaluateAll((nodes) =>
          nodes.forEach((node) => (node.style.visibility = "hidden")),
        );
      for (const selector of [
        "#services",
        "#work",
        "#pricing",
        "#process",
        ".faq-section",
        "#contact",
      ]) {
        await page.locator(selector).screenshot({
          path: `${out}/${selector.replace(/[#.]/g, "")}-${width}.png`,
        });
      }
      await page
        .locator(".site-header, .skip-link")
        .evaluateAll((nodes) =>
          nodes.forEach((node) => (node.style.visibility = "")),
        );
    }
  }
  await page.goto(origin);
  await page.locator("#name").fill("Synthetic QA");
  await page.locator("#email").fill("qa@example.com");
  await page.locator("#message").fill("Synthetic private project details");
  await page
    .getByRole("link", { name: "Choose Landing Page", exact: true })
    .click();
  const packageDraft = {
    url: page.url(),
    name: await page.locator("#name").inputValue(),
    email: await page.locator("#email").inputValue(),
  };
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "reduce",
  });
  const plain = await context.newPage();
  const outgoing = [];
  plain.on("request", (r) => {
    if (r.isNavigationRequest())
      outgoing.push({ url: r.url(), method: r.method(), body: r.postData() });
  });
  await plain.goto(origin);
  const inert = await plain.locator("#name").isDisabled();
  if (!inert) {
    await plain.locator("#name").fill("Synthetic QA");
    await plain.locator("#email").fill("qa@example.com");
    await plain.locator("#message").fill("Synthetic private project details");
    await plain
      .getByRole("button", { name: "Review enquiry" })
      .click({ force: true });
    await plain.waitForLoadState();
  }
  await writeFile(
    `${out}/observations.json`,
    JSON.stringify(
      {
        stage,
        browser: browser.version(),
        responsive: results,
        packageDraft,
        noScript: { inert, url: plain.url(), outgoing },
      },
      null,
      2,
    ),
  );
  console.log(
    `${stage}: captured seven widths, six sections and enquiry observations`,
  );
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
