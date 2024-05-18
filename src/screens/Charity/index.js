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
import AppHeader1 from '../../components/AppHeader1';
import SelectAmount from './SelectAmount';
import Icon from 'react-native-vector-icons/MaterialIcons'
import HeadSection from './HeadSection';
import TestimonialSection from './TestimonialSection';

const Charity = ({ navigation }) => {


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.my_bg, height: hp('100%'), width: wp('100%'), }}>
      <AppHeader1 title={'Charity for Hajj & Umrah'} />
      <ScrollView showsVerticalScrollIndicator={false}>

     <HeadSection />
      <SelectAmount />
      <TestimonialSection />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({})

export default Charity;
