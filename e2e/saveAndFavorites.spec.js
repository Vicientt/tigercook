import { test, expect } from "@playwright/test";
import { signInAsTestUser, injectMockRecipe, MOCK_RECIPE } from "./helpers.js";

/**
 * FULLSTACK E2E tests — Save recipe after generate + Favorites
 *
 * These tests exercise the complete vertical slice:
 *   OpenAI response → localStorage → AIResult UI → Firebase Firestore (emulator) → Favorites page
 */

test("save recipe after generate: clicking Save persists recipe to Firestore and shows ✓ Saved", async ({
  page,
}) => {
  await signInAsTestUser(page);

  // Inject the mock recipe (simulates what GenerateRecipe.jsx does after an OpenAI response)
  await injectMockRecipe(page);

  // Navigate directly to the AI result page
  await page.goto("/ai-result");

  // The recipe title should be visible before saving
  await expect(page.getByText(MOCK_RECIPE.title)).toBeVisible();

  // The Save button must be present and not yet in the saved state
  const saveBtn = page.getByRole("button", { name: /save/i });
  await expect(saveBtn).toBeVisible();
  await expect(saveBtn).not.toHaveText("✓ Saved");

  // Click Save → Firestore emulator receives the document
  await saveBtn.click();

  // Button should transition to "✓ Saved" confirming Firestore write succeeded
  await expect(page.getByRole("button", { name: /✓ Saved/i })).toBeVisible({
    timeout: 8_000,
  });
});

test("saved recipe appears in the Favorites list after being saved from ai-result", async ({
  page,
}) => {
  await signInAsTestUser(page);

  // Inject the mock recipe and navigate to /ai-result
  await injectMockRecipe(page);
  await page.goto("/ai-result");

  // Save the recipe to Firestore
  await page.getByRole("button", { name: /save/i }).click();
  await expect(page.getByRole("button", { name: /✓ Saved/i })).toBeVisible({
    timeout: 8_000,
  });

  // Navigate to the Favorites page
  await page.click('button:has-text("Favorites")');
  await page.waitForURL("**/favorite", { timeout: 5_000 });

  // The saved recipe title must appear in the list
  await expect(page.getByText(MOCK_RECIPE.title)).toBeVisible({
    timeout: 8_000,
  });
});
