import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';

const {Navigator, Screen} = createStackNavigator();

const StackNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="Splash" component={SplashScreen} />
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
