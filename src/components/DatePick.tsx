/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, {useState} from 'react';
import {format, subDays} from 'date-fns';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
// import * as Yup from 'yup';
// import {Formik} from 'formik';

const DatePick = ({isDarkMode}): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDatePickerVisibleDob, setDatePickerVisibilityDob] = useState(false);
  const [isDatePickerVisibleCurrent, setDatePickerVisibilityCurrent] =
    useState(false);
  const [dob, setDob] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [errors, setErrors] = useState(false);
  const [dateObj, setDateObj] = useState([]);

  // const dateSchema = Yup.object().shape({
  //   dobDate: Yup.string('must be date').required('Date of Birth is required'),
  //   // pickDate: Yup.date('Enter valid date').required('pickDate is required'),
  // });

  const showDatePickerDob = () => {
    setDatePickerVisibilityDob(true);
  };

  const hideDatePickerDob = () => {
    setDatePickerVisibilityDob(false);
  };

  const showDatePickerCurrent = () => {
    setDatePickerVisibilityCurrent(true);
  };

  const hideDatePickerCurrent = () => {
    setDatePickerVisibilityCurrent(false);
  };

  const handleConfirmDob = date => {
    // console.warn({date});
    hideDatePickerDob();
    setDob(new Date(date));
    if (dob === null) {
      setErrors('Date of Birth is required');
    }
    setErrors(false);
  };

  const handleConfirmCurrent = date => {
    // console.warn({date});
    hideDatePickerCurrent();
    setCurrentDate(new Date(date));
  };

  const calculateAge = () => {
    // console.warn('DOB: ', dob, 'currentDate: ', currentDate);
    if (currentDate < dob || dob === null) {
      setErrors(dob === null ? 'Date of Birth is required' : 'Invalid Date');
      return;
    }
    setErrors(false);
    // To check wheater value need to round or not
    const checkDateValue = value => {
      const check = Array.from(
        new Set(value.toFixed(2).toString().split('.')[1]),
      ).join('');

      return check === '0' ? Math.round(value) : value.toFixed(2);
    };

    const diff = checkDateValue(currentDate.getTime() - dob.getTime()) / 1000;
    const year = checkDateValue(diff / (3600 * 24 * 365.25));
    const month = checkDateValue(diff / (3600 * 24 * 30.417));
    const week = checkDateValue(diff / (3600 * 24 * 7));
    const day = checkDateValue(diff / 86400);
    const min = Math.round(diff / 60);

    setDateObj([
      {name: 'year', value: year},
      {name: 'month', value: month},
      {name: 'day', value: day},
      {name: 'week', value: week},
      {name: 'min', value: min},
    ]);
  };
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  const handleReset = () => {
    setDob(null);
    setErrors(false);
    setDateObj([]);
    setIsChecked(false);
    setCurrentDate(new Date());
  };
  return (
    <View style={styles.container}>
      <View style={styles.dateWrapper}>
        <Text
          style={[
            styles.headingSecondary,
            isDarkMode ? styles.textDark : styles.textLight,
          ]}>
          Date Of Birth :
        </Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisibleDob}
          mode="date"
          onConfirm={handleConfirmDob}
          onCancel={hideDatePickerDob}
          maximumDate={subDays(new Date(), 1)}
          date={new Date(dob !== null ? dob : subDays(new Date(), 1))}
        />

        <TouchableOpacity style={styles.dateBtn} onPress={showDatePickerDob}>
          <Text style={[styles.dateText, isDarkMode && {color: '#2F58CD'}]}>
            {dob ? format(dob, 'dd-MMM-yyyy') : 'DD-MM-YYYY'}
          </Text>
          {errors && (
            <Text style={[styles.errorText, isDarkMode && {color: 'gold'}]}>
              * {errors}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Current/updateCurrent - Date */}
      <View style={styles.dateWrapper}>
        <Text
          style={[
            styles.headingSecondary,
            isDarkMode ? styles.textDark : styles.textLight,
          ]}>
          Current Date :
        </Text>

        <DateTimePickerModal
          isVisible={isDatePickerVisibleCurrent}
          mode="date"
          onConfirm={handleConfirmCurrent}
          onCancel={hideDatePickerCurrent}
          date={new Date(currentDate)}
        />

        <TouchableOpacity
          style={styles.dateBtn}
          disabled={!isChecked}
          onPress={showDatePickerCurrent}>
          <Text style={[styles.dateText, isDarkMode && {color: '#2F58CD'}]}>
            {format(currentDate, 'dd-MMM-yyyy')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Checkbox */}
      <View style={styles.checkboxWrapper}>
        <BouncyCheckbox
          size={21}
          fillColor={isDarkMode ? '#2F58CD' : '#000070'}
          unfillColor="white"
          text={`Click me to ${
            isChecked ? 'fixed' : 'change'
          } the Current Date`}
          textStyle={[
            styles.checkboxText,
            isDarkMode ? styles.textDark : styles.textLight,
          ]}
          onPress={handleCheck}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.btnPrimary,
          isDarkMode ? styles.btnDark : styles.btnLight,
        ]}
        onPress={calculateAge}>
        <Text style={[styles.headingSecondary, styles.btnText]}>Submit</Text>
      </TouchableOpacity>

      {/* Reset Button */}
      <TouchableOpacity
        style={[
          styles.btnPrimary,
          isDarkMode ? styles.btnDark : styles.btnLight,
        ]}
        onPress={handleReset}>
        <Text style={[styles.headingSecondary, styles.btnText]}>Reset</Text>
      </TouchableOpacity>

      {/* Show Result */}
      <View
        style={[
          styles.btnPrimary,
          isDarkMode ? styles.btnDark : styles.btnLight,
        ]}>
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
  textDark: {
    color: 'white',
  },
  textLight: {
    color: 'navy',
  },
  btnDark: {backgroundColor: '#2F58CD'},
  btnLight: {backgroundColor: 'navy'},
  errorText: {
    fontFamily: 'BalooBhai2-Bold',
    color: 'red',
    textTransform: 'capitalize',
    fontSize: 11,
    position: 'absolute',
    top: 47,
  },
  textBold: {
    fontWeight: '900',
    lineHeight: 20,
  },
  checkboxWrapper: {
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 14,
    // fontWeight: '700',
    textDecorationLine: 'none',
    textTransform: 'capitalize',
    fontFamily: 'BalooBhai2-ExtraBold',
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 30,
  },
  headingSecondary: {
    fontSize: 20,
    fontFamily: 'BalooBhai2-Bold',
  },
  dateBtn: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 5,
    borderRadius: 4,
    width: 180,
  },
  dateText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'BalooBhai2-Bold',
    color: 'navy',
  },
  btnPrimary: {
    marginTop: 8,
    width: 360,
    marginStart: 'auto',
    marginEnd: 'auto',
    elevation: 7,
    borderRadius: 5,
  },
  btnText: {
    textAlign: 'center',
    padding: 14,
    letterSpacing: 1,
    color: 'white',
    fontSize: 21,
    fontFamily: 'BalooBhai2-ExtraBold',
    textTransform: 'uppercase',
  },
  showText: {
    textTransform: 'capitalize',
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'BalooBhai2-ExtraBold',
  },
});
