import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import IconLang from 'react-native-vector-icons/MaterialIcons';
import IconAcDel from 'react-native-vector-icons/FontAwesome5';
import IconDel from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Path } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors } from '../../../utils/Colors';

const InsideSetting = ({navigation}) => {
  const handlePress=()=>{
    navigation.navigate('Language')
  }
  const handlePresss=()=>{
    navigation.navigate('DeleteAccount')
  }
  const handlePres=()=>{
    navigation.navigate('ChangePassword')
  }
  const handlePresUC=()=>{
    navigation.navigate('EditProfile')
  }

  return (
    <SafeAreaView style={styles.container}>
        <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          marigTop: 20,
          paddingBottom: 20,
        }}>
        <View style={{
          paddingTop: Platform.OS === "ios" ? 5 : 20,
        }}>
          <Text style={{ fontSize: 24, fontWeight: "700", color: "#000" }}>Settings</Text>
        </View>
      </View>
             {/* line  data */}
             <View style={{width:wp('100%'),flex:1,alignItems:'center'}}>
            <TouchableWithoutFeedback onPress={handlePress}>
             <View style={styles.link_tab}>
                <View style={styles.tab_icon}>
                <IconLang name={'language'} size={22}/>
                  <Text style={{ fontSize: 15, color: colors.gray, fontWeight: "300" }}>
                    Languages
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
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback  onPress={handlePresUC}>
             <View style={styles.link_tab}>
                <View style={styles.tab_icon}>
                  <IconAcDel name={'user-edit'} size={20}/>
                  <Text style={{ fontSize: 15, color: colors.gray, fontWeight: "300" }}>
                    Change User Name
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
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handlePres}>
             <View style={styles.link_tab}>
                <View style={styles.tab_icon}>
                <IconAcDel name={'eye-slash'} size={20}/>
                  <Text style={{ fontSize: 15, color: colors.gray, fontWeight: "300" }}>
                  Change Password
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
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handlePresss}>
             <View style={styles.link_tab}>
                <View style={styles.tab_icon}>
                <IconDel name={'delete'} size={24}/>
                  <Text style={{ fontSize: 15, color: colors.gray, fontWeight: "300" }}>
                    Delete Account
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
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            </TouchableWithoutFeedback>
            </View>
    </SafeAreaView>
  )
}

export default InsideSetting

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor:colors.Tailwhite,
  height : hp('100%'),
width :wp('100%'),
},
content_area: {
  paddingHorizontal: 20,
  paddingBottom: 50,
},
link_tab: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 15,
  borderStyle: 'solid',
  padding:15,width:wp('90%'),
  borderRadius:12,elevation:5,backgroundColor:colors.Tailwhite,margin:4
},
tab_icon: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},
})