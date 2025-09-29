# End-to-End Testing Guide# End-to-End Testing Guide



This project includes comprehensive end-to-end (e2e) tests using Playwright to help you validate your implementation as you work through the assessment requirements.This project includes comprehensive end-to-end (e2e) tests using Playwright to help you validate your implementation as you work through the assessment requirements.



## GitHub Codespaces Integration## Getting Started with E2E Tests



This assessment is optimized for GitHub Codespaces with automatic setup:### 1. Install Browser Dependencies



### **For Candidates**First, install the required browser binaries:

- **Zero setup time** - everything pre-configured

- **Consistent environment** - same setup for everyone```bash

- **Free to use** - no billing required from candidatesnpm run test:e2e:install

- **Browser-based** - works on any device```



### **For Assessment Administrators**This will install Chromium, Firefox, and WebKit browsers needed for testing.

- **Cost**: ~$0.18/hour per candidate (you pay as repo owner)

- **Estimated cost**: $1-3 per candidate for typical assessment### 2. Running Tests

- **Auto-stop**: Codespaces stop after 30min of inactivity

- **See**: [Codespace Setup Guide](.github/CODESPACE_SETUP.md) for full details#### Basic Test Commands



## Getting Started with E2E Tests```bash

# Run all e2e tests (headless mode)

### 1. Install Browser Dependenciesnpm run test:e2e



First, install the required browser binaries:# Run tests with browser visible (helpful for debugging)

npm run test:e2e:headed

```bash

npm run test:e2e:install# Run tests with interactive UI

```npm run test:e2e:ui



This will install Chromium, Firefox, and WebKit browsers needed for testing.# Debug mode (opens DevTools)

npm run test:e2e:debug

### 2. Running Tests```



#### Basic Test Commands#### Browser-Specific Tests



```bash```bash

# Run all e2e tests (headless mode)# Run only Chrome tests

npm run test:e2enpm run test:e2e:chromium



# Run tests with browser visible (helpful for debugging)# Run only Firefox tests  

npm run test:e2e:headednpm run test:e2e:firefox



# Run tests with interactive UI# Run only Safari tests

npm run test:e2e:uinpm run test:e2e:webkit



# Debug mode (opens DevTools)# Run mobile Chrome tests

npm run test:e2e:debugnpm run test:e2e:mobile

``````



#### Browser-Specific Tests#### View Test Reports



```bash```bash

# Run only Chrome tests# Open HTML test report

npm run test:e2e:chromiumnpm run test:e2e:report

```

# Run only Firefox tests  

npm run test:e2e:firefox## Test Structure



# Run only Safari testsThe e2e tests are organized to match the assessment requirements:

npm run test:e2e:webkit

### 📁 `tests/e2e/`

# Run mobile Chrome tests```

npm run test:e2e:mobiletests/e2e/

```├── getting-started.spec.js              # Init/setup validation tests  

├── outcome-1a.spec.js                   # Cart state management

#### View Test Reports├── outcome-1b.spec.js                   # Product card visual feedback

├── outcome-2.spec.js                    # Order status button counter

```bash├── outcome-3.spec.js                    # Order modal integration

# Open HTML test report├── outcome-4.spec.js                    # Product grid from JSON

npm run test:e2e:report├── page-objects/

```│   └── MainPage.js                      # Page object model

└── test-utils.js                        # Utility functions

## Test Structure```



The e2e tests are organized to match the assessment outcomes:## Test Categories



### 📁 `tests/e2e/`### 🎯 Procedural Assessment Tests

