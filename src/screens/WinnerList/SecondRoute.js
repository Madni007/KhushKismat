import { StyleSheet, SafeAreaView,ScrollView, View } from 'react-native'
import React from 'react'
import WinCardItem from './WinCardItem';
import { colors } from '../../utils/Colors'

const WinnerData=[
    {id:1,title:'Hajj Pakage Winner',name:'Hassan Hamid',imageUri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711735656/samples/imagecon-group.jpg'},
    {id:2,title:'Umrah Pakage Winner',name:'Rizwan Ali',imageUri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711735656/samples/imagecon-group.jpg'},
    {id:3,title:'Umrah Pakage Winner',name:'Muhammad Ahmad',imageUri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711735656/samples/imagecon-group.jpg'},
    {id:4,title:'Hajj Pakage Winner',name:'Abrar Hamid',imageUri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711735656/samples/imagecon-group.jpg'},
    {id:5,title:'Hajj Pakage Winner',name:'Madni Bhai',imageUri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711735671/samples/smile.jpg'},
    {id:6,title:'Umrah Pakage Winner',name:'Hannan Hamid',imageUri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711735649/samples/people/smiling-man.jpg'},
    {id:7,title:'Hajj Pakage Winner',name:'Hassian Ali',imageUri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711735647/samples/people/kitchen-bar.jpg'},
];

const SecondRoute = () => {
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:colors.my_bg}}>
  <ScrollView>

  <View>
  <WinCardItem WinnerData={WinnerData} />
  </View>
  </ScrollView>
  </SafeAreaView>
  )
}

export default SecondRoute

const styles = StyleSheet.create({})