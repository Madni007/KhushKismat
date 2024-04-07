import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { colors } from '../../utils/Colors';

const labels = [
  "Step_1",
  "Step_2",
  "Step_3",
  "Step_4",
  "Step_5"
];
const customStyles = {
  stepIndicatorSize: 20,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
}

const internetTexts = [
  `
  The Internet is a global network of billions of computers and other electronic devices. 
  With the Internet, it's possible to access almost any information, communicate with anyone else in the world.
  `,
  `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet diam vel lacus feugiat fringilla. Quisque id ante eget felis tristique fermentum. Donec mattis, lacus nec efficitur sodales, purus est sagittis lacus, eu facilisis neque nulla id metus. 
  `,
  `
  Sed eget viverra ligula, nec pharetra justo. In id metus lorem. Duis vitae aliquet enim. Aenean eu massa ut mi placerat ultricies. Pellentesque vel tellus nec orci ultrices pellentesque nec a dolor. Mauris gravida leo eget odio scelerisque, in tempor sem euismod. 
  `,
  `
  Nulla commodo vehicula turpis, vitae tincidunt nulla dapibus nec. Pellentesque tincidunt commodo enim vitae tempus. In hac habitasse platea dictumst. Phasellus eu nisi fringilla, efficitur magna nec. 
  `,
  `
  Vivamus bibendum et nulla vel varius. Nam at tellus id velit accumsan pharetra. Duis ultrices, eros eu commodo aliquet, velit ipsum iaculis nulla, vitae consectetur nulla nunc in est. Nam suscipit mauris in mi rhoncus, nec vestibulum nunc tempus. 
  `
];

class VerticalStepper extends Component {
  constructor() {
    super();
    this.state = {
      currentPosition: 0
    };
  }

  nextStep = () => {
    this.setState(prevState => ({
      currentPosition: Math.min(prevState.currentPosition + 1, labels.length - 1)
    }));
  };

  prevStep = () => {
    this.setState(prevState => ({
      currentPosition: Math.max(prevState.currentPosition - 1, 0)
    }));
  };

  renderStepIndicator = (position, stepStatus) => {
    return (
      <View style={styles.stepContainer}>
        <View style={styles.circle}></View>
        <Text style={styles.label}>{labels[position]}</Text>
      </View>
    );
  };

  render() {
    const currentText = internetTexts[this.state.currentPosition];

    return (
      <View style={{flexDirection:'column'}}>

      <View style={{  flexDirection: 'row' }}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={this.state.currentPosition}
          labels={labels}
          direction="vertical"
          renderStepIndicator={this.renderStepIndicator}
          style={{width:100}}
        />
        <ScrollView
          style={{ flex: 1 }}
          onScroll={(event) => {
            const { y } = event.nativeEvent.contentOffset;
            const currentPosition = Math.round(y / 400); 
            this.setState({ currentPosition });
          }}
          scrollEventThrottle={16} 
        >
          <View style={{ paddingHorizontal: 2, paddingVertical: 20,width:'100%' }}>
            <Text style={{fontSize:15,fontWeight:'600',color:'black'}}>
              {`Information for Step ${this.state.currentPosition + 1}`}
            </Text>
            <Text>{currentText}</Text>
          </View>
        </ScrollView>
      </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.prevStep} style={styles.button}>
            <Text style={styles.buttonText}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.nextStep} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, 
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    top:3,
  },
  label: {
    fontSize: 16, 
    fontWeight: 'bold', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor:colors.DarkGreen,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default VerticalStepper;
