import { Button, Modal } from "antd";

export default function CreateCreditModal({
  isModalOpen,
  handleOk,
  closeModal,
}) {
  // use mutation here
  return (
    <>
      <Modal
        open={isModalOpen}
        width={700}
        title="Thêm mới hợp đồng Tín Chấp"
        onOk={handleOk}
        onCancel={closeModal}
        footer={[
          <Button type="default" onClick={closeModal}>
            Đóng 
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Lưu lại
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
