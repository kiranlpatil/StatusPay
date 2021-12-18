import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import OtpScreen from './screens/OtpScreen';

const {Navigator, Screen} = createStackNavigator();

const StackNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="Login" component={LoginScreen} />
    <Screen name="OtpVerify" component={OtpScreen} />
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
