import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  Navigator
} from 'react-onsenui';

import MainPage from '../components//MainPage';
import SignInPage from './SignInPage';
import Base from '../util/Base'

import {getUserNodesIfNeeded} from '../actions/user_nodes';
import {mqttConnect} from '../actions/mqtt';

class App extends Component {
  componentWillMount() {
    Base.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("getting user nodes and connecting to mqtt", user)
            this.props.getUserNodesIfNeeded(this).then(() => this.props.mqttConnect())
        }
    })
  }

  renderPage(route, navigator) {
    console.log(route)
    if (!Base.auth().currentUser) {
        return <SignInPage key={route.component} navigator={navigator} />
    } else {
      return <route.component key={route.component} navigator={navigator} />
    }
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


function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, auth_waiting: state.auth.waiting }
}

export default connect(mapStateToProps, {getUserNodesIfNeeded, mqttConnect})(App)