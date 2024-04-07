import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import { colors } from '../utils/Colors';

const CustomTabBar = props => {
  return (
    <View>
      <View style={styles.tabBar} />
      <BottomTabBar {...props} />
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    // position: 'absolute',
    // right: 10,
    // left: 10,
    // bottom: -20,
    // height: 20,
    backgroundColor: colors.white,
    // borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 3,
  },
});
