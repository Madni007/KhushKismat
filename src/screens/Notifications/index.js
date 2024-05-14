import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../../utils/Colors';
import { useNavigation } from '@react-navigation/core';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../components/AppHeader';
const Notifications = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: colors.my_bg, flex: 1 }}>
      <AppHeader title={'Notifications'} bellIcon={false}/>
      <View style={{ marginLeft: 20, marginTop: 20, flexDirection: 'row', justifyContent: 'flex-start', gap: 20 }}>
        <View style={styles.notificationH}><Text>All</Text></View>
        <View style={styles.notificationH}><Text>Hajj</Text></View>
        <View style={styles.notificationH}><Text>Umrah</Text></View>
      </View>
      <ScrollView style={{ padding: 20 }}>
        <View><Text style={{ color: colors.DarkGreen, fontSize: 14, fontWeight: '600' }}>Today 08-March-2025</Text></View>

        <View>
          <Text>The Image container visible here and link to go on YouTube AnyOne click Notifications or WinnerList then YouTube Opens,,,,,,,,,,, This container is like blog</Text>
          <Text>08:30 AM</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Read More</Text>
          <View style={{ borderRadius: 30, paddingHorizontal: 10, backgroundColor: colors.DarkGreen }}><Text style={{ fontWeight: '500', color: colors.Tailwhite, fontSize: 12 }}>New</Text></View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationH: {
    width: wp('20%'),
    padding: 3,
    borderRadius: 25,
    paddingHorizontal: 10,
    borderColor: 'lightgray',
    borderWidth: 1.5,
    alignItems: 'center',
  }
});
