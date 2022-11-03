import React from "react";
import { InfoContainerStyle } from "./Styles";

export interface ErrorContainerProps {
    error: string;
    title: string;
}

const Error: React.FunctionComponent<ErrorContainerProps> = (props : ErrorContainerProps) => {
    return (<InfoContainerStyle>
        <div className="placeholder">
            <div className="border">
                <div className="small-title">
                {props.title}
                </div>
            </div>
            <div className="title">Something went wong</div>
            <div className="content">Error : {props.error}</div>
        </div>
    </InfoContainerStyle>);
}

export default Error;