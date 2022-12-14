import { Modal, Tag } from "antd";
import { formatCurrency, formatDDMMYYYY } from "../../helpers/common";
import { INSTALMENT_STATUS_COLOR, INSTALMENT_STATUS_LABEL } from "../common";
import InstalmentHistoriesTable from "./instalment-histories-table";

const InstalmentDetail = ({ detail }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-8 instalment-detail overflow-x-auto">
      <div className="flex flex-col w-full">
        <table class="table-auto border ">
          <tbody>
            <tr className="border">
              <td className="font-bold" colspan="3">{detail?.customerName || ""}</td>
            </tr>
            <tr className="border">
              <td className="border font-bold">Trả góp</td>
              <td className="border"></td>
              <td className="border text-right">
                {formatCurrency(detail?.totalMoney)}
              </td>
            </tr>
            <tr className="border">
              <td className="border font-bold">Tỉ lệ</td>
              <td className="border"></td>
              <td className="border text-right">
                10 ăn <b>{detail?.rate || 0}</b>
              </td>
            </tr>
            <tr className="border">
              <td className="border font-bold">Họ từ ngày</td>
              <td className="border text-right">
                {formatDDMMYYYY(detail?.fromDate)}
              </td>
              <td className="border text-right">
                {formatDDMMYYYY(detail?.toDate)}
              </td>
            </tr>
            <tr className="border">
              <td className="border font-bold">Ghi chú</td>
              <td className="border text-right" colSpan="2">
                {detail?.note}
              </td>
            </tr>
            {/* <tr className="border">
              <td className="border font-bold">Nợ cũ KH</td>
              <td className="border"></td>
              <td className="border">10000 VNĐ</td>
            </tr>
            <tr className="border">
              <td className="border font-bold">Nợ cũ HĐ</td>
              <td className="border"></td>
              <td className="border">10000 VNĐ</td>
            </tr> */}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col w-full">
        <table class="table-auto border ">
          <tbody>
            <tr className="border">
              <td className="font-bold">Số Tiền giao khách</td>
              <td className="border text-right">
                {formatCurrency(detail?.totalMoneyReceived)}
              </td>
            </tr>
            <tr className="border">
              <td className="font-bold">Tổng tiền phải đóng</td>
              <td className="border text-right">
                {formatCurrency(detail?.totalMoney)}
              </td>
            </tr>
            <tr className="border">
              <td className="font-bold">Đã đóng được</td>
              <td className="border text-right">
                {formatCurrency(detail?.totalMoney - detail?.totalMoneyCurrent)}
              </td>
            </tr>
            <tr className="border">
              <td className="font-bold">Còn lại phải đóng</td>
              <td className="border text-right">
                {formatCurrency(detail?.totalMoneyCurrent)}
              </td>
            </tr>
            <tr className="border">
              <td className="font-bold">Trạng thái</td>
              <td className="border text-right">
                <Tag color={INSTALMENT_STATUS_COLOR[detail?.status]}>
                  {(
                    INSTALMENT_STATUS_LABEL[detail?.status] || ""
                  ).toUpperCase()}
                </Tag>
              </td>
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
  return (
    <>
      <Modal
        open={isModalOpen}
        width={1000}
        title={
          <div className="sm:text-center uppercase text-left text-base sm:text-lg">Chi tiết Hợp đồng Trả Góp</div>
        }
        onOk={handleOk}
        onCancel={closeModal}
        footer={[]}
      >
        <InstalmentDetail detail={detail} />
        <InstalmentHistoriesTable detail={detail} />
      </Modal>
    </>
  );
}

export default InstalmentHistoriesModal;
