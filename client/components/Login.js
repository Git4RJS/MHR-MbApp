import { useForm } from 'react-hook-form';
import React, {useState, createRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import CustomInput from './CustomInput';
import { useNavigation } from '@react-navigation/core';
import CustomButton from './CustomButton';
export default LoginScreen = (props,{navigation}) => {
  const [username, setUserName] = useState('');
  const [password, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const { control, handleSubmit } = useForm();
  const passwordInputRef = createRef();
  const onRegisterPressed = async (data)  => {
   console.log(data);
    fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "username":username,
       "password":password
     }),
        
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        console.log(responseJson);
        if (responseJson.status === 'success') {
          console.log('success');
          props.navigation.navigate('Home');
        } else {
          console.log ('fail');
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
    props.navigation.navigate('Home');
 
  };
  return(
<ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Welcome to MHR</Text>

        <CustomInput 
          name="username"
          control={control}
          placeholder="Username"   placeholderTextColor="#8b9cb5"

          rules={{
            required: 'Username is required',
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
      
        <CustomButton
          text="Login"
          onPress={
            (() => props.navigation.navigate('UpdateInfo'),
            handleSubmit(onRegisterPressed))
          } 
       
        />

    <Text style={styles.notHave}>Don't have an account?</Text> 
      <TouchableOpacity onPress={()=>props.navigation.navigate('Register')}>
        <Text style={styles.orsignup}>Create now</Text> 
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
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 35,
    color: '#0039a6',
  },

    notHave:{
    color: "#0039a6",
    marginTop:90,
    fontSize:15,
    
  },
    orsignup:{
    color: 'red',
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize:18,
  },
});

  