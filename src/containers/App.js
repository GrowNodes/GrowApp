import React, { Component } from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid'
import {
  Navigator
} from 'react-onsenui';

import MainPage from '../components//MainPage';
import SignInPage from './SignInPage';
import Base from '../util/Base'

class App extends Component {

  renderPage(route, navigator) {
    return <route.component key={uuid.v4()} navigator={navigator} />
  }

  render() {

    if (this.props.authed) {
      return (
        <Navigator
          renderPage={this.renderPage.bind(this)}
          initialRoute={{component: MainPage, key: 'MAIN_PAGE'}}
        />
      );
    } else {
      return(
          <SignInPage/>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  authed: state.auth.authenticated
});

export default connect(mapStateToProps)(App)