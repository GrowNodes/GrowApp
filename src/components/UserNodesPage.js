import React from 'react';

import {
  Page
} from 'react-onsenui';

import NavBar from './NavBar';
import UserNodeList from '../containers/UserNodeList';
import AddGrowNodeBtn from './AddGrowNodeBtn';

const UserNodesPage = ({navigator}) => (
  <Page renderToolbar={() => <NavBar title='Grow Nodes' navigator={navigator} backButton={true}/>}>
    <UserNodeList navigator={navigator} />
    <AddGrowNodeBtn navigator={navigator}/>
  </Page>
);

export default UserNodesPage;
