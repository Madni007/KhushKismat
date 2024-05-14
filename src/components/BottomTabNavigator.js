import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Platform, TouchableOpacity,View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/home';
import WinnerList from '../screens/WinnerList';
import Referral from '../screens/Referral';
import Charity from '../screens/Charity';
import Profile from '../screens/Profile';
import CustomTabBarButton from './CustomTabBarButton';
import CustomTabBar from './CustomTabBar';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/Colors';
const Tab = createBottomTabNavigator();

const getIconName = (route, focused) => {
  let iconName;

  if (route === 'Home') {
    iconName = focused ? 'home-sharp' : 'home-outline';
  } else if (route === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  } else if (route === 'WinnerList') {
    iconName = focused ? 'albums' : 'albums-outline';
  } else if (route === 'Referral') {
    iconName = focused ? 'people' : 'people';
  } else if (route === 'Charity') {
    iconName = focused ? 'heart-half' : 'heart-half';
  }
  return iconName;
};

const CustomTabBarIcon = ({ iconName, color, size, focused }) => {
  return <Icon name={iconName} size={size} color={color} />;
};

const CustomTabBarLabel = ({ label }) => {
  return (
    <View style={{}}>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};


function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: colors.dark,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: colors.primary,

      })}>
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={({ route }) => ({
          tabBarLabel:'Home',
          title: 'Home',
          headerShown: false,
          tabBarButton: props => (
            <CustomTabBarButton route={route} {...props}>
              <CustomTabBarIcon
                iconName={getIconName(route.name, props.focused)}
                size={24}
                color={props.color}
              />
              <CustomTabBarLabel />
            </CustomTabBarButton>
          ),
        })}
      />
        <Tab.Screen
          name={'Referral'}
          component={Referral}
          options={({route})=>({
            tabBarLabel: 'Referral',
            title: 'Referral',
            headerShown: false,
            tabBarButton: props => (
              <CustomTabBarButton route={route} {...props}>
                <CustomTabBarIcon
                  iconName={getIconName(route.name, props.focused)}
                  size={24}
                  color={props.color}
                />
                <CustomTabBarLabel  />
              </CustomTabBarButton>
            ),
          })}
          />
      <Tab.Screen
        name={'WinnerList'}
        component={WinnerList}
        options={({route})=>({
          tabBarLabel: 'WinnerList',
          title: 'WinnerList',
          headerShown: false,
          tabBarButton: props => (
            <CustomTabBarButton route={route} {...props}>
              <CustomTabBarIcon
                iconName={getIconName(route.name, props.focused)}
                size={24}
                color={props.color}
              />
              <CustomTabBarLabel  />
            </CustomTabBarButton>
          ),
        })}
      />
      <Tab.Screen
        name={'Charity'}
        component={Charity}
        options={({route})=>({
          tabBarLabel: 'Charity',
          title: 'Charity',
          headerShown: false,
          tabBarButton: props => (
            <CustomTabBarButton route={route} {...props}>
              <CustomTabBarIcon
                iconName={getIconName(route.name, props.focused)}
                size={24}
                color={props.color}
              />
              <CustomTabBarLabel  />
            </CustomTabBarButton>
          ),
        })}
        />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={({route})=>({
          tabBarLabel: 'Profile',
          title: 'Profile',
          headerShown: false,
          tabBarButton: props => (
            <CustomTabBarButton route={route} {...props}>
              <CustomTabBarIcon
                iconName={getIconName(route.name, props.focused)}
                size={24}
                color={props.color}
              />
              <CustomTabBarLabel  />
            </CustomTabBarButton>
          ),
      })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.white,
    borderBottomColor:colors.DarkGreen,
    borderBottomWidth:4,
    height: 58,
    justifyContent: 'center', 
    alignItems: 'center', 
  },

});

export default BottomTabNavigator;
