import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import NavBar from '../components/NavBar';
import {formatGrowCycle} from '../util'

import {
  Page,
  Button
} from 'react-onsenui';

class GrowCycleCreator extends Component {
	constructor(props) {
		super(props);
		this.state = _.clone(this.props.grow_cycle);

		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		var nextState = _.clone(this.props.grow_cycle)
		nextState.plant_stages[0][event.target.name] = event.target.value
	    this.setState(nextState);
	}

	uploadSettings() {
		console.log(formatGrowCycle(this.state))
	}
   
    render () {

        if (this.props.grow_cycle) {
            return(
            <Page renderToolbar={() => <NavBar title='New Grow Cycle' navigator={this.props.navigator} backButton={true}/>}>
                <p>Current:</p>
            	{formatGrowCycle(this.state)}
                <br/>
				light_on_at: <input type="text" className="text-input--underbar" name="light_on_at" value={this.state.plant_stages[0]["light_on_at"]} onChange={this.handleChange} placeholder="light_on_at" /><br/><br/>
				light_off_at: <input type="text" className="text-input--underbar" name="light_off_at" value={this.state.plant_stages[0]["light_off_at"]} onChange={this.handleChange} placeholder="light_off_at" /><br/><br/>
				air_temp_high: <input type="text" className="text-input--underbar" name="air_temp_high" value={this.state.plant_stages[0]["air_temp_high"]} onChange={this.handleChange} placeholder="air_temp_high" /><br/><br/>
				air_temp_low: <input type="text" className="text-input--underbar" name="air_temp_low" value={this.state.plant_stages[0]["air_temp_low"]} onChange={this.handleChange} placeholder="air_temp_low" /><br/><br/>
				water_temp_high: <input type="text" className="text-input--underbar" name="water_temp_high" value={this.state.plant_stages[0]["water_temp_high"]} onChange={this.handleChange} placeholder="water_temp_high" /><br/>
            
	            <Button modifier="large" onClick={this.uploadSettings.bind(this)}>Upload to Grow Node</Button>

            </Page>
            )
        } else {
            return <p>"Loading"</p>;
        }
    }
}

function mapStateToProps (state) {
    return { grow_cycle: state.grow_cycles[state.selectedUserNode]}
}

export default connect(mapStateToProps, null)(GrowCycleCreator);