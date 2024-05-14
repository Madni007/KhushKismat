
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { colors } from '../../utils/Colors';
import { Svg, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { setleftDrawerOpen } from '../../redux/slices/commonSlice';
import { useDispatch } from 'react-redux';

const Header = ({onPressSearch,onPressNotifications }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  return (
    <LinearGradient
      colors={['#40916c','#40916c', '#00BA63']}
      style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => dispatch(setleftDrawerOpen(true))}>
        <Image
          source={{uri:'https://res.cloudinary.com/dju1zayox/image/upload/v1711735649/samples/people/smiling-man.jpg'}}
          style={styles.circleImage}
        />
        <View style={{ position: 'absolute', left: 22, top: 22, backgroundColor: colors.dark, padding: 2, borderRadius: 50 }}>
          <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M4 5H20V8H4V5Z" fill="#fff" fill-opacity="0.6" />
            <Path d="M4 10H20V13H4V10Z" fill="#fff" fill-opacity="0.6" />
            <Path d="M4 15H20V18H4V15Z" fill="#fff" fill-opacity="0.6" />
          </Svg>

        </View>
          </TouchableOpacity>
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.headerText}>Nabi Pura</Text>
      </View>
      <View style={styles.rightContainer}>

        <TouchableOpacity onPress={onPressSearch}>
        <Svg width="18" height="18" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M15.7 14.3L11.5 10.1C11.3 9.9 11 9.8 10.7 9.8C11.5 8.8 12 7.4 12 6C12 2.7 9.3 0 6 0C2.7 0 0 2.7 0 6C0 9.3 2.7 12 6 12C7.4 12 8.8 11.5 9.8 10.6C9.8 10.9 9.8 11.2 10.1 11.4L14.3 15.6C14.5 15.8 14.8 15.9 15 15.9C15.2 15.9 15.5 15.8 15.7 15.6C16.1 15.3 16.1 14.7 15.7 14.3ZM6 10.5C3.5 10.5 1.5 8.5 1.5 6C1.5 3.5 3.5 1.5 6 1.5C8.5 1.5 10.5 3.5 10.5 6C10.5 8.5 8.5 10.5 6 10.5Z" fill="#fff" fill-opacity="0.6"/>
</Svg>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressNotifications}>
        <Icon1 name={'notifications'} size={20} color={colors.white} style={styles.icon} />
        <View style={styles.redDot}><Text style={styles.DotText}>142</Text></View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: Platform.OS === 'ios' ? 20 : 18, 
    paddingBottom: 10,
    borderBottomWidth: 1, 
    borderBottomColor:colors.MediumGreen,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  circleImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 15,
    height: 20,
    width: 20,
    tintColor: colors.white
  },
  redDot: {
    position: 'absolute',
    top: -5,
    right:-7,
    backgroundColor: 'red',
    paddingVertical:0.4, paddingHorizontal:0.8,
    borderRadius: 5,
    justifyContent:'center',alignItems:'center'
  },
  DotText:{fontSize:9,color:colors.white,fontWeight:'400'}
});

export default Header;
