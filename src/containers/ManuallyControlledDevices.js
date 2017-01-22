import React, {Component, PropTypes} from "react";

import {connect} from "react-redux";

import {mqttSend} from "../actions/mqtt";

import {Switch} from "react-onsenui";

class ManuallyControlledDevices extends Component {
  handleAirPumpChange(e) {
    const msgToSend = e.target.checked ? "true" : "false";

    this.props.mqttSend(`${this.props.node.serial}/air_pump/on/set`, msgToSend);
  }

  render() {
    return (
      <div>
        Air Pump<Switch checked={this.props.node["air_pump/on"]} onChange={
          this.handleAirPumpChange.bind(this)
        } />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  node: state.user_nodes[state.selectedUserNode]
});

export default connect(mapStateToProps, { mqttSend })(ManuallyControlledDevices)
