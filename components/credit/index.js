import { Button, Card, Input } from "antd";
import { useContext } from "react";
import CreateCreditContext from "../context/credit/create-credit-context";
import withCreateCreditModal from "../hoc/credit/with-create-credit-modal";
import CreditTable from "./credit-table";
// const { Search } = Input;

function Credit() {
  // const onSearch = (value) => console.log(value);

  const createCreditContext = useContext(CreateCreditContext);

  return (
    <Card className="m-4 h-full">
      <p className="mb-2 text-lg font-semibold">Hợp đồng Tín Chấp</p>
      <div className="flex justify-between mb-4">
        <Button onClick={() => createCreditContext.openModal()} type="primary">
          Thêm hợp đồng
        </Button>
        {/* <Search
          placeholder="Tìm kiếm tên khách hàng..."
          allowClear
          enterButton="Tìm kiếm"
          size="normal"
          className="w-1/3"
          onSearch={onSearch}
        /> */}
      </div>
      <CreditTable />
    </Card>
  );
}

export default withCreateCreditModal(Credit);
