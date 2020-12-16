/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Share from './components/Share';


AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('Save link', () => Share) 
