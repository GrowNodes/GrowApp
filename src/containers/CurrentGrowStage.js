import React, { Component } from 'react';
import { connect } from 'react-redux';
import {nodeSettingsGetCurrentStage} from '../util'
import Base from '../util/Base'
import TimeAgo from 'react-timeago'

class CurrentGrowStage extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
    componentWillMount() {
        this.baseref = Base.bindToState(`grow_nodes/${this.props.selected_user_node}/settings`, {
          context: this,
          state: 'node_settings',
          asArray: false
        });
    }

    componentWillUnmount(){
      Base.removeBinding(this.baseref);
    }
  
  render() {
        const node_settings = this.state.node_settings
        if (!node_settings) {
            return <div>Loading Node Settings...</div>
        }
        return (
            <div>
                <h2>Grow</h2>
                <p>
                In <b>{node_settings.stage_name} stage</b> since <TimeAgo date={node_settings.stage_start_at*1000}/> <br/>
                </p>
                <p>
                    The plant receives {node_settings.light_off_at - node_settings.light_on_at} hours of light per day.<br/>
                </p>
            </div>
        );
  }
}


function mapStateToProps (state) {
    return {selected_user_node: state.selectedUserNode}
}

export default connect(mapStateToProps, null)(CurrentGrowStage);