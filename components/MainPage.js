import React from 'react';

import {
  Page,
  Button
} from 'react-onsenui';

import NodesIndex from './NodesIndex';

import UserSettings from './UserSettings'

const MainPage = ({navigator}) => (
  <Page>
    <br/>
    <Button onClick={() => {navigator.pushPage({component: NodesIndex})}}>View Nodes</Button><br/><br/>
    <Button onClick={() => {navigator.pushPage({component: UserSettings})}}>Settings</Button>
  </Page>
);

export default MainPage;
