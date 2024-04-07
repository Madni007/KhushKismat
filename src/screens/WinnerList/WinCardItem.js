import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../utils/Colors';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WinCardItemCur = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={{ margin: 20, padding: 10, borderRadius: 12, elevation: 3,backgroundColor:colors.white,width:wp('90%') }}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Image source={require('../../assets/user.jpg')} style={{ height: 25, width: 25, borderRadius: 50 }} /> */}
          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <Text>Umrah Package Winner</Text>
            <Text>Name Of Winner</Text>
          </View>
          <View style={{ marginLeft: 'auto', paddingRight: 10 }}>
          <Text>{expanded ? '▲' : '▼'}</Text>
          </View>
        </View>
      </TouchableOpacity>
      
      {expanded && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          {/* <Image source={require('../../assets/user.jpg')} style={{ height: hp('20%'), width: wp('84%'), borderRadius: 10,resizeMode:'cover' }} /> */}
          <Text style={{ marginLeft: 10,position:'absolute',color:'white',fontWeight:'600',fontSize:14,bottom:34,backgroundColor:'black',padding:2,borderRadius:8,paddingHorizontal:6}}>Additional Content</Text>
          <Text style={styles.additionalContent}>Additional Content Here</Text>
        </View>
      )}
    </View>
  );
};
const WinCardItemPrev = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={{ margin: 20, padding: 10, borderRadius: 12, elevation: 3,backgroundColor:colors.white,width:wp('90%') }}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Image source={require('../../assets/user.jpg')} style={{ height: 25, width: 25, borderRadius: 50 }} /> */}
          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <Text>Umrah Package Winner</Text>
            <Text>Name Of Winner</Text>
          </View>
          <View style={{ marginLeft: 'auto', paddingRight: 10 }}>
          <Text>{expanded ? '▲' : '▼'}</Text>
          </View>
        </View>
      </TouchableOpacity>
      
      {expanded && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          {/* <Image source={require('../../assets/user.jpg')} style={{ height: hp('20%'), width: wp('84%'), borderRadius: 10,resizeMode:'cover' }} /> */}
          <Text style={{ marginLeft: 10,position:'absolute',color:'white',fontWeight:'600',fontSize:14,bottom:34,backgroundColor:'black',padding:2,borderRadius:8,paddingHorizontal:6}}>Additional Content</Text>
          <Text style={styles.additionalContent}>Additional Content Here</Text>
        </View>
      )}
    </View>
  );
};

export { WinCardItemCur, WinCardItemPrev };

const styles = StyleSheet.create({
  additionalContent: {
    marginLeft: 10,
    position: 'absolute',
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    backgroundColor: 'black',
    padding: 2,
    borderRadius: 8,
    paddingHorizontal: 6,
  },
});