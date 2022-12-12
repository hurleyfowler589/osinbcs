import { useMutation } from '@apollo/client';
import { Button, DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import { CREATE_CREDIT, GET_CREDITS } from './query';
import { handleResponse } from '../../helpers/common';
import { formLayout } from '../common';

const { TextArea } = Input;

function CreateCreditModal({ isModalOpen, handleOk, closeModal }) {
  const [form] = Form.useForm();
  const { submit, resetFields } = form;

  const [createInstalment] = useMutation(
    CREATE_CREDIT,
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
        createMortgageContractInput: {
          customerName: values.customerName,
          customerPhone: values.customerPhone,
          frequency: values.frequency,
          fromDate: values.fromDate.format(),
          interest: values.interest * 1000,
          loanTime: values.loanTime,
          note: values.note,
          totalMoney: values.totalMoney,
        },
      },
      refetchQueries: [
        {
          query: GET_CREDITS,
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
          {...formLayout}
          form={form}
          name="control-hooks"
          className="mt-4 sm:mt-8 sm:mr-24 mx-auto flex flex-col align-center w-full sm:w-10/12 gap-1"
          onFinish={onFinish}
        >
          <Form.Item
            name="customerName"
            label="Tên khách hàng"
            rules={[{ required: true, message: 'Nhập tên khách hàng!' }]}
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
            label="Tổng số tiền vay"
            rules={[{ required: true, message: 'Nhập số tiền vay!' }]}
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
            />
          </Form.Item>

          <Form.Item label="Hình thức">
            <Input disabled defaultValue="Theo ngày" />
          </Form.Item>

          <Form.Item
            name="loanTime"
            label="Số ngày vay"
            rules={[{ required: true, message: 'Nhập Số ngày vay!' }]}
          >
            <InputNumber
              placeholder="Nhập Số ngày vay"
              addonAfter={
                <Form.Item name="suffix" noStyle>
                  Ngày
                </Form.Item>
              }
              style={{ width: '100%' }}
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
          >
            <DatePicker placeholder="Chọn ngày vay" format="DD/MM/YYYY" />
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

export default CreateCreditModal;
