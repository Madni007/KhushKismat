// import React, { useRef, useState } from 'react';
// import {
//   Text,
//   ScrollView,
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   ToastAndroid,
//   Image,
//   Modal
// } from 'react-native';
// import { Svg, Path, Circle } from 'react-native-svg';
// import { TextInput } from 'react-native';
// import PhoneInput from 'react-native-phone-number-input';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import { Formik } from 'formik';
// import { SelectList } from 'react-native-dropdown-select-list'
// // import CalendarPicker from 'react-native-calendar-picker';
// // import moment from 'moment';
// import { GetUserProfile, postThunk, setAppLoading } from '../../redux/slices/commonSlice';
// import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
// import { countryCodes } from '../../utils/mockData';
// // import Toast from 'react-native-simple-toast';
// import SafeLayout from '../layout/SafeLayout';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import * as ImagePicker from 'react-native-image-picker';
// import AntDesign from "react-native-vector-icons/AntDesign";
// import { colors } from '../../utils/Colors';
// import AppHeader from '../../components/AppHeader';
// import RBSheet from "@nonam4/react-native-bottom-sheet";
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// const EditProfile = ({ navigation }) => {
//   const refRBSheet = useRef();

//   const { user } = useSelector(state => state.common)
//   const [selectedImage, setSelectedImage] = useState(null);

//   const getInititalVals = () => {
//     return {
//       full_name: user ? user?.full_name || "" : "",
//       phone: user ? user?.phone || "" : "",
//       email: user ? user?.email || "" : "",
//       gender: user ? user?.gender || "" : "",
//       dob: user ? user?.dob || "" : "",
//       address: user ? user?.address || "" : "",
//     }
//   }
//   const [showCalender, setShowCal] = useState(false)
//   const toggleCalender = () => {
//     setShowCal(!showCalender)

//   }
//   const dispatch = useDispatch()

//   const updateProfile = async (values) => {

//     try {
//       dispatch(setAppLoading(true))
//       const response = await dispatch(postThunk({ url: '/dashboard/profile/edit', data: { ...values } })).unwrap()

//       if (response.success) {
//         dispatch(GetUserProfile())
//         dispatch(setAppLoading(false))
//         Toast.showWithGravity(
//           `Profile updated.`,
//           Toast.SHORT,
//           Toast.CENTER,
//         );
//         navigation.goBack()

//       }
//     } catch (error) {
//       console.log("update profile error=> ", error)
//       dispatch(setAppLoading(false))
//       Toast.showWithGravity(
//         `Unknown error.`,
//         Toast.SHORT,
//         Toast.CENTER,
//       );
//     }
//   }
//   const phoneNumberUtil = PhoneNumberUtil.getInstance();

//   const getFormatedNumber = (number) => {
//     const straightPhoneNumber = number;
//     try {
//       // Parse the phone number
//       const parsedPhoneNumber = phoneNumberUtil.parse(straightPhoneNumber); // 'PK' is the country code for Pakistan

//       const numericCountryCode = parsedPhoneNumber.getCountryCode();
//       const twoLetterCountryCode = countryCodes[numericCountryCode.toString()] || 'Unknown';

//       const internationalPhoneNumber = phoneNumberUtil.format(parsedPhoneNumber, PhoneNumberFormat.INTERNATIONAL);

//       return { number: parsedPhoneNumber?.values_["2"], countryCode: twoLetterCountryCode }; // Output: +923420699570
//     } catch (e) {
//       console.error('Invalid phone number:', e);
//     }

//   }

//   const [modalVisible, setModalVisible] = useState(false);


//   const openImagePicker = () => {
//     setModalVisible(!modalVisible);
//   };


//   const handleCameraSelect = () => {
//     openImagePicker()
//     ImagePicker?.launchCamera({ mediaType: 'photo' }, (response) => {
//       if (!response?.didCancel) {
//         setSelectedImage(response?.assets[0].uri);
//       }
//     });
//   };

