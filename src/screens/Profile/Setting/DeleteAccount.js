import { SafeAreaView, ScrollView,TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors } from '../../../utils/Colors';


const DeleteAccount = () => {

    const data = [
        'Your account is deleted permanently, You can\'t reactivate it, recover any data or regain access. You\'ll need to set up a new account if you want to use Urbanglo again.',
        'When you submit a request to delete your account, we\'ll verify your identity for security purpose before accepting the request.',
        'Once your request is processed, your personal information will be deleted except for certain information that we\'re legally required to retain .In case of any unresolved complaints or quries, please send an e-mail to wecare@urbanglo.com.',
      ];
   const handleNextPress=()=>{};
  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.Tailwhite,height : hp('100%'),
    width :wp('100%'),}}>
      <ScrollView>
        <View style={{width:wp('100%')}}>
        <View style={{padding:20}}>
      <Text style={{fontSize:24,color:'black',fontWeight:'500'}}>Delete Account</Text>
        </View>
        <View style={{padding:20}}>
            <Text style={{fontSize:15, color:'black'}}>Hi  <Text style={{fontSize:15.5,fontWeight:'500', color:'black'}}>Rehman</Text></Text>
           <Text style={{fontSize:14,marginTop:10,color:'black'}}>We'd hate to see you go! But if uou've made up your mind, here're a few things to note.</Text>
           <Text style={{fontSize:16,fontWeight:'600',marginTop:20,color:'black'}}>Once you request deletion of your account</Text>
        </View>
        
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.bullet}>{'\u2022'}</Text>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
       </View>
       <View style={{padding:20}}>
        <Text style={{fontSize:16,color:'black',padding:5,marginTop:10,fontWeight:'600'}}>Post account deletion</Text>
        <Text style={{fontSize:16,color:'black',padding:5,marginTop:10,marginBottom:10}}>After 30 days of Your account deletion request, your account and all your information will be parmanently deleted. If you log in within a 30 days period, your account deletion request will be canceled.</Text>
       </View>
       </View>
       </ScrollView>
       <View style={{padding:20,borderTopColor:'lightgray',borderTopWidth:0.5}}>
       <TouchableOpacity
      style={styles.doneButton}
      onPress={handleNextPress}
    >
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
       </View>
    </SafeAreaView>
  )
}

export default DeleteAccount

const styles = StyleSheet.create({
    container: {
        padding: 16,
      },
      listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
      },
      bullet: {
        fontSize: 20,
        marginRight: 8,
        color: 'black', 
      },
      itemText: {
        flex: 1,
        fontSize: 16,
        color: 'black',
      },
      doneButton: {
        backgroundColor:colors.DarkGreen,
        padding: 12,
        borderRadius: 20,
        alignItems: 'center',
        width:wp('88%'),

      },
      buttonText:{
        color:'white',
        fontWeight:'500',
      }
});