import React from 'react';

// ProductCard component
const ProductCard = ({ product }) => {
  // Props expected:
  // product = {
  //   title: 'Product Title',
  //   sku: 'ABC-1234',
  //   description: 'This is a sample description for the product.',
  //   imageUrl: 'optional image URL (fallback to placeholder if missing)'
  // }

  return (
    <div className="card shadow-sm m-3" style={{ width: '18rem' }}>
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={product.imageUrl || 'https://placehold.co/50'}
            alt={product.title}
            className="me-3 rounded"
            width="50"
            height="50"
          />
          <div>
            <h5 className="card-title mb-1">{product.title}</h5>
            <small className="text-muted">SKU: {product.sku}</small>
          </div>
        </div>
        <p className="card-text text-secondary" style={{ fontSize: '0.9rem' }}>
          {product.description}
        </p>
        <button className="btn btn-primary w-100">
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

// Example usage:
// <ProductCard
//   product={{
//     title: 'Wireless Mouse',
//     sku: 'MSE-001',
//     description: 'Ergonomic wireless mouse with USB-C charging.',
//     imageUrl: 'https://placehold.co/50'
//   }}
// />