```

tests/e2e/The tests are now organized to match the exact assessment outcomes in App.jsx:

├── getting-started.spec.js              # Init/setup validation tests  

├── outcome-1a.spec.js                   # Cart state management#### Init Tests (`getting-started.spec.js`)

├── outcome-1b.spec.js                   # Product card visual feedback- ✅ Application loads successfully

├── outcome-2.spec.js                    # Order status button counter- ✅ Product cards display with proper structure  

├── outcome-3.spec.js                    # Order modal integration- ✅ Order status button is visible with zero count

├── outcome-4.spec.js                    # Product grid from JSON

├── page-objects/#### Outcome 1a (`outcome-1a.spec.js`) - Product Cart State Management

│   └── MainPage.js                      # Page object model- ✅ Clicking "Add to Order" adds product to cart state

└── test-utils.js                        # Utility functions- ✅ Clicking button again removes product from cart

```- ✅ Cart state maintained across multiple products

- ✅ Rapid clicking handled correctly

## Test Categories

#### Outcome 1b (`outcome-1b.spec.js`) - Product Card Visual Feedback  

### 🎯 Procedural Assessment Tests- ✅ Button text changes from "Add to Order" to "Remove from Order"

- ✅ Button shows success styling when product in cart

The tests are now organized to match the exact assessment outcomes in App.jsx:- ✅ Button reverts to original state when product removed

- ✅ Visual state consistent across multiple products

#### Init Tests (`getting-started.spec.js`)

- ✅ Application loads successfully#### Outcome 2 (`outcome-2.spec.js`) - Order Status Button Counter

- ✅ Product cards display with proper structure  - ✅ Shows zero count initially

- ✅ Order status button is visible with zero count- ✅ Updates to correct count when products added

- ✅ Decreases count when products removed  

#### Outcome 1a (`outcome-1a.spec.js`) - Product Cart State Management- ✅ Real-time updates during interactions

- ✅ Clicking "Add to Order" adds product to cart state- ✅ Handles maximum cart capacity

- ✅ Clicking button again removes product from cart

- ✅ Cart state maintained across multiple products#### Outcome 3 (`outcome-3.spec.js`) - Order Modal Integration

- ✅ Rapid clicking handled correctly- ✅ Modal opens when OrderStatusButton clicked

- ✅ Shows empty cart message when no products

#### Outcome 1b (`outcome-1b.spec.js`) - Product Card Visual Feedback  - ✅ Populates modal with cart contents

- ✅ Button text changes from "Add to Order" to "Remove from Order"- ✅ Modal close functionality (X and footer button)

- ✅ Button shows success styling when product in cart- ✅ Modal content updates when cart changes

- ✅ Button reverts to original state when product removed

- ✅ Visual state consistent across multiple products#### Outcome 4 & 4.1 (`outcome-4.spec.js`) - Product Grid from JSON

- ✅ Fetches all 8 products from assets/products.json

#### Outcome 2 (`outcome-2.spec.js`) - Order Status Button Counter- ✅ Displays products with correct JSON data

- ✅ Shows zero count initially- ✅ Shows products in 4-column grid layout

- ✅ Updates to correct count when products added- ✅ Responsive grid across screen sizes

- ✅ Decreases count when products removed  - ✅ Cart functionality works with all JSON products

- ✅ Real-time updates during interactions- ✅ Replaces single sample product with full grid

- ✅ Handles maximum cart capacity

## Using Tests During Development

#### Outcome 3 (`outcome-3.spec.js`) - Order Modal Integration

- ✅ Modal opens when OrderStatusButton clicked### 1. Test-Driven Development Approach

- ✅ Shows empty cart message when no products

- ✅ Populates modal with cart contentsStart by running tests to see what needs to be implemented:

- ✅ Modal close functionality (X and footer button)

- ✅ Modal content updates when cart changes```bash

# See current test status

#### Outcome 4 & 4.1 (`outcome-4.spec.js`) - Product Grid from JSONnpm run test:e2e:headed

- ✅ Fetches all 8 products from assets/products.json```

- ✅ Displays products with correct JSON data

- ✅ Shows products in 4-column grid layoutThe failing tests will guide you through what functionality to implement.

- ✅ Responsive grid across screen sizes

- ✅ Cart functionality works with all JSON products### 2. Feature-by-Feature Testing

- ✅ Replaces single sample product with full grid

Test specific outcomes as you implement them:

## Using Tests During Development

