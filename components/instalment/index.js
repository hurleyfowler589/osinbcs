import { useContext } from "react";
import { Button, Card } from "antd";
import CreateInstalmentContext from "../context/instalment/create-instalment.context";
import withCreateInstalmentModal from "../hoc/instalment/with-create-instalment-modal";
import InstalmentTable from "./instalment-table";

function Instalment() {
  const createInstalmentContext = useContext(CreateInstalmentContext);

  return (
    <Card className="m-4 h-full">
      <p className="mb-2 text-lg font-semibold">Hợp Đồng Trả Góp</p>
      <div className="sm:flex justify-between mb-4 overflow-x-hidden">
        <Button
          type="primary"
          onClick={() => {
            createInstalmentContext.openModal();
          }}
        >
          Thêm hợp đồng
        </Button>
      </div>
      <InstalmentTable />
    </Card>
  );
}

export default withCreateInstalmentModal(Instalment);
