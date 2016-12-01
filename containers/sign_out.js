import React, { Component } from 'react';
import { connect } from 'react-redux';
import {signoutUser} from '../actions/sign_out'
import {mqttDisconnect} from '../../Mqtt/actions/mqtt_actions'

class SignOut extends Component {
    componentDidMount() {
        this.props.signoutUser();
        this.props.mqttDisconnect();
    }

    render () {
        return (
            <div>You have been signed out</div>
        );
    }
}

export default connect(null, {signoutUser, mqttDisconnect})(SignOut);
