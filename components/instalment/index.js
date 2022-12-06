import { Button, Card, Input } from "antd";
import InstalmentTable from "./InstalmentTable";
const { Search } = Input;

export default function Instalment() {
  const onSearch = (value) => console.log(value);

  return (
    <Card className="m-4 h-full">
      <p className="mb-2 text-lg font-semibold">Hợp Đồng Trả Góp</p>
      <div className="flex justify-between mb-4">
        <Button type="primary">Thêm hợp đồng mới</Button>
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