//   const handleGallerySelect = () => {
//     openImagePicker()
//     ImagePicker.launchImageLibrary({ mediaType: 'photo', }, (response) => {
//       if (!response.didCancel) {
//         setSelectedImage(response.assets[0].uri);
//       }
//     });
//   };
//   return (
//     <SafeLayout>
//       <AppHeader title={'Edit Profile'}/>
//       <ScrollView style={{
//         backgroundColor: 'white', height: ('100%'),
//         width: ('100%'),
//       }}>
//         <View style={styles.container}>
//           <Formik
//             initialValues={getInititalVals()}
//             onSubmit={updateProfile}
//             validate={(values) => {
//               // console.log("XXXX", values)
//             }}
//           >
//             {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, touched, errors }) => (

//               <>

//                 <View style={{ width: ('90%') }}>
                 
//                   {/* Content Section  */}
//                   <View style={{width:('90%')}}>
//                     <View style={styles.content_area}>
//                       <View style={styles.ProfileImg}>
//                       <TouchableOpacity style={styles.circularBorder} onPress={() => refRBSheet.current.open()}>
//                         {selectedImage ? (
//                           <Image source={{ uri: selectedImage }} style={styles.profileImage} />
//                         ) : (
//                           <Svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-ba99afe0="">
//                             <Path fill-rule="evenodd" clip-rule="evenodd" d="M11.9987 0.333313C5.55605 0.333313 0.332031 5.55654 0.332031 12C0.332031 18.4434 5.55554 23.6666 11.9987 23.6666C18.4424 23.6666 23.6654 18.4434 23.6654 12C23.6654 5.55654 18.4424 0.333313 11.9987 0.333313ZM11.9987 3.82178C14.1305 3.82178 15.858 5.54987 15.858 7.68078C15.858 9.81219 14.1305 11.5398 11.9987 11.5398C9.86789 11.5398 8.14039 9.81219 8.14039 7.68078C8.14039 5.54987 9.86789 3.82178 11.9987 3.82178ZM11.9961 20.6163C9.86994 20.6163 7.92259 19.842 6.42057 18.5603C6.05467 18.2482 5.84354 17.7905 5.84354 17.3103C5.84354 15.1492 7.59257 13.4196 9.75412 13.4196H14.2443C16.4064 13.4196 18.1487 15.1492 18.1487 17.3103C18.1487 17.791 17.9386 18.2477 17.5722 18.5598C16.0707 19.842 14.1228 20.6163 11.9961 20.6163Z" fill="black" fill-opacity="0.87" data-v-ba99afe0="">
//                             </Path>
//                           </Svg>
//                         )}
//                         <TouchableOpacity style={styles.uploadIcon} onPress={() => refRBSheet.current.open()}>
//                           <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <Circle cx="20" cy="20" r="20" fill="#E4EAE3" />
//                             <Path d="M15.8242 12.2446L15.418 13.4286H12.5C11.1211 13.4286 10 14.5176 10 15.8571V25.5714C10 26.9109 11.1211 28 12.5 28H27.5C28.8789 28 30 26.9109 30 25.5714V15.8571C30 14.5176 28.8789 13.4286 27.5 13.4286H24.582L24.1758 12.2446C23.9219 11.5009 23.207 11 22.3984 11H17.6016C16.793 11 16.0781 11.5009 15.8242 12.2446ZM20 17.0714C20.9946 17.0714 21.9484 17.4552 22.6517 18.1384C23.3549 18.8216 23.75 19.7481 23.75 20.7143C23.75 21.6804 23.3549 22.607 22.6517 23.2902C21.9484 23.9733 20.9946 24.3571 20 24.3571C19.0054 24.3571 18.0516 23.9733 17.3483 23.2902C16.6451 22.607 16.25 21.6804 16.25 20.7143C16.25 19.7481 16.6451 18.8216 17.3483 18.1384C18.0516 17.4552 19.0054 17.0714 20 17.0714Z" fill="#3C3C3C" />
//                           </Svg>
//                         </TouchableOpacity>
//                       </TouchableOpacity>
//                       </View>
//                       {/* Phone Number Field  */}
//                       <View >
//                         <Text style={styles.input_label}>Phone Number</Text>
//                         <SelectPhoneCode
//                           phoneNumber={getFormatedNumber(values?.phone)?.number ? `${getFormatedNumber(values?.phone)?.number}` : ""}
//                           countryCode={getFormatedNumber(values?.phone)?.countryCode}
//                           setPhoneNumber={setFieldValue} />
//                       </View>
//                       {/* Email Field  */}
//                       <View style={styles.topSpace}>
//                         <Text style={styles.input_label}>Email</Text>
//                         <View style={styles.input}>
//                           <View style={styles.input_icon}>
//                             <TextInput
//                               style={styles.input_field}
//                               editable={true}
//                               placeholder="Email"
//                               placeholderTextColor={colors.grayLight}
//                               value={values.email}
//                               onChangeText={handleChange('email')}
//                               keyboardType="email-address"
//                             />
//                           </View>

