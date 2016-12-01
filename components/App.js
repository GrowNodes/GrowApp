import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  Navigator
} from 'react-onsenui';

import MainPage from './MainPage';
import SignInPage from '../containers/SignInPage';

class App extends Component {
  renderPage(route, navigator) {
    if (!this.props.authenticated) {
      console.log("redirecting to sign in page")
      route.component = SignInPage
    }
    const props = route.props || {}
    props.navigator = navigator
    return React.createElement(route.component, props)
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
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps, null)(App)