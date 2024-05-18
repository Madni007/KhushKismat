import { StyleSheet, SafeAreaView, ScrollView, Pressable, Text, View } from 'react-native';
import React, { useState } from 'react';
import WinCardItem from './WinCardItem';
import { colors } from '../../utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const WinnerData = [
  { id: 1, title: 'Hajj Pakage Winner', name: 'Hassan Hamid', imageUri: 'https://res.cloudinary.com/dju1zayox/image/upload/v1711735656/samples/imagecon-group.jpg' },
  { id: 2, title: 'Umrah Pakage Winner', name: 'Rizwan Ali', imageUri: 'https://res.cloudinary.com/dju1zayox/image/upload/v1711735656/samples/imagecon-group.jpg' },
  { id: 3, title: 'Umrah Pakage Winner', name: 'Muhammad Ahmad', imageUri: 'https://res.cloudinary.com/dju1zayox/image/upload/v1711735656/samples/imagecon-group.jpg' },
  { id: 4, title: 'Hajj Pakage Winner', name: 'Abrar Hamid', imageUri: 'https://res.cloudinary.com/dju1zayox/image/upload/v1711735656/samples/imagecon-group.jpg' },
  { id: 5, title: 'Hajj Pakage Winner', name: 'Madni Bhai', imageUri: 'https://res.cloudinary.com/dju1zayox/image/upload/v1711735671/samples/smile.jpg' },
  { id: 6, title: 'Umrah Pakage Winner', name: 'Hannan Hamid', imageUri: 'https://res.cloudinary.com/dju1zayox/image/upload/v1711735649/samples/people/smiling-man.jpg' },
  { id: 7, title: 'Hajj Pakage Winner', name: 'Hassian Ali', imageUri: 'https://res.cloudinary.com/dju1zayox/image/upload/v1711735647/samples/people/kitchen-bar.jpg' },
];

const SecondRoute = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.my_bg }}>
      <ScrollView>
        <View style={styles.AllCard}>
          <Pressable onPress={toggleExpand} style={styles.AlignJustify2}>
            <Text style={styles.heading}> Winners of Fall 2024</Text>
            <Icon name={expanded ? 'chevron-up' : 'chevron-down'} color={colors.primary} size={20} style={{padding:5}} />
          </Pressable>
        </View>
        {expanded && (
          <View >
            <WinCardItem WinnerData={WinnerData} />
          </View>
        )}
       
      </ScrollView>
    </SafeAreaView>
  );
}

export default SecondRoute;

const styles = StyleSheet.create({
  AllCard:{
    backgroundColor:colors.white,
    width:wp('95%'),
    alignSelf:'center',
    height:50,
    paddingBottom:8,
    marginTop:15,
    marginBottom:5,
    elevation:3,
    borderRadius:8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AlignJustify2: {
    width:wp('90%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  heading:{
    fontSize:16,
    fontWeight:'600',
    fontFamily:'LatoRegular',
    color:colors.black,
  },
});
