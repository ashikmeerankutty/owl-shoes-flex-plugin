/* eslint-disable func-names */

import { ActionState } from "../../states/reducer";
import { ACTION_CONSTANTS } from "./Actions";

const initialState = {
  error: "",
  segmentData: {}
};

export function reduce(state = initialState, action: ActionState) {
  switch (action.type) {
    case `${ACTION_CONSTANTS.SET_ERROR}` : {
      return { ...state, error: action.payload };
    }
    case `${ACTION_CONSTANTS.FETCH_SEGMENT_INFO}_REJECTED`: {
      debugger
      return { ...state, error: action.payload }
    }
    case `${ACTION_CONSTANTS.FETCH_SEGMENT_INFO}_FULFILLED`: {
      return { ...state, segmentData: action.payload }
    }
    case ACTION_CONSTANTS.SET_EMPTY_CONTACT_DATA : {
      return { ...state, segmentData: {} }
    }
    case `${ACTION_CONSTANTS.FETCH_SEGMENT_INFO}_PENDING`:
    default:
      return state;
  }
}
