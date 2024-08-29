import React, { createContext, useState } from "react";

export const ProductsContext = createContext();

// Create a provider component
export const ProductsContextProvider = ({ children }) => {
  // This is for the list of products for comparison
  const [comparableProducts, setComparableProducts] = useState([]);
  const [theme, setTheme] = useState("light");

  return (
    <ProductsContext.Provider
      value={{ comparableProducts, setComparableProducts, theme, setTheme }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
