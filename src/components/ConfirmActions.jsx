import { Button } from "antd";
import { useProductContext } from "../context/ProductContext";

export default function ConfirmActions({ loading, onBack, onConfirm }) {
  const { selectedProduct } = useProductContext();

  const confirmText = selectedProduct?.id
    ? "Update"
    : "Create";

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <Button onClick={onBack}>Back</Button>
      <Button type="primary" loading={loading} onClick={onConfirm}>
        {confirmText}
      </Button>
    </div>
  );
}
