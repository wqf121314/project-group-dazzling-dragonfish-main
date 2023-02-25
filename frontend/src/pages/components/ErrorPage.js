import {Button, Result} from "antd";
import React from "react";

const HeaderElement = (props) => {
    var ErrorMessage ="Cannot Find This Page."
    if(props.ErrorMessage){
        ErrorMessage = props.ErrorMessage;
    }
    return (
        <Result
            status="404"
            title="404"
            subTitle={ErrorMessage}
            extra={<Button type="primary"><a href="/">Back Home</a></Button>}
        />
    )
}

export default HeaderElement
