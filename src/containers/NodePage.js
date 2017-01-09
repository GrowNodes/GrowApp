import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import TimeAgo from 'react-timeago'
import NavBar from '../components/NavBar';
import CurrentGrowStage from './CurrentGrowStage';
import GrowStageChanger from './GrowStageChanger';
import ManuallyControlledDevices from './ManuallyControlledDevices';

import {
  Page,
  Button
} from 'react-onsenui';


class NodePage extends Component {
    renderLastSeen() {
        const node = this.props.node;
        if (node["last_seen"]) {
            return <TimeAgo date={new Date(node["last_seen"]*1000)} />
        }
        return null;
    }

    
    render () {
        const node = this.props.node;
        if (!node) {
            return <div>"not found"</div>
        }
        return (
            <Page renderToolbar={() => <NavBar title={node.serial} navigator={this.props.navigator} backButton={true}/>}>
                Back to Nodes<br/>
                <h1>Grow Node {node.serial}</h1>
                <p>
                    Nickname: {node["$name"]}<br/>
                    Online? {node["$online"]}<br/>
                    Last Seen: {this.renderLastSeen()}
                </p>
                <p>
                    System Information<br/>
                </p>
                <h2>Hardware</h2>
                <p>
                    Temperature: {node["temperature/degrees"]} &deg;F<br/>
                    Water Level: {node["waterlevel/gallons"]} Gallons<br/>
                    Grow Light: {node["grow_light/on"] ? "ON" : "OFF"}<br/>
                    Fan: {node["fan/on"] ? "ON" : "OFF"}<br/>
                </p>
                <ManuallyControlledDevices />
                <CurrentGrowStage node={node}/>
                <Button onClick={() => {this.props.navigator.pushPage({component: GrowStageChanger})}}>Change stage</Button>
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
  node: state.user_nodes[state.selectedUserNode]
});

export default connect(mapStateToProps, null)(NodePage);
