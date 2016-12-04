import React, {Component} from 'react';
import { connect } from 'react-redux';
import Base from '../util/Base'

import _ from 'lodash'
import NavBar from '../components/NavBar';
import {formatGrowCycle} from '../util'
import {mqttSend} from '../actions/mqtt'
import {createGrowCycle} from '../actions/grow_cycle'
import ons from 'onsenui';

import {
  Page,
  Button
} from 'react-onsenui';

class GrowCycleCreator extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this)
		this.state = {
			grow_cycle: {}
		}
	}


    componentWillMount() {
        // Base.bindToState(`grow_nodes/${this.props.selected_user_node}/grow_cycle/plant_stages`, {
        //   context: this,
        //   state: 'plant_stages',
        //   asArray: true
        // });
        Base.listenTo(`grow_nodes/${this.props.selected_user_node}/grow_cycle`, {
          context: this,
          asArray: false,
          then: (grow_cycle) => {
          	this.setState({...this.state, grow_cycle})
          	console.log(grow_cycle)
          },
          onFailure: () => {
          	console.log("failed");
          }
        });
    }


	handleChange(event) {
		var objToReturn = _.cloneDeep(this.state.grow_cycle)
		objToReturn.plant_stages[0][event.target.name] = event.target.value
	    this.setState({...this.state, grow_cycle: objToReturn});
	}

	uploadSettings() {
		const that = this
		var objToPush = this.state.grow_cycle
		const msgToPush = formatGrowCycle(objToPush)
		this.props.createGrowCycle(objToPush, this.props.selected_user_node)
		.then(
			(result) => {
				if(result.error) {
					ons.notification.alert(result.error, {title: "Couldn't save new grow cycle"})
					return false
				}

				that.props.mqttSend(`${that.state.node_serial}/$implementation/config/set`, msgToPush)
				return true
			},
			(error) => {
				ons.notification.alert(error, {title: "Couldn't save new grow cycle"})
				return false
			}
		)
	}

	renderForm() {
		if (this.state.grow_cycle.plant_stages) {
	    	const plantStage0 = this.state.grow_cycle.plant_stages[0]
            return(
            	<div>
	                <p>JSON</p>
	            	<pre>{formatGrowCycle(this.state.grow_cycle)}</pre>
	                <br/><br/><br/>
					light_on_at: <input type="text" className="text-input--underbar" name="light_on_at" value={plantStage0["light_on_at"]} onChange={this.handleChange} placeholder="light_on_at" /><br/><br/>
					light_off_at: <input type="text" className="text-input--underbar" name="light_off_at" value={plantStage0["light_off_at"]} onChange={this.handleChange} placeholder="light_off_at" /><br/><br/>
					air_temp_high: <input type="text" className="text-input--underbar" name="air_temp_high" value={plantStage0["air_temp_high"]} onChange={this.handleChange} placeholder="air_temp_high" /><br/><br/>
					air_temp_low: <input type="text" className="text-input--underbar" name="air_temp_low" value={plantStage0["air_temp_low"]} onChange={this.handleChange} placeholder="air_temp_low" /><br/><br/>
	            
		            <Button modifier="large" onClick={this.uploadSettings.bind(this)}>Upload to Grow Node</Button>
            	</div>
            )
        } else {
            return <p>"Loading"</p>;
        }
	}
   
    render () {
        return(
	        <Page renderToolbar={() => <NavBar title='New Grow Cycle' navigator={this.props.navigator} backButton={true}/>}>
	        	{this.renderForm()}
	        </Page>
        )
        
    }
}

function mapStateToProps (state) {
    return {selected_user_node: state.selectedUserNode}
}

export default connect(mapStateToProps, {mqttSend, createGrowCycle})(GrowCycleCreator);