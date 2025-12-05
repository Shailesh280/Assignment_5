import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, message, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function ProductModal({ open, onClose }) {
  const { selectedProduct, setSelectedProduct, filters } = useProductContext();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products/categories");
      const formatted = res.data.map((c) => ({
        slug: c.slug,
        name: c.name,
      }));
      setCategories(formatted);
    } catch (err) {
      console.error("Category fetch error", err);
    }
  };

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

      const productPayload = {
        ...values,
        createdAtStart: filters.startDate?.format("YYYY-MM-DD") || null,
        createdAtEnd: filters.endDate?.format("YYYY-MM-DD") || null,
      };

      setSelectedProduct(productPayload);
      onClose();
      navigate("/confirm");
    } catch (err) {
      message.error("Please fill all required fields.");}
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
          <InputNumber min={0} style={{ width: "100%" }} placeholder="Enter price" />
        </Form.Item>

        <Form.Item
          name="brand"
          label="Brand"
        >
          <Input placeholder="Enter brand" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select category">
            {categories.map((c) => (
              <Option key={c.slug} value={c.slug}>
                {c.name}
              </Option>
            ))}
          </Select>
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
