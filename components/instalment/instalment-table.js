import { Button, Space, Table, Tag } from "antd";
import moment from "moment";
import { GET_INSTALMENTS } from "./query";
import { useQuery } from "@apollo/client";
import Loading from "../common/Loading";
import { DeleteInstalmentConfirm } from "./delete-instalment-confirm";
import {
  ArrowRightOutlined,
  EditFilled,
  EditOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import withEditInstalmentModal from "../hoc/instalment/with-edit-instalment-modal";
import { useContext } from "react";
import EditInstalmentContext from "../context/instalment/edit-instalment.context";
import withInstalmentHistoriesModal from "../hoc/instalment/with-instalment-histories-modal";
import InstalmentHistoriesContext from "../context/instalment/instalment-histories.context";
import { formatCurrency, formatDDMMYYYY } from "../../helpers/common";
import { INSTALMENT_STATUS_COLOR, INSTALMENT_STATUS_LABEL } from "../common";
import sumBy from "lodash/sumBy";

const COLUMNS = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    render: (_text, record, index) => (record?.id ? <a>{index + 1}</a> : null),
  },
  {
    title: "Khách hàng",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Tiền giao khách",
    dataIndex: "totalMoney",
    key: "totalMoney",
    render: (value) => formatCurrency(value),
  },
  {
    title: "Tỷ lệ",
    dataIndex: "rate",
    render: (value) =>
      value ? (
        <p>
          10 ăn <b>{value || 0}</b>
        </p>
      ) : (
        ""
      ),
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",
    render: (_value, record) => {
      if (!record.toDate || !record.fromDate) return "";
      return (
        <div className="flex justify-around">
          <div>{formatDDMMYYYY(record?.fromDate)}</div>
          <div className="flex items-center">
            <ArrowRightOutlined />
          </div>
          <div>{formatDDMMYYYY(record?.toDate)}</div>
        </div>
      );
    },
  },
  {
    title: "Tiền đã đóng",
    dataIndex: "totalMoneyReceived",
    key: "totalMoneyReceived",
    render: (value) => formatCurrency(value),
  },
  {
    title: "Còn phải đóng",
    dataIndex: "totalMoneyCurrent",
    key: "totalMoneyCurrent",
    render: (value) => formatCurrency(value),
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
    render: (value) => {
      return value ? (
        <Tag color={INSTALMENT_STATUS_COLOR[value]} key={value}>
          {(INSTALMENT_STATUS_LABEL[value] || "")?.toUpperCase()}
        </Tag>
      ) : (
        ""
      );
    },
  },
];

const getTotals = (rows = []) => {
  return {
    customerName: "Tổng tiền",
    totalMoney: sumBy(rows, "totalMoney"),
    totalMoneyReceived: sumBy(rows, "totalMoneyReceived"),
    totalMoneyCurrent: sumBy(rows, "totalMoneyCurrent"),
  };
};

function InstalmentTable() {
  const { data, loading, error } = useQuery(GET_INSTALMENTS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  const editContext = useContext(EditInstalmentContext);
  const historiesContext = useContext(InstalmentHistoriesContext);

  const columns = COLUMNS.concat([
    {
      title: "Chức năng",
      key: "action",
      render: (_, record) =>
        record?.id ? (
          <Space size="middle">
            <Button
              icon={<SolutionOutlined />}
              title="Lịch sử  trả góp"
              onClick={() => historiesContext.openModal(record)}
              style={{ color: "#108ee9" }}
            />
            <Button
              icon={<EditFilled />}
              title="Sửa"
              onClick={() => {
                editContext.openModal(record);
              }}
              style={{ color: "#FF7000" }}
            />
            <DeleteInstalmentConfirm id={record.id} />
          </Space>
        ) : (
          ""
        ),
    },
  ]);

  const totalData = getTotals(data?.installmentContracts || []);
  const dataSource = (data?.installmentContracts || [])?.length
    ? [...data.installmentContracts, totalData]
    : [];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      bordered
      className="overflow-auto total-table"
    />
  );
}

export default withInstalmentHistoriesModal(
  withEditInstalmentModal(InstalmentTable)
);
