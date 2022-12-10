import { useMutation } from "@apollo/client";
import moment from "moment";
import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { CREATE_INSTALMENT, GET_INSTALMENTS } from "./query";
import { handleResponse } from "../../helpers/common";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { TextArea } = Input;

function CreateInstalmentModal({ isModalOpen, handleOk, closeModal }) {
  const [form] = Form.useForm();
  const { submit, resetFields } = form;

  const [createInstalment] = useMutation(
    CREATE_INSTALMENT,
    handleResponse({
      onSuccess: () => {
        closeModal();
        resetFields();
      },
    })
  );

  const onFinish = (values) => {
    createInstalment({
      variables: {
        createInstallmentContractInput: {
          customerName: values.customerName,
          customerPhone: values.customerPhone,
          frequency: values.frequency,
          fromDate: values.fromDate.format(),
          loanTime: values.loanTime,
          note: values.note,
          totalMoneyReceived: values.totalMoneyReceived,
          totalMoney: values.totalMoney,
        },
      },
      refetchQueries: [
        {
          query: GET_INSTALMENTS,
        },
      ],
    });
  };

  const onClose = () => {
    closeModal();
    resetFields();
  };


  return (
    <>
      <Modal
        open={isModalOpen}
        width={700}
        title="Thêm mới hợp đồng"
        onOk={handleOk}
        onCancel={onClose}
        footer={[
          <div className="text-center">
            <Button
              type="default"
              onClick={onClose}
            >
              Đóng
            </Button>
            <Button key="submit" type="primary" onClick={submit}>
              Lưu
            </Button>
          </div>,
        ]}
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          className="mt-8 flex flex-col align-center w-10/12 gap-2"
          onFinish={onFinish}
        >
          <Form.Item
            name="customerName"
            label="Tên khách hàng"
            rules={[{ required: true, message: "Nhập tên khách hàng!" }]}
          >
            <Input placeholder="Nhập tên khách hàng" />
          </Form.Item>

          <Form.Item
            name="customerPhone"
            label="Số điện thoại"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            name="totalMoney"
            label="Trả góp"
            rules={[{ required: true, message: "Nhập tiền trả góp!" }]}
          >
            <InputNumber
              placeholder="Nhập số tiền trả góp"
              addonAfter={
                <Form.Item name="suffix" noStyle>
                  VNĐ
                </Form.Item>
              }
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="totalMoneyReceived"
            label="Tiền đưa khách"
            rules={[{ required: true, message: "Nhập tiền đưa khách!" }]}
          >
            <InputNumber
              placeholder="Nhập tiền đưa khách hàng"
              addonAfter={
                <Form.Item name="suffix" noStyle>
                  VNĐ
                </Form.Item>
              }
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Hình thức">
            <Input disabled defaultValue="Theo ngày" />
          </Form.Item>

          <Form.Item
            name="loanTime"
            label="Bốc trong vòng"
            rules={[
              {
                required: true,
                message: "Nhập ngày bốc trong vòng!",
              },
            ]}
          >
            <InputNumber
              addonAfter={
                <Form.Item name="suffix" noStyle>
                  Ngày
                </Form.Item>
              }
              style={{ width: "100%" }}
              placeholder="Nhập ngày bốc trong vòng"
            />
          </Form.Item>

          <Form.Item
            name="frequency"
            label="Số ngày đóng tiền"
            rules={[{ required: true, message: "Nhập Số ngày đóng tiền!" }]}
          >
            <InputNumber
              placeholder="Nhập số ngày đóng tiền"
              style={{ width: "100%" }}
              max={1000}
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="fromDate"
            label="Ngày bốc"
            rules={[
              {
                required: true,
                message: "Chọn ngày bốc!",
              },
            ]}
          >
            <DatePicker placeholder="Chọn ngày bốc" format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            name="note"
            label="Ghi chú"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <TextArea placeholder="Nhập ghi chú" allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateInstalmentModal;
