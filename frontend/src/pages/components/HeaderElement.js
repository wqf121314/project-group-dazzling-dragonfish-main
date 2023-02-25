import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

const HeaderElement = () => {

    const label = ['Headlines', 'Business', 'Entertainment', 'Health', 'Science', 'Sports'];

  return (
    <div>
        <div className="logo"><a href="/" style={{color:'#fff'}}>Dazzling Dragonfish</a></div>
        <Menu theme="dark" mode="horizontal" className='menu'>
            {new Array(6).fill(null).map((_, index) => {
                const key = index + 1;
                return <Menu.Item key={key}><Link to={`/category/${label[index].toLocaleLowerCase()}`}>{label[index]}</Link></Menu.Item>;
            })}
        </Menu>
    </div>
  )
}

export default HeaderElement
