import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import TimeAgo from 'react-timeago'
import NavBar from '../components/NavBar';
import CurrentGrowStage from './CurrentGrowStage';
import GrowStageChanger from './GrowStageChanger';
import ManuallyControlledDevices from './ManuallyControlledDevices';
import NodeTodoList from './NodeTodoList';

import {
  Page,
  Button
} from 'react-onsenui';


class NodePage extends Component {
    
    render () {
        const node = this.props.node;
        if (!node) {
            return <div>"not found"</div>
        }
        return (
            <Page renderToolbar={() => <NavBar title={node.serial} navigator={this.props.navigator} backButton={true}/>}>
                Back to Nodes<br/>
                <h1>{node["$name"]}</h1>
                <p>
                    {node["$online"] == "true" ? "Online" : "This grow node is offline. Changes here will be applied after the connection is restored."}<br/>
                </p>
                <hr/>
                
                <CurrentGrowStage node={node}/>
                <Button onClick={() => {this.props.navigator.pushPage({component: GrowStageChanger})}}>Change stage</Button>
                
                <hr/>
                
                <div>
                    <h2>Hardware</h2>
                    <p>
                        Serial number {node.serial}<br/>
                        Temperature: {node["temperature/degrees"]} &deg;F<br/>
                        Water Level: {node["waterlevel/gallons"]} Gallons<br/>
                        Grow Light: {node["grow_light/on"] ? "ON" : "OFF"}<br/>
                        Fan: {node["fan/on"] ? "ON" : "OFF"}<br/>
                    </p>
                    <ManuallyControlledDevices />
                </div>
                
                <hr/>

                <h2>Todo List</h2>
                <NodeTodoList navigator={this.props.navigator}/>
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
  node: state.user_nodes[state.selectedUserNode]
});

export default connect(mapStateToProps, null)(NodePage);
