import React from 'react';
import ProductCard from './ProductCard';
import OrderStatusButton from './OrderStatusButton';

/**
 * 
 * Assessment outcomes:
 * 
 * 1) Wire up the ProductCard component to:
 *   a) Clicking 'Add to order' button adds OR removes the product to a "cart" state/context.
 *   b) The product card shows whether the product is added to the order or not with a success state button style and a different message
 * 2) Wire up the OrderStatusButton to show the number of added products to the cart state/context.
 * 3) Wire up the OrderStatusButton click to show and populate the OrderModal component
 * 4) Update the UI to render/show a list of products in a 4 column grid and works correctly with the above changes.
 * 4.1) Fetch the products from a JSON file
 */

function App() {
  const sampleProduct = {
    title: 'Wireless Mouse',
    sku: 'MSE-001',
    description: 'Ergonomic wireless mouse with USB-C charging.',
    imageUrl: 'https://placehold.co/50',
  };

  return (
    <div className="position-relative vh-100 bg-light">
      {/* Top-right counter button */}
      <OrderStatusButton />

      {/* Centered Product Card */}
      <div className="d-flex justify-content-center align-items-center h-100">
        <ProductCard product={sampleProduct} />
      </div>
    </div>
  );
}

export default App;
