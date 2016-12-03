import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import GrowCycleView from './GrowCycleView';
import GrowCycleCreator from './GrowCycleCreator';
import Moment from 'react-moment';
import TimeAgo from 'react-timeago'

import {
  Page,
  Button
} from 'react-onsenui';


class NodePage extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

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
                <h2>Connected Devices</h2>
                <p>
                    Temperature: {node["temperature/degrees"]} &deg;F<br/>
                    Grow Light: {node["grow_light/on"] ? "ON" : "OFF"}<br/>
                </p>
                <h2>Grow Cycle</h2>
                <GrowCycleView node={node}/>
                <Button onClick={() => {this.props.navigator.pushPage({component: GrowCycleCreator})}}>Load a new grow cycle</Button>
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
  node: state.user_nodes[state.selectedUserNode]
});

export default connect(mapStateToProps, null)(NodePage);
