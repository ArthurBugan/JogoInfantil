import React from 'react';
import Dimensions from 'Dimensions';
import { View, Text } from 'react-native';

let Finished;

Finished = () => (
  <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height }}>
    <Text>Parabéns, você concluiu essa fase!</Text>
  </View>
);

export default Finished;
