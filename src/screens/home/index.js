import { SafeAreaView, ScrollView, StyleSheet, Image, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React from 'react';
import { colors } from '../../utils/Colors';
import icons from '../../utils/icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/core';
import Promotions from '../Promotions';
import { Svg, Path } from 'react-native-svg';
import Header from './Header';
import CarouselCards from './CarouselCards';
import FreeHajjUmrah from '../FreeHajjUmrah';
import Packages from './Packages';
import HelpSupport from './HelpSupport';
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
      <TouchableOpacity style={styles.featureItem} onPress={() => console.log(item.description)}>
      <View style={[styles.iconContainer, { backgroundColor: item.backgroundColor }]}>
        <Image source={item.icon} resizeMode="contain" style={[styles.icon, { tintColor: item.color }]} />
      </View>
      <Text style={styles.featureText}>{item.description}</Text>
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
  
              <View style={styles.carouselContainer}>
                <CarouselCards navigation={navigation} />
              </View>
          
        </View>
        {/* Hajj/umrah package Mecca */}
        <Packages />
        {/* More with Mecca */}
          <View style={styles.MoreItems}>
            {renderFeatures()}
          </View>
        {/* Promotions */}
        <View style={{}}>
        <Promotions navigation={navigation} />
        </View>
        <View>
          <FreeHajjUmrah navigation={navigation}/>
        </View>
        {/* Help & Customer */}
        <HelpSupport />
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
    elevation:3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
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
  },
  featureItem: {
    marginBottom: 20,
    width: 60,
    alignItems: 'center',
  },
  iconContainer: {
    height: 40,
    width: 40,
    marginBottom: 5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  icon: {
    height: 20,
    width: 20,
  },
  featureText: {
    textAlign: 'center',
    color: colors.black,
    fontSize: 11,
    flexWrap: 'wrap',
  },
});
