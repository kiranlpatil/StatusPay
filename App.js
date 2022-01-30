import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import OtpScreen from './screens/OtpScreen';
import SignUp from './screens/SignUp';
import DashboardScreen from './screens/DashboardScreen';
import StatusSaver from './screens/StatusSaver';
import './src/constants/IMLocalize'
import Selector from './screens/LanguageSelector';
import FAQ from './screens/Faq';
import PremiumScreen from './screens/PremiumScreen';
import AdCampaign from './screens/AdCampaign';
import Wallet from './screens/Wallet';
import TAndC from './screens/T&C';
import PrivacyPolicy from './screens/PrivacyPolicy';
import UserUploadScreen from "./screens/UserUploadScreen";
import SwipeUnlock from "./screens/SplashScreen";
import * as Sentry from "@sentry/react-native";

const {Navigator, Screen} = createStackNavigator();

const StackNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="Login" component={LoginScreen} />
    <Screen name="OtpVerify" component={OtpScreen} />
    <Screen name="Signup Page" component={SignUp} /> */}  
    <Screen name="Dashboard" component={DashboardScreen} />
    <Screen name='LangSetting' component={Selector} />
    <Screen name='FAQ' component={FAQ} />
    <Screen name='PremiumScreen' component={PremiumScreen} />
    <Screen name="AdCampaign" component={AdCampaign} />
    <Screen name='Wallet' component={Wallet}/>
    <Screen name="UserUploadScreen" component={UserUploadScreen} />
    <Screen name='Privacy Policy' component={PrivacyPolicy} />
    <Screen name="TermsAndCond" component={TAndC} />
    <Screen name="Status Saver" component={StatusSaver} />
  </Navigator>
);
class App extends Component {
  render() {
    Sentry.init({
      dsn: "https://41bfc3b03f6b41fa94457ed650926f2f@o1123875.ingest.sentry.io/6162074",
      tracesSampleRate: 1.0,
    });
    return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    );
  }
}
export default App;
