import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Formik } from 'formik';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Svg, { Path } from 'react-native-svg';
import { colors } from '../../../utils/Colors';
const ChangePassword = () => {
    const SaveChangesPress = () => { };

    const loginValidation = () => { };
    const handleChangePassword = () => { };

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <SafeAreaView style={styles.componentContainer}>
        <View style={{width:wp('90%')}}>
            <View style={{ paddingBottom: 40 }}> 
                <Text style={styles.title}>Change Password</Text>
                <Text>Make Your Account Password Stronger</Text>
            </View>
            <Formik
                initialValues={{ password: '' }}
                validationSchema={loginValidation}
                onSubmit={handleChangePassword}
                validate={(values) => {
                    console.log("XXXX", values);
                }}
            >
                {({ handleChange, submitCount, values, errors }) => (
                    <>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderWidth: 1,
                                borderColor: submitCount > 0 && errors.password ? 'red' : '#D9DADB',
                                borderRadius: 12,
                                height: 55,
                                marginTop: 10,
                                alignItems: 'center',
                                paddingRight: 10,
                                paddingLeft: 10,
                                elevation:5,
                                backgroundColor:colors.white,
                            }}
                        >
                            <TextInput
                                style={{ paddingLeft: 12, minWidth: Dimensions.get("window").width - 100 }}
                                placeholder="Old Password"
                                secureTextEntry={!isPasswordVisible}
                                // value={values.password}
                                // onChangeText={handleChange('password')}
                            />

                            {submitCount > 0 && errors.password ? (
                                <View>
                                    <Svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <Path
                                            d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM11.25 8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V13C12.75 13.41 12.41 13.75 12 13.75C11.59 13.75 11.25 13.41 11.25 13V8ZM12.92 16.38C12.87 16.51 12.8 16.61 12.71 16.71C12.61 16.8 12.5 16.87 12.38 16.92C12.26 16.97 12.13 17 12 17C11.87 17 11.74 16.97 11.62 16.92C11.5 16.87 11.39 16.8 11.29 16.71C11.2 16.61 11.13 16.51 11.08 16.38C11.03 16.26 11 16.13 11 16C11 15.87 11.03 15.74 11.08 15.62C11.13 15.5 11.2 15.39 11.29 15.29C11.39 15.2 11.5 15.13 11.62 15.08C11.86 14.98 12.14 14.98 12.38 15.08C12.5 15.13 12.61 15.2 12.71 15.29C12.8 15.39 12.87 15.5 12.92 15.62C12.97 15.74 13 15.87 13 16C13 16.13 12.97 16.26 12.92 16.38Z"
                                            fill="#F34060"
                                        />
                                    </Svg>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={togglePasswordVisibility}>
                                    {isPasswordVisible ? (
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            {/* ... (your eye-open icon) */}
                                        </Svg>
                                    ) : (
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            {/* ... (your eye-closed icon) */}
                                        </Svg>
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>
                        {errors?.password && (
                            <Text style={{ color: 'red', paddingLeft: 10, paddingTop: 10 }}>
                                {errors?.password}
                            </Text>
                        )}
                    </>
                )}
            </Formik>
            <Formik
                initialValues={{ password: '' }}
                validationSchema={loginValidation}
                onSubmit={handleChangePassword}
                validate={(values) => {
                    console.log("XXXX", values);
                }}
            >
                {({ handleChange, submitCount, values, errors }) => (
                    <>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderWidth: 1,
                                borderColor: submitCount > 0 && errors.password ? 'red' : '#D9DADB',
                                borderRadius: 12,
                                height: 55,
                                marginTop: 10,
                                alignItems: 'center',
                                paddingRight: 10,
                                paddingLeft: 10,
                                elevation:5,
                                backgroundColor:colors.white,
                            }}
                        >
                            <TextInput
                                style={{ paddingLeft: 12, backgroundColor:colors.white,width:'100%' }}
                                placeholder="New Password"
                                secureTextEntry={!isPasswordVisible}
                                // value={values.password}
                                // onChangeText={handleChange('password')}
                            />

                            {submitCount > 0 && errors.password ? (
                                <View>
                                    <Svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <Path
                                            d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM11.25 8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V13C12.75 13.41 12.41 13.75 12 13.75C11.59 13.75 11.25 13.41 11.25 13V8ZM12.92 16.38C12.87 16.51 12.8 16.61 12.71 16.71C12.61 16.8 12.5 16.87 12.38 16.92C12.26 16.97 12.13 17 12 17C11.87 17 11.74 16.97 11.62 16.92C11.5 16.87 11.39 16.8 11.29 16.71C11.2 16.61 11.13 16.51 11.08 16.38C11.03 16.26 11 16.13 11 16C11 15.87 11.03 15.74 11.08 15.62C11.13 15.5 11.2 15.39 11.29 15.29C11.39 15.2 11.5 15.13 11.62 15.08C11.86 14.98 12.14 14.98 12.38 15.08C12.5 15.13 12.61 15.2 12.71 15.29C12.8 15.39 12.87 15.5 12.92 15.62C12.97 15.74 13 15.87 13 16C13 16.13 12.97 16.26 12.92 16.38Z"
                                            fill="#F34060"
                                        />
                                    </Svg>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={togglePasswordVisibility}>
                                    {isPasswordVisible ? (
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            {/* ... (your eye-open icon) */}
                                        </Svg>
                                    ) : (
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            {/* ... (your eye-closed icon) */}
                                        </Svg>
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>
                        {errors?.password && (
                            <Text style={{ color: 'red', paddingLeft: 10, paddingTop: 10 }}>
                                {errors?.password}
                            </Text>
                        )}
                    </>
                )}
            </Formik>
            <Formik
                initialValues={{ password: '' }}
                validationSchema={loginValidation}
                onSubmit={handleChangePassword}
                validate={(values) => {
                    console.log("XXXX", values);
                }}
            >
                {({ handleChange, submitCount, values, errors }) => (
                    <>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderWidth: 1,
                                borderColor: submitCount > 0 && errors.password ? 'red' : '#D9DADB',
                                borderRadius: 12,
                                height: 55,
                                marginTop: 10,
                                alignItems: 'center',
                                paddingRight: 10,
                                paddingLeft: 10,
                                elevation:5,
                                backgroundColor:colors.white,
                            }}
                        >
                            <TextInput
                                style={{ paddingLeft: 12, minWidth: Dimensions.get("window").width - 100 }}
                                placeholder="Confirm Password"
                                secureTextEntry={!isPasswordVisible}
                                // value={values.password}
                                // onChangeText={handleChange('password')}
                            />

                            {submitCount > 0 && errors.password ? (
                                <View>
                                    <Svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <Path
                                            d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM11.25 8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V13C12.75 13.41 12.41 13.75 12 13.75C11.59 13.75 11.25 13.41 11.25 13V8ZM12.92 16.38C12.87 16.51 12.8 16.61 12.71 16.71C12.61 16.8 12.5 16.87 12.38 16.92C12.26 16.97 12.13 17 12 17C11.87 17 11.74 16.97 11.62 16.92C11.5 16.87 11.39 16.8 11.29 16.71C11.2 16.61 11.13 16.51 11.08 16.38C11.03 16.26 11 16.13 11 16C11 15.87 11.03 15.74 11.08 15.62C11.13 15.5 11.2 15.39 11.29 15.29C11.39 15.2 11.5 15.13 11.62 15.08C11.86 14.98 12.14 14.98 12.38 15.08C12.5 15.13 12.61 15.2 12.71 15.29C12.8 15.39 12.87 15.5 12.92 15.62C12.97 15.74 13 15.87 13 16C13 16.13 12.97 16.26 12.92 16.38Z"
                                            fill="#F34060"
                                        />
                                    </Svg>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={togglePasswordVisibility}>
                                    {isPasswordVisible ? (
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            {/* ... (your eye-open icon) */}
                                        </Svg>
                                    ) : (
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            {/* ... (your eye-closed icon) */}
                                        </Svg>
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>
                        {errors?.password && (
                            <Text style={{ color: 'red', paddingLeft: 10, paddingTop: 10 }}>
                                {errors?.password}
                            </Text>
                        )}
                    </>
                )}
            </Formik>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5,
                    width:wp('100%'),
                }}>
                <View
                    style={{ color: colors.DarkGreen, fontSize: 12, marginVertical: 10 }}>
                    <Text
                        style={{ color: colors.DarkGreen }}
                        onPress={() => navigation.navigate('forgot', { from: "email" })}>
                        Forgot Password?
                    </Text>
                </View>
            </View>

            </View>
            <View style={{position: 'absolute', bottom: 0, left: 0, right: 0,  marginTop: 20, padding: 20, borderTopColor: 'lightgray', borderTopWidth: 0.5 }}>
                <TouchableOpacity
                    style={styles.doneButton}
                    onPress={SaveChangesPress}
                >
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({
    componentContainer: {
        height : hp('100%'),
        width :wp('100%'),
        padding: 20,
        marginTop: 20,
        borderRadius: 5,
        flex:1,
        backgroundColor:colors.Tailwhite,
    },
    title: {
        fontSize: 24,
        marginBottom: 5,
        fontWeight: '600',
        color: 'black',
    },
    doneButton: {
        // backgroundColor: '#007BFF',
        backgroundColor:colors.DarkGreen,
        padding: 12,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
    }
});
