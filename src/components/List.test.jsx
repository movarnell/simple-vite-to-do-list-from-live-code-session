import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import List from "./List"; // Adjust the import path as necessary




describe("List Component", () => {
  const mockDeleteItem = vi.fn();

  it("renders without crashing", () => {
    render(<List items={[]} deleteItem={mockDeleteItem} />);
    expect(screen.getByText("No Items")).toBeInTheDocument();
  });

  it('displays "No Items" when list is empty', () => {
    render(<List items={[]} deleteItem={mockDeleteItem} />);
    expect(screen.getByText("No Items")).toBeInTheDocument();
  });

  it("renders correct number of items", () => {
    const items = [
      {
        id: 1,
        title: "Item 1",
        notes: "Notes 1",
        createdAt: "2023-01-01T00:00:00.000Z",
        dueDate: "2023-12-31T23:59:59.999Z",
      },
      {
        id: 2,
        title: "Item 2",
        notes: "Notes 2",
        createdAt: "2023-01-02T00:00:00.000Z",
        dueDate: "2023-12-30T23:59:59.999Z",
      },
    ];
    render(<List items={items} deleteItem={mockDeleteItem} />);
    expect(screen.getAllByText(/Item/)).toHaveLength(2);
  });

  it('renders "Over Due" for past due dates', () => {
    const items = [
      {
        id: 1,
        title: "Past Due Item",
        notes: "This is overdue",
        createdAt: "2023-01-01T00:00:00.000Z",
        dueDate: "2020-01-01T00:00:00.000Z",
      },
    ];
    render(<List items={items} deleteItem={mockDeleteItem} />);
    // Assuming "Over" and "Due" are in separate elements but within the same parent
    const overDueElement = screen.getByTestId("over-due-element"); // Use the actual testId of your element
    expect(overDueElement).toHaveTextContent("Over");
    expect(overDueElement).toHaveTextContent("Due");
  });

  it("calls deleteItem on button click", () => {
    const items = [
      {
        id: 1,
        title: "Item to Delete",
        notes: "Delete me",
        createdAt: "2023-01-01T00:00:00.000Z",
        dueDate: "2023-12-31T23:59:59.999Z",
      },
    ];
    render(<List items={items} deleteItem={mockDeleteItem} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(mockDeleteItem).toHaveBeenCalledWith(1);
  });
});
