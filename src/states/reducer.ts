import Flex from "@twilio/flex-ui";
import { Action as ReduxAction, combineReducers } from "redux";
import { reduce as SalesforceSSOReducer } from "../components/Salesforce/Reducer";
import { CRMState } from "../components/Salesforce/Actions";

// Register your redux store under a unique namespace
export const namespace = "finance-solution";

export interface ActionState extends ReduxAction {
  payload?: any;
  type: string;
}

// Register all component states under the namespace
export interface AppState {
  flex: Flex.AppState;
  "finance-solution": {
    salesforceSSO: CRMState
  };
}

// Combine the reducers
export default combineReducers({
  // flex: Flex.FlexReducer,
  salesforceSSO: SalesforceSSOReducer
});
