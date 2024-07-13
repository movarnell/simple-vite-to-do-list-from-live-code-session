import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import "@testing-library/jest-dom";

describe("MyVerticallyCenteredModal", () => {
  const mockOnHide = vi.fn();
  const mockAddItem = vi.fn();
  const props = {
    show: true,
    onHide: mockOnHide,
    addItem: mockAddItem,
  };

  beforeEach(() => {
    render(<MyVerticallyCenteredModal {...props} />);
  });

  it("renders without crashing", () => {
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("calls onHide when the close button is clicked", () => {
    fireEvent.click(screen.getByTestId("close-button"));
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  });


