import React, { Component } from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid'
import {
  Navigator
} from 'react-onsenui';

import MainPage from '../components//MainPage';
import SignInPage from './SignInPage';
import Base from '../util/Base'

import {getUserNodes} from '../actions/user_nodes';
import {mqttConnect} from '../actions/mqtt';

class App extends Component {
  componentDidMount() {
    this.props.getUserNodes(this).then(() => this.props.mqttConnect())
  }

  renderPage(route, navigator) {
    return <route.component key={uuid.v4()} navigator={navigator} />
  }

  render() {
      return (
        <Navigator
          renderPage={this.renderPage.bind(this)}
          initialRoute={{component: MainPage, key: 'MAIN_PAGE'}}
        />
      );
  }
}

export default connect(null, {getUserNodes, mqttConnect})(App)