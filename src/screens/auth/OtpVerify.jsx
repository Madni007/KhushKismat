import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  CheckBox,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import * as yup from "yup";
import { colors } from '../../utils/Colors';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { postThunk, setAppLoading, setAuth } from '../../redux/slices/commonSlice';
import { storeToken } from '../../utils/StorageToken';
import Ionicons from "react-native-vector-icons/Ionicons"
import Icon from 'react-native-vector-icons/FontAwesome';
import SafeLayout from '../layout/SafeLayout';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
const OtpVerify = ({ navigation, route }) => {
  const { email, fromLogin, resetFormPre, phone } = route.params;
  const { isAuth } = useSelector((state) => state.common)


  const otpValidation = yup.object({
    verification_code: yup
      .number()
      .required("Verification code is required."),
  })
  const dispatch = useDispatch()

  const signupVerification = async (values, { setErrors, resetForm }) => {
    const obj = {}
    if (values.verification_code) obj.verification_code = values.verification_code
    if (values.password) obj.password = values.password
    if (values.invitation_code) obj.invitation_code = values.invitation_code
    console.log("obj", obj)
    try {
      if (fromLogin) {
        console.log("from login", fromLogin)
        console.log("data", { email, ...obj, login_with_otp: 1 })

        const response = await dispatch(
          postThunk({ url: '/otp-verification', data: phone ? { phone, ...obj, login_with_otp: 1 } : { email, ...obj, login_with_otp: 1 } })).unwrap();
        if (response.success && response.data.role == "user") {
          console.log("dsdsadsad", response.data)
          storeToken(response.data.token)
          resetForm()
          resetFormPre()
          // setHavePass(false)
          // setCaptchaSuccess(false)
          dispatch(setAuth(true))
          if (isAuth) navigation.navigate('bottom_navigation')
        }
        resetForm()
      } else {
        console.log("sssssssskkkkkkk", obj)
        dispatch(setAppLoading(true))
        const response = await dispatch(
          postThunk({ url: '/otp-verification', data: { ...obj } }),
        ).unwrap();

        console.log(response.data)
        if (response.success) {
          resetForm()
          resetFormPre()
          storeToken(response.data.token)
          dispatch(setAuth(true))
          if (isAuth) navigation.navigate('bottom_navigation')
          dispatch(setAppLoading(false))

        }
      }

    } catch (error) {
      dispatch(setAppLoading(false))
      if (error.message == "Verification failed. your OTP code is wrong. Please Try again!") {
        setErrors({ verification_code: "Wrong OTP, Please Try again" });
      }
      if (error.message == "Invalid Invitation Code") {
        setErrors({ invitation_code: error.message });
      }
    }
  }
  const [timer, setTimer] = useState(60);
  const [isOTPResent, setIsOTPResent] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(interval);
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval);
  }, [timer, isTimerRunning]);

  useEffect(() => {
    setTimer(60);
    setIsOTPResent(isOTPResent + 1)
    setIsTimerRunning(true);
  }, [])
  const handleSendOTP = async () => {
    try {
      // const response = await dispatch(
      //   postThunk({
      //     url: fromLogin ? '/login' : '/register',
      //     data: fromLogin ? { email_address: email, token: "grwirwutyw4uty" }
      //       : { email_address: email }
      //   }),
      // ).unwrap();
      const response = await dispatch(
        postThunk({
          url: '/send-otp',
          data: phone ? { phone } : { email_address: email }
        }),
      ).unwrap();

      console.log("otp code send response=> ", response);
      if (response.success) {
        setTimer(60);
        setIsOTPResent(isOTPResent + 1)
        setIsTimerRunning(true);
      }

    } catch (error) {
      console.log(error);
    }

  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <SafeLayout>
    <SafeLayout>
    <Formik
      initialValues={{ verification_code: "", password: "", invitation_code: "" }}
      validationSchema={otpValidation}
      onSubmit={signupVerification}
      validate={(values) => {
        console.log("XXXX", values)
      }}
    >
      {({ handleChange, handleBlur, submitCount, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <View style={{ paddingVertical: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.title}>OTP Verification</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}
                style={{
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: colors.my_gray,
                  width: 20,
                  height: 20,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  verticalAlign: "middle"
                }}>
                <Svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                  <Path d="M17.1938 27.8063L27.8063 17.1938" stroke="#A7A7AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <Path d="M27.8063 27.8063L17.1938 17.1938" stroke="#A7A7AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </Svg></TouchableOpacity>
            </View>
            <Text>Check Your Email, To Enter Verification Code</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: submitCount > 0 && errors.verification_code ? 'red' : '#D9DADB',
              borderRadius: 10,
              height: 55,
              alignItems: 'center',
              paddingRight: 10,
            }}>
            <TextInput
              style={styles.input}
              placeholder="Enter Verification Code"
              value={values.verification_code}
              onChangeText={handleChange('verification_code')}
              keyboardType="numeric"
              maxLength={4}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {submitCount > 0 && errors.verification_code && (

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
              )}
              <TouchableOpacity disabled={isTimerRunning || isOTPResent >= 5} onPress={handleSendOTP} >
                <Text
                  style={{
                    color: submitCount > 0 && errors.verification_code ? "red" : isTimerRunning ? colors.my_gray : colors.primary,
                    fontWeight: '600',
                  }}>
                  {isOTPResent < 1 ? isTimerRunning ? `${timer} seconds` : "Send" : isTimerRunning ? `${timer} seconds` : "Resend"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {submitCount > 0 &&
            <Text style={[{ color: 'red', marginHorizontal: 5, }, !errors?.verification_code && { display: "none" }]}>{errors?.verification_code}</Text>
          }

          {!fromLogin && <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => setShow(!show)}><Text style={{ color: colors.text_gray, fontWeight: "" }}>Password & Referral Code (Optional)
          </Text>
            <View style={{ marginTop: 2, }}>
              {show ? (
                <Svg
                  width="15"
                  height="15"
                  viewBox="0 0 20 20"
                  fill={colors.text_gray}
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M3.4001 7.42505L8.83343 12.8584C9.4751 13.5 10.5251 13.5 11.1668 12.8584L16.6001 7.42505"
                    stroke="#757679"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              ) : (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 20 20"
                  fill={colors.text_gray}>
                  <Path
                    d="M7.4248 16.5999L12.8581 11.1666C13.4998 10.5249 13.4998 9.4749 12.8581 8.83324L7.4248 3.3999"
                    stroke="#757679"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              )}</View></TouchableOpacity>}
          {(!fromLogin) && show &&
            <>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderColor: colors.my_gray,
                  borderRadius: 10,
                  height: 55,
                  alignItems: 'center',
                  paddingRight: 10,
                }}>
                {/* <TextInput
              style={styles.input}
              placeholder="Password (Optional)"
              value={values.password}
              onChangeText={handleChange('password')}
              keyboardType="email-address"
            />
            <View>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                strokeWidth="2"
                viewBox="0 0 24 24"
                fill="none">
                <Path
                  d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z"
                  stroke="#8E8E92"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M17.8201 5.76998C16.0701 4.44998 14.0701 3.72998 12.0001 3.72998C8.47009 3.72998 5.18009 5.80998 2.89009 9.40998C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77"
                  stroke="#8E8E92"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M8.41992 19.5302C9.55992 20.0102 10.7699 20.2702 11.9999 20.2702C15.5299 20.2702 18.8199 18.1902 21.1099 14.5902C22.0099 13.1802 22.0099 10.8102 21.1099 9.40018C20.7799 8.88018 20.4199 8.39018 20.0499 7.93018"
                  stroke="#8E8E92"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M15.5099 12.7002C15.2499 14.1102 14.0999 15.2602 12.6899 15.5202"
                  stroke="#8E8E92"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M9.47 14.5298L2 21.9998"
                  stroke="#8E8E92"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M22 2L14.53 9.47"
                  stroke="#8E8E92"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </View> */}
                <TextInput
                  style={styles.input}
                  placeholder="Password (Optional)"
                  secureTextEntry={!isPasswordVisible}
                  value={values.password}
                  onChangeText={handleChange('password')}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>

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
                </TouchableOpacity>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderColor: submitCount > 0 && errors.invitation_code ? 'red' : '#D9DADB',
                  borderRadius: 10,
                  height: 55,
                  alignItems: 'center',
                  paddingRight: 10,
                }}>
                <TextInput
                  style={styles.input}
                  placeholder="Referral code (Optional)"
                  value={values.invitation_code}
                  onChangeText={handleChange('invitation_code')}
                  keyboardType="email-address"
                />

                {submitCount > 0 && errors.invitation_code && (

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
                )}

              </View>
              {submitCount > 0 &&
                <Text style={[{ color: 'red', marginHorizontal: 5, }, !errors?.invitation_code && { display: "none" }]}>{errors?.invitation_code}</Text>
              }
            </>}
          <TouchableOpacity style={styles.button}
            onPress={handleSubmit}
          // onPress={handleSignup}
          >
            <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.8), color: 'white' }}>{fromLogin ? "Log In" : "Sign Up"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
    </SafeLayout>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    height: 65,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btn: {
    backgroundColor: 'transparent',
    borderColor: colors.primary,
    borderWidth: 1,
    width: '100%',
    height: 65,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },

  container: {
    flex: 1,
    gap: 10,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: "LatoRegular", fontSize: RFPercentage(3.4),
    marginBottom: 5,
    fontWeight: '600',
    color: 'black',
  },
  input: {
    height: 65,
    borderColor: 'gray',

    paddingLeft: 20,
    borderRadius: 8,
  },
});

export default OtpVerify;
