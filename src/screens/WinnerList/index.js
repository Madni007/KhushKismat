import React, { useState,useCallback } from 'react';
import {
  StyleSheet , Text, View, useWindowDimensions, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { colors } from '../../utils/Colors';
import AppHeader1 from '../../components/AppHeader1';
import FirstRoute from './FirstRoute';
import SecondRoute from './SecondRoute';
import ThirdRoute from './ThirdRoute';



const WinnerList = ({navigation}) => {
 
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Current Wins' },
    { key: 'second', title: 'Previous Wins' },
    { key: 'third', title: 'Stream Hub' },

  ]);

  const renderScene = useCallback(({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute navigation={navigation} />;
        case 'second':
          return <SecondRoute navigation={navigation} />;
        case 'third':
          return <ThirdRoute navigation={navigation} />;
        default:
            return null;
        }
      }, [navigation]);

  const renderTabBar = (props) => (
    <TabBar

      {...props}
      indicatorStyle={{ backgroundColor: colors.DarkGreen, width: '23%', marginLeft: '4%', justifyContent: 'flex-start' }}
      style={{ backgroundColor:colors.Tailwhite, height: 40 }}
      labelStyle={{ color: 'black', fontFamily: "LatoRegular", fontSize: RFPercentage(1.7), width: '100%', fontWeight: '800', textTransform: 'none' }}
      pressColor='transparent'
      activeBackgroundColor='transparent'
    />
  );
  return (

  <SafeAreaView style={{ flex: 1 }}>
    <AppHeader1 title={'Winners'} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  )
};

export default WinnerList;

const styles = StyleSheet.create({
  icon: {
    marginLeft: 15,
    height: 20,
    width: 20,
    tintColor: colors.white
  },
  redDot: {
    position: 'absolute',
    top: 3,
    right: 0,
    backgroundColor: 'red',
    height: 8,
    width: 8,
    borderRadius: 5,
  },
})

