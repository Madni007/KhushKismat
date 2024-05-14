import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Linking,TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Svg, Path, Rect } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserProfile, setAuth } from '../../redux/slices/commonSlice';
import Icon1 from 'react-native-vector-icons/MaterialIcons'

import SafeLayout from '../layout/SafeLayout';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors } from '../../utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader1 from '../../components/AppHeader1';

const Profile = ({ navigation }) => {
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const { user } = useSelector((state) => state.common)


  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(setAuth(null))
    navigation.navigate("login")

  }
  const onPressNotifications=()=>{
    navigation.navigate('Notification')
  };
  useEffect(() => {
    dispatch(GetUserProfile())

  }, [])
  const openWhatsAppChat = (phoneNumber) => {
    try {
      Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
    } catch (err) {
      console.log("whatsapp error:", err)
      Toast.showWithGravity(
        `Unable to open whatsApp`,
        Toast.SHORT,
        Toast.CENTER,
      );
    }
  };
  return (
    <SafeAreaView style={{flex:1,}}>
        <AppHeader1 title={'My Profile'} />
      <>
        <ScrollView style={styles.container}>
          {/* icon header */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor:colors.Tailwhite,
              paddingHorizontal: 20,
              marigTop: 20,
              paddingBottom: 20,
            }}>

          
          </View>
          {/* Content Section  */}
          <View style={styles.content_area}>
            {/* Avatar Section  */}
            <View style={styles.profile_data}>
              <View style={styles.profile_avatar}>
                <Image source={"frame"} />
                <Svg width="74" height="74" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-ba99afe0="">
                  <Path fill-rule="evenodd" clip-rule="evenodd" d="M11.9987 0.333313C5.55605 0.333313 0.332031 5.55654 0.332031 12C0.332031 18.4434 5.55554 23.6666 11.9987 23.6666C18.4424 23.6666 23.6654 18.4434 23.6654 12C23.6654 5.55654 18.4424 0.333313 11.9987 0.333313ZM11.9987 3.82178C14.1305 3.82178 15.858 5.54987 15.858 7.68078C15.858 9.81219 14.1305 11.5398 11.9987 11.5398C9.86789 11.5398 8.14039 9.81219 8.14039 7.68078C8.14039 5.54987 9.86789 3.82178 11.9987 3.82178ZM11.9961 20.6163C9.86994 20.6163 7.92259 19.842 6.42057 18.5603C6.05467 18.2482 5.84354 17.7905 5.84354 17.3103C5.84354 15.1492 7.59257 13.4196 9.75412 13.4196H14.2443C16.4064 13.4196 18.1487 15.1492 18.1487 17.3103C18.1487 17.791 17.9386 18.2477 17.5722 18.5598C16.0707 19.842 14.1228 20.6163 11.9961 20.6163Z" fill="#DEE0E5" fill-opacity="0.87" data-v-ba99afe0=""></Path></Svg>
              </View>
              <View>
                <Text style={{ fontSize: 14, color: 'black', textAlign: "center", fontWeight: 600 }}>
                  User Name
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    color: "rgba(195, 197, 203, 1)",
                    marginTop: 10,
                    marginBottom: 10,

                  }}>
                  +92176982373
                </Text>
              </View>
            </View>


            {/* Profile  */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate('EditProfile')}>
              <View style={styles.link_tab}>
                <View style={styles.tab_icon}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                    fill="none">

                    <Path
                      d="M6.90771 8C8.84071 8 10.4077 6.433 10.4077 4.5C10.4077 2.567 8.84071 1 6.90771 1C4.97472 1 3.40771 2.567 3.40771 4.5C3.40771 6.433 4.97472 8 6.90771 8Z"
                      stroke="#757679"
                      stroke-width="1.5"
                    />
                    <Path
                      d="M10.4073 14.9999H2.19317C1.35108 14.9999 0.699539 14.2618 0.803986 13.4262L1.07734 11.2394C1.2087 10.1885 2.10204 9.3999 3.16112 9.3999H3.40728"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M3.59321 14.9999H11.8073C12.6494 14.9999 13.3009 14.2618 13.1965 13.4262L12.9232 11.2394C12.7918 10.1885 11.8984 9.3999 10.8394 9.3999H10.5932"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                  </Svg>
                  <Text style={{ fontSize: 15, color: colors.gray, fontWeight: "300" }}>
                    Profile
                  </Text>
                </View>
                <Svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M7.4248 16.5999L12.8581 11.1666C13.4998 10.5249 13.4998 9.4749 12.8581 8.83324L7.4248 3.3999"
                    stroke="#757679"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
            </TouchableWithoutFeedback>
            {/* Addresses  */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Address')} >
              <View style={styles.link_tab}>
                <View style={styles.tab_icon}>
                  <Svg
                    width="20"
                    height="20"
                    strokeWidth={1.3}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M14.1665 18.3335H5.83317C2.49984 18.3335 1.6665 17.5002 1.6665 14.1668V12.5002C1.6665 9.16683 2.49984 8.3335 5.83317 8.3335H14.1665C17.4998 8.3335 18.3332 9.16683 18.3332 12.5002V14.1668C18.3332 17.5002 17.4998 18.3335 14.1665 18.3335Z"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M5 8.33317V6.6665C5 3.90817 5.83333 1.6665 10 1.6665C13.75 1.6665 15 3.33317 15 5.83317"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M9.99984 15.4167C11.1504 15.4167 12.0832 14.4839 12.0832 13.3333C12.0832 12.1827 11.1504 11.25 9.99984 11.25C8.84924 11.25 7.9165 12.1827 7.9165 13.3333C7.9165 14.4839 8.84924 15.4167 9.99984 15.4167Z"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                  <Text style={{ fontSize: 15, color: colors.gray, fontWeight: "300" }}>
                    Addresses
                  </Text>
                </View>
                <Svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M7.4248 16.5999L12.8581 11.1666C13.4998 10.5249 13.4998 9.4749 12.8581 8.83324L7.4248 3.3999"
                    stroke="#757679"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
            </TouchableWithoutFeedback>
            {/* Payment Method*/}
            <TouchableWithoutFeedback
             onPress={() => navigation.navigate("Payments")}
             >
              <View style={styles.link_tab}>
                <View style={styles.tab_icon}>
                  <Svg
                    width="20"
                    height="20"
                    strokeWidth={1.3}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M1.6665 10.5083H15.8332"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M15.8332 8.56683V14.5252C15.8082 16.9002 15.1581 17.5002 12.6831 17.5002H4.81653C2.29986 17.5002 1.6665 16.8752 1.6665 14.3918V8.56683C1.6665 6.31683 2.1915 5.59183 4.1665 5.47516C4.3665 5.46683 4.58319 5.4585 4.81653 5.4585H12.6831C15.1998 5.4585 15.8332 6.0835 15.8332 8.56683Z"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M18.3332 5.60833V11.4333C18.3332 13.6833 17.8082 14.4083 15.8332 14.525V8.56667C15.8332 6.08333 15.1998 5.45833 12.6831 5.45833H4.81653C4.5832 5.45833 4.3665 5.46667 4.1665 5.475C4.1915 3.1 4.84153 2.5 7.31653 2.5H15.1831C17.6998 2.5 18.3332 3.125 18.3332 5.60833Z"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M4.375 14.8418H5.80831"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M7.5918 14.8418H10.4585"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                  <Text style={{ fontSize: 15, color: colors.gray, fontWeight: "300" }}>
                    Payment Methods
                  </Text>
                </View>
                <Svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M7.4248 16.5999L12.8581 11.1666C13.4998 10.5249 13.4998 9.4749 12.8581 8.83324L7.4248 3.3999"
                    stroke="#757679"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
            </TouchableWithoutFeedback>

            {/* Referral Program  */}
            <TouchableWithoutFeedback 
            // onPress={() => navigation.navigate('referral-program')}
             >
              <View style={styles.link_tab}>
                <View style={styles.tab_icon}>
                  <Svg
                    width="20"
                    height="20"
                    strokeWidth={1.3}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M15.4168 16.25H12.0835"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M13.75 17.9168V14.5835"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M10.1332 9.05817C10.0498 9.04984 9.94984 9.04984 9.85817 9.05817C7.87484 8.9915 6.29984 7.3665 6.29984 5.3665C6.2915 3.32484 7.94984 1.6665 9.9915 1.6665C12.0332 1.6665 13.6915 3.32484 13.6915 5.3665C13.6915 7.3665 12.1082 8.9915 10.1332 9.05817Z"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M9.9917 18.1751C8.47503 18.1751 6.9667 17.7917 5.8167 17.0251C3.80003 15.6751 3.80003 13.4751 5.8167 12.1334C8.10837 10.6001 11.8667 10.6001 14.1584 12.1334"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                  <Text style={{ fontSize: 15, color: colors.gray, fontWeight: "300" }}>
                    Referral Credits
                  </Text>
                </View>
                <Svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M7.4248 16.5999L12.8581 11.1666C13.4998 10.5249 13.4998 9.4749 12.8581 8.83324L7.4248 3.3999"
                    stroke="#757679"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
            </TouchableWithoutFeedback>

            {/*    Gift Card */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Gifts')} >
              <View style={styles.link_tab}>
                <View style={styles.tab_icon}>
                  <Svg
                    width="20"
                    height="20"
                    strokeWidth={1.3}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M15.4168 16.25H12.0835"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M13.75 17.9168V14.5835"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M10.1332 9.05817C10.0498 9.04984 9.94984 9.04984 9.85817 9.05817C7.87484 8.9915 6.29984 7.3665 6.29984 5.3665C6.2915 3.32484 7.94984 1.6665 9.9915 1.6665C12.0332 1.6665 13.6915 3.32484 13.6915 5.3665C13.6915 7.3665 12.1082 8.9915 10.1332 9.05817Z"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M9.9917 18.1751C8.47503 18.1751 6.9667 17.7917 5.8167 17.0251C3.80003 15.6751 3.80003 13.4751 5.8167 12.1334C8.10837 10.6001 11.8667 10.6001 14.1584 12.1334"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                  <Text style={{ fontSize: 15, color: colors.gray, fontWeight: "300" }}>
                    Gift Card
                  </Text>
                </View>
                <Svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M7.4248 16.5999L12.8581 11.1666C13.4998 10.5249 13.4998 9.4749 12.8581 8.83324L7.4248 3.3999"
                    stroke="#757679"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
            </TouchableWithoutFeedback>

            {/* Help Center  */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Help')}>
              <View style={styles.link_tab}>
                <View style={styles.tab_icon}>
                  <Svg
                    width="20"
                    height="20"
                    strokeWidth={1.3}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M9.99984 18.3332C14.5832 18.3332 18.3332 14.5832 18.3332 9.99984C18.3332 5.4165 14.5832 1.6665 9.99984 1.6665C5.4165 1.6665 1.6665 5.4165 1.6665 9.99984C1.6665 14.5832 5.4165 18.3332 9.99984 18.3332Z"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M10 6.6665V10.8332"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M9.99561 13.3335H10.0031"
                      stroke="#757679"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                  <Text style={{ fontSize: 15, color: colors.gray, fontWeight: "300" }}>
                    Help
                  </Text>
                </View>
                <Svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M7.4248 16.5999L12.8581 11.1666C13.4998 10.5249 13.4998 9.4749 12.8581 8.83324L7.4248 3.3999"
                    stroke="#757679"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
            </TouchableWithoutFeedback>

            {/* Setting   */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate('InsideSetting')}>
              <View style={styles.link_tab}>
                <View style={styles.tab_icon}>
                  <Svg
                    width="20"
                    height="20"
                    strokeWidth={1.3}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M14.1665 18.3335H5.83317C2.49984 18.3335 1.6665 17.5002 1.6665 14.1668V12.5002C1.6665 9.16683 2.49984 8.3335 5.83317 8.3335H14.1665C17.4998 8.3335 18.3332 9.16683 18.3332 12.5002V14.1668C18.3332 17.5002 17.4998 18.3335 14.1665 18.3335Z"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M5 8.33317V6.6665C5 3.90817 5.83333 1.6665 10 1.6665C13.75 1.6665 15 3.33317 15 5.83317"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M9.99984 15.4167C11.1504 15.4167 12.0832 14.4839 12.0832 13.3333C12.0832 12.1827 11.1504 11.25 9.99984 11.25C8.84924 11.25 7.9165 12.1827 7.9165 13.3333C7.9165 14.4839 8.84924 15.4167 9.99984 15.4167Z"
                      stroke="#757679"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                  <Text style={{ fontSize: 15, color: colors.gray, fontWeight: "300" }}>
                    Settings
                  </Text>
                </View>
                <Svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M7.4248 16.5999L12.8581 11.1666C13.4998 10.5249 13.4998 9.4749 12.8581 8.83324L7.4248 3.3999"
                    stroke="#757679"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
            </TouchableWithoutFeedback>


            <TouchableWithoutFeedback onPress={handleLogout} >
              <View style={{backgroundColor:colors.DarkGreen,borderRadius:12,elevation:5,alignItems: 'center',  paddingVertical: 15,marginTop:40,marginBottom:60,
    borderStyle: 'solid',}}>
                <Text style={{ fontWeight:'700',fontSize: 14,color:colors.white, textAlign: "center", }}>
                  Log Out
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Tailwhite,
    height : hp('100%'),
     width :wp('100%'),
    },
    content_area: {
    width :wp('100%'),
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
  },
  profile_data: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_avatar: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_img: {
    position: 'absolute',
    borderRadius: 50,
    height: 70,
    width: 70
  },
  notification: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.gray,
    marginTop: 20,
  },
  link_tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderStyle: 'solid',
    borderRadius:12,
    elevation:5,
    margin:4,
    backgroundColor:colors.white,
    padding:4,
    paddingLeft:8,
  },
  tab_icon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
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
});

export default Profile;
