import React,{useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback, Image, Pressable,Share } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Clipboard from '@react-native-clipboard/clipboard';
import { colors } from '../../utils/Colors';
import AppHeader1 from '../../components/AppHeader1';
import Icon from 'react-native-vector-icons/AntDesign';

const Referral = ({navigation}) => {
  const inviteLink = 'http://youtuble.com/'; 
  const referralCode= 'E8DJ47MDR';
  const [copied, setCopied] = useState(false);
  const [copycode, setCopycode] = useState(false);

  const handleStatusPress = () => {
    navigation.navigate('StatusPage');
  };
  const handleCopy = () => {
    Clipboard.setString(inviteLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const handleCopyCode = () => {
    Clipboard.setString(referralCode);
    setCopycode(true);
    setTimeout(() => {
      setCopycode(false);
    }, 2000);
  };
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join using my referral code ${referralCode} through my invite link ${inviteLink}`
      });
    } catch (error) {
      console.error('Sharing failed:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader1 title={'Referral'} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Invite a friend and Family</Text>
          <Text style={styles.description}>Invite 20 people and receive a free Umrah voucher. Then, invite 30 more people to reach a total of 50 invites and get a free Hajj voucher. You can claim your free voucher once you reach 20 or 50 invites.</Text>
          <TouchableWithoutFeedback onPress={handleStatusPress}>
            <View style={styles.statusButton}>
              <Text style={styles.statusButtonText}>More Information</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://res.cloudinary.com/dju1zayox/image/upload/v1715205374/Khush_kismat/Referral_Images/kkRefferal1_wz0iwf.png' }}
            resizeMode='cover'
            style={styles.image}
          />
        </View>
        <View style={styles.inviteContainer}>
          <Text style={styles.smallText}>Your Referral Code </Text>
          <Pressable style={styles.inviteLinkContainer} onPress={handleCopyCode}>
            <Text style={styles.inviteLinkText}>{referralCode}</Text>
            <Pressable onPress={handleCopyCode}>
            {copycode ? (
              <Icon name={"checkcircle"} size={20} color={colors.primary} />
            ) : (
              <Text style={styles.copyText}>Copy</Text>
            )}            
            </Pressable>
          </Pressable>
        </View>
        <View style={styles.inviteContainer}>
          <Text style={styles.smallText}>Your invite Link</Text>
          <Pressable style={styles.inviteLinkContainer} onPress={handleCopy}>
            <Text style={styles.inviteLinkText}>{inviteLink}</Text>
            <Pressable onPress={handleCopy}>
            {copied ? (
              <Icon name={"checkcircle"} size={20} color={colors.primary} />
            ) : (
              <Text style={styles.copyText}>Copy</Text>
            )}            
            </Pressable>
          </Pressable>
          <Text style={styles.smallText}>Share Your referral link with friends and family And get the chance of getting free voucher for Hajj and Umrah</Text>
        </View>
          <Pressable style={styles.inviteButton} onPress={handleShare}>
            <Text style={styles.inviteButtonText}>Invite Friend & Family</Text>
          </Pressable>
          <View style={styles.container2}>
      <Text style={styles.listItem}>Important Information:</Text>
      <Text style={styles.listItem}>1 ) List of Information</Text>
      <Text style={styles.listItem}>2 ) List of Information2</Text>
      <Text style={styles.listItem}>3 ) List of Information3</Text>
</View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.my_bg,
  },
  scrollContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: colors.Tailwhite,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 20,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.black,
    marginBottom: 10,
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.text_gray,
    fontFamily:'LatoRegular',
  },
  statusButton: {
    backgroundColor: colors.DarkGreen,
    borderRadius: 12,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignSelf: 'flex-end',
    marginTop:10,
  },
  statusButtonText: {
    fontSize: 11,
    color:colors.white,
    fontFamily:'LatoRegular',
    fontWeight:'600',
  },
  imageContainer: {
    height: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.LightGreen,
    marginBottom: 20,
  },
  image: {
    height: 200,
    width: 250,
    borderRadius: 20,
  },
  inviteContainer: {
    marginBottom: 5,
  },
  inviteLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.7,
    borderColor: 'lightgray',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inviteLinkText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    width: wp('65%'),
  },
  copyText: {
    fontSize: 14,
    color: colors.primary,
  },
  smallText: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 10,
  },
  inviteButton: {
    width: wp('85%'),
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  inviteButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.white,
  },
  container2: {
    paddingTop: 10,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 10,
    color:colors.text_gray,
    fontWeight:'400',
  },
});

export default Referral;
