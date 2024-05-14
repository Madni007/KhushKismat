
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/screens/auth/Signup';
import Login from './src/screens/auth/Login';
import ForgotPass from './src/screens/auth/ForgotPass';
import Splash from './src/screens/splashAndBoarding/Splash';
import BottomTabNavigation from './src/components/BottomTabNavigator';
import Boarding from './src/screens/splashAndBoarding/Boarding';
import { useSelector } from 'react-redux';

import EditProfile from './src/screens/Profile/EditProfile';
import Address from './src/screens/Profile/Address';
import ChangePassword from './src/screens/Profile/Setting/ChangePassword';
import DeleteAccount from './src/screens/Profile/Setting/DeleteAccount';
import Language from './src/screens/Profile/Setting/Language';
import InsideSetting from './src/screens/Profile/Setting';
import CustomerSupport from './src/screens/CustomerSupport';
import Notifictations from './src/screens/Notifications';
import Help from './src/screens/Help';
import About from './src/screens/Help/About';
import ContactUs from './src/screens/Help/ContactUs';
import FAQ from './src/screens/Help/FAQ';
import PrivicyPolicy from './src/screens/Help/PrivicyPolicy';
import TermCondition from './src/screens/Help/TermCondition';
import Tutorials from './src/screens/Help/Tutorials';
import Promotions from './src/screens/Promotions';
import PromotionDetails from './src/screens/Promotions/promotiondetails';
import Search from './src/screens/Search';
import TransactionHistory from './src/screens/TransectionHistory';
import DetailsHajjUmrah from './src/screens/FreeHajjUmrah/DetailsHajjUmrah';
import StatusPage from './src/screens/Referral/StatusPage';
const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
  const { isAuth, appLoading } = useSelector((state) => state.common);

  return (
    < Stack.Navigator screenOptions={({ route, navigation }) => ({
      headerShown: false,
      gestureEnabled: false,
    })} initialRouteName={isAuth ? "splash" : "BottomTabNavigation"} >
      <>
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false, }}
          name="splash"
          component={Splash}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="boarding"
          component={Boarding}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="signup"
          component={Signup}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="login"
          component={Login}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="forgot"
          component={ForgotPass}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="EditProfile"
          component={EditProfile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Notification"
          component={Notifictations}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BottomTabNavigation"
          component={BottomTabNavigation}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Address"
          component={Address}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ChangePassword"
          component={ChangePassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DeleteAccount"
          component={DeleteAccount}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Language"
          component={Language}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="InsideSetting"
          component={InsideSetting}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CustomerSupport"
          component={CustomerSupport}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Help"
          component={Help}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="About"
          component={About}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ContactUs"
          component={ContactUs}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="FAQ"
          component={FAQ}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PrivicyPolicy"
          component={PrivicyPolicy}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TermCondition"
          component={TermCondition}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Tutorials"
          component={Tutorials}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Promotions"
          component={Promotions}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PromotionDetails"
          component={PromotionDetails}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Search"
          component={Search}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TransactionHistory"
          component={TransactionHistory}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DetailsHajjUmrah"
          component={DetailsHajjUmrah}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="StatusPage"
          component={StatusPage}
        />

      </>

    </Stack.Navigator >
  );
};

export default AppNavigation;
