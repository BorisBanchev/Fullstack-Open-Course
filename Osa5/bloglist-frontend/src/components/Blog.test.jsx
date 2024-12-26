import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

describe("Blog", () => {
  test("renders only the blog title if the button view is not clicked", () => {
    const blog = {
      title: "test title",
      author: "test author",
      url: "test url",
      likes: 0,
      user: {
        name: "test user",
      },
    };

    render(<Blog blog={blog} />);

    expect(screen.getByText("test title")).toBeInTheDocument();

    expect(screen.queryByText("test author")).not.toBeInTheDocument();
    expect(screen.queryByText("test url")).not.toBeInTheDocument();
    expect(screen.queryByText("test user")).not.toBeInTheDocument();
    expect(screen.queryByText("likes 0")).not.toBeInTheDocument();
  });
  test("renders the blog author, url, likes, and user if the button view is clicked", async () => {
    const blog = {
      title: "test title",
      author: "test author",
      url: "test url",
      likes: 0,
      user: {
        name: "test user",
      },
    };

    render(<Blog blog={blog} />);

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(screen.getByText("test author")).toBeInTheDocument();
    expect(screen.getByText("test url")).toBeInTheDocument();
    expect(screen.getByText("test user")).toBeInTheDocument();
    expect(screen.getByText("likes 0")).toBeInTheDocument();
  });
});
