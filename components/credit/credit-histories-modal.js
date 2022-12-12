import { Modal, Tag } from 'antd';
import { formatCurrency, formatDDMMYYYY } from '../../helpers/common';
import { INSTALMENT_STATUS_COLOR, CREDIT_STATUS_LABEL } from '../common';
import CreditHistoriesTable from './credit-histories-table';

const CreditDetail = ({ detail }) => {
  return (
    <div className="flex flex-row gap-8 instalment-detail overflow-x-auto">
      <div className="flex flex-col w-full">
        <table class="table-auto border ">
          <tbody>
            <tr className="border">
              <td className="font-bold">{detail?.customerName || ''}</td>
            </tr>
            <tr className="border">
              <td className="border font-bold">Tiền vay</td>
              <td className="border"></td>
              <td className="border text-right">
                {formatCurrency(detail?.totalMoney)}
              </td>
            </tr>
            <tr className="border">
              <td className="border font-bold">Lãi suất</td>
              <td className="border"></td>
              <td className="border text-right">
                {formatCurrency(detail?.interest)}/1 triệu
              </td>
            </tr>
            <tr className="border">
              <td className="border font-bold">Vay từ ngày</td>
              <td className="border text-right">
                {formatDDMMYYYY(detail?.fromDate)}
              </td>
              <td className="border text-right">
                {formatDDMMYYYY(detail?.toDate)}
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
              <td className="font-bold">Tổng lãi</td>
              <td className="border text-right">
                {formatCurrency(detail?.totalInterest)}
              </td>
            </tr>
            <tr className="border">
              <td className="font-bold">Đã thanh toán</td>
              <td className="border text-right">
                {formatCurrency(detail?.interestMoneyReceived)}
              </td>
            </tr>
            <tr className="border">
              <td className="font-bold">Trạng thái</td>
              <td className="border text-right">
                <Tag color={INSTALMENT_STATUS_COLOR[detail?.status]}>
                  {(CREDIT_STATUS_LABEL[detail?.status] || '').toUpperCase()}
                </Tag>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

function CreditHistoriesModal({ isModalOpen, handleOk, closeModal, detail }) {
  return (
    <>
      <Modal
        open={isModalOpen}
        width={1000}
        title={
          <div className="sm:text-center uppercase text-left text-base sm:text-lg">
            Chi tiết hợp đồng vay tiền
          </div>
        }
        onOk={handleOk}
        onCancel={closeModal}
        footer={[]}
      >
          <CreditDetail detail={detail} />
          <CreditHistoriesTable detail={detail} />
      </Modal>
    </>
  );
}

export default CreditHistoriesModal;
