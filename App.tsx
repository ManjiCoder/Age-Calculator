import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import React from 'react';
import DatePick from './components/DatePick';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';

const App = (): JSX.Element => {
  // const [isChecked, setIsChecked] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.headingPrimary}>Age Calculator</Text>
        <DatePick />
        {/* <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        text="Includes furture dates"
        onPress={() => setIsChecked(!isChecked)}
      /> */}
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
