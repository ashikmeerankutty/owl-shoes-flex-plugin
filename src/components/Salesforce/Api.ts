import axios, { AxiosError } from "axios";

export function getSegmentData(phone : string) {
    return axios({
        method: 'get',
        params: {
            phone
        },
        url: `${process.env.REACT_APP_SERVERLESS_DOMAIN}/segment`,
        headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        }
    })
    .then(response => response.data)
    .catch((err: AxiosError) => {
        console.error("CRM user fetch failed, response:", err);
        debugger;
        throw new Error("Failed to fetch Contact Information from Segment");
    });
}
