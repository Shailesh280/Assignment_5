import React, { useState } from "react";
import { Card, Descriptions, Button, message, Divider } from "antd";
import { useProductContext } from "../context/ProductContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ConfirmProduct() {
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!selectedProduct) {
    return (
      <Card>
        <h3>No product to confirm</h3>
        <p>Please add a product first from the Dashboard.</p>
        <Button type="primary" onClick={() => navigate("/")}>
          Go to Dashboard
        </Button>
      </Card>
    );
  }

  const onConfirm = async () => {
    setLoading(true);
    try {
      const payload = {
        title: selectedProduct.title,
        description: selectedProduct.description,
        price: selectedProduct.price,
        brand: selectedProduct.brand,
        category: selectedProduct.category,
        thumbnail: selectedProduct.thumbnail,
        createdAtStart: selectedProduct.createdAtStart,
        createdAtEnd: selectedProduct.createdAtEnd,
      };

      const res = await axios.post("https://dummyjson.com/products/add", payload);

      message.success("Product created successfully! Fake id: " + res.data.id);
      setSelectedProduct(null);
      navigate("/");
    } catch (err) {
      console.error(err);
      message.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Confirm Product Details"
      style={{ borderRadius: 12, boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Title">{selectedProduct.title}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {selectedProduct.description}
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          ₹ {selectedProduct.price}
        </Descriptions.Item>
        <Descriptions.Item label="Brand">{selectedProduct.brand}</Descriptions.Item>
        <Descriptions.Item label="Category">{selectedProduct.category}</Descriptions.Item>

        <Descriptions.Item label="Thumbnail">
          <img
            src={selectedProduct.thumbnail}
            alt="thumb"
            style={{ width: 150, borderRadius: 8 }}
          />
        </Descriptions.Item>

        <Descriptions.Item label="Start Date">
          {selectedProduct.createdAtStart}
        </Descriptions.Item>
        <Descriptions.Item label="End Date">
          {selectedProduct.createdAtEnd}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <div style={{ display: "flex", gap: 12 }}>
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Button type="primary" loading={loading} onClick={onConfirm}>
          Confirm & Create
        </Button>
      </div>
    </Card>
  );
}
