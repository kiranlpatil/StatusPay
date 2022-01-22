import React, {Component} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import httpDelegateService from '../services/http-delegate.service';
import EncryptedStorage from 'react-native-encrypted-storage';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      navigation: props.navigation,
      isLoading: true
    };
  }

  checkValueIsNumberOrNot = value => {
    value = value.replace('.', '');
    value = value.replace(',', '');
    value = value.replace(' ', '');
    if (value.split('').length > 10) {
      value = value.slice(0, -1);
      this.setState({value});
    } else {
      this.setState({value});
    }
  };

  getArticlesFromApi = async () => {
    let response = await fetch('https://reqres.in/api/products/3');
    return await response.json();
  };

  navigateToOTPScreen = async () => {
    if (
      this.state.value.match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      ) &&
      this.state.value.split('').length === 10
    ) {
      let body = {
        'Mobile Number': this.state.value,
        'Resend Count': 0,
      };
      httpDelegateService(
        'https://androclick-backend.herokuapp.com/otp/genOTP',
        body,
      ).then(result => {
        this.state.navigation.navigate('OtpVerify', {
          mobile: this.state.value,
          otp: result,
        });
        this.setState({isLoading:true})
      });
      // console.log(Device.osInternalBuildId);
      // console.log(Device.osBuildFingerprint);
      // console.log(Device.modelName);
      // console.log(Application.androidId);
    }
  };

  componentDidMount(){
    this.getData()
  }


  getData = async () => {
    console.log("GET DATA RUN")
    try {
        const res = await EncryptedStorage.getItem("token")
        await EncryptedStorage.setItem('isAdmin', "true");
        console.log(res,"TOKEN RES")
        if (res) {
            let Token = {"Token": res};
            httpDelegateService('https://statuspe.herokuapp.com/auth/decode_token',Token)
                .then(async (r) => {
                    if (r.state){
                        this.state.navigation.navigate('Dashboard');
                    }else{
                        console.log(r)
                        this.setState({isLoading:false})
                        return
                    }
                })
        }else{
            this.setState({isLoading:false})
            return
        }
    } catch (error) {
        console.log(error)
        this.setState({isLoading:false})
        Alert.alert('Access not granted', 'Give Permission to access storage')
    }
};

  render() {
    const {value} = this.state;
    return (
        this.state.isLoading ? 
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/logo.png')} style={{width:"100%",height:"100%"}}/>
        </SafeAreaView>
        :
        <SafeAreaView style={styles.container}>
        <Image
          source={require('../assets/blur2.jpg')}
          style={styles.background}
        />
        <Image
          source={require('../assets/ass.png')}
          style={styles.greetingImage}
        />
        <Text style={styles.textLabel}>Verification</Text>
        <View style={styles.textInputBox}>
          <Text style={styles.startTextBox}> +91 </Text>
          <TextInput
            style={styles.text}
            placeholder=" Enter Mobile Number"
            keyboardType="number-pad"
            value={value}
            onChangeText={value => this.checkValueIsNumberOrNot(value)}
          />
        </View>
        <Text style={styles.termsText}>
          {' '}
          By going forward, you agree to our Terms and conditions{' '}
        </Text>
        <TouchableOpacity
          disabled={value.length < 10 || value.length > 10}
          style={
            value.length < 10 || value.length > 10
              ? styles.disabledButton
              : styles.enabledButton
          }>
          <Text
            style={styles.textButton}
            onPress={() => this.navigateToOTPScreen()}>
            Generate OTP
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingImage: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'center',
    flex: 1,
    width: '60%',
    height: '30%',
    alignItems: 'center',
    top: '10%',
    left: '20%',
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabel: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'darkslategrey',
    fontFamily: 'Roboto',
    paddingTop: '30%',
    paddingBottom: '10%',
    textAlign: 'center',
    zIndex: 0,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  termsText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'darkslategrey',
    fontFamily: 'Roboto',
    zIndex: 0,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textInputBox: {
    backgroundColor: 'azure',
    borderRadius: 14,
    flexDirection: 'row',
    width: '80%',
    padding: 15,
    marginVertical: 15,
    textAlign: 'center',
    alignItems:'center',
    shadowColor: '#6e6969',
    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 10.2,
    shadowRadius: 10.41,
    elevation: 2,
  },
  disabledButton: {
    alignItems: 'center',
    backgroundColor: 'darkslategrey',
    padding: 10,
    borderRadius: 200,
    width: '80%',
    top: '10%',
    fontWeight: 'bold',
    color: 'darkslategrey',
    fontFamily: 'Roboto',
    shadowColor: '#6e6969',
    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 10.2,
    shadowRadius: 10.41,

    elevation: 2,
  },
  enabledButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 200,
    width: '80%',
    top: '10%',
    fontWeight: 'bold',
    color: 'darkslategrey',
    fontFamily: 'Roboto',
    shadowColor: '#6e6969',
    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 10.2,
    shadowRadius: 10.41,

    elevation: 2,
  },
  text: {
    color: '#0c0c0c',
    fontSize: 20,
    fontFamily: 'Roboto',
    width: '100%',
    fontWeight: 'bold',
  },
  startTextBox: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#6e6969',
  },
});

export default LoginScreen;
