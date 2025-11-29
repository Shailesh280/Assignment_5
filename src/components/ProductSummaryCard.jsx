import { Card, Divider } from "antd";
import ProductDetailsList from "./ProductDetailsList";
import ConfirmActions from "./ConfirmActions";

export default function ProductSummaryCard({ product, loading, onBack, onConfirm }) {
  return (
    <Card
      title="Confirm Product Details"
      style={{ borderRadius: 12, boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}
    >
      <ProductDetailsList product={product} />
      <Divider />
      <ConfirmActions loading={loading} onBack={onBack} onConfirm={onConfirm} />
    </Card>
  );
}
