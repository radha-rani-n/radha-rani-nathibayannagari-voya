import { CloseCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { PresetColorType } from "antd/es/_util/colors";
import { LiteralUnion } from "antd/es/_util/type";

const CustomTag = ({
  tagName,
  color,
  onClose,
}: {
  tagName: string;
  color:
    | LiteralUnion<
        | PresetColorType
        | "success"
        | "processing"
        | "error"
        | "default"
        | "warning"
      >
    | undefined;
  onClose: () => void;
}) => (
  <Tag closeIcon={<CloseCircleOutlined />} color={color} onClose={onClose}>
    {tagName}
  </Tag>
);

export default CustomTag;