//                         </View>
//                       </View>

//                       <View style={styles.topSpace}>
//                         <Text style={styles.input_label}>Full Name</Text>
//                         <View style={styles.input}>
//                           <View style={styles.input_icon}>
//                             <TextInput
//                               style={styles.input_field}
//                               placeholder="Name"
//                               placeholderTextColor={colors.grayLight}
//                               value={values.full_name}
//                               onChangeText={handleChange('full_name')}
//                             />
//                           </View>
//                         </View>
//                       </View>

//                       {/* Date of Birth Field  */}
//                       <View style={styles.topSpace}>
//                         <Text style={styles.input_label}>Date Of Birth</Text>
//                         <TouchableWithoutFeedback onPress={toggleCalender} style={styles.input}>
//                           <View style={styles.input_icon}>

//                             <Text style={[styles.input_field, { color: colors.grayLight, fontSize: 12 }]}>
//                               {values.dob || "Select Date of Birth"}
//                             </Text>
//                           </View>
//                         </TouchableWithoutFeedback>
//                         {showCalender && <View style={{ height: 300 }}>
//                           <CalendarPicker
//                             onDateChange={(e) => {
//                               setFieldValue("dob", moment(e).format("yyyy-MM-DD"))
//                               toggleCalender()

//                             }}
//                             width={300}
//                             selectedDayStyle={{ backgroundColor: colors.DarkGreen }}
//                             enableSwipe={true}
//                           />
//                         </View>}
//                       </View>
//                       {/* Gender Field  */}
//                       <View style={styles.topSpace}>
//                         <Text style={styles.input_label}>Gender</Text>
//                         <SelectList
//                           setSelected={handleChange("gender")}
//                           placeholder="Select Gender"
//                           defaultOption={{ key: values?.gender || "", value: values?.gender || "" }}
//                           data={[
//                             { key: 'male', value: 'male' },
//                             { key: 'female', value: 'female' },
//                             { key: 'Prefer not to respond', value: 'Prefer not to respond' },
//                           ]}
//                           boxStyles={[styles.input,styles.GenderStlye]}
//                           save="value"
//                         />
//                       </View>

//                     </View>
//                   </View>
//                 </View>
//                 {/* Button Section   */}
//                 <View >
//                   <TouchableOpacity onPress={handleSubmit} style={styles.button}>
//                     <Text style={{fontWeight:'500', fontSize: 16, color: 'white' }}>
//                       {/* Update Profile */}
//                       Save
//                     </Text>
//                   </TouchableOpacity>
//                 </View></>
//             )}
//           </Formik>
//         </View>
//       </ScrollView>
//       <RBSheet
//         ref={refRBSheet}
//         closeOnDragDown={true}
//         closeOnPressMask={true}
//         closeOnPressBack={true}
//         dragFromTopOnly={true}
//         height={150}
//         animationType='fade'
//         customStyles={{

//           wrapper: {
//             backgroundColor: "rgba(0, 0, 0, 0.3)"
//           },
//           container: {
//             backfaceVisibility: "visible",
//             borderTopLeftRadius: 40,
//             borderTopRightRadius: 40,
//           },
//           draggableIcon: {
//             backgroundColor: "#000"
//           }
//         }}
//       // onClose={toggle}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>

