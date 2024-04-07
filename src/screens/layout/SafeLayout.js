const { SafeAreaView } = require("react-native")
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SafeLayout = ({ children }) => {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingTop:Platform.OS === "android" && 0,
            width :wp('100%'),
        }}
        >
            {children}
        </SafeAreaView>
    )
}
export default SafeLayout