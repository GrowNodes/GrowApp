import {
  PROVISIONING_SELECT_NETWORK,
  PROVISIONING_SET_PSK,
  PROVISIONING_SSID_FETCHED,

  PROVISIONING_NETWORKS_LIST_STARTED_REFRESHING,
  PROVISIONING_NETWORKS_LIST_STOPPED_REFRESHING,
  PROVISIONING_NETWORKS_LIST_FETCHING,
  PROVISIONING_NETWORKS_LIST_FETCH_FAILED,
  PROVISIONING_NETWORKS_LIST_FETCHED,

  PROVISIONING_SYSINFO_FETCHING,
  PROVISIONING_SYSINFO_FETCHED,
  PROVISIONING_SYSINFO_FETCH_FAILED,

  PROVISIONING_TEST_CREDS_SENDING,
  PROVISIONING_TEST_CREDS_SEND_FAILED,
  PROVISIONING_TEST_CREDS_SENT,

  PROVISIONING_WIFI_STATUS_STARTED_REFRESHING,
  PROVISIONING_WIFI_STATUS_STOPPED_REFRESHING,
  PROVISIONING_WIFI_STATUS_FETCHING,
  PROVISIONING_WIFI_STATUS_FETCHED,
  PROVISIONING_WIFI_STATUS_FETCH_FAILED,
} from './types';


export function selectNetwork(ssid) {
    return (dispatch) => {
        dispatch({type: PROVISIONING_SELECT_NETWORK, payload: ssid})
    }
}

export function setPsk(psk) {
    return (dispatch) => {
        dispatch({type: PROVISIONING_SET_PSK, payload: psk})
    }
}

export function startRefreshingNetworksList() {
  return (dispatch) => {
    dispatch(fetchNetworksList()) // setInterval doesn't start immediately
    const intervalId = setInterval(() => {
      dispatch(fetchNetworksList())
    }, 5000);
    dispatch({type: PROVISIONING_NETWORKS_LIST_STARTED_REFRESHING, payload: intervalId})
  }
}

export function stopRefreshingNetworksList() {
  return (dispatch, getState) => {
    clearInterval(getState().provisioning.homieScannedNetworksSetIntervalId)
    dispatch({type: PROVISIONING_NETWORKS_LIST_STOPPED_REFRESHING})
  }
}

function fetchNetworksList() {
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


export function sendTestCreds(ssid, psk) {
  const TEST_CREDS_ENDPOINT = 'http://homie.config/wifi/connect'

  const request = new Request(TEST_CREDS_ENDPOINT, {
      method: 'PUT',
      body: JSON.stringify({
        ssid,
        password: psk
      })
  });

  return (dispatch) => {
      dispatch({ type: PROVISIONING_TEST_CREDS_SENDING });
      return fetch(request)
          .then((response) => {
              console.log(response)
              return response.json();
          })
          .then(
              (result) => dispatch({ type: PROVISIONING_TEST_CREDS_SENT, payload: result}),
              (error) => dispatch({ type: PROVISIONING_TEST_CREDS_SEND_FAILED, payload: error })
          );
  }
}


export function startRefreshingWifiStatus() {
  return (dispatch) => {
    dispatch(fetchWifiStatus()) // setInterval doesn't start immediately
    const intervalId = setInterval(() => {
      dispatch(fetchWifiStatus())
    }, 5000);
    dispatch({type: PROVISIONING_WIFI_STATUS_STARTED_REFRESHING, payload: intervalId})
  }
}

export function stopRefreshingWifiStatus() {
  return (dispatch, getState) => {
    clearInterval(getState().provisioning.homieWifiStatusSetIntervalId)
    dispatch({type: PROVISIONING_WIFI_STATUS_STOPPED_REFRESHING})
  }
}

function fetchWifiStatus() {
    const WIFI_STATUS_ENDPOINT = 'http://homie.config/wifi/status'

    const request = new Request(WIFI_STATUS_ENDPOINT, {
        method: 'GET',
    });

    return (dispatch) => {
        dispatch({ type: PROVISIONING_WIFI_STATUS_FETCHING });
        return fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(
                (result) => dispatch({ type: PROVISIONING_WIFI_STATUS_FETCHED, payload: result.status}),
                (error) => dispatch({ type: PROVISIONING_WIFI_STATUS_FETCH_FAILED, payload: error })
            );
    }
}