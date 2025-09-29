import { test, expect } from '@playwright/test';
import { MainPage } from './page-objects/MainPage.js';

/**
 * Assessment Outcome 2 Tests
 * 
 * Wire up the OrderStatusButton to show the number of added products 
 * to the cart state/context.
 */

test.describe('Outcome 2 - Order Status Button Cart Counter', () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.waitForPageLoad();
  });

  test('should start with zero products in cart', async ({ page }) => {
    // OrderStatusButton should show 0 initially
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 0');
    await expect(mainPage.orderStatusButton).toBeVisible();
  });

  test('should update count to 1 when first product is added', async ({ page }) => {
    // Add one product
    await mainPage.productCards.first().locator('button:has-text("Add to Order")').click();

    // Counter should show 1
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 1');
  });

  test('should update count correctly when adding multiple products', async ({ page }) => {
    const productCount = await mainPage.productCards.count();

    // Add products one by one and verify count increases
    for (let i = 0; i < Math.min(3, productCount); i++) {
      await mainPage.productCards.nth(i).locator('button:has-text("Add to Order")').click();
      await expect(mainPage.orderStatusButton).toContainText(`Products in Order: ${i + 1}`);
    }
  });

  test('should decrease count when products are removed', async ({ page }) => {
    // Add two products
    await mainPage.productCards.nth(0).locator('button:has-text("Add to Order")').click();
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 1');

    const productCount = await mainPage.productCards.count();
    if (productCount > 1) {
      await mainPage.productCards.nth(1).locator('button:has-text("Add to Order")').click();
      await expect(mainPage.orderStatusButton).toContainText('Products in Order: 2');

      // Remove first product
      await mainPage.productCards.nth(0).locator('button:has-text("Remove")').click();
      await expect(mainPage.orderStatusButton).toContainText('Products in Order: 1');

      // Remove second product
      await mainPage.productCards.nth(1).locator('button:has-text("Remove")').click();
      await expect(mainPage.orderStatusButton).toContainText('Products in Order: 0');
    }
  });

  test('should update count in real-time during interactions', async ({ page }) => {
    const firstCard = mainPage.productCards.first();

    // Rapid add/remove should update counter each time
    await firstCard.locator('button:has-text("Add to Order")').click();
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 1');

    await firstCard.locator('button:has-text("Remove")').click();
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 0');

    await firstCard.locator('button:has-text("Add to Order")').click();
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 1');
  });

  test('should handle maximum cart capacity correctly', async ({ page }) => {
    const productCount = await mainPage.productCards.count();

    // Add all available products
    for (let i = 0; i < productCount; i++) {
      await mainPage.productCards.nth(i).locator('button:has-text("Add to Order")').click();
    }

    // Counter should show total number of products
    await expect(mainPage.orderStatusButton).toContainText(`Products in Order: ${productCount}`);

    // Remove all products
    for (let i = 0; i < productCount; i++) {
      await mainPage.productCards.nth(i).locator('button:has-text("Remove")').click();
    }

    // Counter should return to 0
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 0');
  });

  test('should maintain accurate count across page interactions', async ({ page }) => {
    // Add some products
    await mainPage.productCards.nth(0).locator('button:has-text("Add to Order")').click();
    const productCount = await mainPage.productCards.count();
    if (productCount > 2) {
      await mainPage.productCards.nth(2).locator('button:has-text("Add to Order")').click();
    }

    const expectedCount = productCount > 2 ? 2 : 1;
    await expect(mainPage.orderStatusButton).toContainText(`Products in Order: ${expectedCount}`);

    // Interact with page (scroll, etc.)
    await page.mouse.wheel(0, 200);
    await page.mouse.wheel(0, -200);

    // Counter should remain accurate
    await expect(mainPage.orderStatusButton).toContainText(`Products in Order: ${expectedCount}`);
  });
});