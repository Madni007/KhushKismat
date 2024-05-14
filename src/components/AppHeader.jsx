import {
    View,
    Text,
    Pressable,StyleSheet
} from 'react-native';
import React from 'react';
import { colors } from '../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { RFPercentage } from "react-native-responsive-fontsize";

import { useNavigation } from '@react-navigation/core';
import { setleftDrawerOpen } from '../redux/slices/commonSlice';
import { useDispatch } from 'react-redux';
const AppHeader = ({ title, bellIcon = true, backArrow = true }) => {

    const navigation = useNavigation()
    const handlePress = () => {
        navigation.navigate('Notification')
    };
    // const dispatch = useDispatch()

    return (
        <View style={{ backgroundColor: colors.my_bg, }}>
            <View style={{
                marginVertical: 20,
                marginHorizontal: 25, flexDirection: "row", justifyContent: "space-between", alignItems: 'center'
            }}>
                { backArrow &&
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon style={{ alignSelf: "center", marginTop: 7 }} color={colors.text_gray} size={25} name="arrow-back" />
                </Pressable>}
                {/* <Pressable onPress={() => dispatch(setleftDrawerOpen(true))}>
                    <View>
                        <Icon name="menu" size={26} color={colors.lightprimary} />
                    </View>
                </Pressable> */}
                <View style={{}}>
                    <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.8), fontWeight: "700", color: "#000" }}>
                        {title}
                    </Text>
                </View>
                <View>
                    {bellIcon &&
                        <Pressable onPress={handlePress}>
                                <Icon1 name={'notifications'} size={22} color={colors.black} />
                                   <View style={styles.redDot}><Text style={styles.DotText}>142</Text></View>
                        </Pressable>}
                </View>
            </View>
        </View>
    );
};
export default AppHeader;

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