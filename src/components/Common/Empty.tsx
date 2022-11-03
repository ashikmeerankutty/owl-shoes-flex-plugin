import React from "react";
import { InfoContainerStyle } from "./Styles";

const Empty : React.FunctionComponent = () => {
    return (<InfoContainerStyle>
        <div className="placeholder">
            <div className="border">
                <div className="small-title">
                    SEGMENT + SALESFORCE
                </div>
            </div>
            <div className="title">Welcome to Owl Bank Customer Engagement platform! </div>
            <div className="content">Customer info will appear from multiple sources upon accepting incoming task.</div>
        </div>
    </InfoContainerStyle>);
};

export default Empty;