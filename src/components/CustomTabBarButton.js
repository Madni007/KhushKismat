import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { colors } from '../utils/Colors';
import Svg, {Path} from 'react-native-svg';

const CustomTabBarButton = props => {
  const {route, children, accessibilityState, onPress} = props;
  const getButtonTitle = () => {
    if (!route || !route.name) {
      return 'Mecca';
    }
  
    const titles = {
      Home: 'Home',
      Referral: 'Referral',
      WinnerList: 'Winner List',
      Charity: 'Charity',
      Profile: 'Profile',
    };
    
    const lowercaseRouteName = route.name;
  
    return titles[lowercaseRouteName] || '';
  };
  if (accessibilityState.selected) {
    const title = getButtonTitle(route.name);

    return (
      <View style={styles.btnWrapper}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.svgGapFiller,
              {
                borderTopLeftRadius: route.name === 'Home' ? 10 : 0,
              },
            ]}
          />
          <Svg width={71} height={58} viewBox="0 0 75 61">
          <Path
    d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1zM0 55h75"
    fill={colors.white}
    fillRule="evenodd"
    clipRule="evenodd"
    style={{ borderBottomWidth: 2, borderBottomColor: colors.golden }}
  />
          </Svg>
          <View
            style={[
              styles.svgGapFiller,
              {
                borderTopRightRadius: route.name === 'Profile' ? 10 : 0,
              },
            ]}
          />
        </View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={[styles.activeBtn]}>
          <Text >{children}</Text>
        </TouchableOpacity>
          <Text style={{ textAlign: 'center', marginTop: 35, fontSize: 12,color:colors.DarkGreen,fontWeight:'bold',position:'absolute',zIndex:1}}>{title}</Text>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[
          styles.inactiveBtn,
          {
            borderTopLeftRadius: route.name === 'Home' ? 10 : 0,
            borderTopRightRadius: route.name === 'Profile' ? 10 : 0,
          },
        ]}>
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  }
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  activeBtn: {
    flex: 1,
    position: 'absolute',
    top: -22,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth:2,
    borderBlockColor:colors.MediumGreen,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    shadowColor: colors.dark,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  elevation: 5,
  },
  inactiveBtn: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgGapFiller: {
    flex: 1,
  },
});
