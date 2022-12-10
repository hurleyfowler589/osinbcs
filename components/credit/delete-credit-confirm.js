import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { DELETE_CREDIT, GET_CREDITS, } from "./query";
import { handleResponse } from "../../helpers/common";

export function DeleteCreditConfirm({ id }) {
  const [removeInstalment] = useMutation(DELETE_CREDIT, handleResponse({ successMsg: "Xóa hợp đồng thành công"}));

  const onConfirm = () => {
    if (!id) return;
    removeInstalment({
      variables: {
        removeMortgageContractId: id,
      },
      refetchQueries: [
        {
          query: GET_CREDITS,
        },
      ],
    });
  };

  return (
    <Popconfirm
      title="Xóa hợp đồng？"
      okText="Ok"
      cancelText="Đóng"
      placement="topLeft"
      onConfirm={onConfirm}
    >
      <DeleteOutlined
        title="Xóa"
        style={{ fontSize: "18px" }}
        className="text-red-500"
      />
    </Popconfirm>
  );
}
