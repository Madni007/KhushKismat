import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../utils/Colors';
import Svg, { Path } from 'react-native-svg';
import icons from '../../utils/icons';

const HelpSupport = () => {
  const navigation = useNavigation();

  const handlePressHelp = () => {
    navigation.navigate('Help');
  };

  return (
    <View style={styles.container}>
      <View style={styles.helpContainer}>
        <View style={styles.iconContainer}>
          <Image source={icons.headphone} style={styles.icon} />
          <View style={{ position: 'absolute', paddingRight: 34, }}>
          <Svg width="50" height="50" viewBox="0 0 20 20" fill="none">
            <Path
              d="M12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4ZM13 17H11V10H13V17ZM13 9H11V7H13V9Z"
              fill="#40916c"
              fillOpacity="0.6"
            />
          </Svg>
        </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Help & Customer Support</Text>
          <Text style={styles.description}>
            Register Your Request or get Quick help on queries related to Mecca
          </Text>
          <TouchableOpacity onPress={handlePressHelp}>
            <View style={styles.helpBtn}>
              <Text style={styles.helpBtnText}>Get Help</Text>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M19.75 12.25L3.75 12.25"
                  stroke="#40916c"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <Path
                  d="M19.75 12.25L4.25 12.25"
                  stroke="#40916c"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <Path
                  d="M17.25 9.25C18.4216 10.4216 19.0784 11.0784 20.25 12.25L17.25 15.25"
                  stroke="#40916c"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('88%'),
    margin:20, padding:20,backgroundColor:colors.white,
     borderRadius:20,
     elevation:3,
  },
  helpContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: wp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: hp('10%'),
    backgroundColor: colors.white,
    borderRadius: 40,
    marginRight: 15,
    width: wp('25%'),
  },
  textContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.black,
    width: wp('55%'),
    marginTop: 10,
  },
  helpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 22,
    paddingVertical: 8,
    marginTop: 10,
    borderColor:'lightgray',
    borderWidth:0.7,
  },
  helpBtnText: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.black,
    marginRight: 5,
  },
});

export default HelpSupport;
