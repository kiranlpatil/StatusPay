import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import httpDelegateService, {getAPI} from '../services/http-delegate.service';
import RNOtpVerify from 'react-native-otp-verify';

class OtpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      otp: props.route.params.otp,
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
      r1Ref: React.createRef(),
      r2Ref: React.createRef(),
      r3Ref: React.createRef(),
      r4Ref: React.createRef(),
      buttonRef: React.createRef(),
      focus1: false,
      focus2: false,
      focus3: false,
      focus4: false,
      totalOtpCount: 0,
      timer: 59,
    };
  }

  handleKeyPress = (keyValue, ref, pin) => {
    if (
      keyValue.nativeEvent.keyCode === 8 ||
      keyValue.nativeEvent.key === 'Backspace'
    ) {
      if (pin === 'pin4') {
        this.setState({pin4: ''});
        keyValue.preventDefault();
      } else {
        if (pin === 'pin3') {
          this.setState({pin3: ''});
          keyValue.preventDefault();
        } else if (pin === 'pin2') {
          this.setState({pin2: ''});
          keyValue.preventDefault();
        } else {
          this.setState({pin1: ''});
          keyValue.preventDefault();
        }
      }
      ref.current.focus();
    }
  };

  handleFocusBlur = (ref, enable) => {
    if (this.state.r1Ref === ref) {
      this.setState({focus1: enable});
    } else if (this.state.r2Ref === ref) {
      this.setState({focus2: enable});
    } else if (this.state.r3Ref === ref) {
      this.setState({focus3: enable});
    } else if (this.state.r4Ref === ref) {
      this.setState({focus4: enable});
    }
  };

  validateOtp = () => {
    console.log('ValidateOtpClicked');
    if (
      this.state.otp.OTP.split('').length === 4 &&
      this.state.pin1 !== '' &&
      this.state.pin2 !== '' &&
      this.state.pin3 !== '' &&
      this.state.pin4 !== ''
    ) {
      if (
        this.state.pin1 +
          this.state.pin2 +
          this.state.pin3 +
          this.state.pin4 ===
        this.state.otp.OTP
      ) {
        getAPI(
          'https://statuspe.herokuapp.com/user/getuser?mobile=' +
            this.props.route.params.mobile.toString(),
        )
          .then(result => {
            console.log(result);
            if (result.status === 'Success') {
              this.setData(result).then(() => {
                this.state.navigation.navigate('Dashboard');
              });
            } else {
              this.state.navigation.navigate('Signup Page', {
                mobile: this.props.route.params.mobile,
              });
            }
          })
          .catch(e => console.log(e));
      } else {
        Alert.alert(
          'Verification Failed',
          'Please enter the correct OTP again',
        );
      }
    }
  };

  setData = async result => {
    console.log('SET DATA RUN');
    let body = {'Mobile Number': this.props.route.params.mobile.toString()};
    console.log(body);
    httpDelegateService('https://statuspe.herokuapp.com/auth/token', body).then(
      async res => {
        try {
          // await SecureStorage.setItemAsync('token', res.token);
          console.log('TokenSet');
          // await AsyncStorage.setItem('userId', JSON.parse(result.user).user_id);
          // await AsyncStorage.setItem('district', JSON.parse(result.user).district);
          // await AsyncStorage.setItem('state', JSON.parse(result.user).state);
        } catch (error) {
          console.log(error);
          Alert.alert(
            'Access not granted',
            'Give Permission to access storage',
          );
        }
      },
    );
  };

  resetTimer = () => {
    this.setState({timer: 59});
    this.setState({totalOtpCount: this.state.totalOtpCount + 1}, () => {
      let body = {
        'Mobile Number': this.props.route.params.mobile,
        'Resend Count': this.state.totalOtpCount,
      };
      httpDelegateService(
        'https://statuspe.herokuapp.com/otp/genOTP',
        body,
      ).then(result => {
        this.state.navigation.navigate('Verify OTP', {
          mobile: this.props.route.params.mobile,
          otp: result,
        });
      });
      this.startTimer();
    });
  };

  startTimer = () => {
    this.interval = setInterval(
      () => this.setState(prevState => ({timer: prevState.timer - 1})),
      1000,
    );
  };

  componentDidMount() {
    this.startTimer();
    RNOtpVerify.getHash().then(console.log).catch(console.log);

    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(this.otpHandler))
      .catch(p => console.log(p));
  }

  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    RNOtpVerify.removeListener();
  }

  otpHandler = message => {
    console.log('message - ', message);
    const otp = /(\d{4})/g.exec(message)[1];
    // this.setState({otp});
    RNOtpVerify.removeListener();
    Keyboard.dismiss();
  };

  render() {
    const {
      pin1,
      pin2,
      pin3,
      pin4,
      r1Ref,
      r2Ref,
      r3Ref,
      r4Ref,
      buttonRef,
      focus1,
      focus2,
      focus3,
      focus4,
      timer,
      totalOtpCount,
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../assets/blur2.jpg')}
          style={styles.background}
        />
        <Text style={styles.title}>Confirmation</Text>
        <Text style={styles.subtitle}>
          Please type the verification code sent to +91
          {JSON.parse(JSON.stringify(this.props.route.params.mobile))}
        </Text>
        <View style={styles.otpInLine}>
          <View
            style={[
              styles.otpButton,
              {backgroundColor: focus1 ? '#D3D3D3' : 'white'},
            ]}>
            <TextInput
              style={styles.otpText}
              ref={r1Ref}
              value={pin1}
              keyboardType="number-pad"
              onKeyPress={key => this.handleKeyPress(key, r1Ref, 'pin1')}
              onBlur={() => this.handleFocusBlur(r1Ref, false)}
              onFocus={() => this.handleFocusBlur(r1Ref, true)}
              onChangeText={pin1 => {
                pin1 = pin1.replace('.', '');
                pin1 = pin1.replace(',', '');
                this.setState({pin1});
                if (pin1 !== '') {
                  r2Ref.current.focus();
                }
              }}
              maxLength={1}
            />
          </View>
          <View
            style={[
              styles.otpButton,
              {backgroundColor: focus2 ? '#D3D3D3' : 'white'},
            ]}>
            <TextInput
              ref={r2Ref}
              style={styles.otpText}
              value={pin2}
              keyboardType="number-pad"
              onKeyPress={key => this.handleKeyPress(key, r1Ref, 'pin2')}
              onBlur={() => this.handleFocusBlur(r2Ref, false)}
              onFocus={() => this.handleFocusBlur(r2Ref, true)}
              onChangeText={pin2 => {
                pin2 = pin2.replace('.', '');
                pin2 = pin2.replace(',', '');
                this.setState({pin2});
                if (pin2 !== '') {
                  r3Ref.current.focus();
                }
              }}
              maxLength={1}
            />
          </View>
          <View
            style={[
              styles.otpButton,
              {backgroundColor: focus3 ? '#D3D3D3' : 'white'},
            ]}>
            <TextInput
              ref={r3Ref}
              style={styles.otpText}
              value={pin3}
              keyboardType="number-pad"
              onKeyPress={key => this.handleKeyPress(key, r2Ref, 'pin3')}
              onBlur={() => this.handleFocusBlur(r3Ref, false)}
              onFocus={() => this.handleFocusBlur(r3Ref, true)}
              onChangeText={pin3 => {
                pin3 = pin3.replace('.', '');
                pin3 = pin3.replace(',', '');
                this.setState({pin3});
                if (pin3 !== '') {
                  r4Ref.current.focus();
                }
              }}
              maxLength={1}
            />
          </View>
          <View
            style={[
              styles.otpButton,
              {backgroundColor: focus4 ? '#D3D3D3' : 'white'},
            ]}>
            <TextInput
              ref={r4Ref}
              style={styles.otpText}
              value={pin4}
              keyboardType="number-pad"
              onBlur={() => this.handleFocusBlur(r4Ref, false)}
              onFocus={() => this.handleFocusBlur(r4Ref, true)}
              onChangeText={pin4 => {
                pin4 = pin4.replace('.', '');
                pin4 = pin4.replace(',', '');
                this.setState({pin4});
                if (pin4 !== '') {
                  buttonRef.current.focus();
                }
              }}
              onKeyPress={key => {
                this.handleKeyPress(key, r3Ref, 'pin4');
              }}
              maxLength={1}
            />
          </View>
        </View>
        <View
          style={
            timer === 0
              ? styles.resendButtonActive
              : styles.resendButtonInActive
          }>
          <Text style={styles.resendText}>
            Didn't receive verification code?{' '}
          </Text>
          <Text
            style={timer === 0 ? {display: 'none'} : styles.resendTextInActive}>
            Resend Code in {timer}
          </Text>
          <Text
            style={timer === 0 ? styles.resendTextActive : {display: 'none'}}
            onPress={() =>
              timer === 0 && totalOtpCount <= 3 && this.resetTimer()
            }>
            {totalOtpCount >= 3 ? 'Try after 3 hours' : 'Resend Code'}
          </Text>
        </View>
        <View style={styles.verifyButton}>
          <TouchableOpacity
            style={
              pin1 && pin2 && pin3 && pin4
                ? styles.enabledVerifyToggle
                : styles.disabledVerifyToggle
            }
            ref={buttonRef}
            disabled={!(pin1 && pin2 && pin3 && pin4)}>
            <Text style={styles.verifyText} onPress={() => this.validateOtp()}>
              Verify
            </Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -10,
    paddingHorizontal: 40,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textTransform: 'uppercase',
    color: 'darkslategrey',
    fontWeight: 'bold',
    fontSize: 24,
    zIndex: 0,
  },
  subtitle: {
    color: 'dimgrey',
    textAlign: 'center',
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 18,
    fontWeight: '600',
    zIndex: 0,
  },
  otpInLine: {
    flexDirection: 'row',
    marginVertical: 10,
    zIndex: 0,
  },
  otpButton: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#6e6969',
    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 10.2,
    shadowRadius: 10.41,
    elevation: 2,
    zIndex: 0,
  },
  otpText: {
    width: 60,
    height: 80,
    borderRadius: 60,
    marginHorizontal: 10,
    padding: '35%',
    alignItems: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    zIndex: 0,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'center',
    flex: 1,
    width: '130%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendButtonInActive: {
    alignItems: 'center',
    marginVertical: 20,
  },
  resendButtonActive: {
    alignItems: 'center',
    marginVertical: 20,
  },
  resendText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  resendTextActive: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  resendTextInActive: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'darkslategrey',
  },
  verifyButton: {
    alignItems: 'center',
    marginVertical: 10,
    paddingTop: 50,
    width: '80%',
  },
  enabledVerifyToggle: {
    backgroundColor: 'green',
    paddingHorizontal: 30,
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
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
  disabledVerifyToggle: {
    backgroundColor: 'darkslategrey',
    paddingHorizontal: 30,
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
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
  verifyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
});

export default OtpScreen;
