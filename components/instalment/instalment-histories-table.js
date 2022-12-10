import { useMutation } from "@apollo/client";
import { Table } from "antd";
import { useContext } from "react";
import { formatCurrency, formatDDMMYYYY } from "../../helpers/common";
import AddToastContext from "../context/add-toast.context";
import { MAKE_PAYMENT } from "./query";

function InstalmentHistoriesTable({ data }) {
  const addToast = useContext(AddToastContext);

  const [makePayment] = useMutation(MAKE_PAYMENT, {
    onCompleted: (d) => {
      if (d) {
        addToast.success();
      }
    },
    onError: (e) => {
      console.log(e);
      addToast.error();
    },
  });

  const checkedInstalment = (record) => {
    if (!record) return;

    makePayment({
      variables: {
        id: record?.id,
        isDone: !record.isDone,
      },
    });
  };

  const columns = [
    {
      title: "STT",
      key: "id",
      render: (_text, _record, index) => index,
    },
    {
      title: "Ngày",
      key: "date",
      render: (_, record) => {
        return (
          <div>
            <div>{formatDDMMYYYY(record?.fromDate)}</div>
            <div>
              <ArrowRightOutlined />
            </div>
            <div>{formatDDMMYYYY(record?.toDate)}</div>
          </div>
        );
      },
    },
    {
      title: "Tiền họ",
      key: "payMoney",
      render: (value) => formatCurrency(value),
    },
    {
      title: "Ngày giao dịch",
      key: "payDate",
      render: (value) => formatDDMMYYYY(value),
    },
    {
      title: "Đã trả",
      key: "isDone",
      render: (value, record) => {
        return (
          <Checkbox
            checked={value}
            onChange={() => checkedInstalment(record)}
          />
        );
      },
    },
    {
      title: "Ghi chú",
      note: "note",
      render: (text, record, index) => {},
    },
  ];

  return (
    <>
      <div className="text-center text-lg font-bold mt-6 mb-2 text-i">Lịch sử đóng tiền</div>
      <Table
        columns={columns}
        dataSource={data || []}
        bordered
        className="overflow-auto"
      />
    </>
  );
}

export default InstalmentHistoriesTable;
