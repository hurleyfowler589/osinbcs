import { Button, Checkbox, Form, Input } from "antd";
import { useRouter } from "next/router";

export default function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const router = useRouter();
  return (
    <div className="login-body">
      <div className="login">
        <h1 className="mb-2 text-xl">Đăng nhập</h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <label className="text-white">Tên đăng nhập:</label>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <label className="text-white">Mật khẩu:</label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="text-white">Ghi nhớ mật khẩu</Checkbox>
          </Form.Item>
          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => router.push("/")}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
