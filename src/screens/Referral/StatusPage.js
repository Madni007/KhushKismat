import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../../utils/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AppHeader from '../../components/AppHeader';
import ReferralInfo from './ReferralInfo';
const StatusPage = ({navigation}) => {
    const totalSteps = 35;
    const stepsPerRow = 7;
    const [activeStep, setActiveStep] = useState(1);
  
    const renderSteps = () => {
      const rows = [];
      for (let i = 0; i < totalSteps; i += stepsPerRow) {
        const row = [];
        for (let j = i + 1; j <= Math.min(i + stepsPerRow, totalSteps); j++) {
          row.push(
            <TouchableOpacity
              key={j}
              style={[
                styles.step,
                { backgroundColor: getStepColor(j), borderColor: getBorderColor(j) },
              ]}
              onPress={() => handleStepPress(j)}
              activeOpacity={0.8}>
              <Text style={{ color: getStepTextColor(j) }}>{j}</Text>
            </TouchableOpacity>
          );
        }
        rows.push(
          <View key={i} style={styles.row}>
            {row}
          </View>
        );
      }
      return rows;
    };
  
    const handleStepPress = (step) => {
      setActiveStep(step);
    };
  
    const getStepColor = (step) => {
      if (step === activeStep) return colors.DarkGreen; // Active Step
      else if (step < activeStep) return colors.red; // Past Step
      else return colors.grayLight; // Upcoming Step
    };
  
    const getStepTextColor = (step) => {
      return step === activeStep ? colors.white : colors.black;
    };
  
    const getBorderColor = (step) => {
      return step === activeStep ? colors.red : colors.primary;
    };
  
  return (
    <SafeAreaView style={{backgroundColor:colors.my_bg,flex:1}}>
     <AppHeader title={'Status'} bellIcon={false}/>
      <View style={{ marginHorizontal: 25,marginVertical:5, borderRadius: 20, backgroundColor: 'white', elevation: 5 }}>
        <View style={styles.container}>
          {renderSteps()}
          <Button title="Next" onPress={() => setActiveStep((prevStep) => Math.min(prevStep + 1, totalSteps))} style={styles.nextButton} />
        </View>
      </View>
    <ScrollView>
      <View>
       <ReferralInfo />
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default StatusPage

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      step: {
        width: 30,
        height: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderWidth: 0.5,
      },
      nextButton: {
        backgroundColor: colors.DarkGreen,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
      },
     
})