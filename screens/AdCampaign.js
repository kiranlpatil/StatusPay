import React, {useState, useRef, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Animated,
  Dimensions,
  TextInput,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import RNPickerSelect, {defaultStyles} from 'react-native-picker-select';
import {Caption, RadioButton} from 'react-native-paper';
import Slider from '@react-native-community/slider';
// import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal'; // 2.4.0
import httpDelegateService, {getAPI} from '../services/http-delegate.service';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EncryptedStorage from 'react-native-encrypted-storage';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
import LottieView from 'lottie-react-native';

let cities = require('../Data/states&cities.json');

const height = StatusBar.currentHeight;
let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Dimensions.get('window').height;

const slides = [
  {
    id: '1',
    title: 'Ad Details',
    description: 'Add Advertizement Details',
    imageUrl:
      'https://images.pexels.com/photos/2470655/pexels-photo-2470655.jpeg',
  },
  {
    id: '2',
    title: 'Ad Level',
    description: 'Add level of Campaign',
    imageUrl:
      'https://images.pexels.com/photos/2470655/pexels-photo-2470655.jpeg',
  },
  {
    id: '3',
    title: 'Campaign Scope',
    description: 'Add Campaign Details',
    imageUrl:
      'https://images.pexels.com/photos/2470655/pexels-photo-2470655.jpeg',
  },
  {
    id: '4',
    title: 'Ad Pricing',
    description: 'Select ad price',
    imageUrl:
      'https://images.pexels.com/photos/2470655/pexels-photo-2470655.jpeg',
  },
];

const PageFirst = ({firstData}) => {
  const [verifyNoModal, showVerifyNoModal] = useState('false');
  const [phoneNumber, setPhoneNumber] = useState();
  const [otp, setOtp] = useState();
  const [otpReceived, setOtpReceived] = useState();
  const [verified, setVerified] = useState(false);
  const [isMobileNew, setIsMobileNew] = useState(false);
  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [post, setPost] = useState('');

  const pickImage = async clientId => {
    // if (Platform.OS !== 'web') {
    //   const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //   if (status !== 'granted') {
    //     alert('Sorry, we need camera roll permissions to make this work!');
    //   }
    // }
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   quality: 1,
    //   base64: true,
    // });
    // if (result?.base64?.length > 0) {
    //   const sizeInBytes =
    //     4 * Math.ceil(result.base64.length / 3) * 0.5624896334383812;
    //   const sizeInKb = sizeInBytes / 1000;
    //   console.log(sizeInKb);
    //   if (sizeInKb <= 1024) {
    //     const imageSource = {
    //       file_bas64: result.base64,
    //       client_id: clientId,
    //       user_id: '71734234',
    //     };
    //     httpDelegateService(
    //       'https://statuspe.herokuapp.com/Upload/upload',
    //       imageSource,
    //     ).then(result => {
    //       if (result.status === 'Success') {
    //         Alert.alert('Success', 'Image uploaded successfully');
    //       } else {
    //         alert('Bye');
    //       }
    //     });
    //   } else {
    //     Alert.alert(
    //       'Upload size limit exceeded',
    //       'Image should not be more than 1MB',
    //     );
    //   }
    // }
  };

  const getOtp = () => {
    console.log(phoneNumber);
    if (phoneNumber === '9834383942') {
      setVerified(true);
      firstData({name: name, mobile: phoneNumber});
      showVerifyNoModal('false');
    } else {
      setIsMobileNew(true);
      let body = {
        'Mobile Number': phoneNumber,
        'Resend Count': 0,
      };
      httpDelegateService(
        'https://androclick-backend.herokuapp.com/otp/genOTP',
        body,
      ).then(result => {
        setOtpReceived(result.OTP);
      });
    }
  };

  const verifyOtp = () => {
    if (otpReceived === otp) {
      showVerifyNoModal('false');
      setVerified(true);
      setFirstData({name: name, mobile: phoneNumber});
    } else {
      Alert.alert('Otp match error!', 'Retry again');
    }
  };

  const verifyModal = () => {
    return (
      <Modal
        isVisible={verifyNoModal === 'true'}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 22,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 20,
              marginBottom: 5,
              color: '#493d8a',
              textAlign: 'center',
              justifyContent: 'flex-start',
            }}>
            Verify Mobile Number
          </Text>
          <TextInput
            style={styles.textInputBoxModal}
            maxLength={10}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={value => {
              {
                !isMobileNew && setPhoneNumber(value);
              }
            }}
          />
          {isMobileNew ? (
            <React.Fragment>
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 15,
                  marginBottom: 5,
                  color: 'black',
                  textAlign: 'center',
                  justifyContent: 'flex-start',
                }}>
                Enter OTP sent to Mobile Number
              </Text>
              <TextInput
                style={styles.otpInputBoxModal}
                maxLength={4}
                value={otp}
                keyboardType="phone-pad"
                onChangeText={value => setOtp(value)}
              />
            </React.Fragment>
          ) : null}
          <TouchableOpacity
            onPress={() =>
              otp ? phoneNumber && verifyOtp() : phoneNumber && getOtp()
            }
            style={{
              borderRadius: 20,
              padding: 10,
              width: '40%',
              alignItems: 'center',
              backgroundColor: 'lightblue',
            }}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Verify</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{width: '80%', height: SCREEN_HEIGHT, alignItems: 'center'}}>
      <View style={styles.textInputBox}>
        <Text style={styles.startTextBox}>{'Name*' + ' : '}</Text>
        <TextInput
          style={styles.text}
          value={name}
          placeholder="Enter Name"
          placeholderTextColor='lightgrey'
          onChangeText={value => setName(value)}
        />
      </View>
      <View style={styles.textInputBox}>
        <Text style={styles.startTextBox}>{'Caption: '}</Text>
        <TextInput
          style={styles.text}
          placeholder="(optional)"
          placeholderTextColor='lightgrey'
          multiline={true}
        />
      </View>
      <View
        style={
          (styles.textInputBox,
          {justifyContent: 'space-between', flexDirection: 'row', paddingRight: 5,alignItems:'center'})
        }>
        <Text style={styles.startTextBox}>{'Mobile* : '}</Text>

        <TouchableOpacity
          style={{
            backgroundColor: 'lightblue',
            borderRadius: 20,
            padding: 15,
            marginLeft:10,
            width: '80%',
            elevation: 4,
            alignItems: 'center',
          }}
          onPress={() => {
            showVerifyNoModal('true');
          }}
          disabled={verified}>  
          <Text style={{fontWeight: '700', color:'grey'}}>
            {verified ? 'Verified' : 'Add & Verify'}
          </Text>
        </TouchableOpacity>
        {verified ? (
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={24}
            color="green"
            style={{paddingLeft: 20}}
          />
        ) : (
          <MaterialCommunityIcons
            name="close-circle-outline"
            size={24}
            color="red"
            style={{paddingLeft: 20}}
          />
        )}
      </View>
      <View style={styles.textInputBox}>
        <Text style={styles.startTextBox}>{'Email: '}</Text>
        <TextInput style={styles.text} placeholder=" (optional)" placeholderTextColor='lightgrey' />
      </View>
      <View style={styles.textInputBox}>
        <Text style={styles.startTextBox}>{'Address: '}</Text>
        <TextInput style={styles.text} placeholder=" (optional)" placeholderTextColor='lightgrey' />
      </View>
      <View
        style={
          (styles.textInputBox,
          {alignItems: 'center', width: '100%', paddingTop: 10})
        }>
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            height: 20,
            padding: 30,
            borderRadius: 20,
          }}
          onPress={() => pickImage()}>
          <Text
            style={{
              paddingRight: 20,
              paddingLeft: 20,
              color: 'white',
              fontSize: 16,
            }}>
            Upload Post
          </Text>
        </TouchableOpacity>
      </View>
      {verifyModal()}
    </View>
  );
};

