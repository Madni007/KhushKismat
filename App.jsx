import React, { useEffect, useState } from "react";
import { Provider, } from 'react-redux';
import store from './src/redux';
import { Font } from "react-native"
import DefaultLayout from "./src/components/DefaultLayout"
const App = () => {

  const loadFont = async () => {
    await Font.loadAsync({
      'LatoRegular': require('./src/assets/fonts/Lato-Regular.ttf'),
    });
  }

  useEffect(() => {
    loadFont()
  }, [])

  return (
    <>
      <Provider store={store}>
        <DefaultLayout />
      </Provider>
    </>
  );
};

export default App;