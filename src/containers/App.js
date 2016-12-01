import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  Navigator
} from 'react-onsenui';

import MainPage from '../components//MainPage';
import SignInPage from './SignInPage';

import {checkAuthIfNeeded} from '../actions/check_auth';
import {getUserNodesIfNeeded} from '../actions/user_nodes';

class App extends Component {
  componentWillMount() {
    this.props.checkAuthIfNeeded()
    .then(() => this.props.getUserNodesIfNeeded())
    console.log("appwillmount")
  }

  renderPage(route, navigator) {
    if (!this.props.authenticated) {
        return <SignInPage key={route.key} navigator={navigator} />
    } else {
      return <route.component key={route.key} navigator={navigator} />
    }
  }

  render() {

    if (this.props.auth_waiting) {
      return <div>splash screen here</div>
    } else {
      return (
        <Navigator
          renderPage={this.renderPage.bind(this)}
          initialRoute={{component: MainPage, key: 'MAIN_PAGE'}}
        />
      );
    }
  }
}


function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, auth_waiting: state.auth.waiting }
}

export default connect(mapStateToProps, {checkAuthIfNeeded, getUserNodesIfNeeded})(App)