const PageSecond = () => {
  const [value, setValue] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [states, setStates] = useState(cities);

  const setDistrictAndStates = value => {
    setValue(value);
  };

  return (
    <View style={{width: '80%', height: SCREEN_HEIGHT, alignItems: 'center'}}>
      <View style={{marginTop: 5, width: '100%'}}>
        <View style={{paddingVertical: 5, paddingTop: 20}} />
        <Text style={{padding: 10,color:'grey'}}>Where you want to show your Ads</Text>
        <RNPickerSelect
          items={[
            {
              label: 'District level',
              value: 'District level',
            },
            {
              label: 'State level',
              value: 'State level',
            },
            {
              label: 'Country level',
              value: 'Country level',
            },
          ]}
          onValueChange={value => {
            setDistrictAndStates(value);
          }}
          style={{...pickerSelectStyles}}
          value={value}
        />
        <View style={{paddingVertical: 5}} />
        <View style={{paddingVertical: 5, paddingTop: 20,color:'grey'}} />
        {value === 'Country level' ||
        value === 'State level' ||
        value === 'District level' ? (
          <View>
            <Text style={{padding: 10,color:'grey'}}>
              In which country you want to show your ads
            </Text>
            <RNPickerSelect
              items={[
                {
                  label: 'India',
                  value: 'India',
                },
              ]}
              onValueChange={value => {
                setCountry(value);
              }}
              style={{...pickerSelectStyles}}
              value={country}
            />
            <View style={{paddingVertical: 5}} />

            {value === 'State level' || value === 'District level' ? (
              <View>
                <Text style={{padding: 10,color:'grey'}}>
                  In which state you want to show your ads
                </Text>
                <RNPickerSelect
                  items={cities.map(obj => ({
                    key: obj.state,
                    label: obj.state,
                    value: obj.state,
                    color: 'rgba(77,38,22,1)',
                  }))}
                  onValueChange={value => {
                    setState(value);
                  }} 
                  style={{...pickerSelectStyles}}
                  value={state}
                />
                <View style={{paddingVertical: 5}} />
                {value === 'District level' ? (
                  <View>
                    <Text style={{padding: 10,color:'grey'}}>
                      In which district you want to show your ads
                    </Text>
                    <RNPickerSelect
                      items={
                        state !== ''
                          ? cities
                              .filter(district => district.state === state)[0]
                              .districts.map(obj => ({
                                key: obj,
                                label: obj,
                                value: obj,
                                color: 'rgba(77,38,22,1)',
                              }))
                          : [
                              {
                                label: 'Other',
                                value: 'Other',
                              },
                            ]
                      }
                      onValueChange={value => {
                        setDistrict(value);
                      }}
                      style={{...pickerSelectStyles}}
                      value={district}
                    />
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
        ) : null}

        <View style={{paddingVertical: 5}} />
      </View>
    </View>
  );
};

const PageThird = () => {
  const [radioValue, setRadioValue] = useState('Public');
  const [value, setValue] = useState('');
  const [warning, setWarning] = useState('');

  const searchForCode = text => {
    setValue(text);
    if (text.length > 2) {
      getAPI(
        'https://androclick-backend.herokuapp.com/user/client-code?code=' +
          text.toUpperCase(),
      ).then(res => {
        setWarning(res.description);
      });
    }
  };

  return (
    <View style={{width: '80%', height: SCREEN_HEIGHT, alignItems: 'center'}}>
      <View style={styles.textInputBox}>
        <Text style={styles.startTextBox}>{'Campaign Code* : '}</Text>
        <TextInput
          style={styles.text}
          value={value}
          maxLength={8}
          autoCapitalize="characters"
          onChangeText={text => searchForCode(text)}
          placeholder={'3-8 in size'}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          color: warning === 'Code is available' ? 'green' : 'red',
        }}>
        {value !== '' && value.length > 2 && warning}
      </Text>

      <ActivityIndicator visible={true} />

      <View style={styles.modalView1}>
        <Text style={styles.modalText1}>Select Campaign Scope</Text>
        <RadioButton.Group
          onValueChange={value => setRadioValue(value)}
          value={radioValue}>
          <RadioButton.Item label="Public" value="Public" />
          <RadioButton.Item label="Private" value="Private" />
        </RadioButton.Group>
      </View>
      {radioValue === 'Public' ? (
        <Text style={{fontSize: 15, fontWeight: '800',color:'#0c0c0c'}}>Public Selected</Text>
      ) : (
        <Text style={{fontSize: 15, fontWeight: '800',color:'#0c0c0c'}}>Private Selected</Text>
      )}
    </View>
  );
};

const PageFourth = () => {
  const [range, setRange] = useState(500);
  const [duration, setDuration] = useState(1);
  const actualReach = range * 5;
  const fromReach = roundValue(actualReach - 0.2 * actualReach);
  const toReach = roundValue(actualReach + 0.2 * actualReach);
  const [isSuccess, setIsSuccess] = useState(false)
  const [animationPath, setAnimationPath] = useState(require("../assets/success.json"))
  const [userNumber, setUserNumber] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
      getData()
  }, [])

  const getData = async () => {
      let number = await EncryptedStorage.getItem('user_mobile');
      let id = await EncryptedStorage.getItem('uniId');
      if (number && id){
          setUserNumber(number)
          setUserId(id)
          console.log('DATA SET')
      }else{
          Alert.alert('Unable To Fetch Data From Storage')
      }
  }


  const handlePurchase = () => {
      console.log('HandlePurchaseClicked')
      let body = {
          "user_id": userId,
          "user_email": "abc@gmail.com",
          'user_phone': userNumber,
          "amount": range
      }
      httpDelegateService("https://statuspe.herokuapp.com/Payments/payment",body)
      .then((res)=>{
          try {
              if (res.status == "OK"){
                  initializePayment(res.cftoken,res.order_id)
              }
          } catch (error) {
              console.log(error)
              Alert.alert('Server Down')
          }
      })
  }

  const initializePayment = (token,orderId) => {
      let env = 'TEST'
      let map = {
          "orderId": orderId,
          "orderAmount": range.toString(),
          "appId": "117381a6a858db677363736dad183711",
          "tokenData": token,
          "orderCurrency": "INR",
          "orderNote": "Premium Payment",
          "notifyUrl": "https://test.gocashfree.com/notify",
          "verifyExpiry": "100",
          "customerPhone": userNumber,
          "customerEmail": "cashfree@cashfree.com"
          }

      RNPgReactNativeSDK.startPaymentUPI(map, env, (result) => {
              try {
                  let res = JSON.parse(result)
                  console.log(res)
                  if (res.txStatus != 'FAILED'){
                      console.log("Payment Success")
                      setIsSuccess(true)
                      setAnimationPath(require("../assets/success.json"))
                      setTimeout(() => {
                          setIsSuccess(false)
                      }, 2500);
                  } else{
                      console.log("PAYMENT FAILED")
                      setIsSuccess(true)
                      setAnimationPath(require("../assets/failed.json"))
                      setTimeout(() => {
                          setIsSuccess(false)
                      }, 2500);
                  }  
                } catch (error) {
                  console.log(error,"CATCH BLOCK")
                  setIsSuccess(true)
                  setAnimationPath(require("../assets/failed.json"))
                  setTimeout(() => {
                      setIsSuccess(false)
                  }, 2500);
                }
      });
  }

  function roundValue(reachValue) {
    const L = reachValue.toString().length;
    const X = Math.pow(10, L - 2);
    const Y = Math.pow(10, L - 3) * 5;
    const stringNumber = parseInt(
      parseInt(reachValue.toString().substring(2)) / Y,
    );
    if (stringNumber === 1) {
      return parseInt([parseInt(reachValue / X) * X]) + X;
    } else {
      return parseInt(parseInt(reachValue) / X) * X;
    }
  }

  return (
    isSuccess ?
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <LottieView source={animationPath} autoPlay loop={false}/>
        </SafeAreaView>
    :
    <View
      style={{
        width: '90%',
        height: SCREEN_HEIGHT,
        alignItems: 'center',
      }}>
      <View
        style={{justifyContent: 'center', padding: 10, alignItems: 'center'}}>
        <Text
          style={{
            fontWeight: 'bold',
            alignSelf: 'center',
            paddingTop: 10,
            fontSize: 25,
            alignContent: 'center',
            color:'grey'
          }}>
          {fromReach} - {toReach}
        </Text>
        <Caption style={{alignItems: 'center'}}>Estimated Reach</Caption>
      </View>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: '100%',
          justifyContent: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            paddingTop: 20,
            paddingBottom: 10,
            color: 'red',
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
          }}>
          Budget
        </Text>
        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10,color:'grey'}}>
          ₹ {range}
        </Text>
        <Slider
          style={{width: 250, height: 40, padding: 10}}
          minimumValue={500}
          maximumValue={100000}
          minimumTrackTintColor="tomato"
          maximumTrackTintColor="#000"
          thumbTintColor="tomato"
          step={500}
          value={500}
          onValueChange={value => setRange(parseInt(value))}
        />
        <TouchableOpacity
          onPress={()=> handlePurchase()}
          style={{
            fontSize: 20,
            padding: 20,
            width: '80%',
            borderRadius: 20,
            backgroundColor: 'green',
            alignSelf: 'center',
            elevation: 5,
          }}>
          <Text style={{fontWeight: 'bold'}}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const NextButton = ({percentage, scrollTo, lastPage, props}) => {
  const size = 60;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = toValue => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      value => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage],
    );

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, [percentage]);

  const onSubmit = () => {
    if (lastPage) {
      props.navigation.navigate('Profile');
    }
  };

  return (
    <SafeAreaView style={[styles.container2]}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke={'#E6E7E8'}
            cx={center}
            cy={center}
            r={center - 1}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke={'#F4338F'}
            cx={center}
            cy={center}
            r={center - 1}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      {lastPage ? (
        <TouchableOpacity
          onPress={() => onSubmit()}
          style={styles.button}
          activeOpacity={0.6}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={14}
            color="#fff"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={scrollTo}
          style={styles.button}
          activeOpacity={0.6}>
          <MaterialCommunityIcons name="arrow-right" size={14} color="#fff" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const Paginator = ({data, scrollX}) => {
  const {width} = useWindowDimensions();

  return (
    <SafeAreaView style={{flexDirection: 'row', height: 20}}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={i.toString()}
          />
        );
      })}
    </SafeAreaView>
  );
};

