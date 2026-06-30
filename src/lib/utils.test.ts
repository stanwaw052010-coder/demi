import { describe, expect, it } from "vitest";
import { cn, formatPrice, formatPhone, slugify, clampText, getDiscountPercent } from "./utils";

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });
});

describe("formatPrice", () => {
  it("formats a number as UAH currency without decimals", () => {
    expect(formatPrice(1500)).toContain("1");
    expect(formatPrice(1500)).toContain("500");
  });
});

describe("formatPhone", () => {
  it("formats a 12-digit Ukrainian phone number", () => {
    expect(formatPhone("380672546266")).toBe("+38 (067) 254-62-66");
  });

  it("returns the input unchanged when it doesn't match the expected format", () => {
    expect(formatPhone("123")).toBe("123");
  });
});

describe("slugify", () => {
  it("lowercases and dashes Latin text", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  it("preserves Cyrillic characters", () => {
    expect(slugify("Запчастини для авто")).toBe("запчастини-для-авто");
  });
});

describe("clampText", () => {
  it("leaves short text untouched", () => {
    expect(clampText("short", 10)).toBe("short");
  });

  it("truncates long text and appends an ellipsis", () => {
    expect(clampText("this is a long string", 7)).toBe("this is…");
  });
});

describe("getDiscountPercent", () => {
  it("computes the percentage drop from priceOld to price", () => {
    expect(getDiscountPercent(75, 100)).toBe(25);
  });
});
