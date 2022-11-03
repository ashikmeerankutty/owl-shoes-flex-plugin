import { ITask, withTaskContext } from "@twilio/flex-ui";
import React, {  Dispatch, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { AppState, ActionState } from "../../states/reducer";
import { CRMState, Action } from "./Actions";
import { get, isEmpty, isEqual } from "lodash";
import { Box } from "@twilio-paste/core/box";
import { LoadingPhase } from "../../components/Common/LoadingPhase";
import * as Flex from "@twilio/flex-ui";
import SalesforceCrmView from "./SalesforceCrmView";
import { Theme } from "@twilio-paste/core/dist/theme";
export interface ContainerProps {
    task: ITask;
    FlexActions: typeof Flex.Actions;
    ssoToken: string;
    userData: CRMState;
    setLoading: (loading: boolean) => void;
    fetchSegmentInfo: (phone: string) => void;
    setEmptyContact: () => void;
    setError: (error: string) => void;
}

const SalesforceCrmContainer : React.FunctionComponent<ContainerProps> = (props: ContainerProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const phone = get(props, "task.attributes.phone");
    // const phone = "8951642434";

    const fetchDataForTask = useCallback(async () => {
        if (!isEmpty(phone)) {
            afterCompleteTask();
            setLoading(true);
            try {
                await props.fetchSegmentInfo(phone);
            } catch (e) {
                debugger;
                afterCompleteTask();
                props.setError("Error Fetching SF/ Segment Data " + e);
            }
            setLoading(false);
        }
    }, [ phone]);

    const afterCompleteTask = () => {
        setLoading(false);
        props.setEmptyContact();
    };

    useEffect(() => {
        fetchDataForTask();
    },[]);

    const taskSid = get(props, "task.sid");

    useEffect(() => {
        const mobileno = get(props, "userData.segmentData.traits.customerInfo.mobileno");
        if (isEmpty(phone) || isEmpty(taskSid)) {
            afterCompleteTask();
        }
        else if (!isEqual(phone, mobileno) || (phone && isEmpty(mobileno))) {
            fetchDataForTask();
        }
    },[taskSid]);

    useEffect(() => {
        props.FlexActions.addListener("afterCompleteTask", afterCompleteTask);
        props.FlexActions.addListener("afterRejectTask", afterCompleteTask);
        return () => {
            props.FlexActions.removeListener("afterCompleteTask", afterCompleteTask);
            props.FlexActions.removeListener("afterRejectTask", afterCompleteTask);
        }
    });

    return (
        // @ts-ignore
        <Theme.Provider theme="default" >
        <>
            {loading ? 
                (<Box width="100%" height="100%" padding="space40">
                    <LoadingPhase/>
                </Box>) : null
            }
            <SalesforceCrmView
                segment={props.userData.segmentData}
                error={props.userData.error}
            />
        </>
        </Theme.Provider>
    );
}

const mapStateToProps = (state: AppState) => {
    return {
        userData: state["finance-solution"].salesforceSSO,
    }
};

const mapDispatchToProps = (dispatch : Dispatch<ActionState>) => ({
    setLoading: (loading: boolean) => dispatch(Action.setLoading(loading)),
    setEmptyContact: () => dispatch(Action.setEmptyContact()),
    fetchSegmentInfo: (phone: string) => dispatch(Action.fetchSegmentInfo(phone)),
    setError: (error: string) => dispatch(Action.setError(error))
});

// Connect presentational component to Redux
export default withTaskContext<any>(connect(mapStateToProps, mapDispatchToProps)(SalesforceCrmContainer));