import { Space, Table, Tag } from "antd";
import moment from "moment";
import { GET_INSTALMENTS } from "./query";
import { useQuery } from "@apollo/client";
import Loading from "../common/Loading";
import { DeleteInstalmentConfirm } from "./delete-instalment-confirm";
import { EditOutlined, SolutionOutlined } from "@ant-design/icons";
import withEditInstalmentModal from "../hoc/instalment/with-edit-instalment-modal";
import { useContext } from "react";
import EditInstalmentContext from "../context/instalment/edit-instalment.context";
import withInstalmentHistoriesModal from "../hoc/instalment/with-instalment-histories-modal";
import InstalmentHistoriesContext from "../context/instalment/instalment-histories.context";
import { formatCurrency, formatDDMMYYYY } from "../../helpers/common";
import { INSTALMENT_STATUS_COLOR, INSTALMENT_STATUS_LABEL } from "../common";

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
    title: "Tiền giao khách",
    dataIndex: "totalMoney",
    key: "totalMoney",
    render: (value) => formatCurrency(value),
  },
  {
    title: "Tỷ lệ",
    dataIndex: "rate",
    render: (value) => (
      <p>
        10 ăn <b>{value || 0}</b>
      </p>
    ),
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",
    render: (_value, record) => {
      if (!record.toDate || !record.fromDate) return "";
      const { fromDate, toDate } = record;
      return (
        <div className="text-center">
          <p>
            {formatDDMMYYYY(fromDate)} -{">"} {formatDDMMYYYY(toDate)}
          </p>
          <p>({moment(toDate).diff(moment(fromDate), "day")} Ngày)</p>
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
      return (
        <Tag color={INSTALMENT_STATUS_COLOR[value]} key={value}>
          {INSTALMENT_STATUS_LABEL[value].toUpperCase()}
        </Tag>
      )
    }
  },
  {
    title: "Ngày phải đóng",
    dataIndex: "loanTime",
    key: "loanTime",
    render: (value) => formatDDMMYYYY(value)
  },
];

function InstalmentTable() {
  const { data, loading, error } = useQuery(GET_INSTALMENTS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  const countries = data.installmentContracts;

  const editContext = useContext(EditInstalmentContext);
  const historiesContext = useContext(InstalmentHistoriesContext);

  const columns = COLUMNS.concat([
    {
      title: "Chức năng",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <SolutionOutlined
            style={{ fontSize: "18px"}}
            title="Lịch sử  trả góp"
            onClick={() => historiesContext.openModal(record)}
          />
          <EditOutlined
            onClick={() => {
              editContext.openModal(record);
            }}
            title="Sửa"
            style={{ fontSize: "18px", color: 'orange' }}
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
