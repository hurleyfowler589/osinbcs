import { useMutation } from '@apollo/client';
import moment from 'moment';
import { Button, DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import { UPDATE_CREDIT } from './query';
import { handleResponse } from '../../helpers/common';
import { useEffect, useMemo } from 'react';

const layout = {
  labelCol: {
    span: 9,
  },
};

const { TextArea } = Input;

function EditCreditModal({ isModalOpen, handleOk, closeModal, detail = {} }) {
  const [form] = Form.useForm();
  const { submit, resetFields } = form;

  const [updateInstalment] = useMutation(
    UPDATE_CREDIT,
    handleResponse({
      onSuccess: (d) => {
        onClose();
      },
      successMsg: 'Câp nhật thành công',
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
        updateMortgageContractInput: {
          customerName: values.customerName,
          customerPhone: values.customerPhone,
          id: detail?.id,
          note: values.note,
        },
      },
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
        title={`Cập nhật hợp đồng`}
        onOk={onClose}
        onCancel={onClose}
        destroyOnClose={true}
        footer={[
          <div className="text-center form-footer">
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
          className="mt-8 sm:mr-24 mx-auto flex flex-col align-center w-full sm:w-10/12 gap-2"
          onFinish={onFinish}
        >
          <Form.Item
            name="customerName"
            label="Tên khách hàng"
            rules={[{ required: true, message: 'Nhập tên khách hàng!' }]}
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
            label="Tổng số tiền vay"
            rules={[{ required: true, message: 'Nhập số tiền vay!' }]}
            initialValue={detail?.totalMoney}
            disabled
          >
            <InputNumber
              placeholder="Nhập số tiền vay"
              addonAfter={
                <Form.Item name="suffix" noStyle>
                  VNĐ
                </Form.Item>
              }
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
              disabled
            />
          </Form.Item>

          <Form.Item label="Hình thức">
            <Input disabled defaultValue="Theo ngày" />
          </Form.Item>

          <Form.Item
            name="loanTime"
            label="Số ngày vay"
            rules={[{ required: true, message: 'Nhập Số ngày vay!' }]}
            initialValue={detail?.loanTime}
          >
            <InputNumber
              placeholder="Nhập Số ngày vay"
              addonAfter={
                <Form.Item name="suffix" noStyle>
                  Ngày
                </Form.Item>
              }
              style={{ width: '100%' }}
              disabled
            />
          </Form.Item>

          <Form.Item
            name="frequency"
            label="Kỳ lãi"
            rules={[
              {
                required: true,
                message: 'Nhập Kỳ lãi!',
              },
            ]}
            disabled
            initialValue={detail?.frequency}
          >
            <InputNumber
              addonAfter={
                <Form.Item name="suffix" noStyle>
                  Ngày
                </Form.Item>
              }
              style={{ width: '100%' }}
              placeholder="Nhập kỳ lãi"
              max={1000}
              min={0}
              disabled
            />
          </Form.Item>

          <Form.Item
            name="interest"
            label="Lãi"
            rules={[
              {
                required: true,
                message: 'Nhập lãi!',
              },
            ]}
            initialValue={detail?.interest}
          >
            <InputNumber
              addonAfter={
                <Form.Item name="suffix" noStyle>
                  k/1 triệu
                </Form.Item>
              }
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              disabled
              style={{ width: '100%' }}
              placeholder="Nhập lãi"
            />
          </Form.Item>

          <Form.Item
            name="fromDate"
            label="Ngày vay"
            rules={[
              {
                required: true,
                message: 'Chọn ngày vay!',
              },
            ]}
            initialValue={detail?.fromDate ? moment(detail?.fromDate) : null}
          >
            <DatePicker
              disabled
              placeholder="Chọn ngày vay"
              format="DD/MM/YYYY"
            />
          </Form.Item>

          <Form.Item
            name="note"
            label="Ghi chú"
            className="note"
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

export default EditCreditModal;
