import { Button, Space, Table, Tag } from "antd";
import { GET_CREDITS } from "./query";
import { useQuery } from "@apollo/client";
import sumBy from "lodash/sumBy";
import {
  DeleteCreditConfirm,
} from "./delete-credit-confirm";
import Loading from "../common/Loading";
import { useContext } from "react";
import EditCreditContext from "../context/credit/edit-credit-context";
import withEditCreditModal from "../hoc/credit/with-edit-credit-modal";
import { EditFilled, SolutionOutlined } from "@ant-design/icons";
import { formatCurrency, formatDDMMYYYY } from "../../helpers/common";
import { CREDIT_STATUS_LABEL, INSTALMENT_STATUS_COLOR } from "../common";
import CreditHistoriesContext from "../context/credit/credit-histories.context";
import withCreditHistoriesModal from "../hoc/credit/with-credit-histories-modal";

const COLUMNS = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    render: (_text, record, index) => (record?.id ? <a>{index + 1}</a> : ""),
  },
  {
    title: "Khách hàng",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "VNĐ",
    dataIndex: "totalMoney",
    key: "totalMoney",
    render: (value) => formatCurrency(value),
  },
  {
    title: "Ngày vay",
    key: "fromDate",
    dataIndex: "fromDate",
    render: (value, record) =>
      value ? (
        <div className="text-center">
          <p>{formatDDMMYYYY(value)}</p>
          <p className="font-thin">({record.loanTime} ngày)</p>
        </div>
      ) : (
        ""
      ),
  },
  {
    title: "Lãi đã đóng",
    key: "interestMoneyReceived",
    dataIndex: "interestMoneyReceived",
    render: (value) => formatCurrency(value),
  },
  {
    title: "Lãi đến hôm nay",
    key: "interestToDay",
    dataIndex: "interestToDay",
    render: (value) => formatCurrency(value), // TODO UPDATE LATER
  },
  {
    title: "Tình trạng",
    key: "status",
    dataIndex: "status",
    render: (value) => {
      return value ? (
        <Tag color={INSTALMENT_STATUS_COLOR[value]} key={value}>
          {(CREDIT_STATUS_LABEL[value] || "")?.toUpperCase()}
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
    interestMoneyReceived: sumBy(rows, "interestMoneyReceived"),
    interestToDay: sumBy(rows, "interestToDay"),
  };
};

function CreditTable() {
  const { data, loading, error } = useQuery(GET_CREDITS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  const editContext = useContext(EditCreditContext);
  const historiesContext = useContext(CreditHistoriesContext);

  const columns = COLUMNS.concat([
    {
      title: "Chức năng",
      key: "action",
      render: (_, record) => (
        record?.id ? <Space size="middle">
          <Button
            icon={<SolutionOutlined />}
            title="Lịch sử  đóng tiền lãi"
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
          <DeleteCreditConfirm id={record.id} />
        </Space> : ''
      ),
    },
  ]);

  const totalData = getTotals(data?.mortgageContracts || [])
  const dataSource = (data?.mortgageContracts || [])?.length
    ? [...data.mortgageContracts, totalData]
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

export default withCreditHistoriesModal(withEditCreditModal(CreditTable));
