import { Button, Modal } from "antd";

const InstalmentDetail = ({ detail }) => {
  return (
    <div className="flex flex-row gap-8 instalment-detail">
      <div className="flex flex-col w-full">
        <table class="table-auto border ">
          <tbody>
            <tr className="border">
              <td className="font-bold">Nguyen Văn A</td>
            </tr>
            <tr className="border">
              <td className="border font-bold">Trả góp</td>
              <td className="border"></td>
              <td className="border">10000 VNĐ</td>
            </tr>
            <tr className="border">
              <td className="border font-bold">Tỉ lệ</td>
              <td className="border"></td>
              <td className="border">10000 VNĐ</td>
            </tr>
            <tr className="border">
              <td className="border font-bold">Họ từ ngày</td>
              <td className="border">06/12/2022</td>
              <td className="border">25/12/2922</td>
            </tr>
            <tr className="border">
              <td className="border font-bold">Nợ cũ KH</td>
              <td className="border"></td>
              <td className="border">10000 VNĐ</td>
            </tr>
            <tr className="border">
              <td className="border font-bold">Nợ cũ HĐ</td>
              <td className="border"></td>
              <td className="border">10000 VNĐ</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col w-full">
        <table class="table-auto border ">
          <tbody>
            <tr className="border">
              <td className="font-bold">Số Tiền khách giao</td>
              <td className="border">10000 VNĐ</td>
            </tr>
            <tr className="border">
              <td className="font-bold">Số tiền phải đóng</td>
              <td className="border">10000 VNĐ</td>
            </tr>
            <tr className="border">
              <td className="font-bold">Đã đóng được</td>
              <td className="border">10000 VNĐ</td>
            </tr>
            <tr className="border">
              <td className="font-bold">Còn lại phải đóng</td>
              <td className="border">10000 VNĐ</td>
            </tr>
            <tr className="border">
              <td className="font-bold">Tổng lãi</td>
              <td className="border">10000 VNĐ</td>
            </tr>
            <tr className="border">
              <td className="font-bold">Trạng thái</td>
              <td className="border">10000 VNĐ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

function InstalmentHistoriesModal({
  isModalOpen,
  handleOk,
  closeModal,
  detail,
}) {
  // data here
  console.log("detail-----------", detail);
  return (
    <>
      <Modal
        open={isModalOpen}
        width={1000}
        title="Bảng chi tiết Hợp đồng Trả Góp"
        onOk={handleOk}
        onCancel={closeModal}
        footer={[]}
      >
        <InstalmentDetail detail={detail}/>


      </Modal>
    </>
  );
}

export default InstalmentHistoriesModal;
