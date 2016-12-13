import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, submit } from 'redux-form';
import {
  Page,
  Toolbar,
  Button
} from 'react-onsenui';
import NavBar from '../components/NavBar';


const styles = {
  "login_form": {
    "textAlign": "center",
    "width": "80%",
    "margin": "60px auto 0"
  },
  "input_type_email": {
    "display": "block",
    "width": "100%",
    "margin": "0 auto",
    "outline": "none",
    "height": "100%",
    "paddingTop": "15px",
    "paddingBottom": "16px"
  },
  "input_type_password": {
    "display": "block",
    "width": "100%",
    "margin": "0 auto",
    "outline": "none",
    "height": "100%",
    "paddingTop": "15px",
    "paddingBottom": "16px"
  },
  "login_button": {
    "width": "100%",
    "margin": "0 auto"
  },
  "forgot_password": {
    "display": "block",
    "margin": "8px auto 0 auto",
    "fontSize": "14px"
  }
}





class SignInForm extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
                <div style={styles.login_form}>
                    <form onSubmit={handleSubmit}>
                        <Field name="email" component="input" type="text" className="text-input--underbar" placeholder="Email" />
                        <Field name="password" component="input" type="text" className="text-input--underbar" placeholder="Password" />
                        <br/>
                        <p style={{color: "red"}}>{this.props.auth_error}</p>
                        <br/>
                        <Button modifier="large" style={styles.login_button} onClick={() => this.props.submit('sign_in')}>Sign In</Button>
                        <br/><br/>
                        <Button modifier="quiet" style={styles["forgot-password"]}>Forgot password?</Button>
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
})(SignInForm))

