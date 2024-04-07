import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  View,
  Modal,Image,
} from 'react-native';
import RBSheet from "@nonam4/react-native-bottom-sheet";
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors } from '../../utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const Charity = ({navigation}) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const [add, setAdd] = useState(false)
  const toggle = () => setAdd(!add)

  const [inputValue, setInputValue] = useState('');
  const [giftCardValue, setGiftCardValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [message, setMessage] = useState('');
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(true);
  const sheetRef = useRef(null);
  const openBottomSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };
  const onPressNotifications=()=>{
    navigation.navigate('Notification')
  };
  const onPageChange = (position) => {
    setCurrentPosition(position);
  };

  const handleTextAreaChange = (text) => {
    setTextAreaValue(text);
    setIsDoneButtonDisabled(text.length === 0);
  };

  const handleButtonClicked = (buttonLabel) => {
    setInputValue(buttonLabel);
    setGiftCardValue(buttonLabel);
    setErrorMessage('');
  };

  const handleTextInputChange = (text) => {
    setInputValue(text);
    setGiftCardValue(text);
    setErrorMessage('');
    setTextAreaValue(text);
    setIsDoneButtonDisabled(text.length === 0);
  };

  const handleDoneButtonPress = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };

  const isNextButtonDisabled = !inputValue || parseFloat(inputValue) < 1 || parseFloat(inputValue) > 1000;
  const nextButtonColor = isNextButtonDisabled ? colors.LightGreen : colors.DarkGreen;

  const buttons = ['300', '500', '1000'];
  const translateY = useRef(new Animated.Value(300)).current;


  const data = [
    'Valid for 90 days from the date of issuance.',
    'The giftee must log in to their Justlife account to access the credit.',
    'The gift card cannot be extended, exchanged, or refunded.',
  ];
   
  const renderErrorMessage = () => {
    if (parseFloat(inputValue) < 1) {
      return (
        <Text style={{ fontSize: 12.5, marginTop: 10, color: 'red' }}>
          The amount must be between AED 1.00 and AED 1000
        </Text>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:colors.Tailwhite,height : hp('100%'), width :wp('100%'), }}>
             <LinearGradient
        colors={['#40916c','#40916c', '#00BA63']}  >
        <View style={{
                marginVertical: 20,
                marginHorizontal: 25, flexDirection: "row", justifyContent: "center", alignItems: 'center'
            }}>
              <Text style={{fontSize:20,fontWeight:'800',color:colors.Tailwhite}}>Charity & Donation</Text>
          </View>
            <View style={{display:'flex',alignItems:'flex-end',right:20,top:-40,height:2}}>
                      <TouchableOpacity onPress={onPressNotifications}>
                        <Icon name={'bell'} size={20} style={styles.icon} />
                        <View style={styles.redDot}></View>
                        </TouchableOpacity>
            </View>
            </LinearGradient>
      
      <View style={styles.giftContainer}>
        <Text style={styles.heading}>Charity/Donation Card</Text>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>The perfect gift card for your loved one!</Text>
          <Text style={styles.cardSubtitle}>Treat them to their favorite home service!</Text>
          <TouchableWithoutFeedback onPress={() => refRBSheet1.current.open()}>
            <Text style={styles.touchableText}>See Details</Text>
          </TouchableWithoutFeedback>
          {/* seeDetails sheet  */}
          <RBSheet
                ref={refRBSheet1}
                closeOnDragDown={true}
                closeOnPressMask={true}
                closeOnPressBack={true}
                dragFromTopOnly={true}
                height={650}
                animationType='fade'
                customStyles={{

                    wrapper: {
                        backgroundColor: "rgba(0, 0, 0, 0.3)"
                    },
                    container: {
                        backfaceVisibility:"visible",
                        borderTopLeftRadius:40,
                        borderTopRightRadius:40,
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
                onClose={toggle}
            >           
                <View style={styles.modalContent}>
                  <View style={styles.headStyle}>
                 <Text style={styles.modalText}>Charity Terms/Information</Text>
                  </View>
                {data.map((item, index) => (
                  <View style={styles.listItemContainer} key={index}>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.listItem}>{item}</Text>
                </View>
                  ))}
                  </View>
            </RBSheet>
        </View>
      </View>

      <ScrollView style={{ flex: 1,width:wp('100%') }}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Gift Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={inputValue}
            onChangeText={handleTextInputChange}
          />
          {renderErrorMessage()}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.buttonContainer}>
          {buttons.map((buttonLabel, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => handleButtonClicked(buttonLabel)}
            >
              <Text style={styles.buttonText1}>Rs {buttonLabel}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {giftCardValue && (
          <View style={styles.giftCard}>
            <Text style={styles.giftCardTitle}>Gift Card</Text>
            <Text style={styles.giftCardAmount}>
              Rs. <Text style={styles.giftCardValue}>{giftCardValue}</Text>
            </Text>
          </View>
        )}

        <View style={styles.messageContainer}>
          <Text style={styles.messageLabel}>Your Message (Optional)</Text>
          <TouchableOpacity  onPress={() => refRBSheet2.current.open()}>
            <Text style={styles.addButton}>Add</Text>
          </TouchableOpacity>
        </View>
 
        {/* Bottom Sheet */}
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
                        backfaceVisibility:"visible",
                        borderTopRightRadius:40,
                        borderTopLeftRadius:40,
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
                // onClose={toggle}
            >
                <View style={styles.bottomSheetContainer}>
    <View style={styles.headingStyle}>
    <Text style={styles.bottomSheetHeading}>Your Message (Optional)</Text>
    </View>
    <TextInput
      style={styles.textArea}
      multiline
      placeholder="Type your message here (150 words limit)"
      onChangeText={handleTextAreaChange}
      maxLength={150}
    />
    <TouchableOpacity
      style={[styles.doneButton, { backgroundColor: isDoneButtonDisabled ? '#7c7bb3' : '#2d2b70' }]}
      onPress={handleDoneButtonPress}
      disabled={isDoneButtonDisabled}
    >
      <Text style={styles.buttonText2}>Done</Text>
    </TouchableOpacity>
  </View>
 </RBSheet>
  


      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>Rs. {inputValue || '0.00'}</Text>
        
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: nextButtonColor }]}
          onPress={() => {
            navigation.navigate('Payments', { amount: inputValue });
          }}
          disabled={isNextButtonDisabled}
          >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginVertical:40,marginTop:100}}></View>
          </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  giftContainer: {
    backgroundColor: '#091426',
    flexDirection: 'column',
    height: 230,
    padding: 15,
    width:wp('100%'),
  },
  heading: {
    fontSize: 28, 
    marginTop: 20,
    padding: 2,
    color: 'white',
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1,
    margin: 4,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingLeft: 22,
    paddingTop: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginBottom: -35,
    width:wp('90%'),
  },
  cardTitle: {
    fontSize: 16,
    width: 220,
    color: 'black',
    marginBottom: 10,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 15,
    width: 220,
    color: 'black',
    marginBottom: 10,
    fontWeight: '300',
  },
  touchableText: {
    fontSize: 14,
    fontWeight:'500',
    color:colors.DarkGreen,
    // color: '#03c6fc',
    marginBottom: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    flex:1,
    backgroundColor: 'white',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headStyle:{

    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  modalText: {
    fontSize: 18,
    paddingBottom: 15,
    fontWeight: '800',
    color: 'black',
  },
 
  listItem: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '400',
    color:'black',
  },
  inputContainer: {
    flexDirection: 'column',
    padding: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20,
    color: 'black',
    fontWeight: '500',
  },
  input: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 20,
  },
  buttonText1: {
    color: 'gray',
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
    elevation:5,
  },
  giftCardTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
  },
  giftCardAmount: {
    color: 'black',
    fontWeight: '500',
    fontSize: 12,
  },
  giftCardValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContainer: {
    backgroundColor: colors.grayLight,
    margin: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    elevation:5,
  },
  messageLabel: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
  },
  addButton: {
    // color: '#03c6fc',
    color:colors.DarkGreen,
    fontWeight: '500',
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
  headingStyle:{
    borderBottomColor:'lightgray',
    borderBottomWidth:1,
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
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
  },
  bottomText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    marginBottom: 10,
  },
  bottomButton: {
    backgroundColor:colors.DarkGreen,
    marginTop: 20,
    padding: 15,
    borderRadius: 25,
    paddingHorizontal: 70,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headingText: {
    fontWeight: '500',
    fontSize: 16,
    color: "#000"
},
listItemContainer: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  padding:2,
  marginVertical: 5,
},
dot: {
  fontSize: 20,
  marginRight: 5,
  color: 'black',
  marginBottom:8,
  marginRight:5, 
},
icon: {
  marginLeft: 15,
  height: 20,
  width: 20,
  tintColor: colors.white
},
redDot: {
  position: 'absolute',
  top: 3,
  right: 0,
  backgroundColor: 'red',
  height: 8,
  width: 8,
  borderRadius: 5,
},
});

export default Charity;
