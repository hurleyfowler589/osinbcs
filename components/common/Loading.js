import { Spin } from "antd";

export default function Loading({ ...props }) {
  return (
    <div className="text-center loading" {...props}>
      <Spin size="large" />
    </div>
  );
}
