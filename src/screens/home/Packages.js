import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { colors } from '../../utils/Colors';
import icons from '../../utils/icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Packages = () => {
  return (
    <View style={{ padding: 10, margin: 15 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={styles.TopitemContainer}>
        <View style={styles.Topitem}>
          <Image source={icons.logo2} style={{
            height: hp('9%'),
            backgroundColor: colors.Tailwhite,
            borderRadius: 10,
            width: wp('20%')
          }} />
          <Text style={{ fontSize: 10, fontWeight: '500', paddingHorizontal: 5, color: colors.black, paddingTop: 70, position: 'absolute' }}>Quran Dazi, Multiple Winners</Text>
        </View>
      </View>
      <View style={styles.TopitemContainer}>
        <View style={styles.Topitem}>
          <Image source={icons.logo1} style={{
            height: hp('10%'), marginBottom: 15,
            backgroundColor: colors.Tailwhite,
            borderRadius: 50, borderWidth: 5, borderColor: colors.white,
            width: wp('20%')
          }} />
          <Text style={{ fontSize: 10, fontWeight: '500', paddingHorizontal: 5, color: colors.black, paddingTop: 48, position: 'absolute' }}>Ticket by Installment</Text>
        </View>
      </View>
      <View style={styles.TopitemContainer}>
        <View style={styles.Topitem}>
          <Image source={icons.logo6} style={{
            height: hp('8%'),
            backgroundColor: colors.Tailwhite,
            borderRadius: 10,
            width: wp('20%')
          }} />
          <Text style={{ fontSize: 10, fontWeight: '500', paddingHorizontal: 5, color: colors.black }}>Purchaze Ticket</Text>
        </View>
      </View>
    </View>
  </View>
  )
}

export default Packages

const styles = StyleSheet.create({
    Topitem: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      TopitemContainer: {
        backgroundColor: colors.white, justifyContent: 'space-between',
        width: wp('25%'),
        height: hp('12%'),
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: {
          height: 2, width: 2,
        }
      },
})