//             <Text style={styles.chooseFrom}>Choose from</Text>
//             <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//               <TouchableOpacity onPress={handleGallerySelect} style={{ right: 30, justifyContent: 'center', alignItems: 'center' }}>
//                 <Image source={require('../../assets/icons/gallary.png')} style={{ width: 35, height: 35 }} />
//                 <Text style={styles.optionButtonText}>Photos</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleCameraSelect} style={{ left: 30, justifyContent: 'center', alignItems: 'center' }}>
//                 <Image source={require('../../assets/icons/camera.png')} style={{ width: 30, height: 35 }} />
//                 <Text style={styles.optionButtonText}>Camera</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </RBSheet>
//     </SafeLayout>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     minHeight: 740,
//     width: ('100%'),
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     backgroundColor:colors.Tailwhite,
//   },
//   topSpace: {
//     marginTop: 10,
//   },
//   separator: {
//     width: '100%',
//   },
//   header: {
//     paddingVertical: 20
//   },
//   content_area: {
//     flexDirection: "column",
//     gap: 12
//   },
//   ProfileImg:{
//     marginVertical:30,
//   },
//   input_icon: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//     backgroundColor: 'white', borderRadius: 12, elevation: 5, paddingTop: 5, 
//     paddingLeft: 8,
//     width:('90%'),
//   },
//   input_field: {
//     width: ("88%"),
//     paddingVertical:15,
//   },
//   input_label: {
//     fontSize: 12,
//     color: "#757679",
//   },
//   chooseFrom: {
//     fontSize: 18,
//     textAlign: 'center',
//     fontWeight: '600',
//     marginBottom: 25,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 29,
//     padding: 20,
//     fontSize: 16,
//     fontWeight: '400',
//     width: '80%',
//     height: ("30%"),
//     alignItems: 'center',
//   },
//   uploadIcon: {
//     position: 'absolute',
//     bottom: 12,
//     right: 15,
//     zIndex: 1,
//   },
//   circularBorder: {
//     position: 'relative',
//     borderWidth: 1,
//     borderColor: '#FFF',
//     alignSelf: "center",
//     borderRadius: 100,
//     overflow: 'visible',
//     width: 120,
//     height: 120,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 15,
//   },
//   optionButtonText: {
//     fontSize: 16,
//     fontWeight: '400',
//     paddingVertical: 10,

//   },
//   profileImage: {
//     width: '88%',
//     height: '88%',
//     borderRadius: 60,
//   },
//   input: {
//     width: ('90%'),
//     position: "relative",
//     height: 60,
//     borderRadius: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   button: {
//     backgroundColor: colors.DarkGreen,
//     width: ('88%'),
//     marginVertical: 15,
//     paddingVertical: 18,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 12,
//     elevation:5,
//   },
//   GenderStlye:{
//     borderColor:'#FFFFFF',
//     elevation:5,
//     backgroundColor:'#FFFFFF',
//   }
// });



// const SelectPhoneCode = ({ countryCode, phoneNumber, setPhoneNumber }) => {
//   return (
//     <PhoneInput
//       defaultValue={phoneNumber}
//       defaultCode={countryCode ? countryCode : "AE"}
//       containerStyle={{
//         position: "relative",
//         height: 60,
//         borderColor: colors.grayLight,
//         borderBottomWidth: 1,
//         marginTop: 10,
//         paddingHorizontal: 15,
//         borderRadius: 12,
//         elevation:5,
//         width: "100%",
//         color: "#757679",
//       }}

//       textContainerStyle={{
//         paddingVertical: 0,
//         backgroundColor: 'transparent',
//       }}
//       onChangeFormattedText={(text) => {
//         setPhoneNumber("phone", text);
//       }}


//       countryPickerProps={{
//         marginTop: 250,
//       }}
//     />
//   )
// }

// export default EditProfile;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EditProfile = () => {
  return (
    <View>
      <Text>EditProfile</Text>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({})