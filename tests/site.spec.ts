import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

// This execution host isolates Chromium networking. Opt-in bridge to the LOCAL
// test server; ordinary machines use normal browser networking.
test.beforeEach(async ({ page }) => {
  if (process.env.BROWSER_FETCH_BRIDGE === "1")
    await page.route("http://127.0.0.1:3000/**", async (route) => {
      const req = route.request();
      const res = await fetch(req.url(), {
        method: req.method(),
        headers: req.headers(),
        body: req.postData() || undefined,
      });
      const headers = Object.fromEntries(res.headers);
      delete headers["content-encoding"];
      delete headers["content-length"];
      await route.fulfill({
        status: res.status,
        headers,
        body: Buffer.from(await res.arrayBuffer()),
      });
    });
});

test("homepage presents business content, accurate prices and genuine work immediately", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Websites for Singapore Businesses/);
  await expect(page.locator("h1")).toContainText("better website.");
  await expect(page.locator('input[type="password"],audio')).toHaveCount(0);
  await expect(page.locator(".pricing-card")).toHaveCount(2);
  await expect(page.locator(".package-price").nth(0)).toContainText("599");
  await expect(page.locator(".package-price").nth(1)).toContainText("999");
  await expect(page.locator(".journey-step")).toHaveCount(5);
  await expect(page.locator(".featured-work h3")).toHaveText(
    "Bloom Hair Place",
  );
  await expect(
    page.locator('.work-copy a[href="https://bloomhairplace.com"]'),
  ).toBeVisible();
  expect(await page.locator("main").innerText()).not.toMatch(
    /81%|75%|57%|patient enquiries|Buildwell|Northline|Most Popular|Access Granted/,
  );
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBeTruthy();
  }
});

for (const width of [320, 375, 390, 768, 1024, 1440])
  test(`usable layout, anchors and images at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    for (const id of ["services", "work", "pricing", "process", "contact"]) {
      if (width < 960)
        await page
          .getByRole("button", { name: "Open menu", exact: true })
          .click();
      await page.locator(`#main-navigation a[href="#${id}"]`).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator("#" + id)).toBeVisible();
      if (width < 960)
        await expect(
          page.getByRole("button", { name: "Open menu", exact: true }),
        ).toHaveAttribute("aria-expanded", "false");
    }
    for (const selector of [
      ".pricing-card",
      ".journey-step",
      ".quote-form-wrap",
      ".hero-visual",
    ])
      for (const item of await page.locator(selector).all()) {
        const box = await item.boundingBox();
        expect(box?.x).toBeGreaterThanOrEqual(0);
        expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(
          width + 1,
        );
      }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await mkdir("qa", { recursive: true });
    await page.screenshot({ path: `qa/home-${width}.png`, fullPage: true });
  });

test("mobile menu supports keyboard, Escape and outside dismissal", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.locator(".menu-toggle");
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator('#main-navigation a[href="#home"]')).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.locator('#main-navigation a[href="#services"]'),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator(".hero-caption").click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("every FAQ works with the keyboard", async ({ page }) => {
  await page.goto("/");
  for (const summary of await page.locator(".faq-list summary").all()) {
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(summary.locator("..")).toHaveAttribute("open", "");
    await page.keyboard.press("Space");
    await expect(summary.locator("..")).not.toHaveAttribute("open", "");
  }
});

