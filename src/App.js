import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, message } from "antd";
import Dashboard from "./pages/Dashboard";
import ConfirmProduct from "./pages/ConfirmProduct";
import AppHeader from "./components/Header";

const { Content } = Layout;

export default function App() {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder} 
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />
        <Content style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
          <Routes>
            <Route path="/" element={<Dashboard messageApi={messageApi} />} />
            <Route path="/confirm" element={<ConfirmProduct messageApi={messageApi} />} />
          </Routes>
        </Content>
      </Layout>
    </>
  );
}
