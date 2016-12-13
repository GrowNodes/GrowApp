import React, { Component } from 'react';
import {connect} from 'react-redux';
import SignInForm from './sign_in_form.js'
import MainPage from '../components/MainPage';
import {signinUser} from '../actions/sign_in'
import _ from 'lodash'
import ons from 'onsenui';

import {
  Notification
} from 'react-onsenui';

class SignInPage extends React.Component {
	constructor(props) {
		super(props);
		this.navigator = props.navigator
	}



// https://github.com/OnsenUI/react-onsenui/issues/82#issuecomment-237746900
  handleSubmit(values) {
    console.log(values);
    let that = this
    
    this.props.signinUser(values)

  }


  render() {
    return (
      <SignInForm onSubmit={this.handleSubmit.bind(this)} />
    );
  }
}

export default connect(null, {signinUser})(SignInPage)