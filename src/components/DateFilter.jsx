import React, { useEffect } from "react";
import { Card, DatePicker } from "antd";
import dayjs from "dayjs";
import { useProductContext } from "../context/ProductContext";

export default function DateFilter() {
  const { filters, setFilters } = useProductContext();

  useEffect(() => {
    // Set default range ONLY if missing
    if (!filters.startDate || !filters.endDate) {
      const end = dayjs();
      const start = end.subtract(7, "day");
      setFilters(prev => ({ ...prev, startDate: start, endDate: end }));
    }
  }, [filters, setFilters]);

  const handleStartChange = (date) => {
    setFilters(prev => ({ ...prev, startDate: date }));
  };

  const handleEndChange = (date) => {
    setFilters(prev => ({ ...prev, endDate: date }));
  };

  const disableStartDate = (current) => {
    const { endDate } = filters;
    const today = dayjs().endOf("day");
    return (
      current &&
      (current > today || (endDate && current > endDate))
    );
  };

  const disableEndDate = (current) => {
    const { startDate } = filters;
    const today = dayjs().endOf("day");
    return (
      current &&
      (current > today || (startDate && current < startDate))
    );
  };

  return (
    <Card style={{ marginBottom: 16, borderRadius: 12, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        
        {/* LEFT SIDE */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
          <strong>Date Range:</strong>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#fff",
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid #e3e3e3",
            width: "fit-content"
          }}>
            <DatePicker
              value={filters.startDate}
              onChange={handleStartChange}
              disabledDate={disableStartDate}
              allowClear
              style={{ border: "none", boxShadow: "none" }}
            />
            <span style={{ fontSize: 16, color: "#888" }}>→</span>
            <DatePicker
              value={filters.endDate}
              onChange={handleEndChange}
              disabledDate={disableEndDate}
              allowClear
              style={{ border: "none", boxShadow: "none" }}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={{ textAlign: "right", color: "#777", lineHeight: 1.6 }}>
          <div>Chosen start: {filters.startDate ? filters.startDate.format("YYYY-MM-DD") : "-"}</div>
          <div>Chosen end: {filters.endDate ? filters.endDate.format("YYYY-MM-DD") : "-"}</div>
        </div>
      </div>
    </Card>
  );
}
