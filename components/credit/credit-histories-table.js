import {
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Checkbox, Input, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import {
  formatCurrency,
  formatDDMMYYYY,
  handleResponse,
} from "../../helpers/common";
import {
  GET_CREDITS,
  MAKE_PAYMENT,
} from "./query";

function CreditHistoriesTable({ detail }) {
  const [dataSource, setDataSource] = useState(
    detail?.mortgageContractSchedule || []
  );

  const [makePayment] = useMutation(
    MAKE_PAYMENT,
    handleResponse({
      onSuccess: (d) => {
        setDataSource(
          dataSource.map((item) => {
            if (item?.id === d.makeMortgagePayments?.id) {
              const newItem = {
                ...item,
                isDone: d.makeMortgagePayments.isDone,
              };
              return newItem;
            }
            return item;
          })
        );
      },
    })
  );

  const checkedInstalment = (record) => {
    if (!record) return;

    makePayment({
      variables: {
        makePaymentInput: {
          id: record?.id,
          isDone: !record.isDone,
        },
      },
      refetchQueries: [
        {
          query: GET_CREDITS,
        },
      ],
    });
  };

  // const handleOnUpdateNote = (id, note) => {
  //   updateNote({
  //     variables: {
  //       updateMortgageContractScheduleInput: {
  //         note,
  //         id,
  //       },
  //     },
  //   });
  // };

  const lastUnpaid = dataSource.find(item => !item.isDone)

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Ngày",
      dataIndex: "date",
      render: (_, record) => {
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
      title: "Số ngày",
      dataIndex: "frequency",
      render: (value) => value,
    },
    {
      title: "Tiền lãi",
      key: "payMoney",
      dataIndex: "payMoney",
      render: (value) => formatCurrency(value),
    },
    // {
    //   title: "Tiền khách trả",
    //   dataIndex: "interestMoneyReceived",
    //   render: (value) => formatCurrency(value),
    // },
    {
      title: "Đã trả",
      dataIndex: "isDone",
      render: (value, record) => {
        return (
          <Popconfirm
            title="Đã trả？"
            okText="Ok"
            cancelText="Đóng"
            placement="topLeft"
            onConfirm={() => checkedInstalment(record)}
          >
            <Checkbox checked={value} disabled={!value && record?.id !== lastUnpaid?.id} />
          </Popconfirm>
        );
      },
    },
  ];

  useEffect(() => {
    if (detail) {
      setDataSource(detail.mortgageContractSchedule || []);
    }
  }, [detail]);

  return (
    <>
      <div className="sm:text-center text-left sm:text-lg text-base font-bold mt-6 mb-2 text-i">
        Lịch sử đóng tiền lãi
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        className="overflow-auto sm:text-lg text-base "
      />
    </>
  );
}

export default CreditHistoriesTable;
