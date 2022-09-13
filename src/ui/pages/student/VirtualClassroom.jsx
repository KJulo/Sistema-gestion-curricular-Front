import React from 'react';

// styles
import '@styles/Home.less';

// constants
import {student} from '@constants/users';
import {studentMenu} from '@constants/menu.js';

// components
import HomeNavBar from '@components/HomeNavBar';

const VitualClassroom = () => {
  return (
    <div
      className='site-page-header-ghost-wrapper home-grid-layout all-height'
      style={{margin: '0 40px 0 0', padding: 0}}>
      <aside className='container-bg-mobile'>
        <HomeNavBar toppics={studentMenu} user={student} className='NavBar' />
      </aside>
    </div>


  );
};

export default VitualClassroom;