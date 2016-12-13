import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {
  Page,
  Button
} from 'react-onsenui';
import NavBar from './NavBar';
import {signoutUser} from '../actions/sign_out'
import {mqttDisconnect} from '../actions/mqtt'
import MainPage from './MainPage'

class UserSettings extends Component {

    signOut() {
        this.props.signoutUser()
        this.props.mqttDisconnect()
    }



    render() {
      console.log(window.user)
        return (
          <Page renderToolbar={() => <NavBar title='Settings' navigator={this.props.navigator} backButton={true}/>}>
            <strong>Signed in as {}</strong><br/>
            <Button onClick={() => this.signOut() }>Sign Out</Button>
          </Page>
        );
    }
}

export default connect(null, {signoutUser, mqttDisconnect})(UserSettings);