import { Button, Card, Input } from "antd";
import { useContext } from "react";
import CreateInstalmentContext from "../context/instalment/create-instalment.context";
import withCreateInstalmentModal from "../hoc/instalment/with-create-instalment-modal";
import InstalmentTable from "./instalment-table";
const { Search } = Input;

function Instalment() {
  const onSearch = (value) => console.log(value);

  const createInstalmentContext = useContext(CreateInstalmentContext);

  return (
    <Card className="m-4 h-full">
      <p className="mb-2 text-lg font-semibold">Hợp Đồng Trả Góp</p>
      <div className="flex justify-between mb-4">
        <Button
          type="primary"
          onClick={() => {
            createInstalmentContext.openModal();
          }}
        >
          Thêm hợp đồng mới
        </Button>
        <Search
          placeholder="Tìm kiếm tên khách hàng..."
          allowClear
          enterButton="Tìm kiếm"
          size="normal"
          className="w-1/3"
          onSearch={onSearch}
        />
      </div>
      <InstalmentTable />
    </Card>
  );
}

export default withCreateInstalmentModal(Instalment);
