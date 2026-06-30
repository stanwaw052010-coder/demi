import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, useCart } from "./cart";
import type { CartItem } from "./types";

const item: CartItem = {
  productId: "p1",
  quantity: 1,
  price: 100,
  name: "Тестова деталь",
  image: "",
  sku: "SKU-1",
  brand: "Bosch",
};

function TestHarness() {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  return (
    <div>
      <span data-testid="count">{cart.count}</span>
      <span data-testid="total">{cart.total}</span>
      <button onClick={() => addToCart(item)}>add</button>
      <button onClick={() => addToCart({ ...item, quantity: 2 })}>add-more</button>
      <button onClick={() => removeFromCart(item.productId)}>remove</button>
      <button onClick={() => updateQuantity(item.productId, 5)}>set-qty</button>
    </div>
  );
}

function renderCart() {
  return render(
    <CartProvider>
      <TestHarness />
    </CartProvider>
  );
}

describe("CartProvider", () => {
  it("starts empty", () => {
    renderCart();
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("adds an item and merges quantities for the same product", async () => {
    renderCart();
    await userEvent.click(screen.getByText("add"));
    await userEvent.click(screen.getByText("add-more"));
    expect(screen.getByTestId("count")).toHaveTextContent("3");
    expect(screen.getByTestId("total")).toHaveTextContent("300");
  });

  it("removes an item", async () => {
    renderCart();
    await userEvent.click(screen.getByText("add"));
    await userEvent.click(screen.getByText("remove"));
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("updates quantity directly", async () => {
    renderCart();
    await userEvent.click(screen.getByText("add"));
    await userEvent.click(screen.getByText("set-qty"));
    expect(screen.getByTestId("count")).toHaveTextContent("5");
  });
});
