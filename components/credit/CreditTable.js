import { Button, Space, Spin, Table, Tag } from "antd";
import { GET_POLICIES } from "./query";
import { useQuery } from "@apollo/client";
import { DeleteCreditPopup } from "./DeleteCreditPopup";
import Loading from "../common/Loading";
import { useContext } from "react";
import EditCreditContext from "../context/credit/edit-credit-context";
import withEditCreditModal from "../hoc/with-edit-credit-modal";
import { EditOutlined } from "@ant-design/icons";

function CreditTable() {
  const { data, loading, error } = useQuery(GET_POLICIES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  const editCreditContext = useContext(EditCreditContext);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Khách hàng",
      dataIndex: "khachHang",
      key: "khachHang",
    },
    {
      title: "Tài sản",
      dataIndex: "tienGiaoKhach",
      key: "tienGiaoKhach",
    },
    {
      title: "VNĐ",
      key: "tyLe",
      dataIndex: "tyLe",
    },
    {
      title: "Ngày vay",
      key: "action",
    },
    {
      title: "Lãi đã đóng",
      key: "action",
    },
    {
      title: "Nợ cũ",
      key: "action",
    },
    {
      title: "Tiền 1 ngày",
      key: "action",
    },
    {
      title: "Lãi đến hôm nay",
      key: "action",
    },
    {
      title: "Ngày phải đóng",
      key: "action",
    },
    {
      title: "Tình trạng",
      key: "action",
      render: (_, { countries = [] }) => (
        <>
          {countries.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Chức năng",
      key: "action",
      render: (_, record) => (
        <Space size="large">
          <EditOutlined
            onClick={() => editCreditContext.openModal()}
            title="Sửa"
            style={{ fontSize: '18px'}}
          />
          <DeleteCreditPopup />
        </Space>
      ),
    },
  ];

  const countries = data.countries;

  return (
    <Table
      columns={columns}
      dataSource={countries}
      bordered
      className="overflow-auto"
    />
  );
}

export default withEditCreditModal(CreditTable);
