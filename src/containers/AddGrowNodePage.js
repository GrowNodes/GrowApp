import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import TimeAgo from 'react-timeago'

import NavBar from '../components/NavBar';

import {
  Page,
  Button
} from 'react-onsenui';


class AddGrowNodePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ssid: null
    }
  }

  componentDidMount() {
    setInterval(this.ssidLoop(), 3000); // this won't ever stop
  }

  ssidLoop() {
    // WifiWizard.getCurrentSSID(this.setSsid)
    this.setSsid("test")
  }

  setSsid(ssid) {
    this.setState({...this.state, ssid})
  }

    
  render () {
      return (
          <Page renderToolbar={() => <NavBar title={"Add Grow Node"} navigator={this.props.navigator} backButton={true}/>}>
              <h1>Add Grow Node</h1>
              {this.state.ssid}
          </Page>
      );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, null)(AddGrowNodePage);


