import * as React from 'react';
import {Text, View} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './ProfileScreen';
import AdminDashboard from './AdminScreen';
import ClientScreen from './ClientScreen';
import { useTranslation } from 'react-i18next';
import HomeScreen from './HomeScreen';

function Feed() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Feed!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
  const [isAdmin, setIsAdmin] = React.useState(true);
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#fff"
      labelStyle={{fontSize: 12}}
      shifting={true}>
      <Tab.Screen
        name="Feed"
        component={HomeScreen}
        options={{
          tabBarLabel: t('navigate:home'),
          tabBarColor: '#1f65ff',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Client"
        component={ClientScreen}
        options={{
          tabBarLabel: t('navigate:client'),
          tabBarColor: '#7f00ff',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      {isAdmin ? (
        <Tab.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{
            tabBarLabel: t('navigate:admin'),
            tabBarColor: '#008000',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="account-star"
                color={color}
                size={26}
              />
            ),
          }}
        />
      ) : null}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('navigate:account'),
          tabBarColor: '#FF4500',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return <MyTabs />;
}
