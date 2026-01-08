import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import ProductSummaryCard from "../components/ProductSummaryCard";

export default function ConfirmProduct({ messageApi }) {
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProduct) {
      navigate("/");
    }
  }, [selectedProduct, navigate]);

  if (!selectedProduct) return null;

  const onConfirm = async () => {
    setLoading(true);
    try {
      if (selectedProduct.id) {
        await axios.put(
          `http://localhost:8080/api/products/${selectedProduct.id}`,
          selectedProduct
        );
        messageApi.success("Product updated successfully");
      } else {
        await axios.post(
          "http://localhost:8080/api/products",
          selectedProduct
        );
        messageApi.success("Product added successfully");
      }

      setSelectedProduct(null);
      navigate("/");
    } catch (err) {
      console.error(err);
      messageApi.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductSummaryCard
      product={selectedProduct}
      loading={loading}
      onBack={() => navigate(-1)}
      onConfirm={onConfirm}
    />
  );
}
