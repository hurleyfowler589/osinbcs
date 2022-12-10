import { Space, Table, Tag } from "antd";
import { GET_INSTALMENTS, GET_POLICIES } from "./query";
import { useQuery } from "@apollo/client";
import Loading from "../common/Loading";
import { DeleteInstalmentConfirm } from "./delete-instalment-confirm";
import { EditOutlined, SolutionOutlined } from "@ant-design/icons";
import withEditInstalmentModal from "../hoc/instalment/with-edit-instalment-modal";
import { useContext } from "react";
import EditInstalmentContext from "../context/instalment/edit-instalment.context";
import withInstalmentHistoriesModal from "../hoc/instalment/with-instalment-histories-modal";
import InstalmentHistoriesContext from "../context/instalment/instalment-histories.context";
const COLUMNS = [
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
    key: "test",
  },
];

function InstalmentTable() {
  const { data, loading, error } = useQuery(GET_INSTALMENTS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  const countries = data.countries;
  
  const editContext = useContext(EditInstalmentContext);
  const historiesContext = useContext(InstalmentHistoriesContext);

  const columns = COLUMNS.concat([
    {
      title: "Chức năng",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <SolutionOutlined
            style={{ fontSize: "18px" }}
            title="Lịch sử  trả góp"
            onClick={() => historiesContext.openModal(record)}
          />
          <EditOutlined
            onClick={() => {
              editContext.openModal({
                id: 1,
                customerName: "thanh",
                customerPhone: "983234234",
                note: "sfsdfdf",
              });
            }}
            title="Sửa"
            style={{ fontSize: "18px" }}
          />
          <DeleteInstalmentConfirm id={record.id} />
        </Space>
      ),
    },
  ]);

  return (
    <Table
      columns={columns}
      dataSource={countries}
      bordered
      className="overflow-auto"
    />
  );
}

export default withInstalmentHistoriesModal(
  withEditInstalmentModal(InstalmentTable)
);
