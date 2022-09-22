import React from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";

// ant
import { Layout } from 'antd';

// cs
import '@styles/MainLayout.less';

const { Content } = Layout;

// components
import HomeNavBar from '@components/HomeNavBar';

const MainLayout = ({ user, menuToppics }) => {
  return (
    <div
      className='site-page-header-ghost-wrapper home-grid-layout all-height'
      style={{ margin: '0 40px 0 0', padding: 0 }}>
      <aside className='container-bg-mobile'>
        <HomeNavBar toppics={menuToppics} user={user} className='NavBar' />
      </aside>

      <Content>
        <Outlet />
      </Content>
    </div>
  );
};

export default MainLayout;