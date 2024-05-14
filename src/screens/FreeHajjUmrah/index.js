import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/Colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
const FreeHajjUmrah = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.my_bg}}>

    <Pressable onPress={()=>navigation.navigate('DetailsHajjUmrah')}>
    <View style={styles.container}>
      <Text style={styles.Free}>Free Voutures of Hajj &  Umrah</Text>
      <View style={{alignSelf:'center'}}>
        <Image source={{uri:'https://res.cloudinary.com/dju1zayox/image/upload/v1712451826/Khush_kismat/KabaImages/7267369_hsizb6.jpg'}}
        resizeMode='contain'
        style={{width:wp('85%'),height:200,borderRadius:10}} />
      </View>
    </View>
    </Pressable>
    </SafeAreaView>
  )
}

export default FreeHajjUmrah

const styles = StyleSheet.create({
    container:{
     margin:20, padding:20,backgroundColor:colors.white,
     borderRadius:20,
     elevation:3,
    },
    Free:{
        fontSize:14,fontWeight:'500',color:colors.black,
    }
})