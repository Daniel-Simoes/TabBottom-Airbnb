import React from 'react';
import {View} from 'react-native';
import {StatusBar} from 'react-native';
import BottomTab from './components/BottomTab';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{flex: 1, backgroundColor: '#242634'}} />
      <BottomTab />
    </>
  );
}
