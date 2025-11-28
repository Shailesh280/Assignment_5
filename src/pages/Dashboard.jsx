import React from "react";
import { Row, Col, Card } from "antd";
import DateFilter from "../components/DateFilter";
import ProductTable from "../components/ProductTable";

export default function Dashboard() {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <h2 style={{ margin: 0 }}>Dashboard</h2>
            <p style={{ marginTop: 8, color: "#666" }}>Use the date range, search and add products. New product submission redirects to confirmation page.</p>
          </Card>
        </Col>

        <Col span={24}>
          <DateFilter />
        </Col>

        <Col span={24}>
          <ProductTable />
        </Col>
      </Row>
    </>
  );
}