test("quote validation and explicit WhatsApp/email draft handoff retain the enquiry", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.getByRole("button", { name: "Review enquiry" }).click();
  await expect(page.locator(".enquiry-review")).toHaveCount(0);
  await page
    .getByRole("link", { name: "Choose Business Website", exact: true })
    .click();
  await expect(page.locator("#package")).toHaveValue("business");
  await page.locator("#name").fill("Test & Co");
  await page.locator("#business").fill("Example café");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#phone").fill("+65 8000 0000");
  await page
    .locator("#message")
    .fill(
      "A website for our café. Please include menus & enquiries.\nSecond line.",
    );
  await page.locator(".form-extras summary").click();
  await page.getByLabel("Copywriting", { exact: false }).check();
  await page.getByRole("button", { name: "Review enquiry" }).click();
  await expect(page.locator("#review-heading")).toBeFocused();
  const wa = new URL(
    (await page
      .getByRole("link", { name: /Continue to WhatsApp/ })
      .getAttribute("href"))!,
  );
  expect(wa.hostname).toBe("wa.me");
  expect(wa.pathname).toBe("/6583635900");
  expect(wa.searchParams.get("text")).toContain("Business Website — S$999");
  expect(wa.searchParams.get("text")).toContain("Copywriting");
  expect(wa.searchParams.get("text")).toContain("Test & Co");
  expect(wa.searchParams.get("text")).toContain("\nSecond line.");
  const mail = await page
    .getByRole("link", { name: "Open email draft" })
    .getAttribute("href");
  expect(mail).toMatch(/^mailto:adenleung08@gmail\.com\?/);
  expect(new URL(mail!).searchParams.get("body")).toBe(
    wa.searchParams.get("text"),
  );
  await expect(
    page.getByText("Nothing has been sent yet.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Edit details" }).click();
  await expect(page.locator("#name")).toHaveValue("Test & Co");
  await expect(page.locator("#package")).toHaveValue("business");
  await expect(page.locator("#name")).toBeFocused();
  expect(errors).toEqual([]);
});

test("WhatsApp links always identify the recipient and local links resolve", async ({
  page,
  request,
}) => {
  await page.goto("/");
  for (const link of await page.locator('a[href^="https://wa.me"]').all())
    expect(new URL((await link.getAttribute("href"))!).pathname).toBe(
      "/6583635900",
    );
  for (const path of [
    "/portfolio/bloom-hair-place",
    "/privacy",
    "/terms",
    "/robots.txt",
    "/sitemap.xml",
    "/api/og",
  ])
    expect((await request.get(path)).status(), path).toBe(200);
  for (const path of [
    "/portfolio/healthcare",
    "/portfolio/construction",
    "/portfolio/hospitality",
    "/portfolio/unknown",
    "/missing",
  ])
    expect((await request.get(path)).status()).toBe(404);
  await page.goto("/portfolio/bloom-hair-place");
  await expect(page.locator("h1")).toHaveText("Bloom Hair Place");
  await page
    .getByRole("link", { name: "Visit the live website" })
    .getAttribute("href")
    .then((href) => expect(href).toBe("https://bloomhairplace.com"));
});

for (const width of [390, 1440])
  test(`WCAG A/AA automated checks at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of [
      "/",
      "/portfolio/bloom-hair-place",
      "/privacy",
      "/terms",
      "/missing",
    ]) {
      await page.goto(path);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(
        result.violations,
        `${path}: ${JSON.stringify(result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
      ).toEqual([]);
    }
  });

test("reduced motion and JavaScript-free content remain usable", async ({
  page,
  browser,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  for (const node of await page.locator(".journey-node").all())
    expect(
      await node.evaluate((n) => getComputedStyle(n).transitionDuration),
    ).toBe("0s");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const plain = await context.newPage();
  if (process.env.BROWSER_FETCH_BRIDGE === "1")
    await plain.route("http://127.0.0.1:3000/**", async (route) => {
      const r = await fetch(route.request().url());
      const headers = Object.fromEntries(r.headers);
      delete headers["content-encoding"];
      delete headers["content-length"];
      await route.fulfill({
        status: r.status,
        headers,
        body: Buffer.from(await r.arrayBuffer()),
      });
    });
  await plain.goto("http://127.0.0.1:3000");
  await expect(plain.locator("h1")).toContainText("better website.");
  await expect(plain.locator(".journey-step")).toHaveCount(5);
  await expect(
    plain.locator('.contact-methods a[href^="mailto:"]'),
  ).toBeVisible();
  await plain.locator(".faq-list summary").first().click();
  await expect(plain.locator(".faq-list details").first()).toHaveAttribute(
    "open",
    "",
  );
  await context.close();
});
