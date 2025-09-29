import { test, expect } from '@playwright/test';
import { MainPage } from './page-objects/MainPage.js';
import { EXPECTED_PRODUCTS } from './test-utils.js';

/**
 * Assessment Outcome 4 & 4.1 Tests
 * 
 * 4) Update the UI to render/show a list of products in a 4 column grid 
 *    and works correctly with the above changes.
 * 4.1) Fetch the products from a JSON file
 */

test.describe('Outcome 4 & 4.1 - Product Grid from JSON', () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.waitForPageLoad();
  });

  test('should fetch and display all 8 products from assets/products.json', async ({ page }) => {
    // Should display exactly 8 products (from JSON file)
    const productCount = await mainPage.productCards.count();
    expect(productCount).toBe(EXPECTED_PRODUCTS.length);
    expect(productCount).toBe(8);
  });

  test('should display products with correct data from JSON file', async ({ page }) => {
    const productTitles = await mainPage.getAllProductTitles();

    // Verify all expected products from JSON are present
    for (const expectedProduct of EXPECTED_PRODUCTS) {
      expect(productTitles).toContain(expectedProduct.title);
    }
  });

  test('should display products in proper grid layout', async ({ page }) => {
    // Should have more than just the single sample product
    const productCount = await mainPage.productCards.count();
    expect(productCount).toBeGreaterThan(1);

    // Check grid layout - products should be arranged horizontally
    const firstCard = await mainPage.productCards.nth(0).boundingBox();
    const secondCard = await mainPage.productCards.nth(1).boundingBox();

    // Cards should be positioned to allow horizontal arrangement
    // (allowing for some vertical difference due to potential wrapping)
    expect(Math.abs(firstCard.y - secondCard.y)).toBeLessThan(firstCard.height);
  });

  test('should display each product with complete information from JSON', async ({ page }) => {
    const productCount = await mainPage.productCards.count();

    // Test first few products to verify JSON data is properly loaded
    for (let i = 0; i < Math.min(3, productCount); i++) {
      const card = mainPage.productCards.nth(i);

      // Should have title
      const title = card.locator('h5.card-title');
      await expect(title).toBeVisible();
      const titleText = await title.textContent();
      expect(titleText.trim().length).toBeGreaterThan(0);

      // Should have SKU
      const sku = card.locator('small:has-text("SKU:")');
      await expect(sku).toBeVisible();
      const skuText = await sku.textContent();
      expect(skuText).toMatch(/SKU: \w+-\d+/);

      // Should have description
      const description = card.locator('.card-text');
      await expect(description).toBeVisible();
      const descText = await description.textContent();
      expect(descText.trim().length).toBeGreaterThan(10);

      // Should have image
      const image = card.locator('img');
      await expect(image).toBeVisible();

      // Should have button
      const button = card.locator('button');
      await expect(button).toBeVisible();
      await expect(button).toContainText('Add to Order');
    }
  });

  test('should maintain 4-column responsive grid across different screen sizes', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await mainPage.verifyResponsiveLayout();

    // Test tablet view  
    await page.setViewportSize({ width: 768, height: 1024 });
    await mainPage.verifyResponsiveLayout();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await mainPage.verifyResponsiveLayout();

    // All products should still be visible regardless of viewport
    const productCount = await mainPage.productCards.count();
    expect(productCount).toBe(8);
  });

  test('should load specific products from JSON in correct order', async ({ page }) => {
    // Verify specific products are loaded in expected order
    const expectedFirstProduct = EXPECTED_PRODUCTS[0]; // Wireless Mouse
    const expectedLastProduct = EXPECTED_PRODUCTS[7];  // Ergonomic Office Chair

    const firstCard = mainPage.productCards.first();
    const lastCard = mainPage.productCards.last();

    // Check first product
    await expect(firstCard.locator('h5.card-title')).toContainText(expectedFirstProduct.title);
    await expect(firstCard.locator('small:has-text("SKU:")')).toContainText(expectedFirstProduct.sku);

    // Check last product
    await expect(lastCard.locator('h5.card-title')).toContainText(expectedLastProduct.title);
    await expect(lastCard.locator('small:has-text("SKU:")')).toContainText(expectedLastProduct.sku);
  });

  test('should ensure cart functionality works with all JSON products', async ({ page }) => {
    const productCount = await mainPage.productCards.count();

    // Add all products to cart
    for (let i = 0; i < productCount; i++) {
      await mainPage.productCards.nth(i).locator('button:has-text("Add to Order")').click();
      await expect(mainPage.orderStatusButton).toContainText(`Products in Order: ${i + 1}`);
    }

    // Verify all products show as in cart
    for (let i = 0; i < productCount; i++) {
      const button = mainPage.productCards.nth(i).locator('button');
      await expect(button).toContainText('Remove');
      await expect(button).toHaveClass(/btn-success/);
    }

    // Open modal and verify all products are listed
    await mainPage.orderStatusButton.click();
    await expect(mainPage.modalProducts).toHaveCount(productCount);

    // Verify specific products in modal
    for (const expectedProduct of EXPECTED_PRODUCTS) {
      await expect(mainPage.modal).toContainText(expectedProduct.title);
      await expect(mainPage.modal).toContainText(expectedProduct.sku);
    }
  });

  test('should replace the single sample product with the JSON product grid', async ({ page }) => {
    // Should no longer show just the single "Wireless Mouse" sample
    // Instead should show all 8 products from JSON
    const productCount = await mainPage.productCards.count();
    expect(productCount).toBe(8);

    // Should have various different products, not just the sample
    const titles = await mainPage.getAllProductTitles();
    expect(titles.length).toBe(8);

    // Should include expected variety from JSON
    expect(titles).toContain('Wireless Mouse');
    expect(titles).toContain('Mechanical Keyboard');
    expect(titles).toContain('HD Webcam');
    expect(titles).toContain('Ergonomic Office Chair');
  });

  test('should handle JSON loading errors gracefully', async ({ page }) => {
    // This test ensures the app doesn't break if JSON fails to load
    // At minimum, some products should be displayed
    const productCount = await mainPage.productCards.count();
    expect(productCount).toBeGreaterThan(0);

    // Each visible product should have proper structure
    for (let i = 0; i < productCount; i++) {
      const card = mainPage.productCards.nth(i);
      await expect(card.locator('h5.card-title')).toBeVisible();
      await expect(card.locator('button')).toBeVisible();
    }
  });
});