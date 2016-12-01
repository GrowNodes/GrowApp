import React from 'react';

import {
  Page
} from 'react-onsenui';

import NavBar from './NavBar';
import GrowNodeList from '../containers/GrowNodeList';
import AddGrowNode from '../containers/AddGrowNode';

const NodesIndex = ({navigator}) => (
  <Page renderToolbar={() => <NavBar title='Grow Nodes' navigator={navigator} backButton={true}/>}>
    <GrowNodeList navigator={navigator} />
    <AddGrowNode />
  </Page>
);

export default NodesIndex;
