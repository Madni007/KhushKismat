import { StyleSheet, Text,SafeAreaView, ScrollView,View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/Colors'

const ThirdRoute = () => {
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:colors.my_bg}}>
  <ScrollView>

  <View >
    <Text>Jello G</Text>
  </View>
  </ScrollView>
  </SafeAreaView> 
  )
}

export default ThirdRoute

const styles = StyleSheet.create({})