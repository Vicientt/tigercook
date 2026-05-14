// @vitest-environment node
import { describe, it, expect } from "vitest";
import { buildRecipeGenerationPrompt } from "../../utils/recipeGenerationPrompt.js";

const baseParams = {
  budget: 15,
  portion: 2,
  diet: "any",
  cuisine: "any",
  cookingTime: 30,
};

describe("buildRecipeGenerationPrompt", () => {
  it("includes budget, portion and cookingTime values in the output", () => {
    const prompt = buildRecipeGenerationPrompt(baseParams);

    expect(prompt).toContain("$15");
    expect(prompt).toContain("2 people");
    expect(prompt).toContain("30 minutes");
  });

  it("uses a random-pick instruction when cuisine is 'any'", () => {
    const prompt = buildRecipeGenerationPrompt({ ...baseParams, cuisine: "any" });

    expect(prompt).toMatch(/pick one specific cuisine at random/i);
  });

  it("names the specific cuisine when a non-'any' value is given", () => {
    const prompt = buildRecipeGenerationPrompt({
      ...baseParams,
      cuisine: "italian",
    });

    expect(prompt).toContain("italian");
    expect(prompt).not.toMatch(/pick one specific cuisine at random/i);
  });
});
