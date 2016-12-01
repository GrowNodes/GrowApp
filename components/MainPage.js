import React from 'react';

import {
  Page,
  Button
} from 'react-onsenui';

import NavBar from './NavBar';
import NodesIndex from './NodesIndex';

const MainPage = ({navigator}) => (
  <Page renderToolbar={() => <NavBar title='Home' navigator={navigator} />}>
    <Button onClick={() => {navigator.pushPage({component: NodesIndex})}}>View Nodes</Button>
  </Page>
);

export default MainPage;
