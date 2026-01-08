import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    startDate: null,
    endDate: null,
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <ProductContext.Provider
      value={{
        filters,
        setFilters,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}
