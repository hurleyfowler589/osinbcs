import { useContext } from "react";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import AddToastContext from "../context/add-toast.context";
import { DELETE_INSTALMENT, GET_INSTALMENTS } from "./query";

export function DeleteInstalmentConfirm({ id }) {
  const addToast = useContext(AddToastContext);

  const [removeInstalment] = useMutation(DELETE_INSTALMENT, {
    onCompleted: (d) => d && addToast.success(),
    onError: (e) => e && addToast.error(),
  });

  const onConfirm = () => {
    if (id) return;
    removeInstalment({
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: GET_INSTALMENTS,
          // TODO ADD VARIABLE HERE
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
