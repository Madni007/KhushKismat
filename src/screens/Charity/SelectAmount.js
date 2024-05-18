import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, TextInput, Pressable, View, Modal, FlatList,TouchableOpacity,Animated } from 'react-native';
import { colors } from '../../utils/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SelectAmount = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('giveOnce');
  const [selectedCurrency, setSelectedCurrency] = useState('PKR');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleTextInputChange = (text) => {
    setInputValue(text);
  };

  const handleCurrencySelect = (currencyCode) => {
    setSelectedCurrency(currencyCode);
    setShowOptions(false);
  };

  const renderCurrencyOption = ({ item }) => (
    <Pressable
      style={styles.currencyOption}
      onPress={() => handleCurrencySelect(item.code)}
    >
      <Text style={styles.radioLabel}>{item.code} . {item.name}</Text>
    </Pressable>
  );

  const renderButtonsInRows = () => {
    const buttonArrayKey = selectedOption === 'giveOnce' ? selectedCurrency : `${selectedCurrency}_M`;
    const buttonArray = buttonArrays[buttonArrayKey] || [];

    return (
      <View style={styles.buttonContainer}>
        {buttonArray.map((buttonLabel, index) => (
          <Pressable
            key={index}
            style={styles.button}
            onPress={() => handleButtonClicked(buttonLabel)}
          >
            <Text style={styles.buttonText}>{selectedCurrencySign} {formatButtonLabel(buttonLabel)}</Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const handleButtonClicked = (buttonLabel) => {
    setInputValue(buttonLabel.toString());
  };

  const formatButtonLabel = (label) => {
    if (label >= 1000) {
      const formattedAmount = (label / 1000).toFixed(0);
      return `${formattedAmount}k`;
    }
    return label.toString();
  };

  const renderErrorMessage = () => {
    if (parseFloat(inputValue) < 1) {
      return (
        <Text style={styles.errorMessage}>
          The amount must be at least 1.00 {selectedCurrencySign}
        </Text>
      );
    }
    return null;
  };

  const currencyOptions = [
    { sign: '$', code: 'USD', name: 'US Dollar' },
    { sign: 'AED', code: 'AED', name: 'United Arab Emirates Dirham' },
    { sign: 'Rs', code: 'PKR', name: 'Pakistani Rupee' },
    { sign: '₹', code: 'INR', name: 'Indian Rupee' },
  ];

  const buttonArrays = {
    PKR: [4000, 15000, 30000, 50000, 100000, 200000],
    PKR_M: [2500, 5500, 10500, 15000, 25000, 500000],
    INR: [1200, 5000, 11000, 25000, 50000, 100000],
    INR_M: [800, 1500, 3000, 5000, 10000, 50000],
    AED: [52, 180, 390, 659, 1320, 2640],
    AED_M: [40, 150, 310, 550, 1200, 2200],
    USD: [15, 55, 110, 185, 360, 720],
    USD_M: [10, 40, 150, 270, 400 ,550],
  };

  const selectedCurrencySign = currencyOptions.find((currency) => currency.code === selectedCurrency)?.sign || '';
  const isButtonDisabled = inputValue.trim() === '';


const RadioButton = ({ selected, onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
      <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
        {selected && <View style={styles.radioButtonInner} />}
      </View>
      <Text style={styles.radioButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};


  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Pressable
          style={[styles.togglebtn, selectedOption === 'giveOnce' ? styles.selected : null]}
          onPress={() => handleOptionSelect('giveOnce')}
        >
          <Text style={[styles.toggleText, selectedOption === 'giveOnce' ? styles.selectedText : null]}>
            Give Once
          </Text>
        </Pressable>
        <Pressable
          style={[styles.togglebtn, selectedOption === 'monthly' ? styles.selected : null]}
          onPress={() => handleOptionSelect('monthly')}
        >
          <View style={styles.AlignItem}>
            <Icon name={'heart'} size={18} color={'red'} style={{padding:6}} />
            <Text style={[styles.toggleText, selectedOption === 'monthly' ? styles.selectedText : null]}>
              Monthly
            </Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.CashField}>
            <View style={styles.AlignItem}>
          <Text style={[styles.radioLabel,{padding:10}]}>{selectedCurrencySign}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={inputValue}
            onChangeText={handleTextInputChange}
            />
            </View>
          <Pressable  style={[styles.AlignItem,{padding:10}]}  onPress={() => setShowOptions(true)}>
            <Text style={styles.radioLabel}>{selectedCurrency}</Text>
            <Icon name={'down'} size={15} color={colors.black} style={{padding:4}} />
          </Pressable>
        </View>
        {renderErrorMessage()}
      </View>
      {renderButtonsInRows()}
      <View style={styles.container3}>
      <RadioButton
          selected={selectedOption2 === 'hideName'}
          onPress={() => setSelectedOption2('hideName')}
          text="Hide the name of donor"
        />
      <RadioButton
        selected={selectedOption2 === 'dedicate'}
        onPress={() => setSelectedOption2('dedicate')}
        text="Dedicate this charity"
      />
       {selectedOption2 === 'dedicate' && (
        <>
        <View style={styles.container4}>
          <View style={styles.inputContainer4}>
          <Text
          style={[
            styles.placeholder,
            inputFocused && styles.placeholderFocused
          ]}
        >
          Donor name
        </Text>
        <TextInput
          style={[
            styles.input1,
            inputFocused && { borderColor: '#4CAF50' }
          ]}
          placeholder=""
          placeholderTextColor={styles.bottomText}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
          </View>
          <View style={{paddingTop:5,width:wp('87%'),alignSelf:'center'}}>
        <Text style={{color:colors.primary,fontSize:12,fontWeight:'400',textAlign:'justify',}}>After Complete this Charity you will see the option to write a Personalized massage and share your dedication </Text>
          </View>
        </View>
        </>
      )}
    </View>
    <View>
    <Pressable
        style={[styles.button3, isButtonDisabled && styles.buttonDisabled3]}
        disabled={isButtonDisabled}
        onPress={() => console.log('Button Pressed')}
      >
        <View style={styles.AlignItem}>
        <Icon1 name={'hand-holding-heart'} size={20} color={colors.white} style={{marginLeft:-25,marginRight:40}} />
        <Text style={styles.buttonText3}>Donate For Hajj / Umrah</Text>
        </View>
      </Pressable>
    </View>


      <Modal
        visible={showOptions}
        transparent={true}
        onRequestClose={() => setShowOptions(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={currencyOptions}
            renderItem={renderCurrencyOption}
            keyExtractor={(item) => item.code}
            contentContainerStyle={styles.currencyContainer}
          />
        </View>
      </Modal>
    </View>
  );
};
export default SelectAmount;

const styles = StyleSheet.create({
    container: {
         flex:1,
        backgroundColor: colors.white,
        marginVertical: 10,
        padding: 20,
        elevation:6,
    },
    inputContainer: {
        width: wp('90%'),
        marginVertical: 15,
    },
    CashField:{
        flexDirection:'row',alignItems:'center',
        justifyContent:'space-between',
       backgroundColor:colors.white,
       borderColor: 'lightgray',
       borderWidth: 1,
       borderRadius:12,
       elevation:1,
       padding:3
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: 'black',
        fontWeight: '500',
    },
    input: {
        height: 40,
        width: wp('45%'),
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center',
        justifyContent: 'center',
        width: wp('90%'),
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 85,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'lightgray',
        marginBottom: 10,
        marginRight: 10,
    },
    buttonText: {
        color: 'gray',
    },
    buttonText1: {
        color: colors.white,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        width: wp('100%'),
    },
    bottomText: {
        fontSize: 16,
        color: 'black',
        fontWeight: '600',
    },
    bottomButton: {
        backgroundColor: colors.DarkGreen,
        paddingVertical: 15,
        paddingHorizontal: 70,
        borderRadius: 25,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioOuterCircle: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    radioInnerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#888',
    },
    radioLabel: {
        fontSize: 14,
        color: colors.black,
        fontWeight: '400',
        fontFamily: 'LatoRegular',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('90%'),
        height: 45,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    togglebtn: {
        borderRadius: 14,
        width: wp('45%'),
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selected: {
        backgroundColor: colors.LightGreen,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    selectedText: {
        color: colors.black,
        fontFamily: 'LatoRegular',
        fontWeight: '700',
    },
    AlignItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    AlignJustify:{
        flexDirection: 'row',
        alignItems: 'center',
       justifyContent:'space-between',
    },
    modalContainer: {
        flex: 1,
        paddingTop:hp('30%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    currencyContainer:{
        backgroundColor: colors.white,
        borderRadius:15,
    },
    currencyOption: {
        paddingVertical: 15,
        borderRadius:15,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
      },
      errorMessage:{
        color:'red',
        fontSize:12, fontWeight:'300',paddingTop:5,
      },
      //radio btn 
      container3: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 20,
      },
      radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical:5,
      },
      radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.DarkGreen,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      radioButtonSelected: {
        backgroundColor: colors.LightGreen,
      },
      radioButtonInner: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: colors.MediumGreen,
      },
      radioButtonText: {
        fontSize: 13,
        fontWeight:'400',
        color:colors.text_gray,
        fontFamily:'LatoRegular',
      },
      container4: {
        padding: 20,
      },
      inputContainer4: {
        position: 'relative',
      },
      placeholder: {
        position: 'absolute',
        left: 10,
        top: 10,
        fontSize: 14,
        color: colors.text_gray,
        fontWeight:'400',
      },
      placeholderFocused: {
        fontSize: 10,
        color: '#4CAF50',
        top: 2,
        left:0,
      },
      input1: {
        height: 40,
        borderColor:colors.text_gray,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        alignSelf:'center',
        width:wp('80%'),
        paddingHorizontal:10,
      },
      button3: {
        marginTop: 20,
        padding: 10,
        backgroundColor:colors.DarkGreen,
        borderRadius: 12,
        alignItems: 'center',
      },
      buttonDisabled3: {
        backgroundColor: colors.MediumGreen,
      },
      buttonText3: {
        color: '#FFF',
        fontSize: 16,
      },
});
