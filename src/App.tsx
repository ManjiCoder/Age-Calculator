import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import React from 'react';
import DatePick from './components/DatePick';

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        isDarkMode ? {backgroundColor: '#0B2447'} : {backgroundColor: 'white'},
      ]}>
      <StatusBar backgroundColor={isDarkMode ? '#2F58CD' : 'navy'} />
      <ScrollView>
        <Text
          style={[
            styles.headingPrimary,
            isDarkMode ? styles.textDark : styles.textLight,
          ]}>
          Age Calculator
        </Text>
        <DatePick isDarkMode={isDarkMode} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
  },
  headingPrimary: {
    fontSize: 36,
    marginVertical: 30,
    textAlign: 'center',
    fontFamily: 'CinzelDecorative-Bold',
    textShadowOffset: {
      height: 0.7,
      width: 0.7,
    },
    textShadowColor: 'red',
    textShadowRadius: 0.5,
  },
  textDark: {
    color: 'white',
  },
  textLight: {
    color: 'navy',
  },
});
