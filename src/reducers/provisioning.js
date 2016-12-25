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
                homieScannedNetworks: _.orderBy(
                    mergeSSID(state.homieScannedNetworks, action.payload),
                    ['rssi'], ['desc']
                )
            }

        case PROVISIONING_SELECT_NETWORK: 
            return {
                ...state,
                objToSend: {...state.objToSend, wifi: {ssid: action.payload}}
            }
    }

    return state;
}


const mergeSSID = function(old_ssids, new_ssids) {
    // TODO make this more efficient

    // Convert to objects
    var ssids_obj = _.keyBy(old_ssids, 'ssid')
    const new_ssids_obj = _.keyBy(new_ssids, 'ssid')

    // Set RSSI of existing SSIDs to minimum, -120
    Object.keys(ssids_obj).map(function(key, index) {
       ssids_obj[key].rssi = -100
    });

    // Merge SSID and RSSI
    Object.keys(new_ssids_obj).map(function(key, index) {
       ssids_obj[key] = new_ssids_obj[key];
    });
    
    return _.values(ssids_obj)
}