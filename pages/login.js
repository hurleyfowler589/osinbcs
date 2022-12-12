import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AddToastContext from '../components/context/add-toast.context';
import withToast from '../components/hoc/with-toast';

function Login() {
  const addToast = useContext(AddToastContext);
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
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.json();
    };
    login().then((data) => {
      if (!!data?.access_token) {
        localStorage.setItem('token', data.access_token);
        addToast.success('Đăng nhập thành công');
        router.push('/');
      } else {
        addToast.error('Tên đăng nhập và mặt khẩu không đúng!');
      }
    });
  };

  return (
    <div
      style={{
        background: '-webkit-radial-gradient( 0% 100%, ellipse cover, rgba(104, 128, 138, 0.4) 10%, rgba(138, 114, 76, 0) 40% ), linear-gradient( to bottom, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4) 100% ), linear-gradient(135deg, #670d10 0%, #092756 100%);',
      }}
      className={
        'min-h-screen flex flex-col items-center justify-center text-white text-center'
      }
    >
      <div className={'container'}>
        <div className="w-10/12 sm:w-[410px] mx-auto p-4 sm:p-10 bg-tertiary rounded-[10px]">
          <h1 className="mb-2 text-xl">Đăng nhập</h1>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className='text-left flex flex-col gap-2'
          >
            <label className="text-white">Tên đăng nhập:</label>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Nhập tên đăng nhập!' },
              ]}
              className="sm:mb-2"
            >
              <Input />
            </Form.Item>
            <label className="text-white">Mật khẩu:</label>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Nhập mật khẩu!' },
              ]}
              className="sm:mb-2"
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
    </div>
  );
}

export default withToast(Login);
