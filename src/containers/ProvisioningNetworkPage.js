import React, { Component } from 'react';
import {connect} from 'react-redux';
import ProvisioningNetworkForm from './ProvisioningNetworkForm'
import MainPage from '../components/MainPage';
import {signinUser} from '../actions/sign_in'
import _ from 'lodash'
import ons from 'onsenui';
import NavBar from '../components/NavBar';
import {
  Page,
  Toolbar,
  Button,
  Notification
} from 'react-onsenui';

class ProvisioningNetworkPage extends React.Component {
	constructor(props) {
		super(props);
		this.navigator = props.navigator
	}

// https://github.com/OnsenUI/react-onsenui/issues/82#issuecomment-237746900
  handleSubmit(values) {
    console.log(values);
    let that = this
    
    // this.props.signinUser(values)

  }


  render() {
    return (
      <Page renderToolbar={() => <NavBar title={"Connect"} navigator={this.props.navigator} backButton={true}/>}>
          <ProvisioningNetworkForm onSubmit={this.handleSubmit.bind(this)} />
      </Page>
    );
  }
}

export default connect(null, {signinUser})(ProvisioningNetworkPage)