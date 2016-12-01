import React from 'react';

import {
  Page
} from 'react-onsenui';

import NavBar from './NavBar';
import UserNodeList from '../containers/UserNodeList';
import AddGrowNode from '../containers/AddGrowNode';

const UserNodesPage = ({navigator}) => (
  <Page renderToolbar={() => <NavBar title='Grow Nodes' navigator={navigator} backButton={true}/>}>
    <UserNodeList navigator={navigator} />
    <AddGrowNode />
  </Page>
);

export default UserNodesPage;
