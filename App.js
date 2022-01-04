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

const {Navigator, Screen} = createStackNavigator();

const StackNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
  {/* <Screen name="Status Saver" component={StatusSaver} /> */}
    <Screen name="Login" component={LoginScreen} />
    <Screen name="OtpVerify" component={OtpScreen} />
    <Screen name="Signup Page" component={SignUp} />
    <Screen name="Dashboard" component={DashboardScreen} />
    <Screen name='LangSetting' component={Selector} />
    <Screen name='FAQ' component={FAQ} />
    <Screen name='PremiumScreen' component={PremiumScreen} />
  </Navigator>
);
class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    );
  }
}
export default App;
