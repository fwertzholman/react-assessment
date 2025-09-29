import { createContext } from 'react';

export const CartContext = createContext([]);
export const CartDispatchContext = createContext(null);

export function cartReducer(cart, action) {
  switch (action.type) {
    case 'add': {
      return [...cart, action.product];
    }
    case 'remove': {
      return cart.filter(t => t.sku !== action.sku);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}