import { useState, createElement } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarCircleOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Credit from "../components/credit/index";
import Instalment from "../components/instalment/index";
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState(1);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="my-8 font-bold text-lg text-white text-center">
          CREDIT NOW
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selected]}
          onSelect={({ key }) => setSelected(key)}
          items={[
            {
              key: 1,
              icon: <DollarCircleOutlined />,
              label: "Tín Chấp",
            },
            {
              key: 2,
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
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        {
          {
            1: <Credit />,
            2: <Instalment />,
          }[selected]
        }
      </Layout>
    </Layout>
  );
};
export default App;
