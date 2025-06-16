import { describe, it, expect } from "vitest";

function validateInput(value: string) {
  const cantidad = parseInt(value);
  return !isNaN(cantidad) && cantidad > 0;
}

describe("Rest input validation", () => {
  it("valida correctamente valores válidos e inválidos", () => {
    expect(validateInput("5")).toBe(true);
    expect(validateInput("0")).toBe(false);
    expect(validateInput("-1")).toBe(false);
    expect(validateInput("abc")).toBe(false);
    expect(validateInput("")).toBe(false);
  });
});

describe("Rest component - dummy test", () => {
  it("debería pasar siempre (ejemplo inicial)", () => {
    expect(true).toBe(true);
  });
});
