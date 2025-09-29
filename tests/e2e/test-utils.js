/**
 * Test utilities and helper functions for the React assessment e2e tests
 */

/**
 * Expected products from the products.json file
 */
export const EXPECTED_PRODUCTS = [
  {
    title: "Wireless Mouse",
    sku: "MSE-001",
    description: "Ergonomic wireless mouse with USB-C charging."
  },
  {
    title: "Mechanical Keyboard",
    sku: "KEY-002",
    description: "Tactile mechanical keyboard with customizable RGB lighting."
  },
  {
    title: "HD Webcam",
    sku: "CAM-003",
    description: "1080p HD webcam with built-in microphone and tripod mount."
  },
  {
    title: "Laptop Stand",
    sku: "STD-004",
    description: "Aluminum laptop stand for ergonomic desk setups."
  },
  {
    title: "Noise-Canceling Headphones",
    sku: "AUD-005",
    description: "Over-ear Bluetooth headphones with active noise cancellation."
  },
  {
    title: "USB-C Hub",
    sku: "HUB-006",
    description: "6-in-1 USB-C hub with HDMI, USB 3.0, and SD card support."
  },
  {
    title: "Portable SSD 1TB",
    sku: "SSD-007",
    description: "Compact 1TB external SSD with fast USB 3.1 Gen 2 speeds."
  },
  {
    title: "Ergonomic Office Chair",
    sku: "CHR-008",
    description: "Adjustable mesh office chair with lumbar support."
  }
];

/**
 * Wait for a specific amount of time
 * @param {number} ms - Milliseconds to wait
 */
export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate test data for various scenarios
 */
export class TestDataGenerator {
  /**
   * Get a random product from the expected products list
   */
  static getRandomProduct() {
    const randomIndex = Math.floor(Math.random() * EXPECTED_PRODUCTS.length);
    return EXPECTED_PRODUCTS[randomIndex];
  }

  /**
   * Get multiple random products
   */
  static getRandomProducts(count) {
    const shuffled = [...EXPECTED_PRODUCTS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, EXPECTED_PRODUCTS.length));
  }

  /**
   * Get product indices for testing
   */
  static getTestProductIndices(count = 3) {
    const indices = [];
    for (let i = 0; i < Math.min(count, EXPECTED_PRODUCTS.length); i++) {
      indices.push(i);
    }
    return indices;
  }
}

/**
 * Viewport configurations for responsive testing
 */
export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1200, height: 800 },
  widescreen: { width: 1920, height: 1080 }
};

/**
 * Common test assertions
 */
export class TestAssertions {
  /**
   * Assert that a product card has correct structure
   */
  static async assertProductCardStructure(page, productIndex = 0) {
    const card = page.locator('.card').nth(productIndex);

    // Check card is visible
    await expect(card).toBeVisible();

    // Check image exists
    const image = card.locator('img');
    await expect(image).toBeVisible();

    // Check title exists
    const title = card.locator('h5.card-title');
    await expect(title).toBeVisible();

    // Check SKU exists
    const sku = card.locator('small:has-text("SKU:")');
    await expect(sku).toBeVisible();

    // Check description exists
    const description = card.locator('.card-text');
    await expect(description).toBeVisible();

    // Check button exists
    const button = card.locator('button');
    await expect(button).toBeVisible();
  }

  /**
   * Assert that the cart counter shows the expected count
   */
  static async assertCartCount(page, expectedCount) {
    const orderButton = page.locator('button:has-text("Products in Order:")');
    await expect(orderButton).toContainText(`Products in Order: ${expectedCount}`);
  }

  /**
   * Assert that the modal shows the correct number of products
   */
  static async assertModalProductCount(page, expectedCount) {
    if (expectedCount === 0) {
      const emptyMessage = page.locator('.modal-body p:has-text("No products added")');
      await expect(emptyMessage).toBeVisible();
    } else {
      const products = page.locator('.modal-body .list-group-item');
      await expect(products).toHaveCount(expectedCount);
    }
  }
}

/**
 * Test scenarios for comprehensive testing
 */
export const TEST_SCENARIOS = {
  // Basic functionality scenarios
  SINGLE_PRODUCT_ADD_REMOVE: 'Add and remove a single product',
  MULTIPLE_PRODUCTS_ADD: 'Add multiple products to cart',
  MODAL_INTERACTION: 'Open and close modal with products',

  // Edge case scenarios  
  EMPTY_CART_MODAL: 'Open modal with empty cart',
  ADD_ALL_PRODUCTS: 'Add all available products',
  RAPID_CLICKING: 'Rapid add/remove clicking',

  // Responsive scenarios
  MOBILE_INTERACTION: 'Mobile device interaction',
  TABLET_INTERACTION: 'Tablet device interaction',
  DESKTOP_INTERACTION: 'Desktop device interaction'
};

/**
 * Accessibility helpers
 */
export class AccessibilityHelpers {
  /**
   * Check if elements have proper ARIA labels
   */
  static async checkAriaLabels(page) {
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const hasAriaLabel = await button.getAttribute('aria-label');
      const hasAccessibleName = await button.textContent();

      // Button should have either aria-label or text content
      expect(hasAriaLabel || hasAccessibleName).toBeTruthy();
    }
  }

  /**
   * Check keyboard navigation
   */
  static async checkKeyboardNavigation(page) {
    // Tab through focusable elements
    const focusableElements = page.locator('button, [tabindex]:not([tabindex="-1"])');
    const count = await focusableElements.count();

    for (let i = 0; i < count; i++) {
      await page.keyboard.press('Tab');
      // Verify focus is visible
      const focused = page.locator(':focus');
      await expect(focused).toBeVisible();
    }
  }
}