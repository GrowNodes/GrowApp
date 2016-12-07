import React, { Component } from 'react';
import { connect } from 'react-redux';
import {nodeSettingsGetCurrentStage} from '../util'

import Base from '../util/Base'

class NodeSettingsView extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
    componentWillMount() {
        Base.bindToState(`grow_nodes/${this.props.selected_user_node}/settings`, {
          context: this,
          state: 'node_settings',
          asArray: false
        });
    }
  
  render() {
        const node_settings = this.state.node_settings
        if (!node_settings) {
            return <div>Loading Node Settings...</div>
        }
        return (
            <div>
                <p>
                Start at: {node_settings.start_at}<br/>
                Aborted?: {node_settings.aborted ? "true" : "false"}
                </p>
                <h3>Stages</h3>
                Currently in {nodeSettingsGetCurrentStage(node_settings).name} stage
                {node_settings.plant_stages.map(function(stage, index){
                    return (
                        <p key={ index }>
                            <strong>{stage.name} stage</strong><br/>
                            Lights ON at {stage.light_on_at} and OFF at {stage.light_off_at}<br/>
                            Air temp- max {stage.air_temp_high}, min {stage.air_temp_low}<br/>
                            Water temp- max {stage.water_temp_high}, min {stage.water_temp_low}<br/>
                        </p>
                    )
                })}
            </div>
        );
  }
}


function mapStateToProps (state) {
    return {selected_user_node: state.selectedUserNode}
}

export default connect(mapStateToProps, null)(NodeSettingsView);