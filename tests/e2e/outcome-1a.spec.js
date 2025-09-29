import { test, expect } from '@playwright/test';
import { MainPage } from './page-objects/MainPage.js';

/**
 * Assessment Outcome 1a Tests
 * 
 * Wire up the ProductCard component so that clicking 'Add to order' button 
 * adds OR removes the product to a "cart" state/context.
 */

test.describe('Outcome 1a - Product Cart State Management', () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.waitForPageLoad();
  });

  test('should add product to cart when "Add to Order" button is clicked', async ({ page }) => {
    // Initially cart should be empty (OrderStatusButton shows 0)
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 0');

    // Click "Add to Order" button on the first product
    const firstCard = mainPage.productCards.first();
    const addButton = firstCard.locator('button:has-text("Add to Order")');
    await expect(addButton).toBeVisible();
    await addButton.click();

    // Verify cart count increases to 1
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 1');
  });

  test('should remove product from cart when button is clicked again', async ({ page }) => {
    // Add product first
    const firstCard = mainPage.productCards.first();
    const addButton = firstCard.locator('button:has-text("Add to Order")');
    await addButton.click();

    // Verify product is in cart
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 1');

    // Click the button again (it should now show "Remove from Order")
    const removeButton = firstCard.locator('button:has-text("Remove")');
    await expect(removeButton).toBeVisible();
    await removeButton.click();

    // Verify cart count decreases back to 0
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 0');
  });

  test('should maintain cart state when adding multiple products', async ({ page }) => {
    // Start with empty cart
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 0');

    // Add first product
    await mainPage.productCards.nth(0).locator('button:has-text("Add to Order")').click();
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 1');

    // Add second product (if it exists)
    const productCount = await mainPage.productCards.count();
    if (productCount > 1) {
      await mainPage.productCards.nth(1).locator('button:has-text("Add to Order")').click();
      await expect(mainPage.orderStatusButton).toContainText('Products in Order: 2');
    }
  });

  test('should handle rapid clicking without breaking cart state', async ({ page }) => {
    const firstCard = mainPage.productCards.first();

    // Rapidly click add/remove
    for (let i = 0; i < 3; i++) {
      // Add
      await firstCard.locator('button:has-text("Add to Order")').click();
      await expect(mainPage.orderStatusButton).toContainText('Products in Order: 1');

      // Remove
      await firstCard.locator('button:has-text("Remove")').click();
      await expect(mainPage.orderStatusButton).toContainText('Products in Order: 0');
    }

    // Should end with empty cart
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 0');
  });
});