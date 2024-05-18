import React, { useState, useRef } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import RBSheet from "@nonam4/react-native-bottom-sheet";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../utils/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons'

const HeadSection = () => {
    const refRBSheet1 = useRef();
    const [add, setAdd] = useState(false)
    const toggle = () => setAdd(!add)
    const [expanded, setExpanded] = useState({});

    const toggleExpand = (index) => {
        setExpanded((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const data = [
        { id: 1, qu: 'How is my donation used by KhushKismat ?', ans: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        ` },
        { id: 2, qu: 'How is my Charity secure ?', ans: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        ` },
        { id: 3, qu: 'How is my date used by KhushKismat ?', ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
        { id: 4, qu: 'Is this Charity tax deduction ?', ans:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
        { id: 5, qu: 'Can I Cancel my monthly Charity / donation ?', ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
        { id: 6, qu: 'When can i expext my recept?', ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },

    ];
    return (
        <View style={styles.containerSection}>
            <View style={styles.bigTextView}>
                <Text style={styles.bigText}>With your generosity, thousands can fulfill their dreams of performing Hajj and Umrah</Text>
            </View>
            <Pressable onPress={() => refRBSheet1.current.open()} style={[styles.AlignItem, styles.secureBtn]}>
                <Icon name={'security'} size={20} color={colors.primary} />
                <Text style={[styles.SecureText, { marginLeft: 10 }]}>Secure</Text>
            </Pressable>

            <RBSheet
                ref={refRBSheet1}
                closeOnDragDown={true}
                closeOnPressMask={true}
                closeOnPressBack={true}
                dragFromTopOnly={true}
                height={650}
                animationType='fade'
                customStyles={{

                    wrapper: {
                        backgroundColor: "rgba(0, 0, 0, 0.3)"
                    },
                    container: {
                        backfaceVisibility: "visible",
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
                onClose={toggle}
            >
                <View style={styles.modalContent}>
                    <View style={styles.headStyle}>
                        <Text style={styles.modalText}>Charity Information</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {data.map((item, index) => (
                        <View style={styles.listItemContainer} key={index}>
                            <View style={styles.listContainer}>
                            <View style={{ width: wp('70%') }}>
                                <Text style={styles.listItem}>{item.qu}</Text>
                            </View>
                            <Pressable style={styles.CircleToggle} onPress={() => toggleExpand(index)}>
                                <Icon
                                    name={expanded[index] ? "remove" : "add"}
                                    size={24}
                                    color={colors.white}
                                />
                            </Pressable>
                            </View>
                            <View style={{width:wp('85%'),marginLeft:5}}>
                                {expanded[index] && (
                                    <Text style={styles.answer}>{item.ans}</Text>
                                )}
                            </View>
                        </View>
                    ))}
                    </ScrollView>
                </View>
            </RBSheet>
        </View>
    )
}

export default HeadSection

const styles = StyleSheet.create({
    containerSection: {
        backgroundColor: colors.grad1,
        elevation: 6,
    },
    AlignItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secureBtn: {
        marginLeft: 15,
        marginBottom: 10,
        backgroundColor: colors.LightGreen,
        height: 40,
        width: 100,
        borderRadius: 10,
    },
    bigTextView: {
        margin: 20,
        width: wp('85%'),
    },
    bigText: {
        fontSize: 17,
        lineHeight: 23,
        fontWeight: '800',
        color: colors.white,
        fontFamily: 'latoRegular',
    },
    SecureText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.DarkGreen,
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
    },
    modalText: {
        fontSize: 18,
        paddingBottom: 15,
        fontWeight: '800',
        color: 'black',
    },
    listItemContainer: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    listContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginVertical: 5,
    },
    listItem: {
        fontSize: 14,
        marginVertical: 10,
        fontWeight: '400',
        color: colors.black,
    },
    CircleToggle: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: colors.grad2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    answer: {
        marginTop: 10,
        fontSize: 13,
        color: colors.text_gray,
        textAlign:'justify',
    },

})