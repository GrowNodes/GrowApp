import {
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
    homieDeviceInfo: {}
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
                homieScannedNetworks: action.payload
            }
    }

    return state;
}