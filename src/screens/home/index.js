import { SafeAreaView, ScrollView, StyleSheet, Image, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React from 'react';
import { colors } from '../../utils/Colors';
import icons from '../../utils/icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';
import Promotions from '../Promotions';
import { Svg, Path } from 'react-native-svg';
import Header from './Header';
import CarouselCards from './CarouselCards';
const Home = () => {
  const navigation = useNavigation();
  const handlePresS = () => {
    navigation.navigate('Search')
  };
  const handlePresN = () => {
    navigation.navigate('Notification')
  };

  const featuresData = [
    {
      id: 1,
      icon: icons.reload,
      color: colors.DarkGreen,
      backgroundColor: colors.LightGreen,
      description: "Hajj Guide"
    },
    {
      id: 2,
      icon: icons.send,
      color: colors.DarkGreen,
      backgroundColor: colors.LightGreen,
      description: "Umrah Guide"
    },
    {
      id: 3,
      icon: icons.internet,
      color: colors.DarkGreen,
      backgroundColor: colors.LightGreen,
      description: "Ahadees"
    },
    {
      id: 4,
      icon: icons.wallet,
      color: colors.golden,
      backgroundColor: colors.LightGreen,
      description: "Events"
    },
    {
      id: 5,
      icon: icons.game,
      color: colors.golden,
      backgroundColor: colors.LightGreen,
      description: "Rs.1 Games"
    },
    // {
    //   id: 6,
    //   icon: icons.bill,
    //   color: colors.DarkGreen,
    //   backgroundColor: colors.LightGreen,
    //   description: "Bill"
    // },
    // {
    //   id: 7,
    //   icon: icons.phone,
    //   color: colors.DarkGreen,
    //   backgroundColor: colors.LightGreen,
    //   description: "Mobile Prepaid"
    // },
    // {
    //   id: 8,
    //   icon: icons.more,
    //   color: colors.DarkGreen,
    //   backgroundColor: colors.LightGreen,
    //   description: "More"
    // },
    
  ]
  const [features, setFeatures] = React.useState(featuresData)

  function renderFeatures() {

    const Header = () => (
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 13, fontWeight: "500", color: colors.black }}>Khush kismat Events</Text>
      </View>
    )

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{ marginBottom: 20, width: 60, alignItems: 'center', shadowColor: 'black' }}
        onPress={() => console.log(item.description)}
      >
        <View
          style={{
            height: 40,
            width: 40,
            marginBottom: 5,
            borderRadius: 25,
            backgroundColor: item.backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 2,
          }}
        >
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{
              height: 20,
              width: 20,
              tintColor: item.color
            }}
          />
        </View>
        <Text style={{ textAlign: 'center', color: colors.black, flexWrap: 'wrap', fontSize: 11 }}>{item.description}</Text>
      </TouchableOpacity>
    )

    return (
      <FlatList
        ListHeaderComponent={Header}
        data={features}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
      />
    )
  }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.Tailwhite}}>
      <View>
        <Header onPressSearch={handlePresS} onPressNotifications={handlePresN} />
      </View>
          <ScrollView>

        <View style={styles.container}>
        
            {/* <LinearGradient style={{alignItems: 'center',}}
              colors={[colors.grad1, colors.grad2]}
              > */}
              <View style={styles.carouselContainer}>
                <CarouselCards navigation={navigation} />
              </View>
              {/* </LinearGradient> */}
          
        </View>
        {/* Hajj/umrah package Mecca */}
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
        {/* More with Mecca */}
        <View style={{ width: wp('100%') }}>
          <View style={styles.MoreItems}>
            {renderFeatures()}
          </View>
        </View>
        {/* Promotions */}
        <View style={{}}>
        <Promotions navigation={navigation} />
        </View>
        {/* Help & Customer */}
        <View style={{ padding: 20, elevation: 3, width: wp('88%') }}>
          <View style={styles.HelpContainer}>
            <View style={{ width: wp('20%'), justifyContent: 'center', alignItems: 'center' }}><Image source={icons.headphone}
              style={{
                height: hp('10%'),
                backgroundColor: colors.white,
                borderRadius: 40, marginRight: 15,
                width: wp('25%')
              }} />
              <View style={{ position: 'absolute', paddingRight: 34, }}>
                <Svg width="50" height="50" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4ZM13 17H11V10H13V17ZM13 9H11V7H13V9Z" fill="#40916c" fill-opacity="0.6" />
                </Svg></View>

            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.black }}>Help & Customer Support</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color: colors.black, width: wp('55%'), marginTop: 10 }}>Register Your Request or get Quick help on queries related to Mecca</Text>
              <TouchableOpacity onPress={() => (navigation.navigate('Help'))}>
                <View style={styles.helpBtn}>
                  <Text style={{ fontSize: 11, fontWeight: '500', color: colors.black }}>Get Help</Text>
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M19.75 12.25L3.75 12.25" stroke="#40916c" stroke-width="1.00088" stroke-linejoin="round" />
                    <Path d="M19.75 12.25L4.25001 12.25" stroke="#40916c" stroke-width="1.00088" stroke-linejoin="round" />
                    <Path d="M17.25 9.25C18.4216 10.4216 19.0784 11.0784 20.25 12.25L17.25 15.25" stroke="#40916c" stroke-width="1.00088" stroke-linejoin="round" />
                  </Svg>

                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ height: hp('10%') }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.Tailwhite,
  },
  carouselContainer: {
    zIndex: 2,
    marginTop: 20,
    marginBottom: -30,
    // marginTop: hp('2%'),
    alignSelf: 'center',
    width: wp('100%'),

  },

  MoreItems: {
    width: wp('89%'),
    padding: 20, margin: 20, backgroundColor: colors.white,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
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
  HelpContainer: {
    flexDirection: 'row', backgroundColor: colors.white, padding: 20, height: hp('20%'), width: wp('88%'),
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 2, width: 2,
    }

  },
  helpBtn: {
    flexDirection: 'row', padding: 2, paddingHorizontal: 6,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20, marginTop: 20,
    borderColor: 'lightgray', borderWidth: 1.5, width: wp('28%'),
    justifyContent: 'center', alignItems: 'center',
  }
});
