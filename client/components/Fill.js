import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomButton from './CustomButton';
import { getFormatedDate } from 'react-native-modern-datepicker';
import DatePicker from 'react-native-modern-datepicker';

export default EditScreen = (props) => {

firstCheck=false;
   if (typeof props.route.params !== 'undefined'){
    pr=props.route.params.privateKey
    firstCheck=true;
  }
  console.log(firstCheck)
    function toDDYY(date) {
    return getFormatedDate(date, 'DD-MM-YYYY');
  }
  const { control, handleSubmit } = useForm();
  const [user, setUser] = useState("");
  
  const [name, setName] = useState('sdhgjk');
  const [email, setEmail] = useState('acytsdgujk');
  const [address, setAddress] = useState('ftgyuhijlk');
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    'DD-MM-YYYY'
  );
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(user.date);
  const [startedDate, setStartedDate] = useState('');
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(user.gender);
  const [gender, setGender] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]);

  const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate);
  };
  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  const onRegisterPressed = async (e) => {
    let date = toDDYY(selectedStartDate);
    let gender = genderValue;
    const formData = { name, address, email, date, gender };
    console.log(formData)
    if (!formData.name) {
      alert('Please enter your name');
      return;
    }
    if (!formData.address) {
      alert('Please enter your address');
      return;
    }
    if (!formData.gender) {
      alert('Please select your gender');
      return;
    }
    if (!formData.email) {
      alert('Please enter your email');
      return;
    }
    if (!formData.date) {
      alert('Please select your birthday');
      return;
    }     
    props.navigation.navigate('Home');
    e.preventDefault();
    try {
      const res = await axios.put(`/myProfile/${user.id}`, formData, {
        
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        

      });
      setMessage(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        ('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  
  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 22,
      }}>
      <ScrollView>
      
        <View>

          <View>
              <View>
              <Text style={styles.title}> USID: {user.id} </Text>
              {firstCheck==true? (
          <Text style={styles.id}>Please save your private key in a sercure place to login next time</Text>
        ) : null}
          {firstCheck==true ? (
          <Text>Private Key</Text>
        ) : null}
          {firstCheck==true ? (
        <View style={styles.txt}>
                 <Text style={styles.private}>{pr}</Text>
            </View>
        ) : null}
            </View>

            <Text>Name</Text>
            <View style={styles.input}>
              <TextInput
                value={name}
                onChangeText={(value) => setName(value)}
                editable={true}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginBottom: 6,
          }}>
          <Text>Address</Text>
          <View
            style={{
              height: 44,
              width: '100%',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: 'center',
              paddingLeft: 8,
            }}>
            <TextInput
              value={address}
              onChangeText={(value) => setAddress(value)}
              editable={true}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginBottom: 6,
          }}>
          <Text>Email</Text>
          <View
            style={{
              height: 44,
              width: '100%',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: 'center',
              paddingLeft: 8,
            }}>
            <TextInput
              type="email"
              value={email}
              onChangeText={(value) => setEmail(value)}
              editable={true}
            />
          </View>
        </View>
        <Text>Birthday</Text>
        <Controller
          name="birthday"
          control={control}
          defaultValue=""
          render={() => (
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : ''}
              style={{
                width: '100%',
              }}>
              <View>
                <TouchableOpacity
                  style={styles.input}
                  onPress={handleOnPressStartDate}>
                  <Text
                    style={{ color: '#8b9cb5', alignItems: 'center' }}></Text>
                  <Text>{selectedStartDate}</Text>
                </TouchableOpacity>
              </View>

              <Modal
                animationType="slide"
                transparent={true}
                visible={openStartDatePicker}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <DatePicker
                      mode="calendar"
                      minimumDate={startDate}
                      selected={startedDate}
                      onDateChanged={handleChangeStartDate}
                      onSelectedChange={(date) => setSelectedStartDate(date)}
                      options={{
                        backgroundColor: '#080516',
                        textHeaderColor: '#469ab6',
                        textDefaultColor: '#FFFFFF',
                        selectedTextColor: '#FFF',
                        mainColor: '#469ab6',
                        textSecondaryColor: '#FFFFFF',
                        borderColor: 'rgba(122, 146, 165, 0.1)',
                      }}
                    />
                    <TouchableOpacity onPress={handleOnPressStartDate}>
                      <Text style={{ color: 'white' }}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </KeyboardAvoidingView>
          )}
        />
        <View>
          <Text style={{ marginTop: 6 }}>Gender</Text>
          <Controller
            name="gender"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <DropDownPicker
                style={styles.input}
                open={genderOpen}
                value={genderValue}
                items={gender}
                setOpen={setGenderOpen}
                setValue={setGenderValue}
                setItems={setGender}
                placeholder="Select Gender"
                placeholderTextColor="#8b9cb5"
                placeholderStyle={styles.placeholderStyles}
                onChangeValue={onChange}
                zIndex={3000}
                zIndexInverse={1000}
              />
            )}
          />
        </View>
    
        <View style={styles.centeredView}>
            <CustomButton
          text="Save"
          onPress={
            ( handleSubmit(onRegisterPressed))
          }
        />
        </View>
      </ScrollView>
      
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  id:{
   marginBottom: 30,
   marginTop:20,
       color: '#0039a6',
  },
  input: {
    height: 44,
    width: '100%',
    borderColor: 'secondaryGray',
    borderWidth: 1,
    borderRadius: 4,

    marginVertical: 6,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  txt: {
    height: 60,
    width: '100%',
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 4,

    marginVertical: 6,
    justifyContent: 'center',
    paddingLeft: 8,
  },
   private: {
    marginTop: 20,
    marginBottom: 20,
    color: 'red',
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 30,
    color: '#0039a6',
  },

  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#080516',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 35,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 0,
  },
});
