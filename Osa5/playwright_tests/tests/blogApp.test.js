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

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("borisss");
      await page.getByTestId("password").fill("salainen");

      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Boris Banchev logged in")).toBeVisible();
      await expect(page.getByRole("button", { name: "logout" })).toBeVisible();
    });
    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("borisss");
      await page.getByTestId("password").fill("wrong");

      await page.getByRole("button", { name: "login" }).click();

      await expect(
        page.getByText("Boris Banchev is logged in")
      ).not.toBeVisible();
      await expect(
        page.getByRole("button", { name: "logout" })
      ).not.toBeVisible();
    });
  });
});
