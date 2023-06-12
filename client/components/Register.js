import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

import { useForm } from 'react-hook-form';

export default function SignUpScreen(props,{navigation}) {

  const { control, handleSubmit, watch } = useForm();
  const pwd = watch('password');
  const onRegisterPressed = async (data)  => {
    const {username, password} = data;
    console.log(data)
        props.navigation.navigate('Edit Profile');
    fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify(data),
        
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status === 'success') {
          console.log('success');
          props.navigation.navigate('Edit Profile');
        } else {
          console.log ('fail');
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        console.error(error);
      });

 
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          name="username"
          control={control}
          placeholder="User Name"   placeholderTextColor="#8b9cb5"

          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Name should be max 24 characters long',
            },
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          placeholderTextColor="#8b9cb5"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          placeholderTextColor="#8b9cb5"
          secureTextEntry
          rules={{
            validate: (value) => value === pwd || 'Password do not match',
          }}
        />

        <CustomButton
          text="Register"
          onPress={
            (handleSubmit(onRegisterPressed))
          }
        />
        <TouchableOpacity style={styles.logIn}>
          <Text
            style={styles.links}
            onPress={() => props.navigation.navigate('Login')}>
            I have an account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 35,
    color: '#0039a6',
  },
  text: {
    marginTop:20,
    color: 'gray',
    marginVertical: 10,
  },
  links: {
    marginTop: 130,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#758580',
  },
});
