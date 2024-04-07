import { SafeAreaView, ScrollView, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../utils/Colors'
import { Svg,Path } from 'react-native-svg'
import { RFPercentage } from 'react-native-responsive-fontsize'

const TermCondition = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.Tailwhite}}>
<View style={{
                marginVertical: 20,
                marginRight: 15,marginLeft:10, flexDirection: "row", alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                   
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M7 12L15 4L17.2 6.1L11.3 12L17.2 17.9L15 20L7 12Z" fill="#000" fill-opacity="0.6" />
            </Svg>
                </TouchableOpacity>
                <View style={{width:'90%' ,alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
                <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.8), fontWeight: "700", color:colors.DarkGreen ,textAlign:'center'}}>
                    MeccaDrawer
                </Text>
                 <Text style={styles.term}>Term And Condition</Text>
                 <Text style={styles.service}>Mecca Services</Text>
                </View>
            </View>
    
    <ScrollView>
        <View style={styles.TermV}>
          <Text style={styles.TermT}><Text style={styles.TermH}>Acceptance of Terms:  </Text>Users agree to abide by the terms and conditions upon accessing or using the app.</Text>
        </View>
        <View style={styles.TermV}>
          <Text style={styles.TermT}><Text style={styles.TermH}>Service Description:  </Text>Provides an overview of the services offered by the app, including lucky draws for Hajj and Umrah, vehicle purchases on installments, and participation in various contests.</Text>
        </View>
        <View style={styles.TermV}>
          <Text style={styles.TermT}><Text style={styles.TermH}>User Eligibility:  </Text>Specifies the eligibility criteria for users, such as age restrictions or geographic limitations.</Text>
        </View>
        <View style={styles.TermV}>
          <Text style={styles.TermT}><Text style={styles.TermH}>Registration and Accounts: </Text>Details the process of creating accounts, user responsibilities for account security, and consequences of unauthorized account usage.</Text>
        </View>
        <View style={styles.TermV}>
          <Text style={styles.TermT}><Text style={styles.TermH}>Payments and Installments: </Text>Clarifies the payment process for purchasing vehicles on installments, including any applicable fees or penalties.</Text>
        </View>
        <View style={styles.TermV}>
          <Text style={styles.TermT}><Text style={styles.TermH}>Lucky Draws and Contests: </Text>Outlines the rules and conditions for participating in lucky draws and contests, including eligibility, selection criteria, and prize distribution.</Text>
        </View>
        <View style={styles.TermV}>
          <Text style={styles.TermT}><Text style={styles.TermH}>Intellectual Property: </Text> States ownership rights of app content and prohibits unauthorized use or reproduction.</Text>
        </View>
        <View style={styles.TermV}>
          <Text style={styles.TermT}><Text style={styles.TermH}>Limitation of Liability:  </Text>Disclaims the app's liability for any damages arising from the use of services or reliance on information provided.</Text>
        </View>
        <View style={styles.TermV}>
          <Text style={styles.TermT}><Text style={styles.TermH}>Termination: </Text>Specifies circumstances under which the app may terminate user accounts or access to services.</Text>
        </View>
        <View style={{margin:20}}>
          <Text> Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi  text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi Loream text Aher sdaiu asidu adsoidu adsi dsao dsadoisdaoi  ysdf   sdadios didsa  sodas  dosd dsaod dddosdo  doasd disood  doasa ddopaspasidi fioierer ire reer iojzlkjfoeirjfkfkgjdfoidiufafuyrlkxjnfds  iui fuo ioifuoiufi uf sus o s   s iosososoifiofiiof   siosois io s   iisios ios   iosiosi </Text>
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default TermCondition

const styles = StyleSheet.create({
  term:{
    fontSize:22,fontWeight:'500',color:colors.MediumGreen,
  },
  service:{
    fontSize:14,fontWeight:'500',color:colors.black,
  },
  TermV:{
    margin: 5,
    marginHorizontal: 20,
  },
  TermH:{
    color: colors.black,
    fontSize: 14,
    fontWeight: '600',
  },
  TermT:{
    color: colors.black,
    fontSize: 12,
    fontWeight: '400',
  },
})