import { test, expect } from '@playwright/test';
import { MainPage } from './page-objects/MainPage.js';

/**
 * Init Tests
 * 
 * These are basic setup validation tests to ensure the application loads
 * and displays the initial state correctly before implementing assessment features.
 */

test.describe('Init - Basic Setup Validation', () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.waitForPageLoad();
  });

  test('should load the application successfully', async ({ page }) => {
    // Check that the page loads
    await expect(page).toHaveTitle(/React/); // or whatever your title is

    // Check that at least one product card is visible
    await expect(mainPage.productCards.first()).toBeVisible();

    // Check that the order status button is visible
    await expect(mainPage.orderStatusButton).toBeVisible();
    await expect(mainPage.orderStatusButton).toContainText('Products in Order: 0');
  });

  test('should display product cards with proper structure', async ({ page }) => {
    // Check that product cards have the expected structure
    const firstCard = mainPage.productCards.first();

    // Should have an image
    await expect(firstCard.locator('img')).toBeVisible();

    // Should have a title
    await expect(firstCard.locator('h5.card-title')).toBeVisible();

    // Should have a SKU
    await expect(firstCard.locator('small:has-text("SKU:")')).toBeVisible();

    // Should have a description
    await expect(firstCard.locator('.card-text')).toBeVisible();

    // Should have a button
    await expect(firstCard.locator('button')).toBeVisible();
    await expect(firstCard.locator('button')).toContainText('Add to Order');
  });
});/**
 * IMPLEMENTATION NOTES FOR CANDIDATES:
 * 
 * If these tests are failing, here's what to check:
 * 
 * 1. "should load the application successfully" fails:
 *    - Make sure your dev server is running (npm run dev)
 *    - Check that your App component is rendering properly
 *    - Verify the OrderStatusButton is being imported and rendered
 * 
 * 2. "should display product cards with proper structure" fails:
 *    - Make sure your ProductCard component has the expected HTML structure
 *    - Check that images, titles, SKUs, descriptions are rendered with correct CSS classes
 *    - Verify the "Add to Order" button exists
 * 
 * Once these init tests pass, move on to the outcome-specific tests:
 * - outcome-1a.spec.js: Cart state management
 * - outcome-1b.spec.js: Visual feedback  
 * - outcome-2.spec.js: Counter integration
 * - outcome-3.spec.js: Modal functionality
 * - outcome-4.spec.js: Product grid from JSON
 * 
 * Use these commands to debug:
 * - npm run test:e2e:headed    (see browser while tests run)
 * - npm run test:e2e:debug     (step through tests)
 * - npm run test:e2e:ui        (visual test interface)
 */