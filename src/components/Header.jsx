import React from "react";
import logo from "../logo.png"; // make sure PMD logo is placed here
import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

export default function AppHeader() {
  return (
    <Header
      style={{
        background:
          "linear-gradient(90deg, #6A3D91, #7955A9, #876AB0, #B8B7FF, #4964E0, #22277A)",
        padding: "12px 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
            background: "rgba(255,255,255,0.18)",
            padding: 6,
            backdropFilter: "blur(4px)",
          }}
        />
        <Title level={3} style={{ margin: 0, color: "#2F6FDF", fontWeight: 600 }}>
          Product Management Dashboard
        </Title>
      </div>
    </Header>
  );
}
