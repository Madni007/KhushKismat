import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  Easing, TouchableWithoutFeedback, Pressable
} from 'react-native';
import * as yup from "yup";
import { colors } from '../../utils/Colors';
import { Formik } from 'formik';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import CheckBox from '@react-native-community/checkbox';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { singUpSchema } from '../../schema/SingUpSchema';
import { singUpInitialValues } from '../../schema/InitialValues';
import { RFPercentage } from "react-native-responsive-fontsize";

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserProfile, postThunk, setAppLoading, setAuth } from '../../redux/slices/commonSlice';
// import { GetBioMetric, storeToken } from '../../utils/StorageToken';
import Recaptcha from 'react-native-recaptcha-that-works';
import { get } from '../../utils/axios';
// import LoadingOverlay from '../components/LoadingComponent';
// import Toast from 'react-native-simple-toast';
import SafeLayout from '../layout/SafeLayout';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const Component1 = ({ isTimeout, captcha, setCaptchaSuccess, captchaSuccess, captchaReq, animatedStyle, captchaToken }) => {
  const { isAuth, fcmToken } = useSelector((state) => state.common)
  const loginValidation = yup.object({
    email_address: yup.string().email('Your Email is not Valid, Please try again').required('Email is Required !'),
  })
  const loginValidationWithPass = yup.object({
    email_address: yup.string().email('Your Email is not Valid, Please try again').required('Email is Required !'),
    password: yup
      .string()
      .required("Password is required"),
  })


  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };


  const [havePassword, setHavePass] = useState(false)

  const getInititalVals = () => {
    const temp = {
      email_address: "",
    }
    if (havePassword) temp.password = ""
    return temp
  }
  const dispatch = useDispatch()

  const hitWithEmail = async (values, { resetForm, setErrors }) => {
    try {
      dispatch(setAppLoading(true))

      // if (captchaSuccess) {
      const response = await dispatch(
        postThunk({ url: '/login', data: { ...values } }),
      ).unwrap();
      console.log("hitWithEmail response=> ", response);
      if (response.success && response.message == "User has password. Try to login with password.") {
        setHavePass(true)
      }
      if (response.success && response.message == "User has no password. Try to login with OTP which sent on your email.") {
        resetForm()
        navigation.navigate('otp', { email: response?.data?.email, fromLogin: true, resetFormPre: resetForm });
      }
      dispatch(setAppLoading(false))

      // }
    } catch (error) {
      console.log("login error:", error)
      if (error.message == "This email is not existed in our system. Please try with different email.") {
        setErrors({ email_address: "No user exist with this email" })
      }
      dispatch(setAppLoading(false))

    }
  }
  const login = async (values, { setErrors, resetForm }) => {
    if (captchaSuccess) {
      try {
        dispatch(setAppLoading(true))
        console.log("fcmTokenfcmToken", fcmToken)

        const response = await dispatch(
          postThunk({ url: '/login', data: { ...values, "g-recaptcha-response": captchaToken, fcm_device_token: fcmToken } }),
        ).unwrap();
        console.log("login response=> ", response);
        if (response.success && response.data.role == "user") {
          storeToken(response.data.token)
          resetForm()
          setHavePass(false)
          setCaptchaSuccess(false)
          dispatch(setAuth(true))
          if (isAuth) navigation.navigate('bottom_navigation')
          dispatch(setAppLoading(false))

        }

      } catch (error) {
        console.log("error.........", error)
        dispatch(setAppLoading(false))
        setCaptchaSuccess(false)
        if (error.message == "Login failed. Username and password combination is not valid.") {
          setErrors({
            // email_address: "Your Email is not Valid, Please try again",
            password: "Your Password is Wrong, Please try again"
          })

        }
      }
    }
    else {
      captchaReq()
      dispatch(setAppLoading(false))
      setCaptchaSuccess(false)
    }
  }

  useEffect(() => {
    if (isAuth) {
      navigation.navigate('bottom_navigation')
    }
  }, [isAuth])

  return (
    <View style={styles.componentContainer}>

      <View style={{ paddingBottom: 20 }}>
        <Text style={styles.title}>Login</Text>
        <Text>Sign In to Your Account</Text>
      </View>

      <Formik
        initialValues={getInititalVals()}
        validationSchema={havePassword ? loginValidationWithPass : loginValidation}
        onSubmit={havePassword ? login : hitWithEmail}
        validate={(values) => {
          console.log("XXXX", values)
        }}
      >
        {({ handleChange, submitCount, handleBlur, handleSubmit, values, touched, errors }) => (

          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: submitCount > 0 && errors.email_address ? 'red' : '#D9DADB', borderRadius: 12,
                height: 55,
                alignItems: 'center',
                paddingHorizontal: 15,
                backgroundColor: colors.secondary,
              }}>
              <TextInput
                style={{ minWidth: Dimensions.get("window").width }}
                placeholder="Enter Your Email"
                value={values.email_address}
                editable={!havePassword}
                onChangeText={handleChange('email_address')}
                keyboardType="email-address"
              />
              {submitCount > 0 && errors.email_address && (
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
              )}
            </View>

            {submitCount > 0 && errors.email_address && (
              <Text style={{ color: 'red', paddingLeft: 10, paddingTop: 10 }}>
                {errors.email_address}
              </Text>
            )}
            {/* {havePassword && */}
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
                  backgroundColor: colors.secondary,
                }}>

                <TextInput
                  style={{ paddingLeft: 12, minWidth: Dimensions.get("window").width - 100 }}
                  placeholder="Password"
                  secureTextEntry={!isPasswordVisible}
                  value={values.password}
                  onChangeText={handleChange('password')}
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
                ) :
                  <Pressable onPress={togglePasswordVisibility}>
                    {isPasswordVisible ?
                      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M17.8201 5.76998C16.0701 4.44998 14.0701 3.72998 12.0001 3.72998C8.47009 3.72998 5.18009 5.80998 2.89009 9.40998C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M8.41992 19.5302C9.55992 20.0102 10.7699 20.2702 11.9999 20.2702C15.5299 20.2702 18.8199 18.1902 21.1099 14.5902C22.0099 13.1802 22.0099 10.8102 21.1099 9.40018C20.7799 8.88018 20.4199 8.39018 20.0499 7.93018" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M15.5099 12.7002C15.2499 14.1102 14.0999 15.2602 12.6899 15.5202" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M9.47 14.5298L2 21.9998" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M22 2L14.53 9.47" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Circle cx="12" cy="12" r="4" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
                      </Svg>

                      :
                      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M17.8201 5.76998C16.0701 4.44998 14.0701 3.72998 12.0001 3.72998C8.47009 3.72998 5.18009 5.80998 2.89009 9.40998C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M8.41992 19.5302C9.55992 20.0102 10.7699 20.2702 11.9999 20.2702C15.5299 20.2702 18.8199 18.1902 21.1099 14.5902C22.0099 13.1802 22.0099 10.8102 21.1099 9.40018C20.7799 8.88018 20.4199 8.39018 20.0499 7.93018" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M15.5099 12.7002C15.2499 14.1102 14.0999 15.2602 12.6899 15.5202" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M9.47 14.5298L2 21.9998" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M22 2L14.53 9.47" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </Svg>
                    }
                  </Pressable>}
              </View>
              {errors?.password && (
                <Text style={{ color: 'red', paddingLeft: 10, paddingTop: 10 }}>
                  {errors?.password}
                </Text>
              )}

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <View
                  style={{ color: colors.primary, fontFamily: "LatoRegular", fontSize: RFPercentage(1.7), marginVertical: 10 }}>
                  <Text
                    style={{ color: colors.primary }}
                    onPress={() => navigation.navigate('forgot', { from: "email" })}>
                    Forgot Password?
                  </Text>
                </View>
              </View>
              {/* verifjy status bar */}

              {/* <LinearGradient
              colors={captchaSuccess ? ['#EEFFF5', '#EEFFF5'] : ['#F3F3F3', '#FFFFFF']}
              style={{
                borderWidth: 1,
                height: 44,
                marginBottom: 15,
                borderColor: colors.my_gray,
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                marginTop: 0,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none">
                  <Circle
                    cx="15"
                    cy="15"
                    r="14.5"
                    fill="nill"
                    fill-opacity="0.25"
                    stroke="#2488FF"
                  />
                  <Circle cx="15" cy="15" r="6" fill="#376FFF" />
                </Svg>
                <Pressable onPress={captcha}
                  disabled={captchaSuccess}
                >
                  <Text style={captchaSuccess ? { color: "#26C267" } : { color: 'black' }}>{captchaSuccess ? "Succeeded" : "Click to verify"}</Text>
                </Pressable>
              </View>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.9547 9.03741H13.6625C13.179 7.1962 11.4036 6.00028 9.51567 6.24403C7.62771 6.48779 6.2143 8.09542 6.2143 9.99905C6.2143 11.9027 7.62771 13.5103 9.51567 13.7541C11.4036 13.9978 13.179 12.8019 13.6625 10.9607H18.0163C17.5959 14.4776 14.9339 17.3106 11.4499 17.949C7.96597 18.5873 4.47246 16.882 2.83248 13.7426C1.19249 10.6032 1.78844 6.76172 4.3025 4.26675C6.81656 1.77178 10.6625 1.20513 13.7893 2.869C13.2846 4.27997 13.8764 5.84886 15.1873 6.57486C16.4983 7.30086 18.1421 6.97014 19.0703 5.79367C19.9985 4.6172 19.9376 2.94149 18.9265 1.8355C17.9154 0.729501 16.2518 0.518978 14.997 1.33822C11.0769 -0.92323 6.12667 -0.270008 2.92736 2.9309C-0.271948 6.13181 -0.922691 11.0824 1.34072 15.0014C3.60414 18.9204 8.21743 20.8307 12.5888 19.6591C16.9602 18.4876 19.9998 14.5262 20 10.0006C20 9.67649 19.9849 9.35544 19.9547 9.03741ZM9.99106 11.8635C8.96221 11.8635 8.12816 11.0294 8.12816 10.0006C8.12816 8.97171 8.96221 8.13766 9.99106 8.13766C11.0199 8.13766 11.854 8.97171 11.854 10.0006C11.8524 11.0194 11.0339 11.8486 10.0152 11.8635H9.99106ZM17.7869 3.88348C17.7869 3.25984 17.2813 2.75427 16.6576 2.75427C16.3582 2.75427 16.0709 2.87324 15.8592 3.08501C15.6474 3.29678 15.5284 3.584 15.5284 3.88348C15.5284 4.50713 16.034 5.0127 16.6576 5.0127C17.2813 5.0127 17.7869 4.50713 17.7869 3.88348Z"
                  fill="#AFBBBF"
                />
              </Svg>
            </LinearGradient> */}

              <TouchableOpacity
                onPress={captcha}
                style={animatedStyle}
                disabled={captchaSuccess}>
                <LinearGradient
                  colors={captchaSuccess ? ['white', 'white'] : ['#ffffff', '#FFFFFF']}
                  style={{
                    borderWidth: 1,
                    height: 44,
                    marginBottom: 15,
                    borderColor: colors.my_gray,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: 0,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                      borderRadius: 12
                    }}>
                    {!isTimeout && <>
                      {captchaSuccess ? <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M23.8545 10.1261C23.9503 10.7367 24 11.3625 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C14.264 0 16.3816 0.626977 18.1886 1.71677L17.0219 3.35054C15.5461 2.49183 13.8305 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.5923 21.9756 11.1904 21.9282 10.7955C22.5359 10.59 23.1963 10.3596 23.8545 10.1261Z" fill="#7BE4C3" />
                        <Path d="M6.31348 11.5947L10.8076 15.9912L21 6.125" stroke="#35D2A2" stroke-width="3" stroke-linecap="round" />
                      </Svg> : <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none">
                        <Circle
                          cx="15"
                          cy="15"
                          r="14.5"
                          // fill="nill"
                          fill-opacity="0.25"
                          stroke="#2488FF"
                        />
                        <Circle cx="15" cy="15" r="6" fill="#376FFF" />
                      </Svg>}
                    </>}
                    {isTimeout && <Svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <Path fill-rule="evenodd" clip-rule="evenodd" d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM6 8C5.44772 8 5 8.44771 5 9C5 9.55229 5.44772 10 6 10H12C12.5523 10 13 9.55229 13 9C13 8.44771 12.5523 8 12 8H6Z" fill="#DE715B" />
                    </Svg>}

                    {!isTimeout ? (
                      <Text style={captchaSuccess ? { color: "#26C267" } : { color: 'black' }}>
                        {captchaSuccess ? "Succeeded" : "Click to verify"}
                      </Text>
                    ) : (
                      <Text style={{ color: "#383838", paddingHorizontal: 15 }}>
                        Time out <Text style={{ color: "#3873FF" }}>Retry</Text>
                      </Text>)}
                  </View>
                  {!captchaSuccess ? <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none">
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.9547 9.03741H13.6625C13.179 7.1962 11.4036 6.00028 9.51567 6.24403C7.62771 6.48779 6.2143 8.09542 6.2143 9.99905C6.2143 11.9027 7.62771 13.5103 9.51567 13.7541C11.4036 13.9978 13.179 12.8019 13.6625 10.9607H18.0163C17.5959 14.4776 14.9339 17.3106 11.4499 17.949C7.96597 18.5873 4.47246 16.882 2.83248 13.7426C1.19249 10.6032 1.78844 6.76172 4.3025 4.26675C6.81656 1.77178 10.6625 1.20513 13.7893 2.869C13.2846 4.27997 13.8764 5.84886 15.1873 6.57486C16.4983 7.30086 18.1421 6.97014 19.0703 5.79367C19.9985 4.6172 19.9376 2.94149 18.9265 1.8355C17.9154 0.729501 16.2518 0.518978 14.997 1.33822C11.0769 -0.92323 6.12667 -0.270008 2.92736 2.9309C-0.271948 6.13181 -0.922691 11.0824 1.34072 15.0014C3.60414 18.9204 8.21743 20.8307 12.5888 19.6591C16.9602 18.4876 19.9998 14.5262 20 10.0006C20 9.67649 19.9849 9.35544 19.9547 9.03741ZM9.99106 11.8635C8.96221 11.8635 8.12816 11.0294 8.12816 10.0006C8.12816 8.97171 8.96221 8.13766 9.99106 8.13766C11.0199 8.13766 11.854 8.97171 11.854 10.0006C11.8524 11.0194 11.0339 11.8486 10.0152 11.8635H9.99106ZM17.7869 3.88348C17.7869 3.25984 17.2813 2.75427 16.6576 2.75427C16.3582 2.75427 16.0709 2.87324 15.8592 3.08501C15.6474 3.29678 15.5284 3.584 15.5284 3.88348C15.5284 4.50713 16.034 5.0127 16.6576 5.0127C17.2813 5.0127 17.7869 4.50713 17.7869 3.88348Z"
                      fill="#AFBBBF"
                    />
                  </Svg> :
                    <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <Path fill-rule="evenodd" clip-rule="evenodd" d="M19.9547 9.03741H13.6625C13.179 7.1962 11.4036 6.00028 9.51567 6.24403C7.62771 6.48779 6.2143 8.09542 6.2143 9.99905C6.2143 11.9027 7.62771 13.5103 9.51567 13.7541C11.4036 13.9978 13.179 12.8019 13.6625 10.9607H18.0163C17.5959 14.4776 14.9339 17.3106 11.4499 17.949C7.96597 18.5873 4.47246 16.882 2.83248 13.7426C1.19249 10.6032 1.78844 6.76172 4.3025 4.26675C6.81656 1.77178 10.6625 1.20513 13.7893 2.869C13.2846 4.27997 13.8764 5.84886 15.1873 6.57486C16.4983 7.30086 18.1421 6.97014 19.0703 5.79367C19.9985 4.6172 19.9376 2.94149 18.9265 1.8355C17.9154 0.729501 16.2518 0.518978 14.997 1.33822C11.0769 -0.92323 6.12667 -0.270008 2.92736 2.9309C-0.271948 6.13181 -0.922691 11.0824 1.34072 15.0014C3.60414 18.9204 8.21743 20.8307 12.5888 19.6591C16.9602 18.4876 19.9998 14.5262 20 10.0006C20 9.67649 19.9849 9.35544 19.9547 9.03741ZM9.99106 11.8635C8.96221 11.8635 8.12816 11.0294 8.12816 10.0006C8.12816 8.97171 8.96221 8.13766 9.99106 8.13766C11.0199 8.13766 11.854 8.97171 11.854 10.0006C11.8524 11.0194 11.0339 11.8486 10.0152 11.8635H9.99106ZM17.7869 3.88348C17.7869 3.25984 17.2813 2.75427 16.6576 2.75427C16.3582 2.75427 16.0709 2.87324 15.8592 3.08501C15.6474 3.29678 15.5284 3.584 15.5284 3.88348C15.5284 4.50713 16.034 5.0127 16.6576 5.0127C17.2813 5.0127 17.7869 4.50713 17.7869 3.88348Z" fill="#80D6AB" />
                    </Svg>}
                </LinearGradient>
              </TouchableOpacity>
            </>
            {/* } */}
            <Pressable
              style={[styles.button, { marginTop: 15 }]}
              // onPress={() => navigation.navigate('bottom_navigation')}
              onPress={handleSubmit}
            >
              <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.8), color: 'white' }}>{havePassword ? "Log In" : "Next"}</Text>
            </Pressable>
          </View>
        )}
      </Formik>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 65,
        }}>
        <View
          style={{
            height: '5px',
            backgroundColor: '#000',
            width: '25%',
            borderWidth: 0.5,
            borderColor: colors.my_gray,
          }}></View>
        <Text style={{ paddingHorizontal: 5 }}>Don't Have An Account</Text>
        <View
          style={{
            height: '5px',
            backgroundColor: '#000',
            width: '25%',
            borderWidth: 0.5,
            borderColor: colors.my_gray,
          }}></View>
      </View>
      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('signup')}
      >
        <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.8), color: colors.secondary }}>Sign Up </Text>
      </Pressable>

    </View >
  );
};

