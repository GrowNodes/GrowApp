import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, submit } from 'redux-form';
import {
  Page,
  Toolbar,
  Button
} from 'react-onsenui';
import NavBar from '../components/NavBar';


class ProvisioningNetworkConfigForm extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
                <div>
                    <form onSubmit={handleSubmit}>
                        <Field name="psk" component="input" type="text" className="text-input--underbar" placeholder="password" />
                        <br/>
                        <p style={{color: "red"}}>{this.props.auth_error}</p>
                        <br/>
                        <Button modifier="large" onClick={() => this.props.submit()}>Verify Settings</Button>
                    </form>
                </div>

    );
  }
}

const mapStateToProps = (state) => ({
  auth_error: state.auth.error.message
});


export default connect(mapStateToProps, null)(reduxForm({
  form: 'sign_in' // a unique name for this form
})(ProvisioningNetworkConfigForm))
