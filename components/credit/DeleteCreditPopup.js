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
      <a href="#">Xóa</a>
    </Popconfirm>
  );
}
