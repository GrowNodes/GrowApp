import React, { Component } from 'react';
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

    renderError() {
        // if (this.props.errorMessage) {
        //     return (
        //         <div className="alert alert-danger">
        //             {this.props.errorMessage}
        //         </div>
        //     );
        // };
    }
  render() {
    const { handleSubmit } = this.props;
    return (
                <div style={styles.login_form}>
                {this.renderError()}
                    <form onSubmit={handleSubmit}>
                        <Field name="email" component="input" type="text" className="text-input--underbar" placeholder="Email" />
                        <Field name="password" component="input" type="text" className="text-input--underbar" placeholder="Password" />
                        <br/><br/>
                        <Button modifier="large" style={styles.login_button} onClick={() => this.props.submit('contact')}>Sign In</Button>
                        <br/><br/>
                        <Button modifier="quiet" style={styles["forgot-password"]}>Forgot password?</Button>
                    </form>
                </div>
            
    );
  }
}

// Decorate the form component
SignInForm = reduxForm({
  form: 'contact' // a unique name for this form
}, null, {submit})(SignInForm);

export default SignInForm           