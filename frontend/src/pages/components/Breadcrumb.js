import React from 'react';
import { Breadcrumb } from 'antd';
import {HomeOutlined} from "@ant-design/icons";
import { NavLink } from "react-router-dom";


class PublicBreadcrumb extends React.Component {
    render() {
        let bread = this.props.bread;
        return(
            <div className="bread-crumb">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <NavLink to={"/"}>
                            <HomeOutlined/>
                        </NavLink>
                    </Breadcrumb.Item>
                    {bread.map((res, index) => {
                        if (res.url) {
                            return (<Breadcrumb.Item key={index}>
                                <NavLink to={res.url}>
                                    {res.name}
                                </NavLink>
                            </Breadcrumb.Item>)
                        } else {
                            return (<Breadcrumb.Item key={index}>
                                {res.name}
                            </Breadcrumb.Item>)
                        }
                    })}
                </Breadcrumb>
            </div>
        )
    }

}

export default PublicBreadcrumb
