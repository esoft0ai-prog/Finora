import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import notifee,{EventType} from '@notifee/react-native';
import App from './App';
import {recordNotificationEvent} from './src/services/notificationService';
import {name as appName} from './app.json';
notifee.onBackgroundEvent(async ({type,detail})=>{if(type===EventType.PRESS||type===EventType.DELIVERED)await recordNotificationEvent(detail.notification).catch(()=>undefined)});
AppRegistry.registerComponent(appName, () => App);
