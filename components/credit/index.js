import { useQuery, gql } from "@apollo/client";
import { Card, Input } from "antd";
import CreditTable from "./CreditTable";
const { Search } = Input;

export default function Instalment() {
  const onSearch = (value) => console.log(value);

  return (
    <Card className="m-4 h-full">
      <p className="mb-2 text-lg font-semibold">Hợp đồng Tín Chấp</p>
      <div className="flex justify-end mb-4">
        <Search
          placeholder="Tìm kiếm tên khách hàng..."
          allowClear
          enterButton="Tìm kiếm"
          size="normal"
          className="w-1/3"
          onSearch={onSearch}
        />
      </div>
      <CreditTable />
    </Card>
  );
}
