/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import { name as appName } from './app.json';
import { Klaviyo } from 'klaviyo-react-native-sdk';

// Klaviyo.initialize('WKmkdn');
Klaviyo.initialize('RLvqbG');


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});


AppRegistry.registerComponent(appName, () => App);

