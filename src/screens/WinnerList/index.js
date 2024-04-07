import React, { useState } from 'react';
import {
  StyleSheet, TouchableOpacity, TouchableWithoutFeedback
  , Text, Image, View, useWindowDimensions, Button, ScrollView, Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Svg, { Path, Rect, Circle, G, Defs } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { colors } from '../../utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WinCardItemCur,WinCardItemPrev} from './WinCardItem';


const FirstRoute = () => (
  <SafeAreaView style={{flex: 1}}>
  <ScrollView>

  <View style={{backgroundColor:colors.Tailwhite,alignItems:'center', }} >
       <WinCardItemCur/>
  </View>
  </ScrollView>
  </SafeAreaView>
);

const SecondRoute = () => (
  <SafeAreaView style={{ flex: 1}}>
  <ScrollView>

  <View style={{backgroundColor:colors.Tailwhite,alignItems:'center', }} >
    <WinCardItemPrev/>
  </View>
  </ScrollView>
  </SafeAreaView>
);


const WinnerList = ({navigation}) => {
  const onPressNotifications=()=>{
    navigation.navigate('Notification')
  };

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Current Winners' },
    { key: 'second', title: 'Previous Winners' },

  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar

      {...props}
      lazy={true}
      swipeEnabled={true}
      animationEnabled={true}

      indicatorStyle={{ backgroundColor: colors.DarkGreen, width: '30%', marginLeft: '8%', justifyContent: 'flex-start' }}
      style={{ backgroundColor:colors.Tailwhite, height: 40 }}
      labelStyle={{ color: 'black', fontFamily: "LatoRegular", fontSize: 14, width: '100%', fontWeight: '800', textTransform: 'none' }}

      activeBackgroundColor='transparent'
    />
  );
  return (

  <SafeAreaView style={{ flex: 1 }}>
     <LinearGradient
        colors={['#40916c','#40916c', '#00BA63']}  >
        <View style={{
                marginVertical: 20,
                marginHorizontal: 25, flexDirection: "row", justifyContent: "center", alignItems: 'center'
            }}>
              <Text style={{fontSize:18,fontWeight:'800',color:colors.Tailwhite}}>Winners List </Text>
          </View>
            <View style={{display:'flex',alignItems:'flex-end',right:20,top:-40,height:2}}>
                      <TouchableOpacity onPress={onPressNotifications}>
                      <Icon name={'bell'} size={16} style={styles.icon} />
                        <View style={styles.redDot}></View>
                        </TouchableOpacity>
            </View>
            </LinearGradient>

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

