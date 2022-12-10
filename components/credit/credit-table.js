import { Button, Space, Spin, Table, Tag } from "antd";
import { GET_CREDITS } from "./query";
import { useQuery } from "@apollo/client";
import {
  DeleteCreditConfirm,
  DeleteCreditPopup,
} from "./delete-credit-confirm";
import Loading from "../common/Loading";
import { useContext } from "react";
import EditCreditContext from "../context/credit/edit-credit-context";
import withEditCreditModal from "../hoc/credit/with-edit-credit-modal";
import { EditOutlined, SolutionOutlined } from "@ant-design/icons";
import { formatCurrency, formatDDMMYYYY } from "../../helpers/common";
import { CREDIT_STATUS_LABEL, INSTALMENT_STATUS_COLOR } from "../common";
import CreditHistoriesContext from "../context/credit/credit-histories.context";
import withCreditHistoriesModal from "../hoc/credit/with-credit-histories-modal";

const COLUMNS = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    render: (_text, _record, index) => <a>{index + 1}</a>,
  },
  {
    title: "Khách hàng",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Tài sản",
    dataIndex: "totalMoney",
    key: "totalMoney",
    render: (value) => formatCurrency(value),
  },
  {
    title: "Ngày vay",
    key: "fromDate",
    dataIndex: "fromDate",
    render: (value, record) => (
      <div className="text-center">
        <p>{formatDDMMYYYY(value)}</p>
        <p className="font-thin">({record.loanTime} ngày)</p>
      </div>
    ),
  },
  {
    title: "Lãi đã đóng",
    key: "interestMoneyReceived",
    dataIndex: "interestMoneyReceived",
    render: (value) => formatCurrency(value),
  },
  {
    title: "Tình trạng",
    key: "status",
    dataIndex: "status",
    render: (value) => {
      return (
        <Tag color={INSTALMENT_STATUS_COLOR[value]} key={value}>
          {(CREDIT_STATUS_LABEL[value] || "")?.toUpperCase()}
        </Tag>
      );
    },
  },
];

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
        <Space size="middle">
          <SolutionOutlined
            style={{ fontSize: "18px" }}
            title="Lịch sử  trả góp"
            onClick={() => historiesContext.openModal(record)}
          />
          <EditOutlined
            onClick={() => {
              editContext.openModal(record);
            }}
            title="Sửa"
            style={{ fontSize: "18px", color: "orange" }}
          />
          <DeleteCreditConfirm id={record.id} />
        </Space>
      ),
    },
  ]);

  return (
    <Table
      columns={columns}
      dataSource={data?.mortgageContracts || []}
      bordered
      className="overflow-auto"
    />
  );
}

export default withCreditHistoriesModal(withEditCreditModal(CreditTable));
