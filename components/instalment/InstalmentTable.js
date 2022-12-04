import React from "react";
import { Space, Table, Tag } from "antd";
import { GET_POLICIES } from "./query";
import { useQuery } from "@apollo/client";
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
    title: "Tiền giao khách",
    dataIndex: "tienGiaoKhach",
    key: "tienGiaoKhach",
  },
  {
    title: "Tỷ lệ",
    key: "tyLe",
    dataIndex: "tyLe",
  },
  {
    title: "Thời gian",
    key: "action",
  },
  {
    title: "Tiền đã đóng",
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
    title: "Còn phải đóng",
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
    title: "Ngày phải đóng",
    key: "action",
  },
  {
    title: "Chức năng",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Sửa</a>
        <a>Xóa</a>
      </Space>
    ),
  },
];

export default function InstalmentTable() {
  const { data, loading, error } = useQuery(GET_POLICIES);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const countries = data.countries;


  return <Table columns={columns} dataSource={countries} bordered />;
}
