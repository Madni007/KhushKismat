import React from 'react'
import { View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import { colors } from '../../utils/Colors'

const data = [
  
  {
    imgUrl: "https://i.ibb.co/fdM2VC0/washer-1.png",
  },
  {
    imgUrl: "https://i.ibb.co/fdM2VC0/washer-1.png",
  },
  {
    imgUrl: "https://i.ibb.co/fdM2VC0/washer-1.png",
  },
  {
    imgUrl: "https://i.ibb.co/fdM2VC0/washer-1.png",
  },
  {
    imgUrl: "https://i.ibb.co/fdM2VC0/washer-1.png",
  },
];
const CarouselCards = ({ navigation }) => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  return (
    <View style={{ marginVertical: 0, }}>
      <Carousel
        layout="default"
        layoutCardOffset={`18`}
        ref={isCarousel}
        data={data}
        renderItem={(item, index) => CarouselCardItem({ item, index, navigation })}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        autoplay={true}
        enableMomentum={false}
        autoplayInterval={3000}
        autoplayDelay={3000}
        loop={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 8,
          height: 8,
          bottom:15,
          borderRadius: 5,
          marginHorizontal: 0,
          marginVertical: 0,
          padding: 0,
          backgroundColor: colors.DarkGreen,
        }}
        inactiveDotOpacity={0.3}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  )
}

export default CarouselCards