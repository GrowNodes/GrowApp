import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import Moment from "react-moment"
import TimeAgo from "react-timeago"
import NavBar from "../components/NavBar"
import CurrentGrowStage from "./CurrentGrowStage"
import GrowStageChanger from "./GrowStageChanger"
import ManuallyControlledDevices from "./ManuallyControlledDevices"
import NodeTodoList from "./NodeTodoList"
import {Page, Button} from "react-onsenui"

class NodePage extends Component {

  renderContent() {
    const node = this.props.node;
    if (!node["$online"] == true) {
      return;
    }

    return (
      <div>
        <div>
          <h2>Stats</h2>
          <p>
            Air temperature: {node["air_sensor/temperature"]} °F<br />
            Water temperature: {node["water_temp/temperature"]} °F<br />
            Grow Light: {node["grow_light/on"] ? "ON" : "OFF"}<br />
            Water Pump: {node["water_pump/on"] ? "ON" : "OFF"}<br />
          </p>
        </div>
        <hr />
        <h2>Switches</h2>
        <p>(not connected for Alpha)</p>
        <ManuallyControlledDevices />
      </div>
  )
}


render() {
  const node = this.props.node;

  if (!node) {
    return <div>"not found"</div>;
  }

  return (
    <Page renderToolbar={
      () => <NavBar title={node.serial} navigator={
        this.props.navigator
      } backButton={true} />
    }>
    <h1>{node["$name"]}</h1>
    <p>
      {
        node["$online"] == "true"
        ? "Online"
        : "This grow node is offline."
      }<br />
    </p>
    <hr />
    {this.renderContent()}
    </Page>
  );
}
}

const mapStateToProps = state => ({
  node: state.user_nodes[state.selectedUserNode]
});

export default connect(mapStateToProps, null)(NodePage)
