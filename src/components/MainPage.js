import React from 'react';

import {
  Page,
  Button
} from 'react-onsenui';

import UserNodesPage from './UserNodesPage';

import UserSettings from '../containers/UserSettings'

const MainPage = ({navigator}) => (
  <Page>
    <br/>
    <Button onClick={() => {navigator.pushPage({component: UserNodesPage})}}>View Nodes</Button><br/><br/>
    <Button onClick={() => {navigator.pushPage({component: UserSettings})}}>Settings</Button>
  </Page>
);

export default MainPage;
