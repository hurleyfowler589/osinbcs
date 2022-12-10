import {
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
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
  GET_INSTALMENTS,
  MAKE_PAYMENT,
  UPDATE_NOTE,
} from "./query";

const { TextArea } = Input;

function CreditHistoriesTable({ detail }) {
  const [editId, setEditedId] = useState(null);
  const [editData, setEditedData] = useState(null);
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

  const [updateNote] = useMutation(
    UPDATE_NOTE,
    handleResponse({
      onSuccess: () => {
        setEditedId(null);
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

  const handleOnUpdateNote = (id, note) => {
    updateNote({
      variables: {
        updateMortgageContractScheduleInput: {
          note,
          id,
        },
      },
    });
  };

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
      title: "Tiền lãi",
      key: "payMoney",
      dataIndex: "payMoney",
      render: (value) => formatCurrency(value),
    },
    {
      title: "Tiền khách trả",
      dataIndex: "interestMoneyReceived",
      render: (value) => formatCurrency(value),
    },
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
            <Checkbox checked={value} />
          </Popconfirm>
        );
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      render: (value, record, index) => {
        return (
          <>
            <div className="text-right">
              <TextArea
                placeholder="Nhập ghi chú"
                autoSize
                onChange={(e) => {
                  if (!e) return;
                  setEditedId(record.id), setEditedData(e.target.value);
                }}
                value={editData && editId === record.id ? editData : value}
              />
              {!!editId && editId === record.id && (
                <>
                  <CheckOutlined
                    style={{
                      color: "var(--textPrimary)",
                      fontSize: "16px",
                      marginRight: "10px",
                    }}
                    onClick={() => handleOnUpdateNote(record?.id, editData)}
                  />
                  <CloseOutlined
                    style={{ color: "red", fontSize: "16px" }}
                    onClick={() => {
                      setEditedData(null);
                      setEditedId(null);
                    }}
                  />
                </>
              )}
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (detail) {
      setDataSource(detail.mortgageContractSchedule || [])
    }   
  }, [detail])

  return (
    <>
      <div className="text-center text-lg font-bold mt-6 mb-2 text-i">
        Lịch sử đóng tiền lãi
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        className="overflow-auto"
      />
    </>
  );
}

export default CreditHistoriesTable;
