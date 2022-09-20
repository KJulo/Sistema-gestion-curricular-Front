import React, { useState, useEffect } from 'react';

// styles
import '@styles/Home.less';

// layouts
import HomeLayout from '@layouts/HomeLayout';

// constants
import { parents } from '@constants/users';
import { parentsMenu } from '@constants/menu.js';

// components
import HomeNavBar from '@components/HomeNavBar';
import ParentsContent from '@components/ParentsContent';

const Home = () => {
  const [parent, setParent] = useState(null);

  // Seleccionar un padre cualquiera
  useEffect(() => {
    setParent(parents.parents[0])
  }, [])

  return (
    parent ? (
      <HomeLayout
        content={<ParentsContent parent={parent} students={parents.students} />}
        navBarMenu={<HomeNavBar toppics={parentsMenu} user={parent} className='NavBar' />}
      />
    ) : null
  );
};

export default Home;