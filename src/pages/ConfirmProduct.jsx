import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import ProductSummaryCard from "../components/ProductSummaryCard";

export default function ConfirmProduct({ messageApi }) {
  const { selectedProduct, setSelectedProduct, addProductToList } = useProductContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProduct) navigate("/");
  }, [selectedProduct, navigate]);

  const onConfirm = async () => {
    if (!selectedProduct) return;

    setLoading(true);
    try {
      const res = await axios.post("https://dummyjson.com/products/add", selectedProduct);
      addProductToList(res.data);

      messageApi.open({
        type: "success",
        content: `Product created successfully! ID: ${res.data.id}`,
        duration: 2,
      });

      setSelectedProduct(null);

      setTimeout(() => {
        navigate("/");
      }, 400);

    } catch {
      messageApi.open({
        type: "error",
        content: "Failed to create product",
      });
    } finally {
      setLoading(false);
    }
  };

  const onBack = () => {
    setSelectedProduct(null);
    navigate("/");
  };

  return (
    selectedProduct && (
      <ProductSummaryCard
        product={selectedProduct}
        loading={loading}
        onBack={onBack}
        onConfirm={onConfirm}
      />
    )
  );
}