```bash

### 1. Test-Driven Development Approach# Run init tests to verify basic setup

npx playwright test getting-started

Start by running tests to see what needs to be implemented:

# Test outcome 1a - cart state management

```bashnpx playwright test outcome-1a

# See current test status

npm run test:e2e:headed# Test outcome 1b - visual feedback

```npx playwright test outcome-1b  



The failing tests will guide you through what functionality to implement.# Test outcome 2 - counter integration

npx playwright test outcome-2

### 2. Feature-by-Feature Testing

# Test outcome 3 - modal functionality

Test specific outcomes as you implement them:npx playwright test outcome-3



```bash# Test outcome 4 - product grid from JSON

# Run init tests to verify basic setupnpx playwright test outcome-4

npx playwright test getting-started```



# Test outcome 1a - cart state management### 3. Debug Mode

npx playwright test outcome-1a

When tests fail, use debug mode to step through and see what's happening:

# Test outcome 1b - visual feedback

npx playwright test outcome-1b  ```bash

npm run test:e2e:debug

# Test outcome 2 - counter integration```

npx playwright test outcome-2

This opens the Playwright Inspector where you can:

# Test outcome 3 - modal functionality- Step through test actions

npx playwright test outcome-3- Inspect the page at any point

- See what elements the test is looking for

# Test outcome 4 - product grid from JSON

npx playwright test outcome-4### 4. Visual Testing with UI Mode

```

The UI mode provides a visual interface:

### 3. Debug Mode

```bash

When tests fail, use debug mode to step through and see what's happening:npm run test:e2e:ui

```

```bash

npm run test:e2e:debugThis allows you to:

```- See tests run in real-time

- Pick specific tests to run

This opens the Playwright Inspector where you can:- View traces and screenshots

- Step through test actions- Debug failed tests easily

- Inspect the page at any point

- See what elements the test is looking for## Expected Test Behavior



### 4. Visual Testing with UI Mode### ✅ When Implementation is Complete



The UI mode provides a visual interface:All tests should pass, covering:

- Product grid displays 8 products

```bash- Add/remove buttons work correctly

npm run test:e2e:ui- Cart counter updates in real-time

```- Modal opens and displays cart contents

- Responsive design works across devices

This allows you to:

- See tests run in real-time### ⚠️ During Development

- Pick specific tests to run

- View traces and screenshotsExpect these test patterns as you implement each outcome:

- Debug failed tests easily

1. **Init Tests**: Should pass once basic setup is complete

## Expected Test Behavior2. **Outcome 1a**: Tests pass as you implement cart state management  

3. **Outcome 1b**: Tests pass when button styling/text changes work

### ✅ When Implementation is Complete4. **Outcome 2**: Tests pass when counter displays cart count correctly

5. **Outcome 3**: Tests pass when modal integration is complete

All tests should pass, covering:6. **Outcome 4**: Tests pass when JSON loading and grid display work

- Product grid displays 8 products

- Add/remove buttons work correctlyEach outcome builds on the previous ones, so implement them in order for best results.

- Cart counter updates in real-time

- Modal opens and displays cart contents## Common Issues & Solutions

- Responsive design works across devices

### Browser Installation Issues

### ⚠️ During Development```bash

# If browsers fail to install, try specific browser:

Expect these test patterns as you implement each outcome:npx playwright install chromium



1. **Init Tests**: Should pass once basic setup is complete# Or install with sudo (if needed):

2. **Outcome 1a**: Tests pass as you implement cart state management  sudo npx playwright install

3. **Outcome 1b**: Tests pass when button styling/text changes work```

4. **Outcome 2**: Tests pass when counter displays cart count correctly

5. **Outcome 3**: Tests pass when modal integration is complete### Port Already in Use

6. **Outcome 4**: Tests pass when JSON loading and grid display work```bash

# If port 3000 is busy, tests will wait or fail

Each outcome builds on the previous ones, so implement them in order for best results.# Make sure dev server isn't already running

