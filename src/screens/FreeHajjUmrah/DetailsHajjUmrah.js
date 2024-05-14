import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/Colors'
import AppHeader from '../../components/AppHeader'

const DetailsHajjUmrah = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.my_bg}}>
    <AppHeader title={'Free Hajj / Umrah'} bellIcon={false} />
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:20,fontWeight:'500'}}>Details of the Hajj & Umrah for Free Coming Soon</Text>
      <Text style={{fontSize:13,fontWeight:'500'}}>Multiply Winners of Hajj and Umrah Depends on how Charity is collected</Text>
    </View>
    </SafeAreaView>
  )
}

export default DetailsHajjUmrah

const styles = StyleSheet.create({})