import { StyleSheet, Text, TouchableOpacity,View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Check from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors } from '../../../utils/Colors';

const Language = () => {
 const handlePress=()=>{
    // 
 }

  return ( 
    <SafeAreaView style={styles.container}>
    <View
    style={{
      display: 'flex',
      flexDirection: 'column',
      paddingHorizontal: 20,
      marigTop: 20,
      paddingBottom: 20,
    }}>
    <View style={{
      paddingTop: Platform.OS === "ios" ? 5 : 20,
    }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: "#000" }}>Select Your Language</Text>
   </View>
   <View style={{width:wp('90%')}}>
        <View style={{marginTop:20,padding:10,borderRadius:12,backgroundColor:colors.white,elevation:5}}>
   <TouchableOpacity onPress={handlePress}>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={styles.tab_icon}>
                  <Text style={{ fontSize: 15, color: colors.gray, fontWeight: "300" }}>
                    English
                  </Text>
                </View>
                <Check name={'check'} size={24}/>
              </View>
        </TouchableOpacity>
    </View>
    
   <View style={{marginTop:20,padding:10,borderRadius:12,backgroundColor:colors.white,elevation:5}}>
   <TouchableOpacity onPress={handlePress}>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={styles.tab_icon}>
                  <Text style={{ fontSize: 15, color: colors.gray, fontWeight: "300" }}>
                    Arabic
                  </Text>
                </View>
                {/* <Check name={'check'} size={24}/> */}
              </View>
        </TouchableOpacity>
    </View>
    </View>
  </View>
</SafeAreaView>
  )
}

export default Language;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F8F8F9',
        height : hp('100%'),
        width :wp('100%'),
      },
})