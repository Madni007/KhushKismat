import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { runOnJS } from 'react-native-reanimated';
import { colors } from '../../utils/Colors';
import Profile from '../../screens/Profile';
import Icon from 'react-native-vector-icons/Feather'
import { Svg, Path } from 'react-native-svg'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DrawerItems from './DrawerItems';
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/core';
import { setleftDrawerOpen } from '../../redux/slices/commonSlice'

const { width } = Dimensions.get('screen');

const CustomDrawer = props => {
  const dispatch = useDispatch()
const navigation=useNavigation()
const [selectedOption, setSelectedOption] = useState('Eng');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
      <View style={{ margin: 15 }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 22, fontWeight: '700', color: colors.black }}>My Account</Text>
                <View style={styles.container}>
                  <TouchableOpacity
                    style={[
                      styles.optionE,
                      selectedOption === 'Eng' ? styles.primaryBackground : styles.secondaryBackground
                    ]}
                    onPress={() => setSelectedOption('Eng')}
                  >
        <Text style={[styles.optionText, selectedOption === 'Eng' ? styles.primaryText : styles.secondaryText]}>Eng</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.optionU,
                      selectedOption === 'Urdu' ? styles.primaryBackground : styles.secondaryBackground
                    ]}
                    onPress={() => setSelectedOption('Urdu')}
                  >
                    <Text style={[styles.optionText, selectedOption === 'Urdu' ? styles.primaryText : styles.secondaryText]}>Urdu</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                <Text style={{ fontSize: 11, fontWeight: '500', color: colors.black }}>Profile, Settings & More</Text>
                <Text style={{ fontSize: 11, fontWeight: '500' }}>Version V.100</Text>
              </View>
            </View>

            <View style={styles.Profile}>
              <View>
                <Image source={{uri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711735649/samples/people/smiling-man.jpg'}} style={styles.userImg} />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={[styles.profileDetails, styles.BottomSpace]}>Muhammad Rehman Siddiqui</Text>
                <Text style={styles.profileDetails}>92000029228</Text>
                <Text style={styles.profileDetails}>AbcG@gamil.com</Text>
              </View>
              <View>
                <TouchableOpacity onPress={()=>{
            dispatch(setleftDrawerOpen(false))
            navigation.navigate('Profile')}} >
                  <View style={styles.Editbtn}>
                    <Icon name={'edit-3'} size={14} color={'#40916c'} style={{ marginRight: 8 }} />
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#40916c' }}>Edit</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        <DrawerItems navigation={navigation}/>

      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionE: {
    paddingVertical: 4,
    paddingHorizontal: 7,
    elevation:3,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    marginHorizontal: 0,
  },
  optionU: {
    paddingVertical: 4,
    paddingHorizontal: 7,
    elevation:3,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    marginHorizontal: 0,
  },

  optionText: {
    fontSize: 12,fontWeight:'500',
  },
  primaryBackground: {
    backgroundColor:colors.DarkGreen,
  },
  secondaryBackground: {
    backgroundColor: colors.Tailwhite,
  },
  primaryText:{
    color:colors.Tailwhite,
  },
  secondaryText:{
    color:colors.black,
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 110 / 2,
    // position: 'absolute',
    // left: width / 2 - 110,
    // left: -10,
    borderWidth: 0.5,
    borderColor: colors.white,
  },
  drawerListWrapper: {
    marginTop: 5,
  },
  Profile: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderBottomStartRadius: 12,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    borderBottomEndRadius: 12,
    backgroundColor: colors.DarkGreen,
    width: wp('70%'),
    height: hp('18%'),

  },
  Editbtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius:12,
    paddingHorizontal: 6,
    paddingVertical:4,
  },
  profileDetails: {
    fontSize: 13, color: colors.Tailwhite, fontWeight: '500', width: wp('30%'),
  },
  BottomSpace: {
    marginBottom: 8,
  },
  drawerItem: {

    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.dark,
  },
});
