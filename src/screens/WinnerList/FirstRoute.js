import { StyleSheet,SafeAreaView, ScrollView, View } from 'react-native'
import React from 'react'
import WinCardItem from './WinCardItem';
import { colors } from '../../utils/Colors'

const WinnerData=[
    {id:1,title:'Umrah Pakage Winner',name:'Ali Ahmad',imageUri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711735657/samples/cloudinary-group.jpg'},
    {id:2,title:'Umrah Pakage Winner',name:'Ahmad Raza',imageUri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711735657/samples/cloudinary-group.jpg'},
    {id:3,title:'Hajj Pakage Winner',name:'Muhammad Arslan',imageUri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711735671/samples/smile.jpg'},
    {id:4,title:'Umrah Pakage Winner',name:'Muhammad Hasnain',imageUri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711735647/samples/people/kitchen-bar.jpg'},
    {id:5,title:'Hajj Pakage Winner',name:'Abdul Rehman',imageUri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711735649/samples/people/smiling-man.jpg'},
];

const FirstRoute = () => {
  return (
    <SafeAreaView style={{flex: 1,backgroundColor:colors.my_bg}}>
    <ScrollView>
     <View >
    <WinCardItem WinnerData={WinnerData} />
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default FirstRoute

const styles = StyleSheet.create({})