import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import { colors } from '../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { setImageAndDetails  } from '../../redux/slices/promotionSlice';


const promotionsData = [
  { id: '1', title: 'Come to Toward Allah', description: `The pilgrim must make a sincere intention to perform Hajj for the sake of Allah. Ihram: Enter into the state of Ihram, which involves wearing two white, seamless cloths (for men) and modest clothing (for women), along with certain restrictions on behavior. Tawaf al-Qudum (Arrival Tawaf): Upon reaching the Kaaba in Mecca, perform Tawaf al-Qudum, which is the initial circumambulation of the Kaaba upon arrival.
  Sa'i: Perform Sa'i, which involves walking seven times between the hills of Safa and Marwa, commemorating Hagar's search for water for her son Ishmael. Tarwiyah Day: On the 8th of Dhul-Hijjah, leave for Mina and spend the night there'`,
   image: 'https://res.cloudinary.com/dju1zayox/image/upload/v1711761296/Khush_kismat/KabaImages/h1_txlmlt.jpg' },
  { id: '2', title: 'Pay on Installments', description: `On the 9th of Dhul-Hijjah, proceed to Arafah and spend the day there in prayer and supplication. Muzdalifah: After sunset on Arafah day, head to Muzdalifah and spend the night there. Ramy al-Jamarat (Stoning of the Pillars): On the 10th of Dhul-Hijjah, perform the symbolic stoning of the devil by throwing stones at three pillars in Mina. Animal Sacrifice (Qurbani): After the stoning, offer a sacrifice, usually a sheep or a goat, in commemoration of Prophet Ibrahim's willingness to sacrifice his son Ismael. Halq or Taqsir: Men then have their hair shaved or trimmed (Taqsir), while women trim a small lock of hair.`, image:'https://res.cloudinary.com/dju1zayox/image/upload/v1711761371/Khush_kismat/KabaImages/h2_yg53u5.jpg' },
  { id: '3', title: 'Quran dazi', description: `Perform Tawaf al-Ifadhah, the circumambulation around the Kaaba, followed by Sa'i if Hajj Tamattu'(combining Hajj and Umrah) is performed. Return to Mina: Return to Mina and spend the nights of the 11th, 12th, and 13th of Dhul-Hijjah there. Final Stoning: Perform the stoning of the pillars on the 11th, 12th, and 13th of Dhul-Hijjah. Farewell Tawaf (Tawaf al-Wida): Before leaving Mecca, perform Tawaf al-Wida, the Farewell Tawaf, around the Kaaba, if possible.`, image:'https://res.cloudinary.com/dju1zayox/image/upload/v1711761381/Khush_kismat/KabaImages/h6_wu8lqe.jpg' },
  // Add more promotions as needed
];
const MAX_LINES = 3;
const MAX_CHARS_PER_LINE = 120; // Adjust as needed

function truncateDescription(description) {
    const lines = description.split('\n');
    let truncatedDescription = '';

    for (let i = 0; i < Math.min(MAX_LINES, lines.length); i++) {
        if (truncatedDescription.length + lines[i].length <= MAX_CHARS_PER_LINE) {
            truncatedDescription += lines[i];
        } else {
            const remainingChars = MAX_CHARS_PER_LINE - truncatedDescription.length;
            truncatedDescription += lines[i].substring(0, remainingChars) + '...';
            break; // Break if exceeded max characters
        }

        if (i !== Math.min(MAX_LINES, lines.length) - 1 && lines[i + 1]) {
            truncatedDescription += '\n';
        }
    }
    return truncatedDescription;
}

const Promotions = ({ navigation }) => {
  const dispatch = useDispatch();

  const handlePress = (item) => {
    const { image, title, description } = item;
    dispatch(setImageAndDetails({ imageURI: image, title, description }));
    navigation.navigate('PromotionDetails');
  };

  // Render each promotion card
  const renderPromotionCard = ({ item }) => (
    <TouchableWithoutFeedback  onPress={() => handlePress(item)}>
      <View style={styles.promotionCard}>
      <Image source={{ uri: item.image }}  style={styles.promotionImage} />
        <Text style={styles.promotionTitle}>{item.title}</Text>
        <Text style={styles.promotionDescription}>{truncateDescription(item.description)}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <View style={{}}>
        <Text style={{ marginLeft: 30, fontSize: 14, fontWeight: '600', color: colors.black,lineHeight:24 }}>Promotions</Text>
      </View>
      <FlatList
        data={promotionsData}
        keyExtractor={(item) => item.id}
        renderItem={renderPromotionCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </>

  );
};

export default Promotions;

const styles = StyleSheet.create({
  promotionCard: {
    backgroundColor: colors.white,
    padding: 10,
    elevation:3,
    marginHorizontal: 10,
    marginVertical:4,
    borderRadius: 10,
    width: wp('90%'),
  },
  promotionImage: {
    width: wp('85%'),
    height: hp('25%'),
    borderRadius: 14,
    borderWidth: 6,
    borderColor: colors.DarkGreen,
    marginBottom: 10,
    resizeMode: 'cover',
    zIndex: 10,
    overflow: 'hidden',
  },
  promotionTitle: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  promotionDescription: {
    color: colors.black,
    fontSize: 12,
  },
});
