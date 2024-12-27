import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import blogService from "../services/blogs";

vi.mock("../services/blogs");
describe("BlogForm", () => {
  test("calls the blogservice create function with the right details", async () => {
    const setBlogs = vi.fn();
    const setSuccessMessage = vi.fn();
    const setErrorMessage = vi.fn();
    const setBlogFormVisible = vi.fn();
    const user = {
      id: "6766e07cba624ec0252680fe",
      username: "example",
      name: "example1234",
    };
    const blogs = [];

    const blog = {
      title: "test title",
      author: "test author",
      url: "test url",
      user: user,
    };

    render(
      <BlogForm
        setBlogs={setBlogs}
        blogs={blogs}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        setBlogFormVisible={setBlogFormVisible}
        user={user}
      />
    );
    const titleInput = screen.getByPlaceholderText("Title:");
    const authorInput = screen.getByPlaceholderText("Author:");
    const urlInput = screen.getByPlaceholderText("Url:");
    const createButton = screen.getByText("create");
    await userEvent.type(titleInput, "test title");
    await userEvent.type(authorInput, "test author");
    await userEvent.type(urlInput, "test url");
    await userEvent.click(createButton);

    expect(blogService.create).toHaveBeenCalledWith({
      title: "test title",
      author: "test author",
      url: "test url",
    });
  });
});
