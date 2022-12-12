import { Button, Checkbox, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useContext } from "react";
import AddToastContext from "../components/context/add-toast.context";
import withToast from "../components/hoc/with-toast";

function Login() {
  const addToast = useContext(AddToastContext)
  const router = useRouter();

  const onFinish = (values) => {
    const login = async () => {
      const data = {
        username: values.username,
        password: values.password,
      };

      const response = await fetch(
        `${process.env.GRAPPLE_API_URI}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.json();
    };
    login().then((data) => {
      if (!!data?.access_token) {
        localStorage.setItem("token", data.access_token);
        addToast.success("Đăng nhập thành công")
        router.push("/");
      } else { 
        addToast.error("Tên đăng nhập và mặt khẩu không đúng!")
      }
    });
  };

  return (
    <div className="login-body">
      <div className="login">
        <h1 className="mb-2 text-xl">Đăng nhập</h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default withToast(Login);