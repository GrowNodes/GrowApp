import _ from 'lodash';

import {
    PROVISIONING_SELECT_NETWORK,

    PROVISIONING_NETWORKS_LIST_FETCHING,
    PROVISIONING_NETWORKS_LIST_FETCH_FAILED,
    PROVISIONING_NETWORKS_LIST_FETCHED,
    PROVISIONING_SYSINFO_FETCHING,
    PROVISIONING_SYSINFO_FETCHED,
    PROVISIONING_SYSINFO_FETCH_FAILED
} from '../actions/types';

const INITIAL_STATE = {
    phoneConnectedSSID: null,
    homieScannedNetworks: [],
    homieDeviceInfo: {},
    objToSend: {}
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case PROVISIONING_SYSINFO_FETCHED:

            return {
                ...state,
                homieDeviceInfo: action.payload
            }

        case PROVISIONING_NETWORKS_LIST_FETCHED:
            return {
                ...state,
                homieScannedNetworks: _.orderBy(action.payload, ['rssi'], ['desc'])
            }

        case PROVISIONING_SELECT_NETWORK: 
            return {
                ...state,
                objToSend: {...state.objToSend, wifi: {ssid: action.payload}}
            }
    }

    return state;
}