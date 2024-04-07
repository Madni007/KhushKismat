import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/Colors'
import AppHeader from '../../components/AppHeader'

const PrivicyPolicy = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.Tailwhite }}>
      <AppHeader title={'Privacy Policy'} bellIcon={false} />
      <View style={{ marginVertical: 20, width: '100%' }}>
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: colors.MediumGreen }}>Privicy Policy</Text>
      </View>
      <ScrollView>
        <View style={styles.policyV}>
          <Text style={styles.policyT}><Text style={styles.policyH}>1 Introduction: </Text>This section outlines the purpose of the privacy policy and its applicability to users of the app.</Text>
        </View>
        <View style={styles.policyV}>
          <Text style={styles.policyT}><Text style={styles.policyH}>2 Introduction  Collection: </Text>Details the types of information collected from users, including personal and non-personal data.</Text>
        </View>
        <View style={styles.policyV}>
        <Text style={styles.policyT}><Text style={styles.policyH}>
          Use of Information: </Text>Describes how collected information is utilized, such as for providing services, improving user experience, and marketing purposes.</Text>
        </View>
        <View style={styles.policyV}>
        <Text style={styles.policyT}><Text style={styles.policyH}>
          Data Security: </Text>Explains measures taken to safeguard user data from unauthorized access, disclosure, or alteration.</Text>
        </View>
        <View style={styles.policyV}>
        <Text style={styles.policyT}><Text style={styles.policyH}>
          Third-Party Services: </Text>Clarifies the involvement of third-party services and their impact on user privacy.</Text>
        </View>
        <View style={styles.policyV}>
        <Text style={styles.policyT}><Text style={styles.policyH}>
          User Rights: </Text>Outlines the rights of users regarding their personal data, including access, rectification, and deletion.</Text>
        </View>
        <View style={styles.policyV}>
        <Text style={styles.policyT}><Text style={styles.policyH}>
          Policy Changes: </Text>States the procedure for updating the privacy policy and informing users about any revisions.</Text>
        </View>
        <View style={styles.policyV}>
        <Text style={styles.policyT}><Text style={styles.policyH}>
          Contact Information: </Text>Provides contact details for users to reach out with privacy-related concerns or inquiries.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default PrivicyPolicy

const styles = StyleSheet.create({
  policyV: {
    margin: 5,
    marginHorizontal: 20,
  },
  policyH: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '600',
  },
  policyT: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '400',
  },
})