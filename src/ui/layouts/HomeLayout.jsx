import React from 'react';

// ant
import { Layout } from 'antd';

// cs
import '@styles/Home.less';

const { Content } = Layout;

const HomeLayout = ({ navBarMenu, content }) => {
  return (
    <div className='home-grid-layout all-height' style={{ margin: '0 40px 0 0' }}>
      <aside className='primary-bg-mobile'>{navBarMenu}</aside>
      <Content style={{ marginLeft: 20, marginTop: 25 }} className='content'>
        {content}
      </Content>
    </div>
  );
};

export default HomeLayout;
