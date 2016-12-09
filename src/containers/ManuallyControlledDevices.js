import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {mqttSend} from '../actions/mqtt'
import {
  Switch
} from 'react-onsenui';


class ManuallyControlledDevices extends Component {
    
    handleAirPumpChange(e) {
        const msgToSend = e.target.checked ? "true" : "false"
        this.props.mqttSend(`${this.props.node.serial}/air_pump/on/set`, msgToSend)
    }

    handleWaterPumpChange(e) {
        const msgToSend = e.target.checked ? "true" : "false"
        this.props.mqttSend(`${this.props.node.serial}/water_pump/on/set`, msgToSend)
    }

    render () {
        return (
            <div>
            Air Pump <Switch checked={this.props.node["air_pump/on"]} onChange={this.handleAirPumpChange.bind(this)} />
            <br/>
            Water Pump <Switch checked={this.props.node["water_pump/on"]} onChange={this.handleWaterPumpChange.bind(this)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  node: state.user_nodes[state.selectedUserNode]
});

export default connect(mapStateToProps, {mqttSend})(ManuallyControlledDevices);
