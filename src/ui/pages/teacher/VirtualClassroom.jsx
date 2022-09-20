import React from 'react';

// styles
import '@styles/Home.less';

// constants
import {teacher} from '@constants/users';
import {teacherMenu} from '@constants/menu.js';

// components
import HomeNavBar from '@components/HomeNavBar';

const VitualClassroom = () => {
  return (
    <div
      className='site-page-header-ghost-wrapper home-grid-layout all-height'
      style={{margin: '0 40px 0 0', padding: 0}}>
      <aside className='container-bg-mobile'>
        <HomeNavBar toppics={teacherMenu} user={teacher} className='NavBar' />
      </aside>
    </div>


  );
};

export default VitualClassroom;