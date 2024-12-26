import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

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
});
