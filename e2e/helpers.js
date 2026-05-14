export const TEST_EMAIL = "e2etest@tigercook.test";
export const TEST_PASS = "TestPass123";

/**
 * Signs in the test user via the Login page UI.
 * Waits until the browser has navigated to /dashboard.
 */
export async function signInAsTestUser(page) {
  await page.goto("/login");
  await page.fill('input[type="email"]', TEST_EMAIL);
  await page.fill('input[type="password"]', TEST_PASS);
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard", { timeout: 10_000 });
}

/**
 * A realistic recipe object used across E2E tests.
 */
export const MOCK_RECIPE = {
  title: "E2E Test Pasta",
  description: "A simple pasta dish used exclusively in automated E2E tests.",
  ingredients: [
    { name: "Spaghetti", amount: "200g" },
    { name: "Olive oil", amount: "2 tbsp" },
    { name: "Garlic, minced", amount: "2 cloves" },
  ],
  steps: [
    "Boil salted water and cook spaghetti until al dente.",
    "Heat olive oil in a pan, sauté garlic for 1 minute.",
    "Toss drained pasta in the pan with garlic oil.",
  ],
  time: "20 min",
  cost: "$5",
  servings: 2,
  tag: "Simple",
  nutrition: { calories: 380, protein: "10g", carbs: "62g", fat: "9g" },
};

/**
 * Places MOCK_RECIPE in localStorage so the /ai-result page can render it
 * without needing a real OpenAI call.
 */
export async function injectMockRecipe(page) {
  await page.evaluate((recipe) => {
    localStorage.setItem("currentRecipe", JSON.stringify(recipe));
    localStorage.removeItem("currentRecipeSavedToFirestore");
  }, MOCK_RECIPE);
}
