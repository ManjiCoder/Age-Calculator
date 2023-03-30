/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, {useState} from 'react';
import {format} from 'date-fns';
import * as Yup from 'yup';
// import {Formik} from 'formik';

const DatePick = (): JSX.Element => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateObj, setDateObj] = useState([]);
  const [dob, setDob] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentDate, setCurrentDate] = useState(new Date().getTime());

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dateSchema = Yup.object().shape({
    dobDate: Yup.date().required('dob is required'),
    pickDate: Yup.date().required('pickDate is required'),
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
    setDob(new Date(date).getTime());
  };

  const calculateAge = () => {
    // console.warn('DOB: ', dob, 'currentDate: ', currentDate);
    if (currentDate < dob) {
      return;
    }

    const diff = (currentDate - dob) / 1000;
    const year = Math.round(diff / (3600 * 24 * 365.25));
    const month = Math.round(diff / (3600 * 24 * 30.417));
    const week = Math.round(diff / (3600 * 24 * 7));
    const day = Math.round(diff / 86400);
    const min = Math.round(diff / 60);

    setDateObj([
      {name: 'year', value: year},
      {name: 'month', value: month},
      {name: 'day', value: day},
      {name: 'week', value: week},
      {name: 'min', value: min},
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateWrapper}>
        <Text style={styles.headingSecondary}>Date Of Birth :</Text>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <TouchableOpacity style={styles.dateBtn} onPress={showDatePicker}>
          <Text style={styles.dateText}>
            {dob ? format(dob, 'dd-MMM-yyyy') : 'DD-MM-YYYY'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dateWrapper}>
        <Text style={styles.headingSecondary}>Current Date :</Text>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <TouchableOpacity
          style={styles.dateBtn}
          disabled={true}
          onPress={showDatePicker}>
          <Text style={styles.dateText}>
            {format(currentDate, 'dd-MMM-yyyy')}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnPrimary} onPress={calculateAge}>
        <Text style={[styles.headingSecondary, styles.btnText]}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.btnPrimary}>
        {dateObj.length > 0 &&
          dateObj.map(({name, value}, index) => {
            // eslint-disable-next-line eqeqeq
            if (value != '00') {
              return (
                <Text
                  style={[
                    styles.btnText,
                    styles.showText,
                    {fontSize: 16 + dateObj.length - index},
                  ]}
                  key={name}>
                  {name} :{' '}
                  <Text
                    style={
                      (styles.textBold, {fontSize: 16 + dateObj.length - index})
                    }>
                    {value.toString().padStart(2, 0)}
                  </Text>
                </Text>
              );
            }
          })}
      </View>
    </View>
  );
};

export default DatePick;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingBottom: 30,
  },
  textBold: {
    fontWeight: '900',
    lineHeight: 20,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 30,
  },
  headingSecondary: {
    fontSize: 20,
    fontWeight: '700',
    color: 'navy',
  },
  dateBtn: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 5,
    borderRadius: 4,
    color: 'white',
    width: 180,
  },
  dateText: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    color: 'navy',
  },
  btnPrimary: {
    marginTop: 30,
    backgroundColor: 'navy',
    color: 'gold',
    width: 360,
    marginStart: 'auto',
    marginEnd: 'auto',
    elevation: 5,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    padding: 14,
    letterSpacing: 1,
  },
  showText: {
    textTransform: 'capitalize',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
  },
});