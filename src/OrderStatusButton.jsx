import React, {useContext} from 'react';
import {CartContext} from './cart/cartContext';

// OrderStatusButton component
const OrderStatusButton = ( {onClick} ) => {
  const cart = useContext(CartContext);

  return (
    <div className="position-absolute top-0 end-0 m-3">
      <button onClick={onClick} className="btn btn-outline-secondary">
        Products in Order: {cart.length}
      </button>
    </div>
  );
};

export default OrderStatusButton;