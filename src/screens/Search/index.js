import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../utils/Colors';
import { Svg, Path } from 'react-native-svg';

const trendingItems = [
  { id: 1, title: 'Trending Item 1' },
  { id: 2, title: 'Trending Item 2' },
  { id: 3, title: 'Trending Item 3' },
  // Add more items as needed
];

const Search = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* <Icon name="arrow-back" size={30} color="black" /> */}
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M7 12L15 4L17.2 6.1L11.3 12L17.2 17.9L15 20L7 12Z" fill="#1C2E45" fill-opacity="0.6"/>
</Svg>

      </TouchableOpacity>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 26, fontWeight: '500', color: colors.black }}>Search</Text>
      </View>
      {/* Search Input */}
      <View style={{ width: wp('90'), display: 'flex' }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tap to search"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />

        {searchText.length > 0 && (
          <TouchableOpacity style={{ position: 'absolute', zIndex: 1, right: 3, top: 20 }} onPress={() => setSearchText('')}>
            <Icon name="close" size={25} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {/* Top Features */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Top Features</Text>
        <View style={styles.ContainerFeature}>
          <View style={styles.featureContainer}>
            {/* <Image source={icons.game} style={styles.featureIcon} /> */}
            <Text>Feat 1</Text>
          </View>
          <View style={styles.featureContainer}>
            {/* <Image source={icons.game} style={styles.featureIcon} /> */}
            <Text>Feat 2</Text>
          </View>
          <View style={styles.featureContainer}>
            {/* <Image source={icons.game} style={styles.featureIcon} /> */}
            <Text>Feat 3</Text>
          </View>
        </View>
        {/* Add more features as needed */}
      </View>

      {/* Trending */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Trending</Text>

        {trendingItems.map((item) => (
          <View style={{ borderBottomWidth: 1.5, borderBottomColor: 'lightgray', paddingBottom: 10 }}>
            <TouchableOpacity key={item.id} style={styles.trendingContainer}>
              <Text style={{ fontSize: 13, color: colors.black, fontWeight: '500' }}>{item.title}</Text>
              <Svg width="11" height="12" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M10.2 8L2.2 16L0 13.9L5.9 8L0 2.1L2.2 0L10.2 8Z" fill="#209950" fill-opacity="0.6" />
              </Svg>

            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
  sectionContainer: {
    marginTop: 20
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ContainerFeature: {
    flexDirection: 'row',
  },
  featureContainer: {
    flexDirection: 'column',
    padding: 10,
    margin: 10,
    backgroundColor: colors.white,
    height: hp('10%'),
    width: wp('20%'),
    borderRadius: 12,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  featureIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain', // or 'cover' based on your preference
  },
  trendingContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  trendingIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain', // or 'cover' based on your preference
  },
});

export default Search;
