/* eslint-disable prettier/prettier */
import {Text, View} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CheckBox = (): JSX.Element => {
  return (
    <View>
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        text="Custom Checkbox"
        // onPress={(isChecked: boolean) => {}}
      />
    </View>
  );
};

export default CheckBox;

// const styles = StyleSheet.create({});
