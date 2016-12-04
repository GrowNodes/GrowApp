import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';
import {AppContainer} from 'react-hot-loader';

import MqttInstance from './util/Mqtt.js';
import {mqttIncoming} from './actions/mqtt';
import {bindAuthState} from './actions/bind_auth'
import { MQTT_CONNECT_CMD, MQTT_DISCONNECT_CMD, MQTT_SEND_CMD } from './actions/types.js';

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
store.subscribe(sock.wsListener);




store.dispatch(bindAuthState());








const rootElement = document.getElementById('root');

ons.ready(() => render(
  <AppContainer>
    <Provider store={store}>
      <App store={store}/>
    </Provider>
  </AppContainer>,
  rootElement
));

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
