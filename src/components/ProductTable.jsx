import React, { useEffect, useState } from "react";
import { Table, Input, Select, Space, Card, Button, message } from "antd";
import axios from "axios";
import { useProductContext } from "../context/ProductContext";
import ProductModal from "./ProductModal";

const { Search } = Input;
const { Option } = Select;

export default function ProductTable() {
  const { filters, setFilters, setSelectedProduct } = useProductContext();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8 });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters.search, filters.category, filters.startDate, filters.endDate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};

      if (filters.search) {
        params.search = filters.search;
      }

      if (filters.category && filters.category !== "all") {
        params.category = filters.category;
      }

      if (filters.startDate && filters.endDate) {
        params.startDate = filters.startDate.format("YYYY-MM-DD");
        params.endDate = filters.endDate.format("YYYY-MM-DD");
      }

      const res = await axios.get(
        "http://localhost:8080/api/products",
        { params }
      );

      setProducts(res.data);
      setPagination((p) => ({ ...p, total: res.data.length }));
    } catch (err) {
      console.error(err);
      message.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/products/categories"
      );
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load categories");
    }
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (val) => (
        <img
          src={val}
          alt="thumb"
          style={{
            width: 64,
            height: 48,
            objectFit: "cover",
            borderRadius: 6,
          }}
        />
      ),
    },
    { title: "Title", dataIndex: "title" },
    { title: "Price", dataIndex: "price", render: (v) => `₹ ${v}` },
    { title: "Brand", dataIndex: "brand" },
    { title: "Category", dataIndex: "category" },
    {
      title: "Action",
      render: (_, record) => (
        <Button
          size="small"
          onClick={() => {
            setSelectedProduct(record); 
            setOpenModal(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Space>
            <Search
              placeholder="Search products"
              onSearch={(v) =>
                setFilters((p) => ({ ...p, search: v }))
              }
              enterButton
              allowClear
            />

            <Select
              value={filters.category || "all"}
              onChange={(val) =>
                setFilters((p) => ({ ...p, category: val }))
              }
              style={{ width: 200 }}
            >
              <Option value="all">All Categories</Option>
              {categories.map((c) => (
                <Option key={c} value={c}>
                  {c}
                </Option>
              ))}
            </Select>
          </Space>

          <Button
            type="primary"
            onClick={() => {
              setSelectedProduct(null);
              setOpenModal(true);
            }}
          >
            + Add New Product
          </Button>
        </Space>
      </Card>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={products}
        columns={columns}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: products.length,
          showSizeChanger: false
        }}
        onChange={(pag) => {
          setPagination(pag);
        }}
      />


      <ProductModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
