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
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters.search, filters.category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const limit = 100;
      let url = `https://dummyjson.com/products?limit=${limit}`;

      if (filters.search && filters.search.trim().length > 0) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
          filters.search
        )}&limit=${limit}`;
      }

      const res = await axios.get(url);
      let list = res.data.products || [];

      if (filters.category && filters.category !== "all") {
        list = list.filter((p) => p.category === filters.category);
      }

      setProducts(list);
      setPagination((p) => ({ ...p, total: list.length }));
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products/categories");

      const formatted = res.data?.map((c) => ({
        slug: c.slug,
        name: c.name,
        url: c.url,
      })) || [];

      setCategories(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const onSearch = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
    setPagination((p) => ({ ...p, current: 1 }));
  };

  const handleTableChange = (pag) => {
    setPagination(pag);
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 100,
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
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (val) => `₹ ${val}`,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (slug) => categories.find((c) => c.slug === slug)?.name || slug,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            onClick={() => {
              setSelectedProduct(record);
              setOpenModal(true);
            }}
          >
            Edit
          </Button>
        </Space>
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
              onSearch={onSearch}
              enterButton
              allowClear
            />

            <Select
              value={filters.category || "all"}
              onChange={(val) => setFilters((prev) => ({ ...prev, category: val }))}
              style={{ width: 200 }}
            >
              <Option value="all">All Categories</Option>

              {categories.map((c) => (
                <Option value={c.slug} key={c.slug}>
                  {c.name}
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
        pagination={pagination}
        onChange={handleTableChange}
      />

      <ProductModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
