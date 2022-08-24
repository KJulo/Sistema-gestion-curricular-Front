import React from 'react';

// styles
import "@styles/Home.less";

// constants
import { studentMenu } from '@constants/menu.js';
import { students } from '@constants/users.js'

// layouts
import Navbar from '@layouts/Navbar';

const Home = () => {
  return (
    <Navbar />
  );
}

export default Home;