import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign'

const WinCardItem = ({WinnerData }) => {
  const [expandedIndices, setExpandedIndices] = useState(new Array(WinnerData.length).fill(false));

  const toggleExpand = (index) => {
    setExpandedIndices((prevExpandedIndices) => {
      const newExpandedIndices = [...prevExpandedIndices];
      newExpandedIndices[index] = !prevExpandedIndices[index]; 
      return newExpandedIndices;
    });
  };

  return (
    <View style={{marginTop:10}}>
    {WinnerData.map((item,index)=>(
    <View style={styles.cardContainer} key={index}>
      <Pressable onPress={() => toggleExpand(index)}>
        <View style={styles.header}>
          <View style={styles.textContainer}>
            <Text style={styles.TitleText}>{item.title}</Text>
            <Text style={styles.NameText}>{item.name}</Text>
          </View>
          <View>
          <Icon name={expandedIndices[index] ? 'upcircle' : 'downcircle'} color={colors.primary} size={18} />
         </View>
        </View>
      </Pressable>

      {expandedIndices[index] && (
        <View style={styles.expandedContent}>
          <Image source={{ uri: item.imageUri }} style={styles.image} />
          <View style={styles.Playbtn}>
          <Icon name={'youtube'} color={colors.my_gray} size={32} />
          </View>
        </View>
      )}
    </View>
    ))}
    </View>
  );
};
export default WinCardItem;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginVertical:7,
    padding: 10,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: colors.white,
    width: wp('90%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  expandedContent: {
    flexDirection: 'column',
    marginTop: 10,
    width:'100%',
    height:'auto',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  image: {
    height: hp('20%'),
    width: wp('84%'),
    borderRadius: 10,
    resizeMode: 'cover',
  },
  TitleText:{
  fontFamily:'LatoRegular',
    color:colors.black,
    fontWeight: '400',
    fontSize: 14,
  },
  NameText:{
    color:colors.black,
    fontWeight: '400',
    fontSize: 11,
  },
  Playbtn:{
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
  },
});
