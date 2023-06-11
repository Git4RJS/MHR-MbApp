import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

const Sign = () => {
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');
  const [gender, setGender] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]);
  const showMode = (curentMode) => {
    setShow(true);
    setMode(curentMode);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setText(fDate);
    console.log(setText);

    this.setState({ date });
    this.submit(date);
  };

  const [loading, setLoading] = useState(false);
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data, 'data');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <Controller
        name="name"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            selectionColor={'#5188E3'}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text style={styles.label}>Password</Text>
      <Controller
        name="password"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            selectionColor={'#5188E3'}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <View>
        <Text style={styles.label}>Gender</Text>
        <Controller
          name="gender"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.dropdownGender}>
              <DropDownPicker
                style={styles.dropdown}
                open={genderOpen}
                value={genderValue} //genderValue
                items={gender}
                setOpen={setGenderOpen}
                setValue={setGenderValue}
                setItems={setGender}
                placeholder="Select Gender"
                placeholderStyle={styles.placeholderStyles}
                onChangeValue={onChange}
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>
          )}
        />
      </View>
      <Text style={styles.label}>Email Address</Text>
      <Controller
        name="email"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            selectionColor={'#5188E3'}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text style={styles.label}>Birthday</Text>
      <Controller
        name="birthday"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            selectionColor={'#5188E3'}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text style={styles.save}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
        backgroundColor: "#A7C7E7",
  },
  input: {
    borderStyle: 'solid',
    borderColor: '#B7B7B7',
    backgroundColor: "#ffffff",
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 15,
    height: 50,
    marginHorizontal: 10,
    paddingStart: 10,
    marginBottom: 15,
  },
  label: {
    marginBottom: 7,
    marginTop:10,
    marginStart: 10,
  },
  placeholderStyles: {
    color: 'grey',
  },
  dropdownGender: {
    marginHorizontal: 10,
    width: '50%',
    marginBottom: 15,
  },

  dropdown: {
    borderColor: '#B7B7B7',
    height: 50,
  },
  save: {
    backgroundColor: "#0039a6",
 
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 20,
  },
});

export default Sign;
