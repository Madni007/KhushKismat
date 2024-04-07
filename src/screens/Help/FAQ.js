import { SafeAreaView, ScrollView, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { colors } from '../../utils/Colors'
import AppHeader from '../../components/AppHeader'

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const faqs = [
    {
      question: "What is the service provided for Hajj and Umrah?",
      answer: "The service includes [description of the service]."
    },
    {
      question: "What 111 is the service provided for Hajj and Umrah?",
      answer: "The service includes [description of the service]."
    },
    {
      question: "What 222 is the service provided for Hajj and Umrah?",
      answer: "The service includes [description of the service]."
    },
    
  ];

  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.Tailwhite}}>
        <AppHeader title={'FAQs'} bellIcon={false}/>
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc',justifyContent:'center',alignItems:'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold',color:colors.DarkGreen }}>Frequent Asked Questions</Text>
        </View>
        <ScrollView>
      {faqs.map((faq, index) => (
        <TouchableOpacity key={index} onPress={() => toggleFAQ(index)}>
          <View style={{ paddingHorizontal: 15,paddingVertical:10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{fontSize: 15, fontWeight: '500' }}>{faq.question}</Text>
            {expandedIndex === index && (
              <Text style={styles.Answer}>{faq.answer}</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </SafeAreaView>
  )
}

export default FAQ

const styles = StyleSheet.create({
  Answer:{
    fontSize:13,
    fontWeight:'300',
    color:colors.black,
  },
})