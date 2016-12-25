import {
    PROVISIONING_NETWORKS_LIST_FETCHING,
    PROVISIONING_NETWORKS_LIST_FETCH_FAILED,
    PROVISIONING_NETWORKS_LIST_FETCHED,

    PROVISIONING_SYSINFO_FETCHING,
    PROVISIONING_SYSINFO_FETCHED,
    PROVISIONING_SYSINFO_FETCH_FAILED
} from './types';



export function fetchSysInfo() {
    const SYSINFO_ENDPOINT = 'http://homie.config/device-info'

    const request = new Request(SYSINFO_ENDPOINT, {
        method: 'GET',
    });

    return (dispatch) => {
        dispatch({ type: PROVISIONING_SYSINFO_FETCHING });
        return fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(
                (payload) => dispatch({ type: PROVISIONING_SYSINFO_FETCHED, payload}),
                (error) => dispatch({ type: PROVISIONING_SYSINFO_FETCH_FAILED, payload: error })
            );
    }
}


export function fetchNetworksList() {
    const NETWORKS_LIST_ENDPOINT = 'http://homie.config/networks'

    const request = new Request(NETWORKS_LIST_ENDPOINT, {
        method: 'GET',
    });

    return (dispatch) => {
        dispatch({ type: PROVISIONING_NETWORKS_LIST_FETCHING });
        return fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(
                (result) => dispatch({ type: PROVISIONING_NETWORKS_LIST_FETCHED, payload: result.networks}),
                (error) => dispatch({ type: PROVISIONING_NETWORKS_LIST_FETCH_FAILED, payload: error })
            );
    }
}