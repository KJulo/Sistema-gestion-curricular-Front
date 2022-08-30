import React, { useState } from 'react';

// styles
import "@styles/Home.less";

// layouts
import HomeLayout from '@layouts/HomeLayout';

// constants
import { teacher } from '@constants/users';

const Home = () => {

  return (
    <HomeLayout user={teacher} />
  );
}

export default Home;