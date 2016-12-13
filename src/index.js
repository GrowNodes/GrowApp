import React from 'react';
import {render} from 'react-dom';
import Base from './util/Base';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';
import {AppContainer} from 'react-hot-loader';

import MqttInstance from './util/Mqtt.js';
import {mqttIncoming} from './actions/mqtt';
import { MQTT_CONNECT_CMD, MQTT_DISCONNECT_CMD, MQTT_SEND_CMD, AUTHED_USER } from './actions/types.js';
import {getUserNodes} from './actions/user_nodes';
import {mqttConnect} from './actions/mqtt';
import weatherApp from './reducers';
import App from './containers/App';

// import './icons/css/weather-icons.css';

import ons from 'onsenui';
import 'onsenui/css/onsenui.css';
import './stylus/index.styl';

// const logger = createLogger();

const store = createStore(weatherApp,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  process.env.NODE_ENV === 'production'
  ? applyMiddleware(thunk)
  : applyMiddleware(thunk/*, logger */)
  );



const sock = {
  ws: null,
  URL: 'demo.grownodes.com',
  wsDipatcher: (topic, message) => {
    return store.dispatch(mqttIncoming(topic, message));
  },
  wsListener: () => {
    const { lastAction } = store.getState();

    switch (lastAction.type) {
      case MQTT_SEND_CMD:
      return sock.ws.sendMessage(lastAction.topic, lastAction.message);

      case MQTT_CONNECT_CMD:
      return sock.startWS();

      case MQTT_DISCONNECT_CMD:
      return sock.stopWS();

      default:
      return;
    }
  },
  stopWS: () => {
    if (sock.ws) sock.ws.close();
    sock.ws = null
  },
  startWS: () => {
    if(!!sock.ws) sock.ws.close();
    const { user_nodes } = store.getState();
    const serials = Object.keys(user_nodes)
    sock.ws = new MqttInstance(sock.URL, sock.wsDipatcher, serials)
  }
};
// sock.wsListener();

window.isCordova = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
if (isCordova) {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  onDeviceReady();
}



function onDeviceReady() {
  store.subscribe(sock.wsListener);
  // store.dispatch(bindAuthState());
  Base.auth().onAuthStateChanged(function(user) {
    if (user) {
      store.dispatch({ type: AUTHED_USER });
      store.dispatch(getUserNodes(this)).then(() => store.dispatch(mqttConnect()))
    } else {
      console.log("u need to log in bro")
    }
    launchApp()
  })
}

function onPause() {
    // Handle the pause event
    console.log("paused");
  }

  function onResume() {
    // Handle the resume event
    console.log("resume");
  }

  function onMenuKeyDown() {
    // Handle the menubutton event
    console.log("menu key down")
  }

// Add similar event handlers for other events


function launchApp() {
  if (window.app_launched) {
    return
  }
  window.app_launched = true

  console.log("launchApp", Base.auth())
  if (typeof FCMPlugin !== 'undefined') {
    // FCMPlugin.subscribeToTopic(user.uid)
    FCMPlugin.onNotification(
      function(data){
        if(data.wasTapped){
          //Notification was received on device tray and tapped by the user.
          alert( JSON.stringify(data) );
        }else{
          //Notification was received in foreground. Maybe the user needs to be notified.
          alert( JSON.stringify(data) );
        }
      },
      function(msg){
        console.log('onNotification callback successfully registered: ' + msg);
      },
      function(err){
        console.log('Error registering onNotification callback: ' + err);
      }
    );
  };


  const rootElement = document.getElementById('root');
  document.addEventListener("pause", onPause, false);
  document.addEventListener("resume", onResume, false);
  document.addEventListener("menubutton", onMenuKeyDown, false);

  render(
    <AppContainer>
    <Provider store={store}>
    <App store={store}/>
    </Provider>
    </AppContainer>,
    rootElement
    )

  if (module.hot) {
    module.hot.accept('./containers/App', () => {
      const NextApp = require('./containers/App').default;
      render(
        <AppContainer>
        <Provider store={store}>
        <NextApp store={store}/>
        </Provider>
        </AppContainer>,
        rootElement
        );
    });
  }

}