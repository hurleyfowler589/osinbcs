import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { GET_INSTALMENT_DETAIL, UPDATE_INSTALMENT } from "./query";
import { handleResponse } from "../../helpers/common";
import { useEffect, useMemo } from "react";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { TextArea } = Input;

function EditInstalmentModal({
  isModalOpen,
  handleOk,
  closeModal,
  detail = {},
}) {
  const [form] = Form.useForm();
  const { submit, resetFields } = form;

  const [updateInstalment] = useMutation(
    UPDATE_INSTALMENT,
    handleResponse({
      onSuccess: (d) => {
        onClose()
      },
      successMsg: "Câp nhật thành công",
    })
  );

  useEffect(() => {
    if (detail) {
      form.setFieldsValue({
       ...detail,
        fromDate: moment(detail.fromDate),
        note: detail.note,
      });
    }
  }, detail);

  const onFinish = (values) => {
    updateInstalment({
      variables: {
        updateInstallmentContractInput: {
          id: detail?.id,
          customerName: values.customerName,
          customerPhone: values.customerPhone,
          note: values.note,
        },
      },
    });
  };

  const onClose = () => {
    closeModal();
    form.resetFields();
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        width={700}
        title={`Cập nhật hợp đồng`}
        onOk={onClose}
        onCancel={onClose}
        destroyOnClose={true}
        // maskClosable={false}
        footer={[
          <div className="text-center">
            <Button type="default" onClick={onClose}>
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
            initialValue={detail?.customerName}
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
            initialValue={detail?.customerPhone}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            name="totalMoney"
            label="Trả góp"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={detail?.totalMoney}
          >
            <InputNumber
              placeholder="Nhập số tiền trả góp"
              disabled
              addonAfter={
                <Form.Item name="suffix" noStyle>
                  VNĐ
                </Form.Item>
              }
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="totalMoneyReceived"
            label="Tiền đưa khách"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={detail?.totalMoneyReceived}
          >
            <InputNumber
              placeholder="Nhập tiền đưa khách hàng"
              addonAfter={
                <Form.Item name="suffix" noStyle>
                  VNĐ
                </Form.Item>
              }
              disabled
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
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
                required: false,
              },
            ]}
            initialValue={detail?.loanTime}
          >
            <InputNumber
              disabled
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
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={detail?.frequency}
          >
            <InputNumber
              disabled
              placeholder="Nhập số ngày đóng tiền"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="fromDate"
            label="Ngày bốc"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={detail?.fromDate ? moment(detail?.fromDate) : null}
          >
            <DatePicker
              disabled
              placeholder="Chọn ngày bốc"
              format="DD-MM-YYYY"
            />
          </Form.Item>

          <Form.Item
            name="note"
            label="Ghi chú"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={detail?.note}
          >
            <TextArea placeholder="Nhập ghi chú" allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditInstalmentModal;
