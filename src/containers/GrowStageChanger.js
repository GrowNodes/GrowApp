import React, {Component} from 'react';
import { connect } from 'react-redux';
import Base from '../util/Base'

import _ from 'lodash'
import NavBar from '../components/NavBar';
import {formatNodeSettings} from '../util'
import {mqttSend} from '../actions/mqtt'
import {createNodeSettings} from '../actions/node_settings'
import ons from 'onsenui';
import uuid from 'uuid';
import {
  Page,
  Button
} from 'react-onsenui';

class GrowStageChanger extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this)
	}


    componentWillMount() {
        // Base.listenTo(`grow_nodes/${this.props.selected_user_node}/settings`, {
        //   context: this,
        //   asArray: false,
        //   then: (node_settings) => {
        //   	this.setState({...this.state, node_settings})
        //   	console.log(node_settings)
        //   },
        //   onFailure: () => {
        //   	console.log("failed");
        //   }
        // });
    }


	handleChange(new_plant_stage, event) {
		const that = this
		var objToPush = {}
		switch(new_plant_stage) {
			case "vegetation": 
				objToPush['stage_name'] = "vegetation"
				objToPush['light_on_at'] = 6
				objToPush['light_off_at'] = 22
				break;
			case "flowering":
				objToPush['stage_name'] = "flowering"
				objToPush['light_on_at'] = 6
				objToPush['light_off_at'] = 18
			break;
		}
		
		objToPush.settings_id = uuid.v4()
		objToPush.stage_start_at = Math.floor(new Date / 1000)

		const msgToPush = formatNodeSettings(objToPush)
		this.props.createNodeSettings(objToPush, this.props.selected_user_node)
		.then(
			(result) => {
				if(result.error) {
					ons.notification.alert(result.error, {title: "Couldn't save new Node Settings"})
					return false
				}

				that.props.mqttSend(`${that.props.selected_user_node}/$implementation/config/set`, msgToPush)
				return true
			},
			(error) => {
				ons.notification.alert(error, {title: "Couldn't save new Node Settings"})
				return false
			}
		)
	}


    render () {
        return(
	        <Page renderToolbar={() => <NavBar title='Go to next plant stage' navigator={this.props.navigator} backButton={true}/>}>
	        	<p>Some text here to explain what the user needs to do</p>
	        	<p>Click one of the buttons to change the current plant stage</p>
	        	<p><Button onClick={this.handleChange.bind(this, "vegetation")}>Vegetation</Button></p>
	        	<p><Button onClick={this.handleChange.bind(this, "flowering")}>Flowering</Button></p>
	        </Page>
        )
        
    }
}

function mapStateToProps (state) {
    return {selected_user_node: state.selectedUserNode}
}

export default connect(mapStateToProps, {mqttSend, createNodeSettings})(GrowStageChanger);