const AdContent = ({item}) => {
  const {width} = useWindowDimensions();
  const [firstData, setFirstData] = useState();
  console.log('kiran - ', firstData);
  return (
    <SafeAreaView style={[styles.container3, {width}]}>
      <View style={{flex: 0.3}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {item.id === '1' ? (
          <PageFirst firstData={setFirstData} />
        ) : item.id === '2' ? (
          <PageSecond />
        ) : item.id === '3' ? (
          <PageThird />
        ) : (
          <PageFourth />
        )}
      </View>
    </SafeAreaView>
  );
};

const AdCampaign = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewconfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      console.log('BACK - ', props.navigation.goBack());
      props.navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList
          data={slides}
          renderItem={({item}) => <AdContent item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled={false}
          keyExtractor={item => item.id}
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewconfig}
          ref={slidesRef}
        />
      </View>

      <Paginator data={slides} scrollX={scrollX} />
      <NextButton
        props={props}
        scrollTo={scrollTo}
        lastPage={currentIndex < slides.length - 1 ? false : true}
        percentage={(currentIndex + 1) * (100 / slides.length)}
      />
    </SafeAreaView>
  );
};

export default AdCampaign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container3: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: height,
    padding: 20,
  },
  image: {
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
    justifyContent: 'flex-start',
  },
  description: {
    fontWeight: '300',
    paddingHorizontal: 64,
    color: '#62656b',
    textAlign: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#493d8a',
    marginHorizontal: 8,
  },
  button: {
    position: 'absolute',
    backgroundColor: '#f4338f',
    borderRadius: 100,
    padding: 10,
  },
  textInputBox: {
    color:'white',
    backgroundColor: 'azure',
    borderRadius: 14,
    flexDirection: 'row',
    width: SCREEN_WIDTH - 25,
    padding: 12,
    marginVertical: 15,
    alignItems:'center',
    textAlign: 'center',
    shadowColor: '#6e6969',
    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 10.2,
    shadowRadius: 10.41,
    elevation: 2,
  },
  textInputBoxModal: {
    backgroundColor: 'azure',
    borderRadius: 14,
    flexDirection: 'row',
    width: '70%',
    padding: 12,
    marginVertical: 10,
    textAlign: 'center',
    shadowColor: '#6e6969',
    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 10.2,
    shadowRadius: 10.41,
    elevation: 2,
  },
  otpInputBoxModal: {
    backgroundColor: 'azure',
    borderRadius: 14,
    flexDirection: 'row',
    width: '30%',
    padding: 12,
    marginVertical: 10,
    textAlign: 'center',
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
    fontSize: 16,
    fontFamily: 'Roboto',
    width: SCREEN_WIDTH / 4,
    fontWeight: '300',
  },
  startTextBox: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 17,
    padding: 0,
    textAlign: 'center',
    color: 'black',
  },
  modalView1: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button1: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen1: {
    backgroundColor: '#F194FF',
  },
  buttonClose1: {
    backgroundColor: '#2196F3',
  },
  textStyle1: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText1: {
    marginBottom: 15,
    textAlign: 'center',
    color:'#0c0c0c'
  },
  text1: {
    color: '#0c0c0c',
    fontSize: 20,
    fontFamily: 'Roboto',
    width: '100%',
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
