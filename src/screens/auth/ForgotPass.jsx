import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  CheckBox,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../utils/Colors';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import * as yup from "yup";
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { postThunk } from '../../redux/slices/commonSlice';
import SafeLayout from '../layout/SafeLayout';
import { RFPercentage } from "react-native-responsive-fontsize";


const ForgotPass = ({ navigation, route }) => {
  const [email, setEmail] = useState('');

  const { from } = route.params;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);

  const handleSignup = () => {
    // Implement your signup logic here
    // For simplicity, let's just navigate to the login screen
    navigation.navigate('login');
  };
  const [timer, setTimer] = useState(60);
  const [isOTPResent, setIsOTPResent] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sendOtp, setSendOtp] = useState(false)
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
  const dispatch = useDispatch()

  const handleSendOTP = async (values) => {
    try {
      const response = await dispatch(
        postThunk({ url: '/send-otp', data: { email_address: values.email_address } }),
      ).unwrap();
      if (response.success) {
        setTimer(60);
        setIsOTPResent(isOTPResent + 1)
        setIsTimerRunning(true);
        setSendOtp(false)
      }

      console.log("otp code send response=> ", response);

    } catch (error) {
      console.log(error);
      setSendOtp(false)
    }

  };
  const getInititalVals = () => {
    const temp = {
      email_address: "",
      password: "",
      cpassword: "",
      otp_code: ""
    }
    // if (havePassword) temp.password = ""
    return temp
  }

  const resetPass = async (values, { setErrors }) => {
    console.log("ddddddddddddd", values)

    try {
      const response = await dispatch(
        postThunk({
          url: '/reset-password', data: {
            email_address: values.email_address,
            otp_code: values.otp_code,
            new_password: values.password
          }
        }),
      ).unwrap();
      if (response.success) {
        navigation.navigate('login');
      }
      console.log("otp code send response=> ", response);

    } catch (error) {
      console.log(error);
      if (error.message == "Wrong OTP Code") {
        setErrors({ otp_code: "Wrong OTP, Please Try again" })

      }

    }
  }


  const forgotPassValidationWithOtp = yup.object({
    email_address: yup.string().email('Your Email is not Valid, Please try again').required('Email is Required !'),
  })

  const forgotPassValidation = yup.object({
    email_address: yup.string().email('Your Email is not Valid, Please try again').required('Email is Required !'),
    otp_code: yup
      .number()
      .required("Verification code is required."),
    password: yup
      .string()
      .required("Password is required"),
    cpassword: yup
      .string()
      .label("confirm password")
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })

  return (
    <SafeLayout>
    <Formik
      initialValues={getInititalVals()}
      validationSchema={sendOtp ? forgotPassValidationWithOtp : forgotPassValidation}
      onSubmit={sendOtp ? handleSendOTP : resetPass}
      validate={(values) => {
        console.log("XXXX", values)
      }}
    >
      {({ handleChange, handleBlur, submitCount, handleSubmit, values, touched, errors }) => (
        < View style={styles.container}>
          {/* {console.log("errors............", errors)} */}

          <View style={{ paddingVertical: 20 }}>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={{fontFamily:'LatoRegular',fontSize:RFPercentage(2)}}>Check Your Email Or Phone, To Enter Verification Code</Text>
          </View>

          {from == "email" ?
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
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={values.email_address}
                onChangeText={handleChange('email_address')}
                keyboardType="email-address"
              />

            </View> :
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
              <TextInput
                style={styles.input}
                placeholder="Number"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

            </View>}
          <Text style={[{ color: 'red', marginHorizontal: 5, }, submitCount > 0 && !errors?.email_address && { display: "none" }]}>{errors?.email_address}</Text>



          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: errors?.password ? "red" : colors.my_gray,
              borderRadius: 10,
              height: 55,
              alignItems: 'center',
              paddingRight: 10,
            }}>
            <TextInput
              style={[styles.input, { width: "85%" }]}
              placeholder="New Password"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry={!isPasswordVisible}
            />
            {submitCount > 1 && errors.password ? (
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
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
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
              </TouchableOpacity>}
          </View>
          <Text style={[{ color: 'red', marginHorizontal: 5, }, submitCount > 1 && !errors?.password && { display: "none" }]}>{errors?.password}</Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: errors?.cpassword ? "red" : colors.my_gray,
              borderRadius: 10,
              height: 55,
              alignItems: 'center',
              paddingRight: 10,
            }}>
            <TextInput
              style={[styles.input, { width: "85%" }]}
              placeholder="Confirm Password"
              value={values.cpassword}
              onChangeText={handleChange('cpassword')}
              secureTextEntry={!isCPasswordVisible}
            />
            {submitCount > 0 && errors.cpassword ? (
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
              <TouchableOpacity
                onPress={() => setIsCPasswordVisible(!isCPasswordVisible)}
              >
                {isCPasswordVisible ?
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
              </TouchableOpacity>}
          </View>
          <Text style={[{ color: 'red', marginHorizontal: 5, }, submitCount > 1 && !errors?.cpassword && { display: "none" }]}>{errors?.cpassword}</Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: errors.otp_code ? "red" : colors.my_gray,
              borderRadius: 10,
              height: 55,
              alignItems: 'center',
              paddingRight: 10,
            }}>
            <TextInput
              style={[styles.input, { width: "70%" }]}
              placeholder="Enter Verification Code"
              value={values.otp_code}
              onChangeText={handleChange('otp_code')}
              keyboardType="numeric"
            />
            <TouchableOpacity
              disabled={isTimerRunning || isOTPResent >= 50}
              onPress={() => {
                setSendOtp(true)
                setTimeout(() => {
                  handleSubmit()
                }, 1000)
              }} >
              <Text
                style={{
                  color: submitCount > 0 && errors.otp_code ? "red" : isTimerRunning ? colors.my_gray : colors.primary,
                  fontWeight: '600',
                }}>
                {isOTPResent < 1 ? isTimerRunning ? `${timer} seconds` : "Send" : isTimerRunning ? `${timer} seconds` : "Resend"}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[{ color: 'red', marginHorizontal: 5, }, submitCount > 0 && !errors?.otp_code && { display: "none" }]}>{errors?.otp_code}</Text>

          <TouchableOpacity style={styles.button} disabled={!(isOTPResent > 0)} onPress={handleSubmit}>
            <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.8), color: 'white' }}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      )
      }
    </Formik >
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
    fontWeight: '800',
    color: 'black',
  },
  input: {
    // marginBottom: 10,
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});

export default ForgotPass;
