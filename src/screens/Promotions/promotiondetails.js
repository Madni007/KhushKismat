import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { useSelector } from 'react-redux';
import { colors } from '../../utils/Colors';

const PromotionDetails = () => {
  const { imageURI, title, description } = useSelector((state) => state.promotion);

  return (
    <SafeAreaView>
      <AppHeader title={'Package Details'} />
      <ScrollView>
        <View style={styles.container}>
          <Image source={{uri:imageURI}} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PromotionDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200, // Adjust height as needed
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:colors.black,
  },
  description: {
    fontSize: 16,
    color:colors.black,
  },
});
