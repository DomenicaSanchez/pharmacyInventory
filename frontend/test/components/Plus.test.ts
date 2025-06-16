/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from "vitest";

describe("Plus component toggle form", () => {
  it("togglea la clase 'hidden' al hacer click", () => {
    const div = document.createElement("div");
    div.classList.add("hidden");

    function toggle() {
      div.classList.toggle("hidden");
    }

    expect(div.classList.contains("hidden")).toBe(true);
    toggle();
    expect(div.classList.contains("hidden")).toBe(false);
    toggle();
    expect(div.classList.contains("hidden")).toBe(true);
  });
});
