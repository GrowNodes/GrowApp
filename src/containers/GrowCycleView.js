import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import _ from 'lodash'
import { fetchGrowCycleIfNeeded } from '../actions/grow_cycle';


class GrowCycleView extends Component {

    componentWillMount() {
        this.props.fetchGrowCycleIfNeeded(this.props.node.serial)
    }
   
  render() {
    if (this.props.node["$implementation/config"]) {
        const settings = this.props.node["$implementation/config"].settings
        const stored_cycle = this.props.grow_cycles[this.props.node.serial] || {}

        return (
            <div>
                Grow Cycle ID: {settings.cycle_id}<br/>
                Start at: {stored_cycle.start_at}<br/>
                Aborted?: {stored_cycle.aborted ? "true" : "false"}
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
  }
}


function mapStateToProps (state) {
    return {grow_cycles: state.grow_cycles}
}

export default connect(mapStateToProps, { fetchGrowCycleIfNeeded })(GrowCycleView);