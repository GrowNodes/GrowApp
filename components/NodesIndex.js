import React from 'react';

import {
  Page
} from 'react-onsenui';

import NavBar from './NavBar';
import LocationList from '../containers/LocationList';
import AddLocation from '../containers/AddLocation';

const NodesIndex = ({navigator}) => (
  <Page renderToolbar={() => <NavBar title='Grow Nodes' navigator={navigator} backButton={true}/>}>
    <LocationList navigator={navigator} />
    <AddLocation />
  </Page>
);

export default NodesIndex;
