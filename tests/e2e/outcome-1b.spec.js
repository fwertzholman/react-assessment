import { test, expect } from '@playwright/test';
import { MainPage } from './page-objects/MainPage.js';

/**
 * Assessment Outcome 1b Tests
 * 
 * The product card shows whether the product is added to the order or not 
 * with a success state button style and a different message.
 */

test.describe('Outcome 1b - Product Card Visual Feedback', () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.waitForPageLoad();
  });

  test('should change button text from "Add to Order" to "Remove from Order"', async ({ page }) => {
    const firstCard = mainPage.productCards.first();
    const button = firstCard.locator('button');

    // Initially should show "Add to Order"
    await expect(button).toContainText('Add to Order');

    // Click to add product
    await button.click();

    // Button text should change to indicate removal
    await expect(button).toContainText('Remove');
  });

  test('should show success button style when product is in cart', async ({ page }) => {
    const firstCard = mainPage.productCards.first();
    const button = firstCard.locator('button');

    // Initially should have primary button style
    await expect(button).toHaveClass(/btn-primary/);

    // Add product to cart
    await button.click();

    // Button should now have success styling
    await expect(button).toHaveClass(/btn-success/);
  });

  test('should revert button appearance when product is removed from cart', async ({ page }) => {
    const firstCard = mainPage.productCards.first();
    const button = firstCard.locator('button');

    // Add product first
    await button.click();
    await expect(button).toContainText('Remove');
    await expect(button).toHaveClass(/btn-success/);

    // Remove product
    await button.click();

    // Button should revert to original state
    await expect(button).toContainText('Add to Order');
    await expect(button).toHaveClass(/btn-primary/);
  });

  test('should maintain visual state across multiple products', async ({ page }) => {
    const productCount = await mainPage.productCards.count();

    if (productCount > 1) {
      const firstCard = mainPage.productCards.nth(0);
      const secondCard = mainPage.productCards.nth(1);

      // Add first product
      await firstCard.locator('button').click();
      await expect(firstCard.locator('button')).toContainText('Remove');
      await expect(firstCard.locator('button')).toHaveClass(/btn-success/);

      // Second product should still show "Add to Order"
      await expect(secondCard.locator('button')).toContainText('Add to Order');
      await expect(secondCard.locator('button')).toHaveClass(/btn-primary/);

      // Add second product
      await secondCard.locator('button').click();
      await expect(secondCard.locator('button')).toContainText('Remove');
      await expect(secondCard.locator('button')).toHaveClass(/btn-success/);

      // First product should still show as in cart
      await expect(firstCard.locator('button')).toContainText('Remove');
      await expect(firstCard.locator('button')).toHaveClass(/btn-success/);
    }
  });

  test('should show consistent visual feedback after page interactions', async ({ page }) => {
    const firstCard = mainPage.productCards.first();
    const button = firstCard.locator('button');

    // Add product
    await button.click();
    await expect(button).toContainText('Remove');
    await expect(button).toHaveClass(/btn-success/);

    // Scroll or interact with page
    await page.mouse.wheel(0, 100);
    await page.mouse.wheel(0, -100);

    // Visual state should be maintained
    await expect(button).toContainText('Remove');
    await expect(button).toHaveClass(/btn-success/);
  });
});