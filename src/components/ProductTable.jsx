import React, { useEffect, useState } from "react";
import { Table, Input, Select, Space, Card, Button, message } from "antd";
import axios from "axios";
import { useProductContext } from "../context/ProductContext";
import ProductModal from "./ProductModal";

const { Search } = Input;
const { Option } = Select;

export default function ProductTable() {
  const { filters, setFilters, setSelectedProduct, extraProducts } = useProductContext();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    setInitialized(true);
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!initialized) return;
    fetchProducts();
  }, [filters.search, filters.category, extraProducts, initialized]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const limit = 100;
      const res = await axios.get(`https://dummyjson.com/products?limit=${limit}`);
      const apiProducts = res.data.products || [];

      let finalExtras = extraProducts;
      let finalAPI = apiProducts;

      if (filters.search && filters.search.trim().length > 0) {
        const keyword = filters.search.trim().toLowerCase();

        finalExtras = extraProducts.filter((p) =>
          p.title.toLowerCase().includes(keyword)
        );

        finalAPI = apiProducts.filter((p) =>
          p.title.toLowerCase().includes(keyword)
        );
      }

      let finalProducts = [...finalExtras, ...finalAPI];

      if (filters.category && filters.category !== "all") {
        finalProducts = finalProducts.filter(
          (p) => p.category === filters.category
        );
      }

      setProducts(finalProducts);
      setPagination((p) => ({ ...p, total: finalProducts.length }));
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
      setCategories(res.data || []);
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
          style={{ width: 64, height: 48, objectFit: "cover", borderRadius: 6 }}
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
                <Option value={c} key={c}>
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
        pagination={pagination}
        onChange={handleTableChange}
      />

      <ProductModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
