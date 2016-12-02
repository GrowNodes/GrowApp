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
    if (this.props.grow_cycle) {
        const grow_cycle = this.props.grow_cycle

        return (
            <div>
                Grow Cycle ID: {grow_cycle.id}<br/>
                Start at: {grow_cycle.start_at}<br/>
                Aborted?: {grow_cycle.aborted ? "true" : "false"}
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