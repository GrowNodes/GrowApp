
import React, { Component } from 'react';

import SignInForm from './sign_in_form.js'

class ContactPage extends React.Component {
  handleSubmit(values) {
    // Do something with the form values
    console.log(values);
  }
  render() {
    return (
      <SignInForm onSubmit={this.handleSubmit} />
    );
  }
}
export default ContactPage