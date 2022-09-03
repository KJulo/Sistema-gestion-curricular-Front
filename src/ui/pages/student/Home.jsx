import React from 'react';

// styles
import "@styles/Home.less";

// layouts
import HomeLayout from '@layouts/HomeLayout';

// constants
import { student } from '@constants/users';
import { studentMenu } from "@constants/menu.js"

// components
import HomeNavBar from '@components/HomeNavBar';
import StudentContent from '@components/StudentContent';


const Home = () => {

  return (
    <HomeLayout
      content={<StudentContent user={student} /> }
      navBarMenu={<HomeNavBar toppics={studentMenu} user={student} className='NavBar'/> }
    />
  );
}

export default Home;