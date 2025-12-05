import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    search: "",
    category: "all",
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [extraProducts, setExtraProducts] = useState([]);

  const addProductToList = (product) => {
    setExtraProducts((prev) => [product, ...prev]); 
  };

  const value = {
    filters,
    setFilters,
    selectedProduct,
    setSelectedProduct,
    extraProducts,
    addProductToList,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProductContext() {
  return useContext(ProductContext);
}
