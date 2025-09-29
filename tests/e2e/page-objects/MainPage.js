import { expect } from '@playwright/test';

/**
 * Page Object Model for the main application
 * This class encapsulates all interactions with the main page elements
 */
export class MainPage {
  constructor(page) {
    this.page = page;

    // Main containers
    this.app = page.locator('[data-testid="app"]').or(page.locator('body'));

    // Product cards
    this.productCards = page.locator('.card');
    this.productCardImages = page.locator('.card img');
    this.productTitles = page.locator('.card h5.card-title');
    this.productDescriptions = page.locator('.card .card-text');
    this.addToOrderButtons = page.locator('button:has-text("Add to Order")');
    this.removeFromOrderButtons = page.locator('button:has-text("Remove from Order")');

    // Order status button (top-right)
    this.orderStatusButton = page.locator('button:has-text("Products in Order:")');

    // Modal
    this.modal = page.locator('.modal');
    this.modalTitle = page.locator('.modal-title');
    this.modalCloseButton = page.locator('.btn-close');
    this.modalCloseFooterButton = page.locator('.modal-footer button:has-text("Close")');
    this.modalProductList = page.locator('.modal-body .list-group');
    this.modalProducts = page.locator('.modal-body .list-group-item');
    this.emptyCartMessage = page.locator('.modal-body p:has-text("No products added")');
  }

  /**
   * Navigate to the application
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Wait for the page to be loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    // Wait for at least one product card to be visible
    await expect(this.productCards.first()).toBeVisible();
  }

  /**
   * Get the number of products displayed
   */
  async getProductCount() {
    return await this.productCards.count();
  }

  /**
   * Add a product to the cart by index (0-based)
   */
  async addProductToCart(productIndex = 0) {
    const addButton = this.addToOrderButtons.nth(productIndex);
    await expect(addButton).toBeVisible();
    await addButton.click();
  }

  /**
   * Remove a product from the cart by index (0-based)
   */
  async removeProductFromCart(productIndex = 0) {
    const removeButton = this.removeFromOrderButtons.nth(productIndex);
    await expect(removeButton).toBeVisible();
    await removeButton.click();
  }

  /**
   * Get the cart count from the order status button
   */
  async getCartCount() {
    const buttonText = await this.orderStatusButton.textContent();
    const match = buttonText.match(/Products in Order: (\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Open the order modal
   */
  async openOrderModal() {
    await this.orderStatusButton.click();
    await expect(this.modal).toBeVisible();
  }

  /**
   * Close the order modal using the X button
   */
  async closeModalWithX() {
    await this.modalCloseButton.click();
    await expect(this.modal).not.toBeVisible();
  }

  /**
   * Close the order modal using the footer close button
   */
  async closeModalWithButton() {
    await this.modalCloseFooterButton.click();
    await expect(this.modal).not.toBeVisible();
  }

  /**
   * Get the number of products in the modal
   */
  async getModalProductCount() {
    if (await this.emptyCartMessage.isVisible()) {
      return 0;
    }
    return await this.modalProducts.count();
  }

  /**
   * Get product information by index
   */
  async getProductInfo(productIndex = 0) {
    const card = this.productCards.nth(productIndex);
    const title = await card.locator('h5.card-title').textContent();
    const sku = await card.locator('small:has-text("SKU:")').textContent();
    const description = await card.locator('.card-text').textContent();

    return {
      title: title?.trim(),
      sku: sku?.replace('SKU: ', '').trim(),
      description: description?.trim()
    };
  }

  /**
   * Check if a product is in the cart (button shows "Remove from Order")
   */
  async isProductInCart(productIndex = 0) {
    const card = this.productCards.nth(productIndex);
    const removeButton = card.locator('button:has-text("Remove from Order")');
    return await removeButton.isVisible();
  }

  /**
   * Check if the product grid is displayed (4 columns on desktop)
   */
  async isProductGridDisplayed() {
    const count = await this.getProductCount();
    return count > 1; // More than the single sample product
  }

  /**
   * Get all product titles
   */
  async getAllProductTitles() {
    return await this.productTitles.allTextContents();
  }

  /**
   * Verify responsive design by checking if cards are properly arranged
   */
  async verifyResponsiveLayout() {
    const cards = await this.productCards.all();

    for (const card of cards) {
      await expect(card).toBeVisible();
      // Check that cards have reasonable width
      const box = await card.boundingBox();
      expect(box.width).toBeGreaterThan(200);
      expect(box.width).toBeLessThan(500);
    }
  }
}