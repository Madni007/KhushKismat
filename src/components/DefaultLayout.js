
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '../../AppNavigation';
import CustomDrawer from './CustomDrawer';
import { Drawer } from 'react-native-drawer-layout';
import { useDispatch, useSelector } from 'react-redux';
import { setleftDrawerOpen } from '../redux/slices/commonSlice';

export default function DefaultLayout() {
  const { leftDrawerOpen } = useSelector((state) => state.common);
  const dispatch = useDispatch()
  return (<>
    <NavigationContainer>  
      <Drawer
        open={leftDrawerOpen}
        onOpen={() => dispatch(setleftDrawerOpen(true))}
        onClose={() => dispatch(setleftDrawerOpen(false))}
        drawerPosition="left"
        swipeEnabled={false}
        renderDrawerContent={() => <><CustomDrawer /></>}
      >
        <AppNavigation />
      </Drawer>
    </NavigationContainer >
  </>);
}