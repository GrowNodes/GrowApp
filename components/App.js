import React from 'react';

import {
  Navigator
} from 'react-onsenui';

import MainPage from './MainPage';
import SignInPage from '../containers/SignInPage';

const renderPage = (route, navigator) => {
	if (true) {
		console.log("redirecting to sign in page")
		route.component = SignInPage
	}
	const props = route.props || {}
	props.navigator = navigator
	return React.createElement(route.component, props)
}

const App = () => (
  <Navigator
    renderPage={renderPage}
    initialRoute={{component: MainPage, key: 'MAIN_PAGE'}}
  />
);

export default App;
