const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Boris Banchev",
        username: "borisss",
        password: "salainen",
        blogs: [],
      },
    });

    await page.goto("http://localhost:5173");
  });
  describe("initially when user is not logged in", () => {
    test("Login form is shown", async ({ page }) => {
      const locator = await page.getByText("Log in to application");
      await expect(locator).toBeVisible();
      const loginForm = await page.locator("form");
      await expect(loginForm).toBeVisible();
    });
  });
});
