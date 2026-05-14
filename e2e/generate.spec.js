import { test, expect } from "@playwright/test";
import { signInAsTestUser, injectMockRecipe, MOCK_RECIPE } from "./helpers.js";

/**
 * E2E tests — Generate Recipe page (requires authentication)
 */

test("authenticated user sees the full recipe generator form", async ({ page }) => {
  await signInAsTestUser(page);
  await page.goto("/generate");

  await expect(page.getByText("AI Recipe Generator ✨")).toBeVisible();
  await expect(page.getByText("Budget")).toBeVisible();
  await expect(page.getByText("Servings")).toBeVisible();
  await expect(page.getByText("Cooking Time")).toBeVisible();
  await expect(page.getByText("Diet Preference")).toBeVisible();
  await expect(page.getByText("Cuisine Type")).toBeVisible();
  await expect(
    page.getByRole("button", { name: /generate recipe with ai/i }),
  ).toBeVisible();
});

test("mock-generated recipe is displayed correctly on the ai-result page", async ({ page }) => {
  await signInAsTestUser(page);

  // Mock the OpenAI API call so no real key is needed in CI
  await page.route("https://api.openai.com/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        choices: [{ message: { content: JSON.stringify(MOCK_RECIPE) } }],
      }),
    });
  });

  await page.goto("/generate");
  await page.click('button:has-text("Generate Recipe with AI")');

  // Should navigate to /ai-result and show the recipe title
  await page.waitForURL("**/ai-result", { timeout: 15_000 });
  await expect(page.getByText(MOCK_RECIPE.title)).toBeVisible();
});
