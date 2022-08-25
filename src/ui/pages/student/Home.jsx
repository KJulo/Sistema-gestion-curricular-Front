import React, { useState } from 'react';

// styles
import "@styles/Home.less";

// layouts
import HomeLayout from '@layouts/HomeLayout';

// constants
import { student } from '@constants/users';

const Home = () => {
  const [userLoged, setUserLoged] = useState(student);

  return (
    <HomeLayout user={userLoged} />
  );
}

export default Home;