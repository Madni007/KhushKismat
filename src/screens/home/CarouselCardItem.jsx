import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, TouchableOpacity } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { colors } from '../../utils/Colors';
export const SLIDER_WIDTH = Dimensions.get('window').width + 50
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.74)

const CarouselCardItem = ({ item, index, navigation }) => {

  const handlePress = () => {
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjj", item)
    navigation.navigate('service-inside', {
      step: 1,
    })
  }
  return (
    <View>
      <View style={styles.container} key={index}>
        <View style={styles.content}>
          <View>
            <Text style={styles.heading}>
              Wall Painting Service
            </Text>
            <Text style={{ fontFamily: "LatoRegular", fontSize: hp("1.7%") }}>Make your wall stylish</Text>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
              <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(1.7), color: 'white' }}>
                Book now
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: item.item.imgUrl }}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9D7FF',
    // backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    marginTop: 0,
    marginLeft: -30,
    paddingBottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 5,
    borderRadius: 15,
  },
  content: { flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 40, alignContent: "center" },
  image: {
    alignSelf: "flex-end",
    marginRight: -15,
    width: wp("39%"),
    height: hp("20%"),
    borderRadius: 10,
    resizeMode: "contain"

  },

  heading: { fontWeight: "700", fontFamily: "LatoRegular", fontSize: wp("6.0%"), color: "#000", paddingHorizontal: 50, marginTop: 25, marginLeft: -45 },
  button: {
    backgroundColor: colors.DarkGreen,
    width: wp('25%'),
    marginVertical: 15,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,


  },
})

export default CarouselCardItem