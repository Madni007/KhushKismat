import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../utils/Colors';

const TransactionHistory = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Transaction History</Text>
      </View>
      <View style={styles.downloadSection}>
        <View style={styles.svgContainer}>
          <Svg width={wp('10%')} height={hp('5%')} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M0 100H100V0L50 100H0Z" fill="#34d3eb" />
          </Svg>
          <Text style={styles.downloadText}>Download e-statement</Text>
        </View>
      </View>
      <ScrollView>
      <View style={styles.transactionContainer}>
        <Text style={styles.dateText}>March 10, 2024</Text>
        <View style={styles.transactionRow}>
          {/* <Image source={require('../../assets/icons/phone.png')} style={styles.image} /> */}
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionText}>Transaction Description</Text>
            <Text style={styles.transactionAmount}>Rs 888</Text>
          {/* <Image source={require('../../assets/icons/down.png')} style={styles.DownSvg} /> */}
          </View>
        <Text style={styles.timeText}>10:30 AM</Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  downloadSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  svgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadText: {
    fontSize: 16,
    marginLeft: 10,
  },
  transactionContainer: {
    padding: 20,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:colors.Tailwhite,
  },
  image: {
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  DownSvg: {
    width: 15,
    height: 14,
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 10,
    flexDirection:'row',
    height:hp('10%'),
    alignItems:'center',
    justifyContent:'space-between',
  bottom:20,
  },
  transactionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'right',
    flexDirection:'row-reverse',
  },
});

export default TransactionHistory;
