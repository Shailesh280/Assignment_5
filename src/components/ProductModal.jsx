import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

export default function ProductModal({ open, onClose }) {
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedProduct) {
      form.setFieldsValue({
        title: selectedProduct.title,
        description: selectedProduct.description,
        price: selectedProduct.price,
        brand: selectedProduct.brand,
        category: selectedProduct.category,
        thumbnail: selectedProduct.thumbnail,
      });
    } else {
      form.resetFields();
    }
  }, [selectedProduct, form, open]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const productPayload = selectedProduct
        ? {
            ...selectedProduct, 
            ...values,          
          }
        : {
            ...values,
          };

      setSelectedProduct(productPayload);
      onClose();
      navigate("/confirm");
    } catch {
      message.error("Please fill all required fields.");
    }
  };

  return (
    <Modal
      title={selectedProduct ? "Edit Product" : "Add New Product"}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Continue
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Product Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Enter product title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={3} placeholder="Short description" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Enter price"
          />
        </Form.Item>

        <Form.Item name="brand" label="Brand">
          <Input placeholder="Enter brand" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter category" />
        </Form.Item>

        <Form.Item
          name="thumbnail"
          label="Thumbnail URL"
          rules={[{ required: true }]}
        >
          <Input placeholder="https://image-url.jpg" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
