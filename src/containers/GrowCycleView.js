import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import _ from 'lodash'
import {growCycleGetCurrentStage} from '../util'

import Base from '../util/Base'

class GrowCycleView extends Component {
  constructor(props){
    super(props);
    this.state = {
      grow_cycle: {}
    };
  }
    componentWillMount() {
        Base.bindToState(`grow_nodes/${this.props.selected_user_node}/grow_cycle`, {
          context: this,
          state: 'grow_cycle',
          asArray: false
        });
    }
  
  render() {
        const grow_cycle = this.state.grow_cycle
        return (
            <div>
                <p>
                Start at: {grow_cycle.start_at}<br/>
                Aborted?: {grow_cycle.aborted ? "true" : "false"}
                </p>
                <h3>Stages</h3>
                Currently in {growCycleGetCurrentStage(grow_cycle).name} stage
                {grow_cycle.plant_stages.map(function(stage, index){
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

export default connect(mapStateToProps, null)(GrowCycleView);