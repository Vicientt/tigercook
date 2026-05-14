import { test, expect } from "@playwright/test";

/**
 * E2E tests — Login page (public route, no auth needed)
 */

test("login page renders the TigerCook brand and form inputs", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByText("TigerCook")).toBeVisible();
  await expect(page.locator('input[type="email"]')).toBeVisible();
  await expect(page.locator('input[type="password"]')).toBeVisible();
  await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
});

test("login page shows validation error when form is submitted empty", async ({ page }) => {
  await page.goto("/login");

  // Submit without filling any fields
  await page.click('button[type="submit"]');

  await expect(
    page.getByText("Please enter your email and password."),
  ).toBeVisible();
});
