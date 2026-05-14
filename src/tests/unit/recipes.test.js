// @vitest-environment node
import { describe, it, expect } from "vitest";
import recipesData from "../../utils/recipes.js";

const { recipes } = recipesData;

const REQUIRED_FIELDS = [
  "id",
  "title",
  "description",
  "time",
  "cost",
  "servings",
  "ingredients",
  "steps",
  "nutrition",
];

describe("Static recipes data", () => {
  it("every recipe has all required top-level fields", () => {
    recipes.forEach((recipe) => {
      REQUIRED_FIELDS.forEach((field) => {
        expect(
          recipe,
          `Recipe "${recipe.title ?? recipe.id}" is missing field "${field}"`,
        ).toHaveProperty(field);
      });
    });
  });

  it("every ingredient in every recipe has a name and an amount", () => {
    recipes.forEach((recipe) => {
      expect(
        recipe.ingredients.length,
        `Recipe "${recipe.title}" has no ingredients`,
      ).toBeGreaterThan(0);

      recipe.ingredients.forEach((ing, idx) => {
        expect(
          ing.name,
          `Recipe "${recipe.title}" ingredient[${idx}] is missing name`,
        ).toBeTruthy();
        expect(
          ing.amount,
          `Recipe "${recipe.title}" ingredient[${idx}] is missing amount`,
        ).toBeTruthy();
      });
    });
  });
});
