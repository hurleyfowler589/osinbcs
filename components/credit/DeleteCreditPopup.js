import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

export function DeleteCreditPopup() {
  return (
    <Popconfirm
      title="Xóa hợp đồng？"
      okText="Ok"
      cancelText="Đóng"
      placement="topLeft"
      onConfirm={() => {}}
    >
      <DeleteOutlined
        title="Xóa"
        style={{ fontSize: "18px" }}
        className="text-red-500"
      />
    </Popconfirm>
  );
}
