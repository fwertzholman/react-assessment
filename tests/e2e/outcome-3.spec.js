import { test, expect } from '@playwright/test';
import { MainPage } from './page-objects/MainPage.js';

/**
 * Assessment Outcome 3 Tests
 * 
 * Wire up the OrderStatusButton click to show and populate the OrderModal component.
 */

test.describe('Outcome 3 - Order Status Modal Integration', () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.waitForPageLoad();
  });

  test('should open modal when OrderStatusButton is clicked', async ({ page }) => {
    // Modal should not be visible initially
    await expect(mainPage.modal).not.toBeVisible();

    // Click OrderStatusButton
    await mainPage.orderStatusButton.click();

    // Modal should become visible
    await expect(mainPage.modal).toBeVisible();
    await expect(mainPage.modalTitle).toContainText('Products in Order');
  });

  test('should show empty cart message when no products are in cart', async ({ page }) => {
    // Open modal with empty cart
    await mainPage.orderStatusButton.click();

    // Should show empty cart message
    await expect(mainPage.modal).toBeVisible();
    await expect(mainPage.emptyCartMessage).toBeVisible();
    await expect(mainPage.emptyCartMessage).toContainText('No products added');
  });

  test('should populate modal with products in cart', async ({ page }) => {
    // Add a product to cart first
    const firstCard = mainPage.productCards.first();
    await firstCard.locator('button:has-text("Add to Order")').click();

    // Open modal
    await mainPage.orderStatusButton.click();

    // Modal should show the product
    await expect(mainPage.modal).toBeVisible();
    await expect(mainPage.emptyCartMessage).not.toBeVisible();

    // Should have product list
    await expect(mainPage.modalProducts).toHaveCount(1);

    // Product should contain correct information
    const productTitle = await firstCard.locator('h5.card-title').textContent();
    const productSku = await firstCard.locator('small:has-text("SKU:")').textContent();

    await expect(mainPage.modalProducts.first()).toContainText(productTitle.trim());
    await expect(mainPage.modalProducts.first()).toContainText(productSku.replace('SKU: ', '').trim());
  });

  test('should close modal using X button', async ({ page }) => {
    // Open modal
    await mainPage.orderStatusButton.click();
    await expect(mainPage.modal).toBeVisible();

    // Close using X button
    await mainPage.modalCloseButton.click();

    // Modal should be hidden
    await expect(mainPage.modal).not.toBeVisible();
  });

  test('should close modal using footer Close button', async ({ page }) => {
    // Open modal
    await mainPage.orderStatusButton.click();
    await expect(mainPage.modal).toBeVisible();

    // Close using footer button
    await mainPage.modalCloseFooterButton.click();

    // Modal should be hidden
    await expect(mainPage.modal).not.toBeVisible();
  });

  test('should update modal content when cart changes', async ({ page }) => {
    const productCount = await mainPage.productCards.count();

    if (productCount > 1) {
      // Add first product
      await mainPage.productCards.nth(0).locator('button:has-text("Add to Order")').click();

      // Open modal and verify 1 product
      await mainPage.orderStatusButton.click();
      await expect(mainPage.modalProducts).toHaveCount(1);
      await mainPage.modalCloseButton.click();

      // Add second product
      await mainPage.productCards.nth(1).locator('button:has-text("Add to Order")').click();

      // Open modal again and verify 2 products
      await mainPage.orderStatusButton.click();
      await expect(mainPage.modalProducts).toHaveCount(2);
      await mainPage.modalCloseButton.click();

      // Remove first product
      await mainPage.productCards.nth(0).locator('button:has-text("Remove")').click();

      // Open modal and verify only 1 product remains
      await mainPage.orderStatusButton.click();
      await expect(mainPage.modalProducts).toHaveCount(1);
    }
  });

  test('should maintain correct product information in modal', async ({ page }) => {
    const productCount = await mainPage.productCards.count();

    // Add multiple products if available
    const productsToAdd = Math.min(3, productCount);
    const expectedProducts = [];

    for (let i = 0; i < productsToAdd; i++) {
      const card = mainPage.productCards.nth(i);
      const title = await card.locator('h5.card-title').textContent();
      const sku = await card.locator('small:has-text("SKU:")').textContent();

      expectedProducts.push({
        title: title.trim(),
        sku: sku.replace('SKU: ', '').trim()
      });

      await card.locator('button:has-text("Add to Order")').click();
    }

    // Open modal
    await mainPage.orderStatusButton.click();

    // Verify all products are shown with correct information
    await expect(mainPage.modalProducts).toHaveCount(productsToAdd);

    for (let i = 0; i < productsToAdd; i++) {
      const modalProduct = mainPage.modalProducts.nth(i);
      await expect(modalProduct).toContainText(expectedProducts[i].title);
      await expect(modalProduct).toContainText(expectedProducts[i].sku);
    }
  });

  test('should handle modal operations with various cart states', async ({ page }) => {
    // Test with empty cart
    await mainPage.orderStatusButton.click();
    await expect(mainPage.emptyCartMessage).toBeVisible();
    await mainPage.modalCloseButton.click();

    // Add product and test with single item
    await mainPage.productCards.first().locator('button:has-text("Add to Order")').click();
    await mainPage.orderStatusButton.click();
    await expect(mainPage.modalProducts).toHaveCount(1);
    await expect(mainPage.emptyCartMessage).not.toBeVisible();
    await mainPage.modalCloseFooterButton.click();

    // Remove product and test empty again
    await mainPage.productCards.first().locator('button:has-text("Remove")').click();
    await mainPage.orderStatusButton.click();
    await expect(mainPage.emptyCartMessage).toBeVisible();
    await expect(mainPage.modalProducts).toHaveCount(0);
  });
});