import { useState, createElement } from 'react';
import { Avatar, Dropdown, Layout, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarCircleOutlined,
  CreditCardOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Credit from './credit';
import Instalment from './instalment';
import withToast from './hoc/with-toast';

const { Header, Sider } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState('credit');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="my-8 font-bold text-lg text-white text-center">
          ADMIN
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selected]}
          onSelect={({ key }) => setSelected(key)}
          items={[
            {
              key: 'credit',
              icon: <DollarCircleOutlined />,
              label: 'Tín Chấp',
            },
            {
              key: 'instalment',
              icon: <CreditCardOutlined />,
              label: 'Trả góp',
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
                  className: 'trigger',
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
            </div>
            <div className="gap-3 mr-8 ">
              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <a
                          href="/login?cc=eeeeeeeeeeeeeeeeeeeeeeeee"
                          onClick={() => {
                            // remove token
                            localStorage.removeItem('token');
                          }}
                        >
                          Thoát
                        </a>
                      ),
                      key: '0',
                    },
                  ],
                }}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Avatar
                    className="align-middle bg-[var(--textPrimary)] mr-2"
                    icon={<UserOutlined />}
                  /><span className="hidden sm:contents">Admin</span>
                </a>
              </Dropdown>
            </div>
          </div>
        </Header>
        {
          {
            credit: <Credit />,
            instalment: <Instalment />,
          }[selected]
        }
      </Layout>
    </Layout>
  );
};
export default withToast(Home);