const Component2 = ({ isTimeout, captcha, setCaptchaSuccess, captchaSuccess, captchaReq, animatedStyle, captchaToken }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { isAuth } = useSelector((state) => state.common)
  const navigation = useNavigation();
  const [havePassword, setHavePass] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const getInititalVals = () => {
    const temp = {
      phone: "",
    }
    if (havePassword) temp.password = ""
    return temp
  }
  const dispatch = useDispatch()

  const hitWithPhone = async (values, { resetForm, setErrors }) => {
    try {
      dispatch(setAppLoading(true))

      // if (captchaSuccess) {
      const response = await dispatch(
        postThunk({ url: '/login', data: { ...values } }),
      ).unwrap();
      console.log("hitWithEmail response=> ", response);
      if (response.success && response.message == "User has password. Try to login with password.") {
        setHavePass(true)
      }
      if (response.success && response.message == "User has no password. Try to login with One-Time Password (OTP) which sent on your mobile.") {
        resetForm()
        navigation.navigate('otp', { phone: response?.data?.phone, fromLogin: true, resetFormPre: resetForm });
      }
      dispatch(setAppLoading(false))

      // }
    } catch (error) {
      console.log("login error:", error)
      if (error.message == "This phone number does not exist in our system. Please sign up.") {
        setErrors({ phone: "No user exist with this phone number." })
      }
      dispatch(setAppLoading(false))

    }
  }
  const login = async (values, { setErrors, resetForm }) => {
    if (captchaSuccess) {
      try {
        dispatch(setAppLoading(true))

        const response = await dispatch(

          postThunk({ url: '/login', data: { ...values, "g-recaptcha-response": captchaToken } }),
        ).unwrap();
        console.log("login response=> ", response);
        if (response.success && response.data.role == "user") {
          storeToken(response.data.token)
          resetForm()
          setHavePass(false)
          setCaptchaSuccess(false)
          dispatch(setAuth(true))
          if (isAuth) navigation.navigate('bottom_navigation')
          dispatch(setAppLoading(false))

        }

      } catch (error) {
        console.log("error.........", error)
        dispatch(setAppLoading(false))
        setCaptchaSuccess(false)
        if (error.message == "Login failed. The username and/or password combination is invalid.") {
          setErrors({
            // email_address: "Your Email is not Valid, Please try again",
            password: "Your Password is Wrong, Please try again"
          })

        }
      }
    }
    else {
      captchaReq()
      dispatch(setAppLoading(false))
      setCaptchaSuccess(false)
    }
  }

  const loginValidationWithPass = yup.object({
    phone: yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .required('Phone is Required !'),
    password: yup
      .string()
      .required("Password is required"),
  })

  const loginValidation = yup.object({
    phone: yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .required('Phone is Required !'),
  })

  return (
    <View style={styles.componentContainer}>
      <View style={{ paddingBottom: 20 }}>
        <Text style={styles.title}>Login</Text>
        <Text>Sign In To Your Account</Text>
      </View>
      <Formik
        initialValues={getInititalVals()}
        validationSchema={havePassword ? loginValidationWithPass : loginValidation}
        onSubmit={havePassword ? login : hitWithPhone}
        validate={(values) => {
          console.log("XXXX", values)
        }}
      >
        {({ handleChange, submitCount, handleBlur, handleSubmit, values, touched, errors }) => (
          <>
            <PhoneInput
              defaultValue={values.phone}
              defaultCode="AE"
              // layout="first"
              withShadow
              autoFocus
              containerStyle={{
                width: '100%',
                paddingVertical: 5,
                height: 60,
                borderRadius: 30,
                backgroundColor: 'white',
                borderColor: touched.phone && errors.phone ? 'red' : '#D9DADB',
                borderWidth: 1,
              }}
              textContainerStyle={{
                paddingVertical: 0,
                backgroundColor: 'transparent',
              }}
              onChangeFormattedText={handleChange('phone')}
              countryPickerProps={{
                marginTop: 250,
              }}
            />
            {touched.phone && errors.phone && (
              <Text style={{ color: 'red', paddingLeft: 10, paddingVertical: 10 }}>
                {errors.phone}
              </Text>
            )}

            {havePassword &&
              <>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderColor: submitCount > 0 && errors.password ? 'red' : '#D9DADB',
                    borderRadius: 30,
                    height: 55,
                    marginTop: 10,
                    alignItems: 'center',
                    paddingRight: 10,
                  }}>

                  <TextInput
                    style={{ paddingLeft: 12, minWidth: Dimensions.get("window").width - 100 }}
                    placeholder="Password"
                    secureTextEntry={!isPasswordVisible}
                    value={values.password}
                    onChangeText={handleChange('password')}
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
                  ) :
                    <Pressable onPress={togglePasswordVisibility}>
                      {isPasswordVisible ?
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <Path d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <Path d="M17.8201 5.76998C16.0701 4.44998 14.0701 3.72998 12.0001 3.72998C8.47009 3.72998 5.18009 5.80998 2.89009 9.40998C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <Path d="M8.41992 19.5302C9.55992 20.0102 10.7699 20.2702 11.9999 20.2702C15.5299 20.2702 18.8199 18.1902 21.1099 14.5902C22.0099 13.1802 22.0099 10.8102 21.1099 9.40018C20.7799 8.88018 20.4199 8.39018 20.0499 7.93018" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <Path d="M15.5099 12.7002C15.2499 14.1102 14.0999 15.2602 12.6899 15.5202" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <Path d="M9.47 14.5298L2 21.9998" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <Path d="M22 2L14.53 9.47" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <Circle cx="12" cy="12" r="4" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
                        </Svg>

                        :
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <Path d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <Path d="M17.8201 5.76998C16.0701 4.44998 14.0701 3.72998 12.0001 3.72998C8.47009 3.72998 5.18009 5.80998 2.89009 9.40998C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <Path d="M8.41992 19.5302C9.55992 20.0102 10.7699 20.2702 11.9999 20.2702C15.5299 20.2702 18.8199 18.1902 21.1099 14.5902C22.0099 13.1802 22.0099 10.8102 21.1099 9.40018C20.7799 8.88018 20.4199 8.39018 20.0499 7.93018" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <Path d="M15.5099 12.7002C15.2499 14.1102 14.0999 15.2602 12.6899 15.5202" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <Path d="M9.47 14.5298L2 21.9998" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <Path d="M22 2L14.53 9.47" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>
                      }
                    </Pressable>}
                </View>
                {errors?.password && (
                  <Text style={{ color: 'red', paddingLeft: 10, paddingTop: 10 }}>
                    {errors?.password}
                  </Text>
                )}

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <View
                    style={{ color: colors.primary, fontFamily: "LatoRegular", fontSize: RFPercentage(1.7), marginVertical: 10 }}>
                    <Text
                      style={{ color: colors.primary }}
                      onPress={() => navigation.navigate('forgot', { from: "email" })}>
                      Forgot Password?
                    </Text>
                  </View>
                </View>

                <Pressable
                  onPress={captcha}
                  style={animatedStyle}
                  disabled={captchaSuccess}>
                  <LinearGradient
                    colors={captchaSuccess ? ['#EEFFF5', '#EEFFF5'] : ['#F3F3F3', '#FFFFFF']}
                    style={{
                      borderWidth: 1,
                      height: 44,
                      marginBottom: 15,
                      borderColor: colors.my_gray,
                      borderRadius: 5,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      marginTop: 0,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      {!isTimeout && <>
                        {captchaSuccess ? <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <Path fill-rule="evenodd" clip-rule="evenodd" d="M23.8545 10.1261C23.9503 10.7367 24 11.3625 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C14.264 0 16.3816 0.626977 18.1886 1.71677L17.0219 3.35054C15.5461 2.49183 13.8305 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.5923 21.9756 11.1904 21.9282 10.7955C22.5359 10.59 23.1963 10.3596 23.8545 10.1261Z" fill="#7BE4C3" />
                          <Path d="M6.31348 11.5947L10.8076 15.9912L21 6.125" stroke="#35D2A2" stroke-width="3" stroke-linecap="round" />
                        </Svg> : <Svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none">
                          <Circle
                            cx="15"
                            cy="15"
                            r="14.5"
                            // fill="nill"
                            fill-opacity="0.25"
                            stroke="#2488FF"
                          />
                          <Circle cx="15" cy="15" r="6" fill="#376FFF" />
                        </Svg>}
                      </>}
                      {isTimeout && <Svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM6 8C5.44772 8 5 8.44771 5 9C5 9.55229 5.44772 10 6 10H12C12.5523 10 13 9.55229 13 9C13 8.44771 12.5523 8 12 8H6Z" fill="#DE715B" />
                      </Svg>}

                      {!isTimeout ? (
                        <Text style={captchaSuccess ? { color: "#26C267" } : { color: 'black' }}>
                          {captchaSuccess ? "Succeeded" : "Click to verify"}
                        </Text>
                      ) : (
                        <Text style={{ color: "#383838", paddingHorizontal: 15 }}>
                          Time out <Text style={{ color: "#3873FF" }}>Retry</Text>
                        </Text>)}
                    </View>
                    {!captchaSuccess ? <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none">
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.9547 9.03741H13.6625C13.179 7.1962 11.4036 6.00028 9.51567 6.24403C7.62771 6.48779 6.2143 8.09542 6.2143 9.99905C6.2143 11.9027 7.62771 13.5103 9.51567 13.7541C11.4036 13.9978 13.179 12.8019 13.6625 10.9607H18.0163C17.5959 14.4776 14.9339 17.3106 11.4499 17.949C7.96597 18.5873 4.47246 16.882 2.83248 13.7426C1.19249 10.6032 1.78844 6.76172 4.3025 4.26675C6.81656 1.77178 10.6625 1.20513 13.7893 2.869C13.2846 4.27997 13.8764 5.84886 15.1873 6.57486C16.4983 7.30086 18.1421 6.97014 19.0703 5.79367C19.9985 4.6172 19.9376 2.94149 18.9265 1.8355C17.9154 0.729501 16.2518 0.518978 14.997 1.33822C11.0769 -0.92323 6.12667 -0.270008 2.92736 2.9309C-0.271948 6.13181 -0.922691 11.0824 1.34072 15.0014C3.60414 18.9204 8.21743 20.8307 12.5888 19.6591C16.9602 18.4876 19.9998 14.5262 20 10.0006C20 9.67649 19.9849 9.35544 19.9547 9.03741ZM9.99106 11.8635C8.96221 11.8635 8.12816 11.0294 8.12816 10.0006C8.12816 8.97171 8.96221 8.13766 9.99106 8.13766C11.0199 8.13766 11.854 8.97171 11.854 10.0006C11.8524 11.0194 11.0339 11.8486 10.0152 11.8635H9.99106ZM17.7869 3.88348C17.7869 3.25984 17.2813 2.75427 16.6576 2.75427C16.3582 2.75427 16.0709 2.87324 15.8592 3.08501C15.6474 3.29678 15.5284 3.584 15.5284 3.88348C15.5284 4.50713 16.034 5.0127 16.6576 5.0127C17.2813 5.0127 17.7869 4.50713 17.7869 3.88348Z"
                        fill="#AFBBBF"
                      />
                    </Svg> :
                      <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M19.9547 9.03741H13.6625C13.179 7.1962 11.4036 6.00028 9.51567 6.24403C7.62771 6.48779 6.2143 8.09542 6.2143 9.99905C6.2143 11.9027 7.62771 13.5103 9.51567 13.7541C11.4036 13.9978 13.179 12.8019 13.6625 10.9607H18.0163C17.5959 14.4776 14.9339 17.3106 11.4499 17.949C7.96597 18.5873 4.47246 16.882 2.83248 13.7426C1.19249 10.6032 1.78844 6.76172 4.3025 4.26675C6.81656 1.77178 10.6625 1.20513 13.7893 2.869C13.2846 4.27997 13.8764 5.84886 15.1873 6.57486C16.4983 7.30086 18.1421 6.97014 19.0703 5.79367C19.9985 4.6172 19.9376 2.94149 18.9265 1.8355C17.9154 0.729501 16.2518 0.518978 14.997 1.33822C11.0769 -0.92323 6.12667 -0.270008 2.92736 2.9309C-0.271948 6.13181 -0.922691 11.0824 1.34072 15.0014C3.60414 18.9204 8.21743 20.8307 12.5888 19.6591C16.9602 18.4876 19.9998 14.5262 20 10.0006C20 9.67649 19.9849 9.35544 19.9547 9.03741ZM9.99106 11.8635C8.96221 11.8635 8.12816 11.0294 8.12816 10.0006C8.12816 8.97171 8.96221 8.13766 9.99106 8.13766C11.0199 8.13766 11.854 8.97171 11.854 10.0006C11.8524 11.0194 11.0339 11.8486 10.0152 11.8635H9.99106ZM17.7869 3.88348C17.7869 3.25984 17.2813 2.75427 16.6576 2.75427C16.3582 2.75427 16.0709 2.87324 15.8592 3.08501C15.6474 3.29678 15.5284 3.584 15.5284 3.88348C15.5284 4.50713 16.034 5.0127 16.6576 5.0127C17.2813 5.0127 17.7869 4.50713 17.7869 3.88348Z" fill="#80D6AB" />
                      </Svg>}
                  </LinearGradient>
                </Pressable>
              </>}




            <Pressable
              style={[styles.button, { marginTop: 15 }]}
              // onPress={() => navigation.navigate('bottom_navigation')}
              onPress={handleSubmit}
            >
              <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.8), color: 'white' }}>{havePassword ? "Log In" : "Next"}</Text>
            </Pressable>
          </>
        )}
      </Formik>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 58,
        }}>
        <View
          style={{
            height: '5px',
            backgroundColor: '#000',
            width: '25%',
            borderWidth: 0.5,
            borderColor: colors.my_gray,
          }}></View>
        <Text style={{ paddingHorizontal: 5 }}>Already Have An Account</Text>
        <View
          style={{
            height: '5px',
            backgroundColor: '#000',
            width: '25%',
            borderWidth: 0.5,
            borderColor: colors.my_gray,
          }}></View>
      </View>
      <Pressable style={styles.btn}
        onPress={() => navigation.navigate('signup')}
      >
        <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.8), color: colors.secondary }}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const ToggleComponents = ({ navigation }) => {
  const [showComponent1, setShowComponent1] = useState(true);
  const [showComponent2, setShowComponent2] = useState(false);
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.common)
  const toggleComponent1 = () => {
    setShowComponent1(true);
    setShowComponent2(false);
  };

  const toggleComponent2 = () => {
    setShowComponent1(false);
    setShowComponent2(true);
  };

  const [isUserExist, setIsUserExist] = useState();

  const [captchaSuccess, setCaptchaSuccess] = useState(false)
  const [isTimeout, setisTimeout] = useState(false)


  // for biometric screen
  const [password, setPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [captchaToken, setCaptchaToken] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }
  const recaptcha = useRef();

  const send = () => {
    console.log('send!');
    recaptcha.current.open()
  }

  const onVerify = token => {
    console.log('success!', token);
    setCaptchaSuccess(true)
    setCaptchaToken(token)
  }

  const onExpire = () => {
    console.warn('expired!');
    setisTimeout(true)
  }




  const checkBioMetric = async () => {
    const bio = await GetBioMetric()
    setIsUserExist(bio)

  }



  const existingLogin = async () => {
    if (captchaSuccess) {
      try {
        dispatch(setAppLoading(true))

        const response = await dispatch(
          postThunk({ url: '/login', data: { email_address: isUserExist?.email, password: password, "g-recaptcha-response": captchaToken } }),
        ).unwrap();
        console.log("login response=> ", response.message);
        if (response.success && response.data.role == "user") {
          storeToken(response.data.token)
          setPassword("")
          setPasswordError("")
          dispatch(setAuth(true))
          dispatch(setAppLoading(false))

          if (isAuth) navigation.navigate('bottom_navigation')
          Toast.showWithGravity(
            `Login successfully.`,
            Toast.SHORT,
            Toast.CENTER,
          );
        }

      }
      catch (error) {
        console.log("error.........", error)
        if (error.message == "Login failed. Username and password combination is not valid.") {
          setPasswordError("Your Password is Wrong, Please try again")
        }
        setCaptchaSuccess(false)
        dispatch(setAppLoading(false))

      }
    }
    else {
      handleButtonPress()
      dispatch(setAppLoading(false))
      setCaptchaSuccess(false)
    }


  }

  useEffect(() => {
    checkBioMetric()
  }, [])


  const shakeAnimation = new Animated.Value(0);

  const handleButtonPress = () => {
    // Simulate a horizontal shake animation
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // Create an interpolated translateX animation
  const interpolatedTranslateX = shakeAnimation.interpolate({
    inputRange: [-10, 10],
    outputRange: [-10, 10], // Adjust the values based on the desired horizontal range
  });

  // Apply the translateX to the animatedStyle
  const animatedStyle = {
    transform: [{ translateX: interpolatedTranslateX }],
  };


  return (
    <SafeLayout>
      <ScrollView style={{ backgroundColor: colors.my_bg }}>
        <View style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
          <View style={{ paddingBottom: 25 }}>
            {/* <Svg width="130" height="42" viewBox="0 0 130 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.0253 6.01263C10.3786 6.66039 9.60153 6.98407 8.69336 6.98407C7.8123 6.98407 7.04894 6.66039 6.40286 6.01263C5.75596 5.36568 5.43271 4.60115 5.43271 3.71905C5.43271 2.83735 5.75596 2.06573 6.40286 1.40459C7.04894 0.743187 7.8123 0.412415 8.69336 0.412415C9.60153 0.412415 10.3786 0.743187 11.0253 1.40459C11.6716 2.06573 11.9954 2.83735 11.9954 3.71905C11.9954 4.60115 11.6716 5.36568 11.0253 6.01263ZM5.6997 10.2698H11.747L11.7466 31.3331C11.7466 34.6497 10.8252 37.1693 8.98105 38.8905C7.13734 40.6111 4.38697 41.3623 0.730469 41.1439V35.3231C4.04329 35.5731 5.69943 34.2432 5.69943 31.3331L5.6997 10.2698ZM68.8432 19.8568H63.8742V25.8545C63.8742 26.6684 64.077 27.2625 64.4837 27.638C64.8897 28.0137 65.4831 28.2359 66.265 28.2718C67.4683 28.3271 67.4803 28.3271 68.8432 28.3149V33.7405C64.5153 34.0318 62.0849 33.8182 60.382 32.567C58.678 31.3157 57.8271 29.0777 57.8271 25.8545V16.0906V10.2698V3.69818H63.8742V14.041H68.8432V19.8568ZM43.3868 16.9355C43.3868 17.5618 43.8009 18.0703 44.6291 18.4611C45.457 18.8529 46.4648 19.1969 47.6527 19.4939C48.84 19.7916 50.0274 20.1672 51.2158 20.6205C52.403 21.0746 53.4108 21.8335 54.2394 22.8972C55.0669 23.9612 55.4817 25.2911 55.4817 26.8871C55.4817 29.2974 54.5825 31.1516 52.7858 32.4494C50.9885 33.7478 48.7465 34.3977 46.0591 34.3977C41.2458 34.3977 37.9643 32.5361 36.2146 28.8115L41.4651 25.8545C42.152 27.8889 43.6836 28.9056 46.0591 28.9056C48.2156 28.9056 49.2936 28.2329 49.2936 26.8871C49.2936 26.2615 48.8789 25.7531 48.0513 25.3615C47.2229 24.9706 46.2151 24.6184 45.0278 24.3052C43.8397 23.9927 42.6523 23.601 41.4651 23.1319C40.2771 22.6625 39.269 21.9194 38.4414 20.902C37.6128 19.8857 37.1991 18.6101 37.1991 17.0764C37.1991 14.7611 38.0502 12.9384 39.7538 11.6078C41.457 10.2779 43.5746 9.61293 46.1058 9.61293C48.0118 9.61293 49.7462 10.0433 51.3092 10.9036C52.8718 11.7647 54.1059 12.9924 55.0127 14.5886L49.856 17.405C49.1062 15.8089 47.8559 15.0111 46.1058 15.0111C45.3245 15.0111 44.6761 15.1833 44.1606 15.5274C43.645 15.8721 43.3868 16.3414 43.3868 16.9355ZM92.2273 13.546V14.0411V19.8619V33.7405H98.2694V19.8568H103.243V14.0411H98.2694L98.2745 13.546C98.2745 10.6357 99.9305 9.3058 103.243 9.55582V3.73518C99.5869 3.51667 96.8365 4.26796 94.9928 5.98853C93.1488 7.70977 92.2273 10.2294 92.2273 13.546ZM83.3614 26.0401V19.8568H89.4035V26.1674C89.4035 27.6927 89.0429 29.2083 88.2792 30.5281C87.1859 32.417 85.0536 34.417 80.9257 34.417C76.7554 34.417 74.4476 32.6797 73.179 30.9142C72.1638 29.5013 71.6671 27.7799 71.6671 26.0391L71.6667 3.69477H77.714L77.7159 26.0401C77.6874 27.6128 78.9738 28.9203 80.539 28.9169C82.0992 28.9134 83.3899 27.608 83.3614 26.0401ZM86.3658 16.5674C87.274 16.5674 88.0511 16.2438 88.6977 15.596C89.3441 14.949 89.6677 14.1844 89.6677 13.3024C89.6677 12.4207 89.3441 11.649 88.6977 10.988C88.0511 10.3264 87.274 9.99578 86.3658 9.99578C85.4847 9.99578 84.7212 10.3264 84.0753 10.988C83.4283 11.649 83.105 12.4207 83.105 13.3024C83.105 14.1844 83.4283 14.949 84.0753 15.596C84.7212 16.2438 85.4847 16.5674 86.3658 16.5674ZM34.3818 10.2698L34.3815 24.7717C34.2118 30.0902 29.8295 34.3694 24.5618 34.4155C19.2295 34.4622 14.7406 30.1558 14.5684 24.7717L14.5706 10.2698H20.6179L20.6153 24.2771C20.6153 25.8424 21.0374 27.0393 21.881 27.8681C23.3076 29.2608 25.6421 29.2608 27.0686 27.8681C27.9125 27.0393 28.3345 25.8424 28.3345 24.2771V10.2724L28.3372 10.2698H34.3818ZM113.195 16.1835C112.123 17.0547 111.415 18.279 111.068 19.8568H123.122C122.774 18.1804 122.058 16.9318 120.971 16.1096C119.884 15.2883 118.646 14.8771 117.26 14.8771C115.621 14.8771 114.266 15.313 113.195 16.1835ZM125.842 13.2441C128.129 15.6769 129.271 18.7136 129.271 22.3543C129.271 23.0983 129.218 23.8138 129.123 24.5061H111.472C112.252 27.4498 114.369 28.9216 117.822 28.9216C119.952 28.9216 121.581 28.1935 122.718 26.7525L127.548 29.3911C127.039 30.159 126.412 30.8937 125.792 31.4855C123.717 33.4378 121.032 34.417 117.732 34.417C114.009 34.417 111.022 33.2428 108.77 30.8943C106.519 28.5458 105.393 25.5864 105.393 22.0165C105.393 18.531 106.473 15.6161 108.63 13.2696L108.628 13.2682C108.636 13.2592 108.645 13.2507 108.653 13.2421C108.66 13.2347 108.667 13.2272 108.674 13.2195C108.692 13.2008 108.708 13.1814 108.725 13.1628C108.738 13.1498 108.75 13.1375 108.762 13.1252C108.774 13.114 108.785 13.1028 108.796 13.0912C110.979 10.7631 113.725 9.59506 117.038 9.59506C120.622 9.59506 123.557 10.8113 125.842 13.2441Z" fill={colors.primary}>
              </Path>
            </Svg> */}
            <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(4.5), fontWeight: '700', color: colors.primary }}>Zigy</Text>

          </View>
          {!isUserExist ?
            <>
              <View style={{ display: 'flex', flexDirection: 'row', padding: 5, }}>
                <View style={{ marginRight: 5 }}>
                  <Text
                    onPress={toggleComponent1}
                    style={{
                      backgroundColor: showComponent1 ? colors.primary : '#FFFFFF',
                      color: showComponent1 ? 'white' : colors.primary,
                      height: 50,
                      width: 140,
                      textAlign: 'center',
                      borderRadius: 5,
                      paddingTop: 11,
                      fontFamily: "LatoRegular", fontSize: RFPercentage(2.5),
                      fontWeight: '500',
                      elevation: 5,
                    }}>
                    Email
                  </Text>
                </View>
                <Pressable onPress={toggleComponent2}>
                  <Text
                    style={{
                      backgroundColor: showComponent2 ? colors.primary : '#FFFFFF',
                      color: showComponent2 ? 'white' : colors.primary,
                      height: 50,
                      width: wp("44%"),
                      textAlign: 'center',
                      borderRadius: 5,
                      paddingTop: 11,
                      fontFamily: "LatoRegular", fontSize: RFPercentage(2.5),
                      fontWeight: '500',
                      elevation: 5,
                    }}>
                    Phone Number
                  </Text>
                </Pressable>
              </View>
              {showComponent1 &&
                <Component1
                  isTimeout={isTimeout}
                  setCaptchaSuccess={setCaptchaSuccess}
                  captchaSuccess={captchaSuccess}
                  captcha={() => send()}
                  captchaReq={() => handleButtonPress()}
                  animatedStyle={animatedStyle}
                  captchaToken={captchaToken}
                />}
              {showComponent2 &&
                <Component2
                  isTimeout={isTimeout}
                  setCaptchaSuccess={setCaptchaSuccess}
                  captchaSuccess={captchaSuccess}
                  captcha={() => send()}
                  captchaReq={() => handleButtonPress()}
                  animatedStyle={animatedStyle}
                  captchaToken={captchaToken}
                />}
              <View>
                <Pressable
                  style={{ padding: 20, }}
                  onPress={() => navigation.navigate('BottomTabNavigation')}
                >
                  {/* Bookings */}
                  <Text style={{ textAlign: "center", fontFamily: "LatoRegular", fontSize: RFPercentage(2.1), color: colors.primary }}>Guest User</Text>
                </Pressable>

              </View>
            </> :
            <View style={styles.container1}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
              </View>
              <View style={styles.welcomeMessage}>
                <Text style={styles.welcomeText}>Welcome back</Text>
                <Text style={styles.userName}>{isUserExist?.full_name}</Text>
              </View>

              <View style={{
                position: "absolute", bottom: 0, left: 0, width: "90%", flexDirection: "row", justifyContent: "center", marginBottom: 40,
                display: 'flex',
                alignItems: 'center', alignSelf: "center", left: 20
              }}>
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderWidth: 1,
                      borderColor: passwordError ? 'red' : '#D9DADB',
                      borderRadius: 10,
                      height: 55,
                      marginTop: 10,
                      alignItems: 'center',
                      paddingRight: 10,
                    }}>
                    <TextInput
                      style={{ paddingLeft: 12, minWidth: Dimensions.get("window").width - 100 }}
                      placeholder="Password"
                      secureTextEntry={!isPasswordVisible}
                      value={password}
                      onChangeText={(text) => {
                        setPasswordError("")
                        setPassword(text)
                      }}
                    />

                    {passwordError ? <View>
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

                      : <Pressable onPress={togglePasswordVisibility} >
                        {isPasswordVisible ?
                          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M17.8201 5.76998C16.0701 4.44998 14.0701 3.72998 12.0001 3.72998C8.47009 3.72998 5.18009 5.80998 2.89009 9.40998C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M8.41992 19.5302C9.55992 20.0102 10.7699 20.2702 11.9999 20.2702C15.5299 20.2702 18.8199 18.1902 21.1099 14.5902C22.0099 13.1802 22.0099 10.8102 21.1099 9.40018C20.7799 8.88018 20.4199 8.39018 20.0499 7.93018" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M15.5099 12.7002C15.2499 14.1102 14.0999 15.2602 12.6899 15.5202" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M9.47 14.5298L2 21.9998" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M22 2L14.53 9.47" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Circle cx="12" cy="12" r="4" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
                          </Svg>

                          :
                          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M17.8201 5.76998C16.0701 4.44998 14.0701 3.72998 12.0001 3.72998C8.47009 3.72998 5.18009 5.80998 2.89009 9.40998C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M8.41992 19.5302C9.55992 20.0102 10.7699 20.2702 11.9999 20.2702C15.5299 20.2702 18.8199 18.1902 21.1099 14.5902C22.0099 13.1802 22.0099 10.8102 21.1099 9.40018C20.7799 8.88018 20.4199 8.39018 20.0499 7.93018" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M15.5099 12.7002C15.2499 14.1102 14.0999 15.2602 12.6899 15.5202" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M9.47 14.5298L2 21.9998" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M22 2L14.53 9.47" stroke="#8E8E92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </Svg>
                        }
                      </Pressable>
                    }
                  </View>
                  {passwordError && <Text style={{ color: 'red', paddingLeft: 5, paddingTop: 5 }}>
                    {passwordError}
                  </Text>}

                  <TouchableOpacity
                    onPress={send}
                    style={[animatedStyle, { marginTop: 20 }]}
                    disabled={captchaSuccess}>
                    <LinearGradient
                      colors={captchaSuccess ? ['#EEFFF5', '#EEFFF5'] : ['#F3F3F3', '#FFFFFF']}
                      style={{
                        borderWidth: 1,
                        height: 44,
                        marginBottom: 15,
                        borderColor: colors.my_gray,
                        borderRadius: 5,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        marginTop: 0,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        {!isTimeout && <>
                          {captchaSuccess ? <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M23.8545 10.1261C23.9503 10.7367 24 11.3625 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C14.264 0 16.3816 0.626977 18.1886 1.71677L17.0219 3.35054C15.5461 2.49183 13.8305 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.5923 21.9756 11.1904 21.9282 10.7955C22.5359 10.59 23.1963 10.3596 23.8545 10.1261Z" fill="#7BE4C3" />
                            <Path d="M6.31348 11.5947L10.8076 15.9912L21 6.125" stroke="#35D2A2" stroke-width="3" stroke-linecap="round" />
                          </Svg> : <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none">
                            <Circle
                              cx="15"
                              cy="15"
                              r="14.5"
                              // fill="nill"
                              fill-opacity="0.25"
                              stroke="#2488FF"
                            />
                            <Circle cx="15" cy="15" r="6" fill="#376FFF" />
                          </Svg>}
                        </>}
                        {isTimeout && <Svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <Path fill-rule="evenodd" clip-rule="evenodd" d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM6 8C5.44772 8 5 8.44771 5 9C5 9.55229 5.44772 10 6 10H12C12.5523 10 13 9.55229 13 9C13 8.44771 12.5523 8 12 8H6Z" fill="#DE715B" />
                        </Svg>}

                        {!isTimeout ? (
                          <Text style={captchaSuccess ? { color: "#26C267" } : { color: 'black' }}>
                            {captchaSuccess ? "Succeeded" : "Click to verify"}
                          </Text>
                        ) : (
                          <Text style={{ color: "#383838", paddingHorizontal: 15 }}>
                            Time out <Text style={{ color: "#3873FF" }}>Retry</Text>
                          </Text>)}
                      </View>
                      {!captchaSuccess ? <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none">
                        <Path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.9547 9.03741H13.6625C13.179 7.1962 11.4036 6.00028 9.51567 6.24403C7.62771 6.48779 6.2143 8.09542 6.2143 9.99905C6.2143 11.9027 7.62771 13.5103 9.51567 13.7541C11.4036 13.9978 13.179 12.8019 13.6625 10.9607H18.0163C17.5959 14.4776 14.9339 17.3106 11.4499 17.949C7.96597 18.5873 4.47246 16.882 2.83248 13.7426C1.19249 10.6032 1.78844 6.76172 4.3025 4.26675C6.81656 1.77178 10.6625 1.20513 13.7893 2.869C13.2846 4.27997 13.8764 5.84886 15.1873 6.57486C16.4983 7.30086 18.1421 6.97014 19.0703 5.79367C19.9985 4.6172 19.9376 2.94149 18.9265 1.8355C17.9154 0.729501 16.2518 0.518978 14.997 1.33822C11.0769 -0.92323 6.12667 -0.270008 2.92736 2.9309C-0.271948 6.13181 -0.922691 11.0824 1.34072 15.0014C3.60414 18.9204 8.21743 20.8307 12.5888 19.6591C16.9602 18.4876 19.9998 14.5262 20 10.0006C20 9.67649 19.9849 9.35544 19.9547 9.03741ZM9.99106 11.8635C8.96221 11.8635 8.12816 11.0294 8.12816 10.0006C8.12816 8.97171 8.96221 8.13766 9.99106 8.13766C11.0199 8.13766 11.854 8.97171 11.854 10.0006C11.8524 11.0194 11.0339 11.8486 10.0152 11.8635H9.99106ZM17.7869 3.88348C17.7869 3.25984 17.2813 2.75427 16.6576 2.75427C16.3582 2.75427 16.0709 2.87324 15.8592 3.08501C15.6474 3.29678 15.5284 3.584 15.5284 3.88348C15.5284 4.50713 16.034 5.0127 16.6576 5.0127C17.2813 5.0127 17.7869 4.50713 17.7869 3.88348Z"
                          fill="#AFBBBF"
                        />
                      </Svg> :
                        <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <Path fill-rule="evenodd" clip-rule="evenodd" d="M19.9547 9.03741H13.6625C13.179 7.1962 11.4036 6.00028 9.51567 6.24403C7.62771 6.48779 6.2143 8.09542 6.2143 9.99905C6.2143 11.9027 7.62771 13.5103 9.51567 13.7541C11.4036 13.9978 13.179 12.8019 13.6625 10.9607H18.0163C17.5959 14.4776 14.9339 17.3106 11.4499 17.949C7.96597 18.5873 4.47246 16.882 2.83248 13.7426C1.19249 10.6032 1.78844 6.76172 4.3025 4.26675C6.81656 1.77178 10.6625 1.20513 13.7893 2.869C13.2846 4.27997 13.8764 5.84886 15.1873 6.57486C16.4983 7.30086 18.1421 6.97014 19.0703 5.79367C19.9985 4.6172 19.9376 2.94149 18.9265 1.8355C17.9154 0.729501 16.2518 0.518978 14.997 1.33822C11.0769 -0.92323 6.12667 -0.270008 2.92736 2.9309C-0.271948 6.13181 -0.922691 11.0824 1.34072 15.0014C3.60414 18.9204 8.21743 20.8307 12.5888 19.6591C16.9602 18.4876 19.9998 14.5262 20 10.0006C20 9.67649 19.9849 9.35544 19.9547 9.03741ZM9.99106 11.8635C8.96221 11.8635 8.12816 11.0294 8.12816 10.0006C8.12816 8.97171 8.96221 8.13766 9.99106 8.13766C11.0199 8.13766 11.854 8.97171 11.854 10.0006C11.8524 11.0194 11.0339 11.8486 10.0152 11.8635H9.99106ZM17.7869 3.88348C17.7869 3.25984 17.2813 2.75427 16.6576 2.75427C16.3582 2.75427 16.0709 2.87324 15.8592 3.08501C15.6474 3.29678 15.5284 3.584 15.5284 3.88348C15.5284 4.50713 16.034 5.0127 16.6576 5.0127C17.2813 5.0127 17.7869 4.50713 17.7869 3.88348Z" fill="#80D6AB" />
                        </Svg>}
                    </LinearGradient>
                  </TouchableOpacity>
                  {password
                    && <Pressable
                      style={[styles.button, { width: '100%', marginTop: 15, flexDirection: "row" }]}
                      // onPress={() => navigation.navigate('bottom_navigation')}
                      onPress={existingLogin}
                    >

                      <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.8), color: 'white' }}>
                        Login
                      </Text>
                    </Pressable>}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <View
                      style={{ color: colors.primary, fontFamily: "LatoRegular", fontSize: RFPercentage(1.7), marginVertical: 10 }}>
                      <Text
                        style={{ color: colors.primary, }}
                        onPress={() => navigation.navigate('forgot', { from: "email" })}>
                        Forgot Password?
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 65,
                    }}>
                    <View
                      style={{
                        height: '5px',
                        backgroundColor: '#000',
                        width: '25%',
                        borderWidth: 0.5,
                        borderColor: colors.my_gray,
                      }}></View>
                    <Text style={{ paddingHorizontal: 5, color: 'rgba(167,167,170,1)' }}>
                      OR
                    </Text>
                    <View
                      style={{
                        height: '5px',
                        backgroundColor: '#000',
                        width: '25%',
                        borderWidth: 0.5,
                        borderColor: colors.my_gray,
                      }}></View>
                  </View>
                  <Pressable
                    style={[styles.button, { width: '100%', marginTop: 15, flexDirection: "row" }]}
                    // onPress={() => navigation.navigate('bottom_navigation')}
                    onPress={bioMetricLogin}
                  >
                    <View style={{ position: "absolute", left: 20 }}>
                      <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <Path d="M10 12.4001C9.24167 12.4001 8.625 11.7835 8.625 11.0251V8.96682C8.625 8.20848 9.24167 7.5918 10 7.5918C10.7583 7.5918 11.375 8.20848 11.375 8.96682V11.0251C11.375 11.7835 10.7583 12.4001 10 12.4001Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
                        <Path d="M14.1502 11.2252C13.9835 13.3752 12.1835 15.0586 10.0002 15.0586C7.70016 15.0586 5.8335 13.1919 5.8335 10.8919V9.10856C5.8335 6.80856 7.70016 4.94189 10.0002 4.94189C12.1585 4.94189 13.9335 6.58355 14.1418 8.68355" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
                        <Path d="M12.5 1.6665H14.1667C16.6667 1.6665 18.3333 3.33317 18.3333 5.83317V7.49984" stroke="#fff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M1.6665 7.49984V5.83317C1.6665 3.33317 3.33317 1.6665 5.83317 1.6665H7.49984" stroke="#fff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M12.5 18.3333H14.1667C16.6667 18.3333 18.3333 16.6667 18.3333 14.1667V12.5" stroke="#ffd" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M1.6665 12.5V14.1667C1.6665 16.6667 3.33317 18.3333 5.83317 18.3333H7.49984" stroke="#ffd" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      </Svg>

                    </View>
                    <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.8), color: 'white' }}>

                      Touch to unlock</Text>
                  </Pressable>
                </View>
              </View>
            </View>}

          {/* <WebviewDemo
          style={styles.captcha}
          show={showCaptcha}
          onSuccess={onSuccess}
          onFail={onFail}
          onError={onError}
          onClose={onClose}
          onTimeOut={setisTimeout}
        ></WebviewDemo> */}



        </View>
        <View>
          {/* <Recaptcha
          loadingComponent={<LoadingOverlay />}
          ref={recaptcha}
          siteKey="6Lcf0q8oAAAAAM7r80P0bt_CxrwmEavdfnoHIdvb"
          baseUrl=""
          onVerify={onVerify}
          onExpire={onExpire}
          size="normal"
        /> */}
        </View>
      </ScrollView>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 50,
    marginVertical: 30,
    // Adjust the resizeMode as needed
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: 8,
    // borderWidth:1,
    height: 58,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    borderRadius: 30,
  },
  btn: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1,
    width: '100%',
    height: 58,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 5,
  },

  title: {
    fontFamily: "LatoRegular", fontSize: RFPercentage(3.4),
    marginBottom: 5,
    fontWeight: '600',
    color: 'black',
  },
  input: {
    width: '100%',
    height: 56,
    borderColor: colors.my_gray,
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginVertical: 10,
    height: 50,
  },
  componentContainer: {
    width: wp('100%'),
    padding: 20,
    height: hp('70%'),
    borderRadius: 5,
    backgroundColor: colors.my_bg
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalAvatar: {
    position: 'absolute',
    top: -65,
  },
  modalContent: {
    height: 400,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 15,
  },
  profile_img: {
    position: 'absolute',
    borderRadius: 50,
    height: 70,
    width: 70
  },
  container1: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: "100%",
    paddingVertical: 20,
    backgroundColor: '#fff',
    height: Dimensions.get("window").height - 120,
  },
  avatarContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile_img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeMessage: {
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: "LatoRegular", fontSize: RFPercentage(2.6),
    color: '#888',
  },
  userName: {
    fontFamily: "LatoRegular", fontSize: RFPercentage(3.4),
    color: '#333',
    marginTop: 10,
  },
  passwordField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  passwordToggle: {
    padding: 10,
  },
  biometricOption: {
    marginTop: 20,
  },
  biometricText: {
    fontFamily: "LatoRegular", fontSize: RFPercentage(2),
    color: '#666',
  },
  passwordText: {
    fontFamily: "LatoRegular", fontSize: RFPercentage(2),
    marginRight: 12,
  }
});

export default ToggleComponents;
