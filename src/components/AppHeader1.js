import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { colors } from '../utils/Colors';
import { Path, Svg, Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/core';
import { RFPercentage } from "react-native-responsive-fontsize";

const AppHeader1 = ({ title, bellIcon = true, }) => {
 const navigation =useNavigation();
    const handlePress = () => {
        navigation.navigate('Notification')
    };

    return (
        <LinearGradient
        colors={['#40916c','#40916c', '#00BA63']} >
            <View style={{
                marginVertical: 18,
                marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: 'center'
            }}>
                <Pressable onPress={()=>navigation.goToBack()}>
                <View>
                  <Icon name={'chevron-back'} size={24} color={colors.white} />
                </View>
                </Pressable>
                <View style={{}}>
                    <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.8), fontWeight: "700", color: "#FFFFFF" }}>
                        {title}
                    </Text>
                </View>
                <View>
                    {bellIcon &&
                        <Pressable onPress={handlePress}>
                                   <Icon1 name={'notifications'} size={22} color={colors.white} />
                                   <View style={styles.redDot}><Text style={styles.DotText}>142</Text></View>

                        </Pressable>}
                </View>
            </View>
        </LinearGradient>
    )
}

export default AppHeader1

const styles = StyleSheet.create({
    redDot: {
        position: 'absolute',
        top: -5,
        right:-7,
        backgroundColor: 'red',
        paddingVertical:0.5, paddingHorizontal:2.1,
        borderRadius: 25,
        justifyContent:'center',alignItems:'center',
        borderWidth:1.2,borderColor:colors.white,
      },
      DotText:{fontSize:8,color:colors.white,fontWeight:'400',textAlign:'justify'}
})