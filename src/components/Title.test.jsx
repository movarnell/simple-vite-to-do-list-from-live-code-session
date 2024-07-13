import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Title from "./Title";
import "@testing-library/jest-dom";

describe("Title Component", () => {
  it("renders without crashing", () => {
    render(<Title />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("contains the correct text", () => {
    render(<Title />);
    expect(screen.getByRole("heading")).toHaveTextContent("To-Do List");
  });

  it("has correct class names for the heading", () => {
    render(<Title />);
    expect(screen.getByRole("heading")).toHaveClass(
      "text-center display-1 playwrite-font mt-5 mb-3 title-color"
    );
  });

  it("contains a horizontal rule with correct styling", () => {
    render(<Title />);
    const hr = screen.getByRole("separator");
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass("w-75 mx-auto border-3");
  });
});
