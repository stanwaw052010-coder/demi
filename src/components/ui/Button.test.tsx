import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>В кошик</Button>);
    expect(screen.getByRole("button", { name: "В кошик" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Натисни</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled while loading and does not fire onClick", async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Завантаження
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
