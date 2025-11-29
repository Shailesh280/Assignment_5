import { Button } from "antd";

export default function ConfirmActions({ loading, onBack, onConfirm }) {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <Button onClick={onBack}>Back</Button>
      <Button type="primary" loading={loading} onClick={onConfirm}>
        Confirm & Create
      </Button>
    </div>
  );
}
