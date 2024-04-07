import React from 'react';
import { StyleSheet, Text, View, Image,SafeAreaView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../utils/Colors';
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AppHeader from '../../components/AppHeader';
const Support =[  { title: 'Quick Help', icon: 'info' },
{ title: 'Register New Complaint', icon: 'more' },
{ title: 'FAQs', icon: 'phone' },
{ title: 'Tutorial For App Usage', icon: 'reload' },
{ title: 'Connect With Us', icon: 'internet' },
]

const CustomerSupport = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={'Help & Customer Support'}/>
      <View style={{ height: hp('20%'), alignItems: 'center' }}>
        <View style={styles.HelpContainer}>
          <View style={{ width: wp('20%'), justifyContent: 'center', alignItems: 'center' }}><Image source={icons.headphone}
            // resizeMode="contain"
            style={{
              height: hp('10%'),
              backgroundColor: colors.Tailwhite,
              borderRadius: 40, marginRight: 15,
              width: wp('25%')
            }} />
            <View style={{ position: 'absolute', paddingRight: 34, }}>
              <Svg width="50" height="50" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4ZM13 17H11V10H13V17ZM13 9H11V7H13V9Z" fill="#40916c" fill-opacity="0.6" />
              </Svg></View>
          </View>
        </View>
        {/* h  */}

      </View>
      <View style={styles.helpTextContainer}>
        <Text style={styles.helpTextH}>Tell us how we can help</Text>
        <Text style={styles.helpText}>Please select from one of the options below</Text>
      </View>
      <View style={styles.optionsContainer}>
      {Support.map((item, index) => (
        <View style={styles.optionRow} key={index}>
         <Image source={icons[item.icon]} style={styles.optionImage} />
          <Text style={styles.optionText}>{item.title}</Text>
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M17 12L12 7M12 7L7 12M12 7L12 17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </Svg>
        </View>
        ))}
      </View>
    </SafeAreaView>
  );
};


export default CustomerSupport;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.Tailwhite,
  },
  headerImage: {
    width: 30,
    height: hp('3%'),
    marginLeft: 10,
  },
  helpTextContainer: {
    padding: 20,
    alignItems: 'center',
  },
  helpTextH: {
    color:colors.black,
    fontSize: 16,
    fontWeight:'600',
    marginBottom: 10,
  },
  helpText: {
    color:colors.black,
    fontSize: 12,
    marginBottom: 10,
  },
  optionsContainer: {
    borderTopWidth: 1.5,
    borderTopColor: 'lightgray',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1.5,
    borderBottomColor: 'lightgray',
  },
  optionImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  HelpContainer:{
  height:hp('20%'),width:wp('88%'),
  justifyContent:'center',alignItems:'center',
  }
});
