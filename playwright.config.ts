import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  reporter: [["list"], ["json", { outputFile: "qa/playwright-results.json" }]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    browserName: "chromium",
    viewport: { width: 1440, height: 1000 },
    launchOptions: {
      ...(process.env.CHROMIUM_EXECUTABLE_PATH
        ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH }
        : {}),
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    },
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run start -- -H 0.0.0.0 -p 3000",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
