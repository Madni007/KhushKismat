import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../components/AppHeader';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const RowData=[
  {iconName:'adjust',title:'About Mecca', discription:'All The Information About Mecca is here'},
  {iconName:'advertisements',title:'FAQ', discription:'Frequently asked questions'},
  {iconName:'alert-octagon',title:'Contact us', discription:'Contact Information About Mecca'},
  {iconName:'alpha-e-circle',title:'Privacy Policy', discription:'Privacy Policy'},
  {iconName:'alpha-m-box',title:'Tutorials', discription:'Check Video for Help'},
  {iconName:'bookmark-plus',title:'Term & Conditions', discription:'Term & Conditions'},
  
];


const RenderRow = ({rowData}) => {
  if (!rowData || !Array.isArray(rowData)) {
    return null;
  }
  const navigation = useNavigation();

  const navigateToPage = (title) => {
    switch (title) {
      case 'About Mecca':
        navigation.navigate('About');
        break;
      case 'Contact us':
        navigation.navigate('ContactUs');
        break;
      case 'FAQ':
        navigation.navigate('FAQ');
        break;
      case 'Privacy Policy':
        navigation.navigate('PrivicyPolicy');
        break;
      case 'Tutorials':
        navigation.navigate('Tutorials');
        break;
      case 'Term & Conditions':
        navigation.navigate('TermCondition');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.row}>
     {rowData.map((item, index) => (
        <TouchableOpacity
          style={styles.containerItem}
          key={index}
          onPress={() => navigateToPage(item.title)}> 
          <Icons name={[item.iconName]} size={28} style={styles.image} />
          <Text style={styles.containerText}>{item.title}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
            <Text style={styles.discriptionText}>{item.discription}</Text> 
            <Svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M7.4248 16.5999L12.8581 11.1666C13.4998 10.5249 13.4998 9.4749 12.8581 8.83324L7.4248 3.3999"
                    stroke="#757679"
                    strokeWidth="1.5" 
                    strokeMiterlimit="10" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
            </Svg>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Help = () => {
  return (
    <View style={styles.container}>
      <AppHeader title={'Help'} bellIcon={false} />
      <View style={styles.svgContainer}>
        <Svg width={wp('100%')} height={hp('20%')} viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M0 20H100V0L50 20H0Z" fill="#34d3eb" />
        </Svg>
        <Text style={styles.svgText}>How can we Help?</Text>
      </View>
      <View style={{padding:10}}>
      <RenderRow rowData={RowData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.my_bg,
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:100,
  },
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  containerItem: {
    width: '48%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    marginVertical:10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 40,
    marginBottom: 10,
  },
  containerText: {
    fontSize:14,
    fontWeight:'400',
    color:colors.black,
  },
  discriptionText:{
    fontSize:11,
    fontWeight:'400',
    color:colors.MediumGreen,
    width:wp('30%'),
  }
});

export default Help;
