import { SafeAreaView, StyleSheet, ScrollView, Text, View, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { Svg, Path } from 'react-native-svg'
import { colors } from '../../utils/Colors'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { setleftDrawerOpen } from '../../redux/slices/commonSlice'
import { useDispatch } from 'react-redux'
const DrawerItems = ({ navigation, title }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    navigation.navigate("login")
    dispatch(setleftDrawerOpen(false))
  }
  return (

    <ScrollView>
      <View style={styles.content_area}>

        <TouchableWithoutFeedback onPress={() => {
          dispatch(setleftDrawerOpen(false))
          navigation.navigate('TransactionHistory')
        }}>
          <View style={styles.link_tab}>
            <View style={styles.tab_icon}>
              <Svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M20 18H6V17H19V10H20V18Z" fill="#1C2E45" fill-opacity="0.6" />
                <Path d="M17 8V15H5V8H17ZM18 7H4V16H18V7Z" fill="#1C2E45" fill-opacity="0.6" />
                <Path d="M7 10H6V13H7V14H11C9.619 14 8.5 12.881 8.5 11.5C8.5 10.119 9.619 9 11 9H7V10Z" fill="#1C2E45" fill-opacity="0.6" />
                <Path d="M15 10V9H11C12.381 9 13.5 10.119 13.5 11.5C13.5 12.881 12.381 14 11 14H15V13H16V10H15Z" fill="#1C2E45" fill-opacity="0.6" />
              </Svg>
              <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.1), color: colors.text_gray, fontWeight: "300" }}>
              Transection History
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

        <TouchableWithoutFeedback onPress={() => {
          dispatch(setleftDrawerOpen(false))
          navigation.navigate('CustomerSupport')
        }}>
          <View style={styles.link_tab}>
            <View style={styles.tab_icon}>
              <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path d="M15.8754 19.4874L16.0559 19.3625C16.6209 18.9719 16.9035 18.7765 17.1562 18.567C18.5294 17.4289 19.4518 15.8424 19.7588 14.0905C19.8153 13.7681 19.8446 13.4271 19.9033 12.7449L19.9337 12.3922C20.0309 11.2632 20.0212 10.1275 19.9048 9.00023L19.8687 8.65139C19.665 6.6787 18.4539 4.94971 16.6644 4.07663C13.7221 2.64112 10.2779 2.64112 7.33559 4.07663C5.54608 4.94971 4.33504 6.6787 4.13127 8.65139L4.09524 9.00023C3.9788 10.1275 3.96911 11.2632 4.0663 12.3922L4.09666 12.7449C4.15537 13.4271 4.18473 13.7681 4.24123 14.0905C4.54821 15.8424 5.47055 17.4289 6.8438 18.567C7.09652 18.7765 7.3791 18.9719 7.94406 19.3626L8.12461 19.4874C8.89273 20.0185 9.27682 20.2842 9.66175 20.4687C11.1393 21.1771 12.8607 21.1771 14.3382 20.4687C14.7232 20.2842 15.1073 20.0186 15.8754 19.4874Z" stroke="#23408F" stroke-width="1.5" />
                <Path d="M19.9033 12.7449L19.9337 12.3922C20.0309 11.2632 20.0212 10.1275 19.9048 9.00023L19.8687 8.65139C19.665 6.6787 18.4539 4.94971 16.6644 4.07663C13.7221 2.64112 10.2779 2.64112 7.33559 4.07663C5.54608 4.94971 4.33504 6.6787 4.13127 8.65139L4.09524 9.00023C3.9788 10.1275 3.96911 11.2632 4.0663 12.3922L4.09666 12.7449C4.15537 13.4271 4.18473 13.7681 4.24123 14.0905C4.54821 15.8424 5.47055 17.4289 6.8438 18.567C7.09652 18.7765 7.3791 18.9719 7.94406 19.3626L8.12461 19.4874C8.89273 20.0185 9.27682 20.2842 9.66175 20.4687" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                <Path d="M9.25 11.75L11.25 13.75L14.75 10" stroke="#23408F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </Svg>
              <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.1), color: colors.text_gray, fontWeight: "300" }}>
              Customer Support
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
        <TouchableWithoutFeedback onPress={() => {
          dispatch(setleftDrawerOpen(false))
          navigation.navigate('Notification')
        }}>
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
              <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.1), color: colors.text_gray, fontWeight: "300" }}>
              Notifications
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

        {/* Review  */}
        <TouchableWithoutFeedback onPress={() => {
          dispatch(setleftDrawerOpen(false))
          navigation.navigate('Help')
        }}>
          <View style={styles.link_tab}>
            <View style={styles.tab_icon}>
              <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <Path d="M9.65394 4.58646C10.5321 2.47118 13.4679 2.47118 14.3461 4.58646L14.9577 6.05983C15.3174 6.9261 16.107 7.52663 17.0227 7.63041L18.7297 7.82385C20.8853 8.06813 21.7756 10.7755 20.2013 12.2988L18.752 13.7012C18.1148 14.3177 17.8333 15.2258 18.0069 16.1045L18.3568 17.8758C18.7997 20.118 16.3977 21.8109 14.5018 20.5927L13.3571 19.8572C12.5276 19.3242 11.4724 19.3242 10.6429 19.8572L9.49819 20.5927C7.60234 21.8109 5.20031 20.118 5.64324 17.8758L5.99315 16.1045C6.16673 15.2258 5.88518 14.3177 5.24798 13.7012L3.79871 12.2988C2.22438 10.7755 3.11472 8.06813 5.27034 7.82385L6.97726 7.63041C7.89305 7.52663 8.68263 6.9261 9.04227 6.05983L9.65394 4.58646Z" stroke="#23408F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <Path d="M10.6429 19.8572L9.49819 20.5927C7.60234 21.8109 5.20031 20.118 5.64323 17.8758L5.99315 16.1045C6.16673 15.2258 5.88518 14.3177 5.24798 13.7012L3.79871 12.2988C2.22438 10.7755 3.11472 8.06813 5.27034 7.82385L6.97726 7.63041C7.89305 7.52663 8.68263 6.9261 9.04226 6.05983L9.65394 4.58646C10.5321 2.47118 13.4679 2.47118 14.3461 4.58646L14.9577 6.05983C15.3174 6.9261 16.107 7.52663 17.0227 7.63041L18.7297 7.82385C20.8853 8.06813 21.7756 10.7755 20.2013 12.2988L18.752 13.7012C18.1148 14.3177 17.8333 15.2258 18.0069 16.1045" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </Svg>
              <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.1), color: colors.text_gray, fontWeight: "300" }}>
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

     

        <TouchableWithoutFeedback
          onPress={handleLogout}
        >
          <View style={{
            backgroundColor: colors.primary, borderRadius: 25, elevation: 5, alignItems: 'center', paddingVertical: 15, width: "70%", alignSelf: "center", marginTop: 40,
            borderStyle: 'solid',
          }}>
            <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2), color: colors.secondary, textAlign: "center", }}>
              Log Out
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>

  )
}

export default DrawerItems

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.my_bg,
    height: hp('100%'),
    width: wp('100%'),
  },
  content_area: {
    // 
  },
  link_tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 13,
    borderStyle: 'solid',
    borderRadius: 12,
    marginVertical: 1,
    borderBottomWidth: 0.3,
  },
  tab_icon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})