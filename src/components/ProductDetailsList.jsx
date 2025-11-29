import { Descriptions } from "antd";

export default function ProductDetailsList({ product }) {
  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="Title">{product.title}</Descriptions.Item>
      <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
      <Descriptions.Item label="Price">₹ {product.price}</Descriptions.Item>
      <Descriptions.Item label="Brand">{product.brand}</Descriptions.Item>
      <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
      <Descriptions.Item label="Thumbnail">
        <img src={product.thumbnail} alt="thumb" style={{ width: 150, borderRadius: 8 }} />
      </Descriptions.Item>
      <Descriptions.Item label="Start Date">{product.createdAtStart}</Descriptions.Item>
      <Descriptions.Item label="End Date">{product.createdAtEnd}</Descriptions.Item>
    </Descriptions>
  );
}