```

## Common Issues & Solutions

### Tests Timing Out

### Browser Installation Issues```bash

```bash# Increase timeout in playwright.config.js if needed

# If browsers fail to install, try specific browser:# Or run fewer tests in parallel

npx playwright install chromiumnpx playwright test --workers=1

```

# Or install with sudo (if needed):

sudo npx playwright install## Test Configuration

```

The tests are configured in `playwright.config.js`:

### Tests Timing Out

```bash- **Base URL**: `http://localhost:3000` (Vite dev server)

# Increase timeout in playwright.config.js if needed- **Test Directory**: `./tests/e2e`  

# Or run fewer tests in parallel- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari

npx playwright test --workers=1- **Auto-start**: Development server starts automatically

```- **Retries**: 2 retries on CI, 0 locally

- **Screenshots**: Captured on failure

## Test Configuration- **Videos**: Recorded on failure



The tests are configured in `playwright.config.js`:## Writing Additional Tests



- **Base URL**: `http://localhost:3000` (Vite dev server)If you want to add your own tests, follow this pattern:

- **Test Directory**: `./tests/e2e`  

- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari```javascript

- **Auto-start**: Development server starts automaticallyimport { test, expect } from '@playwright/test';

- **Retries**: 2 retries on CI, 0 locallyimport { MainPage } from './page-objects/MainPage.js';

- **Screenshots**: Captured on failure

- **Videos**: Recorded on failuretest.describe('My Custom Tests', () => {

  let mainPage;

## Writing Additional Tests

  test.beforeEach(async ({ page }) => {

If you want to add your own tests, follow this pattern:    mainPage = new MainPage(page);

    await mainPage.goto();

```javascript    await mainPage.waitForPageLoad();

import { test, expect } from '@playwright/test';  });

import { MainPage } from './page-objects/MainPage.js';

  test('should do something specific', async ({ page }) => {

test.describe('My Custom Tests', () => {    // Your test logic here

  let mainPage;    await mainPage.addProductToCart(0);

    await expect(mainPage.orderStatusButton).toContainText('1');

  test.beforeEach(async ({ page }) => {  });

    mainPage = new MainPage(page);});

    await mainPage.goto();```

    await mainPage.waitForPageLoad();

  });## Assessment Integration



  test('should do something specific', async ({ page }) => {### For Candidates

    // Your test logic here- Run tests regularly to validate your progress

    await mainPage.addProductToCart(0);- Use failing tests as a guide for what to implement next

    await expect(mainPage.orderStatusButton).toContainText('1');- All tests should pass when assessment is complete

  });

});### For Evaluators  

```- Tests provide objective validation of functionality

- Test results show exactly what's working/not working

## Assessment Integration- Can be run in CI/CD for automated evaluation



### For Candidates## Tips for Success

- Run tests regularly to validate your progress

- Use failing tests as a guide for what to implement next1. **Start Early**: Run tests from the beginning to understand requirements

- All tests should pass when assessment is complete2. **Incremental Development**: Implement one feature at a time, run tests

3. **Use Debug Mode**: When stuck, debug mode shows exactly what's happening

### For Evaluators  4. **Check All Browsers**: Don't forget mobile and cross-browser testing

- Tests provide objective validation of functionality5. **Read Test Names**: Test descriptions clearly state what should happen

- Test results show exactly what's working/not working

- Can be run in CI/CD for automated evaluationThe e2e tests are designed to be your development companion - use them to guide your implementation and ensure you're building exactly what the assessment requires!

## Tips for Success

1. **Start Early**: Run tests from the beginning to understand requirements
2. **Incremental Development**: Implement one outcome at a time, run tests
3. **Use Debug Mode**: When stuck, debug mode shows exactly what's happening
4. **Check All Browsers**: Don't forget mobile and cross-browser testing
5. **Read Test Names**: Test descriptions clearly state what should happen

The e2e tests are designed to be your development companion - use them to guide your implementation and ensure you're building exactly what the assessment requires!