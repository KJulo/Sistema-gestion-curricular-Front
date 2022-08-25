import React from 'react';

// ant
import { Layout } from 'antd';

// cs
import "@styles/Navbar.less";

// components
import Navbar from '@components/Navbar';
import HomeContent from '@components/HomeContent';

// variables
import { studentMenu } from "@constants/menu.js"

const { Header, Sider, Content } = Layout;

const HomeLayout = ({user}) => {

  return (
    <Layout className="all-height">
      <Sider>
        <Navbar toppics={studentMenu} />
      </Sider>
      <Content style={{ marginLeft: 20 }}>
        <HomeContent user={user} />
      </Content>
    </Layout>
  );
};

export default HomeLayout;