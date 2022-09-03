import React, { useState } from 'react';

// styles
import "@styles/Home.less";

// layouts
import HomeLayout from '@layouts/HomeLayout';

// constants
import { teacher } from '@constants/users';
import { teacherMenu } from "@constants/menu.js"

// components
import HomeNavBar from '@components/HomeNavBar';
import TeacherContent from '@components/TeacherContent';

const Home = () => {

  return (
    <HomeLayout
      content={<TeacherContent user={teacher} /> }
      navBarMenu={<HomeNavBar toppics={teacherMenu} user={teacher} className='NavBar'/> }
    />
  );
}

export default Home;