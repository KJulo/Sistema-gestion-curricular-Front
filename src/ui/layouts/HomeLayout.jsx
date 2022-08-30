import React from 'react';

// ant
import { Layout } from 'antd';

// cs
import "@styles/Home.less";

// components
import HomeNavBar from '@components/HomeNavBar';
import StudentContent from '@components/StudentContent';
import TeacherContent from '@components/TeacherContent';

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
        {user.tipo == 'estudiante' ? <StudentContent user={user} /> : <TeacherContent /> }
      </Content>
    </div>
  );
};

export default HomeLayout;