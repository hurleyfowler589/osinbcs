import { useState, createElement, useContext } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarCircleOutlined,
  CreditCardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Credit from "../components/credit/index";
import Instalment from "../components/instalment/index";
import LogoutContext from "../components/context/logout-context";
import withModalLogout from "../components/with-logout-modal";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState("1");

  const logoutContext = useContext(LogoutContext);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="my-8 font-bold text-lg text-white text-center">
          BNPL
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selected]}
          onSelect={({ key }) => {
            if (key === "3") {
              logoutContext.openModal();
            }
            setSelected(key);
          }}
          items={[
            {
              key: "1",
              icon: <DollarCircleOutlined />,
              label: "Tín Chấp",
            },
            {
              key: "2",
              icon: <CreditCardOutlined />,
              label: "Trả góp",
            },
            {
              key: "3",
              icon: <LogoutOutlined />,
              label: "Đăng xuất",
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
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        {
          {
            1: <Credit />,
            2: <Instalment />,
            3: <></>,
          }[selected]
        }
      </Layout>
    </Layout>
  );
};
export default withModalLogout(App);
