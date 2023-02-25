import React from 'react'
import { BackTop } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, UpCircleFilled, GithubOutlined } from '@ant-design/icons';

const FooterElement = () => {
  return (
    <div>
      <div>
          <h3>FOLLOW US</h3>
          <a href='https://www.facebook.com/'><FacebookOutlined /></a>
          <a href='https://twitter.com/'><TwitterOutlined/></a>
          <a href='https://www.instagram.com/'><InstagramOutlined /></a>
          <a href='https://github.com/UOA-CS732-SE750-Students-2022/project-group-dazzling-dragonfish'><GithubOutlined /></a>
      </div>
      <h3>News Timeline ©2022 Created by Dazzling Dragonfish</h3>
      <BackTop>
          <UpCircleFilled className='backTop'/>
      </BackTop>
    </div>
  )
}

export default FooterElement