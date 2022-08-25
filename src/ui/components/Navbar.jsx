import React, { useState } from 'react';

// antd
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;

// styles
import "@styles/Navbar.less";

const Navbar = ({toppics}) => {
  const [collapsed, setCollapsed] = useState(false);

  const handdleCollapsed = () => {
    setCollapsed(collapsed ? false : true)
  }

  return (
    <Layout>

      {/* Menu list */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        {toppics.map((toppic, index)=> {
          return (
            <Menu
              key={index}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: index,
                  icon: <UserOutlined />,
                  label: toppic,
                }
              ]}
            />
          )
        })}
      </Sider>

      {/* Button collapse */}
      <Layout className="site-layout">
        <Header className="site-layout-background button-collapse" style={{ paddingInlineStart: 20, paddingInlineEnd: 40 }} onClick={handdleCollapsed} >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
      </Layout>
    </Layout>
  );
};

export default Navbar;