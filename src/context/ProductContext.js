import { createContext, useContext } from 'react';

const ProductContext = createContext();

export default ProductContext;

export const useStateValue = () => useContext(ProductContext);
