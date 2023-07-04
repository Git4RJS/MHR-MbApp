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
import {generatePrivate,getPublicKey} from "./GenKey";
import Fill from './Fill'
global.Buffer = global.Buffer || require('buffer').Buffer
const randomBytes = require('randombytes');
function hexStringToArrayBuffer(hexString) {
    hexString = hexString.replace(/^0x/, '');
    if (hexString.length % 2 != 0) {
        console.log('WARNING: expecting an even number of characters in the hexString');
    }
    var bad = hexString.match(/[G-Z\s]/i);
    if (bad) {
        console.log('WARNING: found non-hex characters', bad);    
    }
    var pairs = hexString.match(/[\dA-F]{2}/gi);
    var integers = pairs.map(function(s) {
        return parseInt(s, 16);
    });
    var array = new Uint8Array(integers);
    return Buffer.from(array.buffer);
}
     const privateKey =randomBytes(32);
     const hex=privateKey.toString('hex');
     console.log("Private Key",hex);

var secp256k1 = require("secp256k1");
var compressed = secp256k1.publicKeyCreate(privateKey);
var publicKey=secp256k1.publicKeyConvert(compressed, false);
let bufferOriginal = Buffer.from(publicKey);
console.log("Public key",bufferOriginal.toString('hex'));
export default function SignUpScreen(props) {

  const { control, handleSubmit, watch } = useForm();
  const pwd = watch('password1');
  
  const onRegisterPressed = async (data) => {
     props.navigation.navigate("Profile",{privateKey:hex});

     data.role='patient'
    data.publicKey=publicKey
    console.log(data);




    /*fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status === 'success') {
          console.log('success');
          props.navigation.navigate('Edit Profile');
        } else {
          console.log('fail');
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        console.error(error);
      });*/
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          name="username"
          control={control}
          placeholder="User Name"
          placeholderTextColor="#8b9cb5"
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
          name="password1"
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
          name="password2"
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
          onPress={handleSubmit(onRegisterPressed)}
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

  links: {
    marginTop: 130,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#758580',
  },
});
