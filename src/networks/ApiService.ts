import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getDataStorage } from '../utils/manageLocalStorage';
import config from './config';

function getIRequestProp() {
    const serverUrl = config.api_base_url;
    let userData = JSON.parse(getDataStorage());
    let token;
    token = userData !== null ? userData['access_token'] : '';
    let content_type;
    content_type = 'application/x-www-form-urlencoded';

    return {
        serverUrl: serverUrl,
        requestHeader: {
            'Content-Type': content_type,
            Authorization: `Bearer ${token}`
        }
    };
}

async function get(url : String, parameter?: Object): Promise<AxiosResponse> {
    const {serverUrl, requestHeader} = getIRequestProp();
    return axios.get<typeof get>(serverUrl + url, {
        params: parameter,
        headers: requestHeader
    });
}

async function post(url: String, body: Object): Promise<AxiosResponse> {
    const {serverUrl, requestHeader} = getIRequestProp();
    return axios.post(serverUrl + url, body, {
        headers: requestHeader
    });
}

async function put(url: String, body: Object) {
    const {serverUrl, requestHeader} = getIRequestProp();
    return axios.put(serverUrl + url, body, {
        headers: requestHeader
    });
}


async function remove(url: String, body: Object) {
    const {serverUrl, requestHeader} = getIRequestProp();
    return axios.delete(serverUrl + url, {
        data: body,
        headers: requestHeader
    });
}

const AxiosServices = {
    get,
    post,
    put,
    remove
};
export default AxiosServices;
