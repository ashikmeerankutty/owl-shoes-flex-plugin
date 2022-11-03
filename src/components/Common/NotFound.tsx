import React from "react";
import { InfoContainerStyle } from "./Styles";

export interface NotFoundProps {
    source : string;
}

const NotFound: React.FunctionComponent<NotFoundProps> = (props : NotFoundProps) => {
    const message = `No Data Found for this user in ${props.source}.`;
    return (<InfoContainerStyle>
        <div className="placeholder">
            <div className="border">
                <div className="small-title">
                {props.source.toUpperCase()}
                </div>
            </div>
            <div className="title">User Doesnot Exist</div>
            <div className="content">{message}</div>
        </div>
    </InfoContainerStyle>);
}

export default NotFound;