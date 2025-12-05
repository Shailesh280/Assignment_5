import React from "react";
import logo from "../logo.png"; 
import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

export default function AppHeader() {
  return (
    <Header
      style={{
        padding: "12px 24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          alt="logo"
          src={logo}
          style={{
            width: 42,
            height: 42,
            marginRight: 14,
            borderRadius: 8,
            padding: 6,
            backdropFilter: "blur(4px)",
          }}
        />
        <Title level={3} style={{ margin: 0, color: "#2F6FDF", fontWeight: 700 }}>
          Product Management Dashboard
        </Title>
      </div>
    </Header>
  );
}
