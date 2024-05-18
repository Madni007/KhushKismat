import React, { useState, useRef } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from "@nonam4/react-native-bottom-sheet";
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons'

const TestimonialSection = () => {
    const refRBSheet2 = useRef();
 
    const [textAreaValue, setTextAreaValue] = useState('');
    const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(true);
    const sheetRef = useRef(null);
    const openBottomSheet = () => {
      if (sheetRef.current) {
        sheetRef.current.open();
      }
    };
    const handleTextAreaChange = (text) => {
      setTextAreaValue(text);
      setIsDoneButtonDisabled(text.length === 0);
    };
    const handleDoneButtonPress = () => {
      if (sheetRef.current) {
        sheetRef.current.close();
      }
    };
    const messages = [
        "We deeply appreciate your generous support.",
        "Your charitable contributions make a significant difference in our community.",
        "Thank you for your compassion and commitment to helping others.",
        "We celebrate your dedication to making a positive impact through your generosity.",
        "Your kindness and generosity are truly inspiring.",
        "We are grateful for your support in making a difference."
      ];
   
  return (
    <View style={styles.Container}>
      <View>
      {messages.map((message, index) => (
        <View style={styles.messageView} key={index}>
            <Icon name={'heart'} size={16} color={'pink'}  style={{marginLeft:-15}}/>
        <Text style={[styles.smallText,{marginLeft:7}]}>
          {message}
        </Text>
        </View>
      ))}
      </View>
      <View style={styles.messageContainer}>
          <Text style={styles.messageLabel}>Your Questions</Text>
          <TouchableOpacity onPress={() => refRBSheet2.current.open()}>
            <Text style={styles.addButton}>Add</Text>
          </TouchableOpacity>
      </View>
      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        dragFromTopOnly={true}
        height={300}
        animationType='fade'
        customStyles={{

          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.3)"
          },
          container: {
            backfaceVisibility: "visible",
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={styles.headingStyle}>
            <Text style={styles.bottomSheetHeading}>Your Question Qurey</Text>
          </View>
          <TextInput
            style={styles.textArea}
            multiline
            placeholder="Type your message here (150 words limit)"
            onChangeText={handleTextAreaChange}
            maxLength={150}
          />
          <TouchableOpacity
            style={[styles.doneButton, { backgroundColor: isDoneButtonDisabled ? colors.MediumGreen : colors.DarkGreen }]}
            onPress={handleDoneButtonPress}
            disabled={isDoneButtonDisabled}
          >
            <Text style={styles.buttonText2}>Done</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  )
}

export default TestimonialSection

const styles = StyleSheet.create({
    Container:{
        padding:20,
        backgroundColor:colors.white,
        elevation:7,
        marginVertical:1,
    },
    heading: {
      fontSize: 28,
      marginTop: 20,
      padding: 2,
      color: 'white',
      fontWeight: 'bold',
    },
    cardTitle: {
      fontSize: 16,
      width: 220,
      color: 'black',
      marginBottom: 10,
      fontWeight: '600',
    },
    button: {
      padding: 10,
      marginHorizontal: 5,
      marginVertical: 4,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: 'lightgray',
      paddingHorizontal: 20,
    },
    giftCard: {
      backgroundColor: '#ccdce3',
      borderColor: 'lightgray',
      borderWidth: 0.5,
      margin: 15,
      padding: 15,
      height: 70,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 12,
      elevation: 5,
    },
    messageContainer: {
      backgroundColor: colors.DarkGreen,
      marginTop: 30,
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 12,
      elevation: 5,
    },
    messageLabel: {
      fontSize: 16,
      fontWeight: '600',
      color:colors.white,
    },
    addButton: {
        fontSize:15,
      color: colors.white,
      fontWeight: '700',
    },
    bottomSheetContainer: {
      padding: 16,
      height: 250,
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      paddingTop: 20,
    },
    bottomSheetHeading: {
      fontSize: 16,
      fontWeight: '600',
      color: 'black',
      marginBottom: 10,
    },
    headingStyle: {
      borderBottomColor: 'lightgray',
      borderBottomWidth: 1,
    },
    textArea: {
      height: 120,
      borderColor: 'lightgray',
      borderWidth: 0.5,
      marginBottom: 16,
      marginTop: 16,
      paddingLeft: 17,
      borderBottomLeftRadius: 6,
      borderTopLeftRadius: 6,
      borderBottomRightRadius: 6,
      borderTopRightRadius: 6,
      textAlignVertical: 'top',
    },
    doneButton: {
      backgroundColor: '#007BFF',
      padding: 12,
      borderRadius: 20,
      alignItems: 'center',
    },
    buttonText2: {
      color: 'white',
      fontWeight: '500',
    },
    
    icon: {
      marginLeft: 15,
      height: 20,
      width: 20,
      tintColor: colors.white
    },
    smallText:{
      fontFamily:'LatoRegular',
      fontSize:12,
      fontWeight:'400',
      color:colors.text_gray,
    },
    messageView:{
        flexDirection:'row',
        alignItems:'center',
        width:wp('85%'),
        alignSelf:'center',
        paddingVertical:5,
    },
  });