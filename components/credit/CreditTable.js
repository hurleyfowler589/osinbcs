import { Space, Spin, Table, Tag } from "antd";
import { GET_POLICIES } from "./query";
import { useQuery } from "@apollo/client";
import { DeleteCreditPopup } from "./DeleteCreditPopup";
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
      <Space size="middle">
        <a>Sửa</a>
        <DeleteCreditPopup />
      </Space>
    ),
  },
];

export default function CreditTable() {
  const { data, loading, error } = useQuery(GET_POLICIES);

  if (loading)
    return (
      <div className="text-center">
        <Spin size="large" />
      </div>
    );
  if (error) return `Error! ${error.message}`;

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
