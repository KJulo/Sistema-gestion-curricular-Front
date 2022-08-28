import React from 'react';

// ant
import { Layout } from 'antd';

// cs
import "@styles/Home.less";

// components
import HomeNavBar from '@components/HomeNavBar';
import HomeContent from '@components/HomeContent';

// variables
import { studentMenu } from "@constants/menu.js"

const { Header, Sider, Content } = Layout;

const HomeLayout = ({user}) => {

  return (
    <div className='home-grid-layout all-height' style={{ margin: 40 }}>
      <aside>
        <HomeNavBar toppics={studentMenu} user={user} className='NavBar'/>
      </aside>
      <Content style={{ marginLeft: 20 }} className='content'>
        <HomeContent user={user} />
      </Content>
    </div>
  );
};

export default HomeLayout;