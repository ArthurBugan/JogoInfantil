import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';

let Loader;

Loader = () => (
  <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
    <ActivityIndicator size={80} color="#89c4f1" />
  </View>
);

export default Loader;
