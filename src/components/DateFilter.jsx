import React, { useEffect } from "react";
import { Card, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { useProductContext } from "../context/ProductContext";

const { RangePicker } = DatePicker;

export default function DateFilter() {
  const { filters, setFilters } = useProductContext();

  useEffect(() => {
    if (!filters.startDate && !filters.endDate) {
      const end = dayjs();
      const start = end.subtract(7, "day");
      setFilters(prev => ({ ...prev, startDate: start, endDate: end }));
    }
  }, []);

  const onRangeChange = (dates) => {
    if (!dates) {
      setFilters(prev => ({ ...prev, startDate: null, endDate: null }));
      return;
    }
    const [start, end] = dates;
    setFilters(prev => ({ ...prev, startDate: start, endDate: end }));
  };

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <strong>Date Range:</strong>
            <div style={{ marginTop: 8 }}>
              <RangePicker
                value={filters.startDate && filters.endDate ? [filters.startDate, filters.endDate] : []}
                onChange={onRangeChange}
                disabledDate={disabledDate}
                allowClear={false}
              />
            </div>
          </div>
          <div style={{ color: "#888" }}>
            <div>Chosen start: {filters.startDate ? filters.startDate.format("YYYY-MM-DD") : "-"}</div>
            <div>Chosen end: {filters.endDate ? filters.endDate.format("YYYY-MM-DD") : "-"}</div>
          </div>
        </div>
      </Space>
    </Card>
  );
}
