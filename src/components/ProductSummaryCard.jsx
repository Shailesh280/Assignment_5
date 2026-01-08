import { Card, Divider } from "antd";
import ProductDetailsList from "./ProductDetailsList";
import ConfirmActions from "./ConfirmActions";
import "../App.css"; 

export default function ProductSummaryCard({
  product,
  loading,
  onBack,
  onConfirm,
}) {
  return (
    <div className="confirm-page">
      <Card
        title="Confirm Product Details"
        className="confirm-card"
      >
        <ProductDetailsList product={product} />

        <Divider />

        <div className="confirm-actions">
          <ConfirmActions
            loading={loading}
            onBack={onBack}
            onConfirm={onConfirm}
          />
        </div>
      </Card>
    </div>
  );
}
