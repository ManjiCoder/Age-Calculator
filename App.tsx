import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import React from 'react';
import DatePick from './components/DatePick';

const App = (): JSX.Element => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.headingPrimary}>Age Calculator</Text>
        <DatePick />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  headingPrimary: {
    fontSize: 36,
    marginVertical: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'navy',
  },
});
