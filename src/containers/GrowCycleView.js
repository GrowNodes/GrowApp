import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import _ from 'lodash'
import { fetchGrowCycleIfNeeded } from '../actions/grow_cycle';
import {growCycleGetCurrentStage} from '../util'


class GrowCycleView extends Component {

    componentWillMount() {
        this.props.fetchGrowCycleIfNeeded(this.props.node.serial)
    }
  
  render() {
    if (this.props.grow_cycle) {
        const grow_cycle = this.props.grow_cycle
        console.log(grow_cycle.plant_stages)
        return (
            <div>
                <p>
                Grow Cycle ID: {grow_cycle.id}<br/>
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
    } else {
        return <div>Loading...</div>;
    }
  }
}


function mapStateToProps (state) {
    return {grow_cycle: state.grow_cycles[state.selectedUserNode]}
}

export default connect(mapStateToProps, { fetchGrowCycleIfNeeded })(GrowCycleView);