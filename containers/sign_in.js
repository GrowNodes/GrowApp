import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import {signinUser} from '../actions/sign_in'

import {
  Page,
  Toolbar
} from 'react-onsenui';


// import {fetchNodes} from '../../Nodes/actions/nodes_actions'
// import {mqttConnect} from '../../Mqtt/actions/mqtt_actions'

class SignIn extends Component {
    handleFormSubmit({email, password}) {
        this.props.signinUser({email, password})
        // .then(() => this.props.fetchNodes())
        // .then(() => this.props.mqttConnect())
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    {this.props.errorMessage}
                </div>
            );
        };
    }


    render () {
        const { handleSubmit, fields: {email, password}} = this.props;


        return (
            <Page renderToolbar={() => <NavBar title='Grow Nodes Sign In' navigator={navigator} />}>
                {this.renderError()}
                <div className="login-form">
                    <form className="text-left" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <input {...email} type="email" className="text-input--underbar" placeholder="Email" />
                        <input {...password} type="password" className="text-input--underbar" placeholder="Password" />
                        <br/><br/>
                        <input type="submit" value="Sign In" />
                        <ons-button modifier="large" class="login-button">Log In</ons-button>
                        <br/><br/>
                        <ons-button modifier="quiet" class="forgot-password">Forgot password?</ons-button>
                    </form>
                </div>
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, {signinUser, fetchNodes, mqttConnect})(SignIn);
