import React, {Component, PropTypes} from 'react';
import {platform} from 'onsenui';

import NavBar from './NavBar';
import AddGrowNodePage from '../containers/AddGrowNodePage';

import {
  Fab,
  Icon,
  Page,
  Button
} from 'react-onsenui';


class AddGrowNodeBtn extends Component {
    
    render () {
          let button;

  if (platform.isAndroid()) {
    button = (
      <Fab
      onClick={actions.openDialog}
      ripple
      position='bottom right'>
      <Icon icon='md-plus' />
      </Fab>
    );
  } else {
    button = (
    	<Button modifier='large quiet' onClick={() => {this.props.navigator.pushPage({component: AddGrowNodePage})}}>+ ADD GROW_NODE</Button>
    );
  }

  return (
    <div>
    {button}
    </div>
  );
    }
}

export default AddGrowNodeBtn;
