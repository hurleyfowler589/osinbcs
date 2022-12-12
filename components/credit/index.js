import { Button, Card, Input } from 'antd';
import { useContext } from 'react';
import CreateCreditContext from '../context/credit/create-credit-context';
import withCreateCreditModal from '../hoc/credit/with-create-credit-modal';
import CreditTable from './credit-table';

function Credit() {
  const createCreditContext = useContext(CreateCreditContext);

  return (
    <Card className="m-4 h-full">
      <p className="mb-2 text-lg font-semibold">Hợp đồng Tín Chấp</p>
      <div className="sm:flex justify-between mb-4 overflow-x-hidden">
        <Button onClick={() => createCreditContext.openModal()} type="primary">
          Thêm hợp đồng
        </Button>
      </div>
      <CreditTable />
    </Card>
  );
}

export default withCreateCreditModal(Credit);
