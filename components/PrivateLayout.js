import { useState, createElement } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarCircleOutlined,
  CreditCardOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, Space } from "antd";
import { useRouter } from "next/router";

const { Header, Sider, Content } = Layout;

const PrivateLayout = ({ children, user, path = "credit" }) => {
  // TODO check token here, if not return to page unauthorize
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="my-8 font-bold text-lg text-white text-center">
          ADMIN
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[path]}
          onSelect={({ key }) => {
            router.push(key);
          }}
          items={[
            {
              key: "credit",
              icon: <DollarCircleOutlined />,
              label: "Tín Chấp",
            },
            {
              key: "instalment",
              icon: <CreditCardOutlined />,
              label: "Trả góp",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <div className="flex justify-between">
            <div>
              {createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
            </div>
            <div className="flex gap-3 mr-8">
              <div>
                <Avatar
                  style={{
                    verticalAlign: "middle",
                    backgroundColor: "var(--textPrimary)",
                  }}
                  icon={<UserOutlined />}
                />
              </div>
              <Dropdown
                menu={{
                  items: [
                    {
                      label: <a href="/login">Thoát</a>,
                      key: "0",
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Thanh Nguyen{" "}
                    <DownOutlined className="text-[10px] align-middle" />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        </Header>
        {children}
      </Layout>
    </Layout>
  );
};
export default PrivateLayout;
