# React Product Card Assessment

Welcome to the React Product Card Assessment! This project tests your ability to work with React components, state management, and data handling using React + Vite.

## Getting Started

### Option 1: GitHub Codespaces (Recommended)
The fastest way to get started - everything is pre-configured!

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/your-username/card-assessment)

1. Click the Codespaces badge above
2. Wait for environment to initialize (~2-3 minutes)
3. Run `npm run test:e2e:headed` to see requirements
4. Start implementing! 🎯

**See [Codespace Setup Guide](.github/CODESPACE_SETUP.md) for detailed instructions.**

### Option 2: Local Development

If you prefer to work locally:

**Prerequisites:**
- Node.js (version 18 or higher)
- npm, yarn, or pnpm package manager

**Setup Instructions:**

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd card-assessment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to view the application.

## Assessment Overview

You will be implementing a product catalog with shopping cart functionality. The project includes pre-built components that need to be connected together with proper state management.

### Available Components

- **ProductCard**: Displays individual product information with an "Add to Order" button
- **OrderStatusButton**: Shows the count of products in the cart (top-right corner)
- **OrderModal**: Displays the list of products added to the cart
- **App**: Main application component

### Available Data

- `src/assets/products.json`: Contains 8 sample products with title, SKU, description, and image URL

## Assessment Requirements

Complete the following tasks in order:

### 1. Product Cart State Management (25 points)
- Implement cart state management using React hooks (useState, useContext, or useReducer)
- Wire up the ProductCard component so clicking "Add to Order" adds/removes the product from the cart
- Show visual feedback on the ProductCard when a product is in the cart (different button style and text)

### 2. Cart Counter Integration (15 points)
- Connect the OrderStatusButton to display the actual number of products in the cart
- The counter should update in real-time as products are added/removed

### 3. Order Modal Implementation (20 points)
- Wire up the OrderStatusButton click event to open the OrderModal
- Populate the OrderModal with the current cart contents
- Implement modal close functionality

### 4. Product Grid Implementation (25 points)
- Load products from `src/assets/products.json`
- Replace the single sample product with a 4-column responsive grid of all products
- Ensure all cart functionality works correctly with multiple products

### 5. User Experience & Polish (15 points)
- Ensure responsive design works on different screen sizes
- Add appropriate loading states if needed
- Implement smooth user interactions and transitions
- Handle edge cases (empty cart, etc.)

## Technical Requirements

- Use React functional components with hooks
- Maintain clean, readable code with proper component structure
- Use Bootstrap classes (already included) for styling
- No additional libraries required (but you may add them if justified)
- Follow React best practices for state management and component design

## Evaluation Criteria

Your submission will be evaluated on:

1. **Functionality**: All requirements working as specified
2. **Code Quality**: Clean, maintainable, and well-organized code
3. **React Best Practices**: Proper use of hooks, component structure, and state management
4. **User Experience**: Intuitive and responsive interface
5. **Problem Solving**: How you handle edge cases and unexpected scenarios

## Development Environment

This project is configured with:
- **VS Code Extensions**: ESLint, Prettier, Live Server, and React-specific tools
- **Auto-formatting**: Code will format automatically on save
- **Port forwarding**: The development server (port 3000) is automatically accessible
- **Dependencies**: All packages install automatically in Codespaces
- **E2E Testing**: Playwright tests to validate your implementation

## End-to-End Testing

This assessment includes comprehensive e2e tests to help validate your implementation:

### Quick Start with Tests
```bash
# Install browser dependencies (first time only)
npm run test:e2e:install

# Run all tests
npm run test:e2e

# Run tests with visible browser (helpful for debugging)
npm run test:e2e:headed

# Interactive test UI
npm run test:e2e:ui
```

### Test Structure
The tests are organized to match the assessment requirements:
- **Core Tests**: Map directly to the 4 main requirements and point values
- **Comprehensive Tests**: Edge cases, responsive design, and user experience
- **Multiple Browsers**: Chrome, Firefox, Safari, and mobile viewports

### Using Tests During Development
- **Start Early**: Run tests to see what needs to be implemented
- **Incremental**: Test each feature as you build it
- **Debug Mode**: Use `npm run test:e2e:debug` when tests fail
- **Validation**: All tests should pass when assessment is complete

📖 **See [E2E_TESTING_GUIDE.md](./E2E_TESTING_GUIDE.md) for detailed testing instructions**

## Validation & Testing

This project includes comprehensive end-to-end tests to help you validate your implementation:

### Running Tests
```bash
# Install browsers (first time only)
npm run test:e2e:install

# Run tests
npm run test:e2e

# Debug mode
npm run test:e2e:debug
```

The tests cover all assessment requirements:
- ✅ Product cart state management (25 points)
- ✅ Cart counter integration (15 points)  
- ✅ Order modal implementation (20 points)
- ✅ Product grid implementation (25 points)
- ✅ User experience & polish (15 points)

**All tests should pass when your assessment is complete.**

For detailed testing instructions, see [E2E_TESTING_GUIDE.md](./E2E_TESTING_GUIDE.md).

## Submission Instructions

### For Codespace Users:
1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Complete React assessment"
   git push
   ```

2. **Ensure your code:**
   - Runs without errors using `npm run dev`
   - Passes linting with `npm run lint`
   - Includes all required functionality
   - Has been tested with different scenarios

3. **Share your work:**
   - Provide the GitHub repository URL with your completed code
   - Or share the Codespace if instructed by your coordinator

### For Local Development:
- Follow the same git workflow as above
- Ensure all changes are pushed to your repository
- Test that the application works correctly

## Time Expectation

This assessment is designed to take approximately 2-3 hours to complete thoroughly.

## Troubleshooting

**Codespace Issues:**
- If the Codespace doesn't start, try refreshing the page
- If dependencies aren't installed, run `npm install` manually
- If the port isn't forwarded, check the "Ports" panel in VS Code

**Development Issues:**
- Make sure the development server is running (`npm run dev`)
- Check the browser console for any JavaScript errors
- Use the VS Code integrated terminal for running commands

## Need Help?

If you encounter any setup issues or have questions about the requirements, please reach out to your assessment coordinator.

Good luck!
