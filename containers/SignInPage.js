import React, { Component } from 'react';
import {connect} from 'react-redux';
import SignInForm from './sign_in_form.js'
import {signinUser} from '../actions/sign_in'
import MainPage from '../components/MainPage';

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
    .then(() => {
      	console.log(that.props.auth.authenticated)
      if (that.props.auth.authenticated) {
      	that.props.navigator.pushPage({component: MainPage})
      } else if (that.props.auth.error) {
      	ons.notification.alert(that.props.auth.error, {title: "Couldn't Sign In"})
      }
    })
  }
  render() {
    return (
      <SignInForm onSubmit={this.handleSubmit.bind(this)} />
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}


export default connect(mapStateToProps, {signinUser})(SignInPage)