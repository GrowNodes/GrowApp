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

class NodeSettingsCreator extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this)
		this.state = {
			node_settings: {}
		}
	}


    componentWillMount() {
        // Base.bindToState(`grow_nodes/${this.props.selected_user_node}/settings/plant_stages`, {
        //   context: this,
        //   state: 'plant_stages',
        //   asArray: true
        // });
        Base.listenTo(`grow_nodes/${this.props.selected_user_node}/settings`, {
          context: this,
          asArray: false,
          then: (node_settings) => {
          	this.setState({...this.state, node_settings})
          	console.log(node_settings)
          },
          onFailure: () => {
          	console.log("failed");
          }
        });
    }


	handleChange(event) {
		var objToReturn = _.cloneDeep(this.state.node_settings)
		objToReturn[event.target.name] = event.target.value
		objToReturn.settings_id = uuid.v4()
	    this.setState({...this.state, node_settings: objToReturn});
	}

	uploadSettings() {
		const that = this
		var objToPush = this.state.node_settings
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

	renderForm() {
		if (this.state.node_settings) {
	    	const node_settings = this.state.node_settings
            return(
            	<div>
	                <p>JSON</p>
	            	<pre>{formatNodeSettings(this.state.node_settings)}</pre>
	                <br/><br/><br/>
					light_on_at: <input type="text" className="text-input--underbar" name="light_on_at" value={node_settings["light_on_at"]} onChange={this.handleChange} placeholder="light_on_at" /><br/><br/>
					light_off_at: <input type="text" className="text-input--underbar" name="light_off_at" value={node_settings["light_off_at"]} onChange={this.handleChange} placeholder="light_off_at" /><br/><br/>
					air_temp_high: <input type="text" className="text-input--underbar" name="air_temp_high" value={node_settings["air_temp_high"]} onChange={this.handleChange} placeholder="air_temp_high" /><br/><br/>
					air_temp_low: <input type="text" className="text-input--underbar" name="air_temp_low" value={node_settings["air_temp_low"]} onChange={this.handleChange} placeholder="air_temp_low" /><br/><br/>
	            
		            <Button modifier="large" onClick={this.uploadSettings.bind(this)}>Upload to Grow Node</Button>
            	</div>
            )
        } else {
            return <p>"Loading"</p>;
        }
	}
   
    render () {
        return(
	        <Page renderToolbar={() => <NavBar title='New Node Settings' navigator={this.props.navigator} backButton={true}/>}>
	        	{this.renderForm()}
	        </Page>
        )
        
    }
}

function mapStateToProps (state) {
    return {selected_user_node: state.selectedUserNode}
}

export default connect(mapStateToProps, {mqttSend, createNodeSettings})(NodeSettingsCreator);