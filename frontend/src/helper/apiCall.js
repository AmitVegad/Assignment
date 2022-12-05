import axios from "axios"
let source;
const apiCall = async ({
    path,
    body,
    method = "GET",
    timeout = 180000,
    isTimeoutEnabled = true,
}) => {

    source = axios.CancelToken.source();
    try {
        if (isTimeoutEnabled) {
            setTimeout(() => {
                source.cancel("Cancelling after 100ms");
            }, timeout);
        }
        const options = {
            url: `${path}`,
            method: method,
            data:body,
        };
        const response = await axios(options);
        let apiRes = {};
        if (response && response.data) {
            apiRes = response.data;
        }
        return apiRes;
    } catch (error) {
        return error
    }
};

export default apiCall;