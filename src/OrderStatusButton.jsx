import React from 'react';

// OrderStatusButton component
const OrderStatusButton = () => {
  // TODO: Implement state management for counting added products
  // This could use React context, props, or any state logic
  const productCount = 0; // Replace this with dynamic value in assessment

  return (
    <div className="position-absolute top-0 end-0 m-3">
      <button className="btn btn-outline-secondary">
        Products in Order: {productCount}
      </button>
    </div>
  );
};

export default OrderStatusButton;