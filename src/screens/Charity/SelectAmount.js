import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    View,
    ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../utils/Colors';

const SelectAmount = () => {
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const isNextButtonDisabled = !inputValue || parseFloat(inputValue) < 1 || parseFloat(inputValue) > 9000000000;
    const nextButtonColor = isNextButtonDisabled ? colors.LightGreen : colors.DarkGreen;

    const buttons = ['4000', '15000', '30000', '50000', '100000', '200000'];

    const handleButtonClicked = (buttonLabel) => {
        setInputValue(buttonLabel);
        setErrorMessage('');
    };

    const handleTextInputChange = (text) => {
        setInputValue(text);
        setErrorMessage('');
    };

    const renderButtonsInRows = () => {
        const buttonsPerRow = 2;

        return (
            <View style={styles.buttonContainer}>
                {buttons.map((buttonLabel, index) => (
                    <Pressable
                        key={index}
                        style={styles.button}
                        onPress={() => handleButtonClicked(buttonLabel)}
                    >
                        <Text style={styles.buttonText}>Rs {formatButtonLabel(buttonLabel)}</Text>
                    </Pressable>
                ))}
            </View>
        );
    };
    const renderErrorMessage = () => {
        if (parseFloat(inputValue) < 1) {
            return (
                <Text style={{ fontSize: 12.5, marginTop: 10, color: 'red' }}>
                    The amount must be bigger than 1.00
                </Text>
            );
        }
        return null;
    };
    const formatButtonLabel = (label) => {
        const amount = parseInt(label);
        if (amount >= 1000 && amount % 1000 === 0) {
            const formattedAmount = (amount / 1000).toFixed(0);
            return `${formattedAmount}k`;
        } else {
            return label;
        }
    };
    const handleOptionSelect =()=>{};

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Select Charity Amount</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Amount"
                    keyboardType="numeric"
                    value={inputValue}
                    onChangeText={handleTextInputChange}
                />
                {renderErrorMessage()}
            </View>
            {renderButtonsInRows()}

            <Pressable style={styles.radioButton} onPress={handleOptionSelect}>
            <View style={[styles.radioOuterCircle, selectedOption && styles.radioSelected]}>
                {selectedOption && <View style={styles.radioInnerCircle} />}
            </View>
            <Text style={styles.radioLabel}>There is text</Text>
           </Pressable>
            <View style={styles.bottomRow}>
                <Pressable
                    style={[styles.bottomButton, { backgroundColor: nextButtonColor }]}
                    onPress={() => {
                    }}
                    disabled={isNextButtonDisabled}
                >
                    <Text style={styles.buttonText1}>Donate Now</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default SelectAmount;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
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
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: wp('85%'),
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'lightgray',
        marginBottom: 10,
        marginRight: 10,
    },
    buttonText: {
        color: 'gray',
    },
    buttonText1:{
        color:colors.white,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        width:wp('100%'),
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
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#888',
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
    radioSelected: {
        borderColor: 'blue',
    },
    radioLabel: {
        fontSize: 16,
        color: '#333',
    },
});
