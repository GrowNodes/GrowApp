import {
    PROVISIONING_SELECT_NETWORK,
    PROVISIONING_SET_PSK,

    PROVISIONING_NETWORKS_LIST_FETCHING,
    PROVISIONING_NETWORKS_LIST_FETCH_FAILED,
    PROVISIONING_NETWORKS_LIST_FETCHED,

    PROVISIONING_SYSINFO_FETCHING,
    PROVISIONING_SYSINFO_FETCHED,
    PROVISIONING_SYSINFO_FETCH_FAILED,

    PROVISIONING_TEST_CREDS_SENDING,
    PROVISIONING_TEST_CREDS_SEND_FAILED,
    PROVISIONING_TEST_CREDS_SENT
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


export function sendTestCreds(ssid, psk) {
  const NETWORKS_LIST_ENDPOINT = 'http://homie.config/wifi/connect'

  const request = new Request(NETWORKS_LIST_ENDPOINT, {
      method: 'PUT',
      body: JSON.stringify({
        "ssid": ssid,
        "password": psk
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
