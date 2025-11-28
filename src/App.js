import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Dashboard from "./pages/Dashboard";
import ConfirmProduct from "./pages/ConfirmProduct";
import AppHeader from "./components/Header";

const { Content } = Layout;

export default function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Content style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/confirm" element={<ConfirmProduct />} />
        </Routes>
      </Content>
    </Layout>
  );
}
