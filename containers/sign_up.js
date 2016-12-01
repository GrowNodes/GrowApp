import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions/auth_actions'

class SignUp extends Component {
    handleFormSubmit(formProps) {
        this.props.signupUser(formProps);
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    {this.props.errorMessage}
                </div>
            )
        };
    }

    render () {
        const { handleSubmit, fields: {email, password, passwordConfirm}} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email</label>
                    <input {...email} className="form-control" />
                    { email.touched && email.error && <div className="error text-danger">{email.error}</div> }
                </fieldset>
                <fieldset className="form-group">
                    <label>Password</label>
                    <input {...password} type="password" className="form-control" />
                    { password.touched && password.error && <div className="error text-danger">{password.error}</div> }
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password</label>
                    <input {...passwordConfirm} type="password" className="form-control" />
                    { passwordConfirm.touched && passwordConfirm.error && <div className="error text-danger">{passwordConfirm.error}</div> /* returns the last if all are true */ }
                </fieldset>
                {this.renderError()}
                <button action="submit" className="btn btn-primary">Sign Up!</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};

    // @todo use for each function
    if (!formProps.email) {
        errors.email = 'Please enter an email';
    };

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    };

    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please confirmation your password';
    };

    if (formProps.password !== formProps.passwordConfirm) {
        errors.passwordConfirm = "Passwords don't match!"
    }

    return errors;
}


function mapStateToProps(state) {
    return { errorMessage: state.auth.error }
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(SignUp);
