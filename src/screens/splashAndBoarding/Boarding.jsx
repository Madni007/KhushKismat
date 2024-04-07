import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { colors } from '../../utils/Colors';
import PagerView from 'react-native-pager-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Path, Svg } from 'react-native-svg';
import { RFPercentage } from "react-native-responsive-fontsize";
import { latoRugular } from '../../utils/font';

const Boarding = ({ navigation }) => {

  const viewPager = useRef(null)

  const [index, setIndex] = useState(0)

  return (
    <>
      <PagerView style={styles.sty4}
        showPageIndicator={true}
        initialPage={0}
        ref={viewPager}
        onPageSelected={(e) => {
          setIndex(e.nativeEvent.position)
        }}
      >


        <View style={styles.sty5} key="1">
          <View style={styles.content}>
            <View style={styles.image_view}>
              <Image
                source={{uri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711761383/Khush_kismat/KabaImages/h7_spahki.jpg'}}
                style={styles.image}
              />
            </View>

            <Svg style={{ marginTop: -hp("21%") }} xmlns="http://www.w3.org/2000/svg" width={wp("110%")} height={hp("25%")} viewBox="0 0 410 1" fill="none">
              <Path d="M0 81.7122L4.38562 77.7691C121.287 -27.338 299.144 -25.6258 414 81.7122V468H0V81.7122Z" fill="white" />
            </Svg>
            <View style={{ backgroundColor: "#fff", marginTop: -hp("4%") }}>
              <View style={{ alignContent: "center" }}>
                <View >
                  <Text style={styles.heading}>Best Services For Your Home</Text>
                  <Text style={styles.detail}>
                    Homecare is health care provided by a professional caregiver in the individual home.</Text>
                </View>
                <View style={styles.line_view}>
                  <View style={styles.line_active}></View>
                  <View style={styles.line_inactive}></View>
                  <View style={styles.line_inactive}></View>
                </View>
              </View>

              <View style={{ paddingVertical: hp("5.5%") }}>
                <Pressable
                  onPress={() => {
                    viewPager.current.setPage(index + 1)
                    setIndex(index + 1)
                  }}
                  style={styles.button}
                >
                  <Text style={styles.button_text}>Next</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("login")
                  }}
                  style={styles.button2}
                >
                  <Text style={[styles.button_text, { color: colors.primary }]}>Skip</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sty5} key="2">
          <View style={[styles.content, { backgroundColor: "#E5ECFF" }]}>
            <View style={styles.image_view}>
              <Image
                source={{uri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711761388/Khush_kismat/KabaImages/h9_icezcd.jpg'}}
                style={styles.image}
              />
            </View>

            <Svg style={{ marginTop: -hp("21%") }} xmlns="http://www.w3.org/2000/svg" width={wp("110%")} height={hp("25%")} viewBox="0 0 410 1" fill="none">
              <Path d="M0 81.7122L4.38562 77.7691C121.287 -27.338 299.144 -25.6258 414 81.7122V468H0V81.7122Z" fill="white" />
            </Svg>
            <View style={{ backgroundColor: "#fff", marginTop: -hp("4%") }}>
              <View style={{ alignContent: "center" }}>
                <View >
                  <Text style={styles.heading}>Care Your Home With Us</Text>
                  <Text style={styles.detail}>
                    Some nurses travel to multiple homes per day and provide short visits to multiple patients.</Text>
                </View>
                <View style={styles.line_view}>
                  <View style={styles.line_inactive}></View>
                  <View style={styles.line_active}></View>
                  <View style={styles.line_inactive}></View>
                </View>
              </View>

              <View style={{ paddingVertical: hp("5.5%") }}>
                <Pressable
                  onPress={() => {
                    viewPager.current.setPage(index + 1)
                    setIndex(index + 1)
                  }}
                  style={styles.button}
                >
                  <Text style={styles.button_text}>Next</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("login")
                  }}
                  style={styles.button2}
                >
                  <Text style={[styles.button_text, { color: colors.primary }]}>Skip</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>


        <View style={styles.sty5} key="3">
          <View style={[styles.content, { backgroundColor: "#F7FBCD" }]}>
            <View style={styles.image_view}>
              <Image
                source={{uri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711761386/Khush_kismat/KabaImages/h8_tamukl.jpg'}}
                style={styles.image}
              />
            </View>

            <Svg style={{ marginTop: -hp("21%") }} xmlns="http://www.w3.org/2000/svg" width={wp("110%")} height={hp("25%")} viewBox="0 0 410 1" fill="none">
              <Path d="M0 81.7122L4.38562 77.7691C121.287 -27.338 299.144 -25.6258 414 81.7122V468H0V81.7122Z" fill="white" />
            </Svg>
            <View style={{ backgroundColor: "#fff", marginTop: -hp("4%") }}>
              <View style={{ alignContent: "center" }}>
                <View >
                  <Text style={styles.heading}>Using Smart Gadgets </Text>
                  <Text style={styles.detail}>
                    Homecare is also known as domiciliary care, social care or in-home care.</Text>
                </View>
                <View style={styles.line_view}>
                  <View style={styles.line_inactive}></View>
                  <View style={styles.line_inactive}></View>
                  <View style={styles.line_active}></View>
                </View>
              </View>
              <View style={{ alignContent: "center", paddingVertical: hp("7%") }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate("login")
                  }}
                  style={styles.button}
                >
                  <Text style={styles.button_text}>Next</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("login")
                  }}
                  style={styles.button2}
                >
                  <Text style={[styles.button_text, { color: colors.primary }]}>Skip</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </PagerView>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: hp("2%"),
    backgroundColor: 'white',
  },
  button2: {
    color: 'white',
    padding: hp("2.5%"),
    borderRadius: 12,
    width: wp("90%"),
    alignSelf: "center",
    marginHorizontal: 33,
  },
  button: {
    backgroundColor: colors.primary,
    color: 'white',
    padding: hp("2.5%"),
    borderRadius: 12,
    alignSelf: "center",
    width: wp("90%"),
    marginHorizontal: wp("1%"),
  },
  button_text: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: "LatoRegular", fontSize: RFPercentage(2.2),
  },
  content: {
    marginTop: -160,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: hp("17%"),
    backgroundColor: "#FFC8CF",
  },
  image_view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,

  },
  image: {
    width: wp("85%"),
    height: hp("68%"),
    resizeMode: 'contain',
  },
  heading: {
    textAlign: 'center',
    fontSize: RFPercentage(3.7),
    fontFamily: "LatoRegular",
    paddingHorizontal: hp("12%"),
    fontWeight: '800',
    color: 'black',
  },
  detail: {
    marginTop: hp("2%"),
    textAlign: 'center',
    fontSize: RFPercentage(2),
    fontWeight: '500',
    fontFamily: "LatoRegular",
    color: '#6D6E71',
    lineHeight: 22,
    paddingHorizontal: 35,
  },
  line_view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    gap: 12,
    marginVertical: 20,
  },
  line_active: {
    height: wp("1.5%"),
    width: wp('1.5%'),
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  line_inactive: {
    backgroundColor: colors.my_gray,
    height: wp("1.5%"),
    width: wp('1.5%'),
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.my_gray,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sty4: {
    flex: 1,
  },
  sty5: {
    alignItems: "center",
    justifyContent: "center"
  },
});

export default Boarding;
