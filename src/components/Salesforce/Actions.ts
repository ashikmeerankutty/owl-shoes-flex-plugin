import * as API from "./Api";

export interface SegmentDataState {
    "traits": {
        "activeMarketingCampaigns": Array<string>;
        "branchPageWeeklyVisits": any;
        "city": string;
        "email": string;
        "employmentDetails": {
            "salarySlab": string;
            "sector": string;
        },
        "loan_amount": string;
        "loans": Array<string>;
        "location": string;
        "mobileno": string;
        "name": string;
        "otherProducts": Array<string>;
        "product": string;
        "relatedUsers": Array<string>;
        "riskCategory": string;
        "spendPattern": Array<string>;
        "state": string;
        "vehicleOwner": string;
        "customerInfo": {
            "addresses": [
                {
                    "addressType": string;
                    "city": string;
                    "country": string;
                    "state": string;
                    "street": string;
                }
            ],
            "email": string;
            "firstName": string;
            "lastName": string;
            "loyaltyInfo": {
                "programName": string;
            },
            "mobileno": string;
            "salutation": string;
        },
        "enquiredProducts": [
            {
                "enquiredDate": string;
                "productImageUrl": string;
                "productName": string;
                "productSku": string;
                "timeSpend": string;
            }
        ],

    },
    "cursor": {
        "url": string;
        "has_more": boolean;
        "next": string;
        "limit": number;
    }
}

export interface CRMState {
    error: string;
    segmentData: SegmentDataState;
}

export const ACTION_CONSTANTS = {
    GET_ACCESS_TOKEN: "GET_ACCESS_TOKEN",
    GET_CONTACT_DATA: "GET_CONTACT_DATA",
    SET_EMPTY_CONTACT_DATA: "SET_EMPTY_CONTACT_DATA",
    FETCH_SF_INFO: "FETCH_SF_INFO",
    FETCH_SEGMENT_INFO: "FETCH_SEGMENT_INFO",
    SET_LOADING: "SET_LOADING",
    SALESFORCE_AUTH: "SALESFORCE_AUTH",
    MAX_SFDC_RECORDS: 100,
    SET_ERROR: "SET_ERROR"
}

export const Action = {
    setLoading: (loading: boolean) => ({ type: ACTION_CONSTANTS.SET_LOADING, payload: loading }),
    fetchSegmentInfo: (phone: string) => ({ type: ACTION_CONSTANTS.FETCH_SEGMENT_INFO, payload: API.getSegmentData(phone) }),
    setEmptyContact: () => ({ type: ACTION_CONSTANTS.SET_EMPTY_CONTACT_DATA }),
    setError: (error: string) => ({ type: ACTION_CONSTANTS.SET_ERROR, payload: error })
};
