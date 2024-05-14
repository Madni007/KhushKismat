import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/Colors'

const ReferralInfo = () => {
  return (
    <View style={styles.container2}>
      <Text style={styles.listItem}>Important Information:</Text>
      <Text style={styles.listItem}>1 ) List of Information</Text>
      <Text style={styles.listItem}>2 ) List of Information1</Text>
      <Text style={styles.listItem}>3 ) Another piece of information...</Text>
      <Text style={styles.listItem}>4 ) Another piece of information...</Text>
      <Text style={styles.listItem}>5 ) Another piece of information...</Text>
      <Text style={styles.listItem}>6 ) Another piece of information...</Text>
      <Text style={styles.listItem}>7 ) Another piece of information...</Text>
      <Text style={styles.listItem}>8 ) Another piece of information...</Text>
      <Text style={styles.listItem}>9 ) Another piece of information...</Text>
    </View>
  )
}

export default ReferralInfo

const styles = StyleSheet.create({
    container2: {
        padding: 20,
      },
      listItem: {
        fontSize: 12,
        marginBottom: 10,
        color:colors.text_gray,
        fontWeight:'400',
      },
})