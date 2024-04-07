import {
    View,
    Text,
    Pressable,
} from 'react-native';
import React from 'react';
import { colors } from '../utils/Colors';
import { Path, Svg, Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';

import { RFPercentage } from "react-native-responsive-fontsize";

import { useNavigation } from '@react-navigation/core';
import { setleftDrawerOpen } from '../redux/slices/commonSlice';
import { useDispatch } from 'react-redux';
const AppHeader = ({ title, bellIcon = true, backArrow = true }) => {

    const navigation = useNavigation()
    const handlePress = () => {
        navigation.navigate('Notification')
    };
    const dispatch = useDispatch()

    return (
        <View style={{ backgroundColor: colors.my_bg, }}>
            <View style={{
                marginVertical: 20,
                marginHorizontal: 25, flexDirection: "row", justifyContent: "space-between", alignItems: 'center'
            }}>
                {/* { backArrow &&
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons style={{ alignSelf: "center", marginTop: 7 }} color={colors.text_gray} size={25} name="arrow-back" />
                </Pressable>} */}
                <Pressable onPress={() => dispatch(setleftDrawerOpen(true))}>
                    <View>
                        <Icon name="menu" size={26} color={colors.lightprimary} />
                    </View>
                </Pressable>
                <View style={{}}>
                    <Text style={{ fontFamily: "LatoRegular", fontSize: RFPercentage(2.8), fontWeight: "700", color: "#000" }}>
                        {title}
                    </Text>
                </View>
                <View>
                    {bellIcon &&
                        <Pressable onPress={handlePress}>
                            <Svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M11.9997 5V6.00474M9.00879 19.9034C10.9965 20.1269 13.0029 20.1269 14.9906 19.9034C14.9765 20.0967 14.9462 20.2887 14.8998 20.4772L14.8179 20.8106C14.5611 21.855 13.7452 22.6678 12.7036 22.917C12.2408 23.0277 11.7586 23.0277 11.2958 22.917C10.2542 22.6678 9.43832 21.855 9.18151 20.8106L9.09954 20.4772C9.05319 20.2887 9.02286 20.0967 9.00879 19.9034Z" stroke="#23408F" stroke-width="1.5" stroke-linecap="round" />
                                <Path d="M10.1584 6.3025C8.15001 6.95352 6.58212 8.58701 6.0278 10.6329L5.4375 12.8115L4.9702 14.9278C4.82626 15.5796 4.63043 16.2501 4.52719 16.9096C4.50929 17.024 4.5 17.1412 4.5 17.2607C4.5 18.3269 5.24755 19.2456 6.28759 19.4574L6.65518 19.5323C10.1825 20.2509 13.8175 20.2509 17.3448 19.5323L17.7124 19.4574C18.7525 19.2456 19.5 18.3269 19.5 17.2606C19.5 17.1412 19.4907 17.024 19.4728 16.9096C19.3696 16.2501 19.1737 15.5796 19.0298 14.9278L18.5625 12.8115L17.9793 10.5886C17.45 8.57111 15.9398 6.96017 13.9671 6.30865C12.7349 5.90172 11.3927 5.90238 10.1584 6.3025Z" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                                <Circle cx="19" cy="3" r="3" fill="#DD3333" />
                            </Svg>
                        </Pressable>}
                </View>
            </View>
        </View>
    );
};
export default AppHeader;
