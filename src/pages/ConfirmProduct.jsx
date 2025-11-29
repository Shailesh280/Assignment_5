import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import ProductSummaryCard from "../components/ProductSummaryCard";

export default function ConfirmProduct() {
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!selectedProduct) {
    navigate("/");
    return null;
  }

  const onConfirm = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://dummyjson.com/products/add", selectedProduct);
      message.success("Product created successfully! Fake id: " + res.data.id);
      setSelectedProduct(null);
      navigate("/");
    } catch {
      message.error("Failed to create product");
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
