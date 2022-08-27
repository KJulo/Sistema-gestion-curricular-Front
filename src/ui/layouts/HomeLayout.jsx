import React from 'react';

// ant
import { Layout } from 'antd';

// cs
import "@styles/Home.less";

// components
import NavBar from '@components/NavBar';
import HomeContent from '@components/HomeContent';

// variables
import { studentMenu } from "@constants/menu.js"

const { Header, Sider, Content } = Layout;

const HomeLayout = ({user}) => {

  return (
    <div className='home-grid-layout'>
      <aside>
        <NavBar toppics={studentMenu} className='navbar'/>
      </aside>
      <Content style={{ marginLeft: 20 }} className='content'>
        <HomeContent user={user} />
      </Content>
    </div>
  );
};

export default HomeLayout;