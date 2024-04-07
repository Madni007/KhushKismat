import React, { useEffect, useState } from 'react';
import {
    Text,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,Image,
    SafeAreaView,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { Formik } from 'formik';
import SafeLayout from '../layout/SafeLayout';
import AntDesign from "react-native-vector-icons/AntDesign";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { useSelector } from 'react-redux';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../utils/Colors';

const Address = ({ navigation }) => {
    const { addresses } = useSelector((state) => state.map);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader navigation={navigation} title={'My Address'} />
            {/* Navigation Section  */}
            <View
                style={{
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    backgroundColor: colors.Tailwhite,
                }}>

                <Text style={{ color: '#000', fontWeight: '400', fontFamily: "LatoRegular", fontSize: RFPercentage(2.2), lineHeight: 24 }}>
                    Your Addresses
                </Text>
            </View>
            {/* Content Section  */}
            <ScrollView>

                {/* </View> */}
                <View style={styles.container}>
                    <Formik
                        validate={(values) => {
                        }}
                    >
                        {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, touched, errors }) => (

                            <>
                                <View style={{ width: wp('90%') }}>
                                    {addresses.map((item, i) => (
                                        // <>
                                        //     {i > 0 ?
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 5, borderRadius: 12, elevation: 4, backgroundColor: colors.Tailwhite, height: 108, width: wp('88%'), paddingHorizontal: 15 }}>
                                                    <View style={{ alignSelf: "center" }}>
                                                        <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <Path d="M18 7L9.42857 17L6 13" stroke="#23408F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            <Path d="M18.0001 7L11.7671 14.2718" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        </Svg>

                                                    </View>
                                                    <View style={{ marginLeft: -80, justifyContent: 'center' }}>
                                                        <Text style={{ fontWeight: "600", fontFamily: "LatoRegular", fontSize: RFPercentage(2.2), color: "#000" }}>{item?.city}</Text>
                                                        <Text style={{ fontWeight: "300", fontFamily: "LatoRegular", fontSize: RFPercentage(2.2), color: "#000" }}>{item?.address.length > 12 ? item?.address.slice(0, 12) + "..." : item?.address}</Text>
                                                        <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(1.7), color: "#000", fontWeight: "300", }}>{item?.detail}</Text>
                                                    </View>
                                                    <View style={{ alignSelf: "center" }}>

                                                        <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <Path d="M16.5 9.13608C14.682 9.7421 12.2579 7.31804 12.8639 5.5M13.6109 4.75306L9.69403 8.66988C7.99123 10.3727 6.78322 12.5063 6.19917 14.8425L6.00991 15.5995C5.95094 15.8354 6.1646 16.0491 6.40049 15.9901L7.15752 15.8008C9.49375 15.2168 11.6273 14.0088 13.3301 12.306L17.2469 8.38914C17.7291 7.90697 18 7.253 18 6.5711C18 5.15112 16.8489 4 15.4289 4C14.747 4 14.093 4.27088 13.6109 4.75306Z" stroke="black" stroke-width="1.5" />
                                                            <Path d="M13.6109 4.75306C14.0931 4.27088 14.747 4 15.4289 4C16.8489 4 18 5.15112 18 6.5711C18 7.253 17.7292 7.90697 17.247 8.38914L16.5 9.13608C14.682 9.7421 12.2579 7.31804 12.864 5.5L13.6109 4.75306Z" stroke="#23408F" stroke-width="1.5" />
                                                            <Path d="M19 20H5" stroke="#23408F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        </Svg>
                                                    </View>
                                                </View> 
                                                //  :
                                                // <View>
                                                //     <View style={{ height: hp("75%"), backgroundColor: colors.DarkGreen, justifyContent: 'center', alignItems: 'center' }}>
                                                //         <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.DarkGreen, width: '100%', paddingHorizontal: 20 }}>
                                                //             <View>
                                                //             <Image source={require('../../assets/icons/Address.png')} />
                                                //             </View>
                                                //             <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.8), textAlign: 'center', fontWeight: '800', lineHeight: 30, color: 'black' }}>No Address Yet!</Text>
                                                //             <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.2), fontWeight: '400', lineHeight: 24, marginTop: 10 }}>Add your address and lets get started. </Text>
                                                //             <TouchableOpacity style={{ backgroundColor: colors.DarkGreen, borderRadius: 12, height: 60, width: 160, borderWidth: 1, borderColor: '#23408F', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                                //                 <Text style={{ color: '#23408F', fontFamily: "LatoRegular", fontSize: RFPercentage(2.6), fontWeight: '600', lineHeight: 28 }}>Add Address</Text>
                                                //             </TouchableOpacity>
                                                //         </View>
                                                //     </View>
                                                // </View>
                                            // }</>
                                    ))} 
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
            {/* Button Section   */}
            <View style={{ width: wp('100%'), alignSelf: 'center', backgroundColor: colors.Tailwhite }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.MAPSCREEN)}
                    style={styles.button}>
                    <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.2), color: 'white' }}>
                        Add New Address
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // minHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: colors.Tailwhite,
        height: hp('80%'),
        padding: 10
    },
    button: {
        backgroundColor: colors.DarkGreen,
        width: wp('90%'),
        marginBottom: 15,
        paddingVertical: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        borderRadius: 12,
    },
});




export default Address;
