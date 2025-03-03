const { test, expect, beforeEach, describe } = require("@playwright/test");
const { before } = require("node:test");

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
  describe("when logged in", () => {
    beforeEach(async ({ page, request }) => {
      await request.post("http://localhost:3003/api/testing/reset");
      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "Boris Banchev",
          username: "borisss",
          password: "salainen",
          blogs: [],
        },
      });
      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "Erkki Esimerkki",
          username: "erkki1234",
          password: "salainen",
          blogs: [],
        },
      });

      await page.goto("http://localhost:5173");

      await page.getByTestId("username").fill("borisss");
      await page.getByTestId("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
    });
    test("A blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByTestId("title").fill("example");
      await page.getByTestId("author").fill("example author");
      await page.getByTestId("url").fill("example url");

      await page.getByRole("button", { name: "create" }).click();

      const blogEntry = await page.locator("#blogTitle");
      await expect(blogEntry).toBeVisible();

      await expect(blogEntry).toContainText("example");

      const viewButton = await blogEntry.locator("button", { hasText: "view" });
      await expect(viewButton).toBeVisible();
    });

    test("A blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByTestId("title").fill("example");
      await page.getByTestId("author").fill("example author");
      await page.getByTestId("url").fill("example url");

      await page.getByRole("button", { name: "create" }).click();

      await page.getByRole("button", { name: "view" }).click();

      await page.getByRole("button", { name: "like" }).click();

      await expect(page.locator("#likes")).toContainText("1");
    });

    test("A blog added by the user can be deleted", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByTestId("title").fill("example");
      await page.getByTestId("author").fill("example author");
      await page.getByTestId("url").fill("example url");

      await page.getByRole("button", { name: "create" }).click();

      await page.getByRole("button", { name: "view" }).click();

      page.on("dialog", async (dialog) => {
        await dialog.accept();
      });

      await page.getByRole("button", { name: "remove" }).click();

      await expect(page.locator("#blogTitle")).not.toBeVisible();
    });

    test("user can see remove button if it is his own blog", async ({
      page,
    }) => {
      // create a blog with the first user
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByTestId("title").fill("example");
      await page.getByTestId("author").fill("example author");
      await page.getByTestId("url").fill("example url");
      await page.getByRole("button", { name: "create" }).click();

      await page.waitForSelector('div:has-text("example")');

      //logout the first user
      await page.getByRole("button", { name: "logout" }).click();
      //login the second user
      await page.getByTestId("username").fill("erkki1234");
      await page.getByTestId("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
      //create a blog with the second user
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByTestId("title").fill("example2");
      await page.getByTestId("author").fill("example author2");
      await page.getByTestId("url").fill("example url2");
      await page.getByRole("button", { name: "create" }).click();

      await page.waitForSelector('div:has-text("example2")');

      const blogEntries = await page.locator("#allBlogs").all();

      //check that second user cannot see first user blog remove button
      const firstUserBlog = blogEntries[0];
      await firstUserBlog.getByRole("button", { name: "view" }).click();
      await expect(
        firstUserBlog.getByRole("button", { name: "remove" })
      ).not.toBeVisible();

      //check that second user can see his own blog remove button
      const secondUserBlog = blogEntries[1];
      await secondUserBlog.getByRole("button", { name: "view" }).click();
      await expect(
        secondUserBlog.getByRole("button", { name: "remove" })
      ).toBeVisible();
    });

    test("blogs are ordered by likes from most to least", async ({ page }) => {
      // create blogs
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByTestId("title").fill("blog1");
      await page.getByTestId("author").fill("author1");
      await page.getByTestId("url").fill("url1");
      await page.getByRole("button", { name: "create" }).click();

      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByTestId("title").fill("blog2");
      await page.getByTestId("author").fill("author2");
      await page.getByTestId("url").fill("url2");
      await page.getByRole("button", { name: "create" }).click();

      // like blog1 twice
      await page.getByRole("button", { name: "view" }).click();
      for (let i = 0; i < 2; i++) {
        await page.getByRole("button", { name: "like" }).click();
      }
      await page.reload();
      await page.waitForTimeout(50);

      // check order of the blogs
      const blog1 = await page
        .getByRole("button", { name: "view" })
        .first()
        .locator("..");
      await expect(blog1).toContainText("blog1");
      const blog2 = await page
        .getByRole("button", { name: "view" })
        .last()
        .locator("..");
      await expect(blog2).toContainText("blog2");
    });
  });
});
