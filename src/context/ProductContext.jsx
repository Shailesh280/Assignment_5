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

  const value = {
    filters,
    setFilters,
    selectedProduct,
    setSelectedProduct,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProductContext() {
  return useContext(ProductContext);
}
