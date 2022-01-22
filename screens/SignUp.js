import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import Data from "../Data/states&cities.json";
import httpDelegateService from "../services/http-delegate.service";
import EncryptedStorage from 'react-native-encrypted-storage';

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [IsValidAge, setIsValidAge] = useState(true);
  const [isValidDist, setIsValidDist] = useState(true);
  const [isValidState, setIsValidState] = useState(true);
  const [distData, setDistData] = useState([]);
  let mobile = props.route.params.mobile;
  // let mobile = 9991234846;

  // FETCH Cities DATA
  const getCities = (state) => {
    var arr = Data.find((val) => val.state == state);
    if (arr) {
      setDistData(arr["districts"]);
    } else {
      setDistData([]);
    }
    setDistrict("");
  };

  const handleNameInput = (val) => {
    val = val.replace(/[^A-Za-z ]/g, "");
    setName(val);
    setIsValidName(true);
  };

  const handleAgeInput = (val) => {
    val = val.replace(/[^0-9]/g, "");
    if (val.toString().length < 2) {
      setIsValidAge(false);
    } else {
      setIsValidAge(true);
    }
    setAge(val);
  };

  const handleSignUp = async () => {
    if (!name) {
      setIsValidName(false);
      return;
    } else if (!age || age.toString().length != 2) {
      setIsValidAge(false);
      return;
    } else if (!state) {
      setIsValidState(false);
      return;
    } else if (!district) {
      setIsValidDist(false);
      return;
    }
    let res = await fetch(
      `https://statuspe.herokuapp.com//user/genuserid?mobile=${mobile}`
    );
    let uniId = await res.json();
    const data = {
      user_id: uniId,
      name: name,
      age: age,
      mobile: mobile,
      district: district,
      state: state,
      country: "India",
    };
    httpDelegateService("https://statuspe.herokuapp.com//user/register-user", data).then(
      (r) => {
        if (r.status == "Success") {
            setData(r)
        }else{
          console.log(r)
        }
      }
    );
  };

  setData = async (result) => {
      console.log("SET DATA RUN")
      let body = { "Mobile Number": mobile.toString()};
      console.log(body)
      httpDelegateService("https://statuspe.herokuapp.com/auth/token",body)
      .then((res)=>{
        try {
          EncryptedStorage.setItem('token', res.token).then(()=>{
            console.log("TokenSet In SignUp SCREEN")
            props.navigation.navigate('Dashboard');
          })
        } catch (error) {
            console.log(error)
            Alert.alert('Access not granted', 'Give Permission to access storage')
        }
      })
  };

  return (
    <SafeAreaView style={styles.signupForm}>
      <Image
        source={require("../assets/blur2.jpg")}
        style={styles.background}
      />
      <Text style={styles.textLabel}>Create an Account</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Name"
        placeholderTextColor="grey" 
        value={name}
        onChangeText={(val) => handleNameInput(val)}
        textContentType="name"
      />
      {isValidName ? null : <Text style={styles.errMsg}>Enter Valid Name</Text>}
      <TextInput
        style={styles.inputField}
        placeholder="Age"
        placeholderTextColor="grey" 
        value={age}
        onChangeText={(val) => handleAgeInput(val)}
        keyboardType="numeric"
        maxLength={2}
      />
      {IsValidAge ? null : <Text style={styles.errMsg}>Enter Valid Age</Text>}

      <Picker
        selectedValue={state}
        style={styles.inputField}
        onValueChange={(itemValue) => {
          setState(itemValue);
          getCities(itemValue);
          setIsValidState(true);
        }}
      >
        <Picker.Item label="Select State" value="" />
        {Data.map((e, index) => {
          return <Picker.Item label={e.state} value={e.state} key={index} />;
        })}
      </Picker>
      {isValidState ? null : (
        <Text style={styles.errMsg}>Select Valid State</Text>
      )}
      <Picker
        selectedValue={district}
        style={styles.inputField}
        onValueChange={(itemValue) => {
          setDistrict(itemValue);
          setIsValidDist(true);
        }}
      >
        <Picker.Item label="Select District" value="" />
        {distData.map((e, index) => {
          return <Picker.Item label={e} value={e} key={index}></Picker.Item>;
        })}
      </Picker>
      {isValidDist ? null : (
        <Text style={styles.errMsg}>Select Valid State</Text>
      )}
      <TouchableOpacity style={styles.signupBtn}>
        <Text style={styles.signupBtnText} onPress={handleSignUp}>
          Register
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signupForm: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: "center",
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textLabel: {
    fontWeight: "bold",
    fontSize: 25,
    color: "darkslategrey",
    fontFamily: "Roboto",
    paddingTop: "15%",
    paddingBottom: "10%",
    textAlign: "center",
    zIndex: 0,
  },
  inputField: {
    zIndex: 10,
    backgroundColor: "azure",
    borderRadius: 14,
    flexDirection: "row",
    width: "80%",
    padding: 15,
    marginVertical: 15,
    textAlign: "center",
    shadowColor: "#6e6969",
    color:'black',
    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 10.2,
    shadowRadius: 10.41,
    elevation: 2,
  },
  signupBtn: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 200,
    width: "80%",
    top: "10%",
    fontWeight: "bold",
    color: "darkslategrey",
    fontFamily: "Roboto",
    shadowColor: "#6e6969",
    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 10.2,
    shadowRadius: 10.41,

    elevation: 2,
  },
  signupBtnText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  errMsg: {
    color: "red",
    fontSize: 12,
    marginLeft: 5,
    marginBottom: 10,
    zIndex: 0,
  },
  pincodeDataMsg: {
    color: "grey",
    fontSize: 12,
    marginLeft: 5,
    marginBottom: 10,
    zIndex: 0,
  },
});

export default SignUp;
