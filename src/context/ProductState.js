import { useReducer } from 'react';
import ProductContext from './ProductContext';

export default function ProductState({ children }) {
  const initialState = {
    basket: [],
    user: null,
    shippingData: {},
    paymentMessage: '',
  };

  function reducer(state, action) {
    // console.log(state);
    switch (action.type) {
      case 'ADD_TO_BASKET':
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      case 'REMOVE_ITEM':
        const index = state.basket.findIndex(
          (basketItem) => basketItem.id === action.id
        );
        let newBasket = [...state.basket];
        if (index >= 0) {
          newBasket.splice(index, 1);
        } else {
          console.log('cant remove product');
        }
        return {
          ...state,
          basket: newBasket,
        };
      case 'SET_USER':
        return {
          ...state,
          user: action.user,
        };
      case 'EMPTY_BASKET':
        return {
          ...state,
          basket: action.basket,
          user: action.user,
        };
      case 'SET_SHIPPING_DATA':
        return {
          ...state,
          shippingData: action.shippingData,
        };
      case 'PAYMENT_MESSAGE':
        return {
          ...state,
          paymentMessage: action.paymentMessage,
        };

      default:
        return {
          state,
        };
    }
  }

  return (
    <ProductContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </ProductContext.Provider>
  );
}
