import React, {Component, PropTypes} from "react";

import {connect} from "react-redux";

import {mqttSend} from "../actions/mqtt";

import {Switch} from "react-onsenui";

class ManuallyControlledDevices extends Component {
  handleWaterPumpChange(e) {
    const msgToSend = e.target.checked ? "true" : "false";
    this.props.mqttSend(`${this.props.node.serial}/water_pump_override/enabled/set`, msgToSend);
  }

  render() {
    return (
      <div>
        Override water pump to ON <Switch checked={this.props.node["water_pump_override/enabled"]} onChange={
          this.handleWaterPumpChange.bind(this)
        } />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  node: state.user_nodes[state.selectedUserNode]
});

export default connect(mapStateToProps, { mqttSend })(ManuallyControlledDevices)
