import * as React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
  Animated,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import httpDelegateService from '../services/http-delegate.service';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';

// import * as ImagePicker from 'expo-image-picker';
// import * as MediaLibrary from 'expo-media-library';
// import * as FileSystem from 'expo-file-system';
// import * as Camera from 'expo-camera';
// import * as Sharing from 'expo-sharing';

const BG_IMG =
  'https://images.pexels.com/photos/2470655/pexels-photo-2470655.jpeg';
const {width} = Dimensions.get('window');
const headerHeight = 200;
const headerFinalHeight = 100;

export default function HomeScreen() {
  const [currentUser] = useState({
    profile_image: 'https://randomuser.me/api/portraits/women/72.jpg',
  });
  const scrollY = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);
  const offset = headerHeight - headerFinalHeight;
  const translateHeader = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, -offset],
    extrapolate: 'clamp',
  });
  const translateName = scrollY.interpolate({
    inputRange: [0, offset / 2, offset],
    outputRange: [0, 10, -width / 2 + 80],
    extrapolate: 'clamp',
  });
  const scaleName = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });
  const [images, imageData] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState(false);

  useEffect(() => {
    (async () => {
      // if (Platform.OS !== 'web') {
      //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      //     if (status !== 'granted') {
      //         alert('Sorry, we need camera roll permissions to make this work!');
      //     }
      // }
    })();
    async function getSaved() {
      let body = {
        district: 'Nanded',
        state: 'Maharashtra',
        country: 'India',
        user_id: '2',
      };
      httpDelegateService(
        'https://statuspe.herokuapp.com/images/images',
        body,
      ).then(result => {
        if (result.Status === 'Success') {
          imageData(result.Images);
        } else {
          alert('Bye');
        }
      });
    }
    getSaved().then();
  }, []);

  function Post({post}) {
    return (
      <View style={styles.postView}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View>
            <Image
              style={{width: 50, height: 50, borderRadius: 100}}
              source={{
                uri: currentUser.profile_image,
              }}
            />
          </View>
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Nanded, Maharashtra
            </Text>
            <Text style={{color: '#fff', fontFamily: 'Roboto', fontSize: 16}}>
              @{post.client_id}
            </Text>
          </View>
        </View>
        {/* Post Content */}
        <View style={{marginTop: 10}}>
          <Text
            style={{
              color: '#fafafa',
              fontFamily: 'Roboto',
              fontSize: 14,
              paddingHorizontal: 10,
            }}>
            Client Information about Photo
          </Text>
          {post.image ? (
            <Image
              style={{width: '100%', height: 300, marginTop: 10}}
              source={{uri: post.image}}
            />
          ) : null}
        </View>
        {/* Post Stats */}
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={
              disabledBtn
                ? {...styles.postStatsOpacity, backgroundColor: 'grey'}
                : {...styles.postStatsOpacity, backgroundColor: 'green'}
            }
            onPress={disabledBtn ? null : () => shareImage(post.image)}>
            <MaterialCommunityIcons
              name="cloud-download-outline"
              size={24}
              color="white"
              style={{paddingLeft: 10}}
            />
            <Text style={{marginLeft: 5, fontFamily: 'Roboto', color: '#fff'}}>
              Share
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => pickImage(post.client_id)}
            style={{
              ...styles.postStatsOpacity,
              marginLeft: 10,
              backgroundColor: 'green',
            }}>
            <MaterialCommunityIcons
              name="cloud-upload-outline"
              size={24}
              color="white"
              style={{paddingLeft: 10}}
            />
            <Text style={{marginLeft: 5, fontFamily: 'Roboto', color: '#fff'}}>
              Upload
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const pickImage = async clientId => {
    const result = await launchImageLibrary({
      mediaTypes: 'photo',
      quality: 1,
      includeBase64: true,
    });
    console.log(result);
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

  const shareImage = i => {
    const uri = i;
    // let fileName = uri.split('/').pop();
    // let fileUri = FileSystem.documentDirectory + fileName;
    // FileSystem.downloadAsync(uri, fileUri)
    //   .then(({uri}) => {
    //     // saveFile(uri, fileName);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     Alert.alert('ERROR OCCURRED');
    //   });
  };

  const saveFile = async (fileUri, fileName) => {
    const {st} = await MediaLibrary.requestPermissionsAsync();
    const status = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    // const {status} = await Camera.requestCameraPermissionsAsync();
    // console.log(st)
    if (status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync('StatusPe', asset, false);
      openShareDialogAsync(fileName);
    } else {
      Alert.alert('Permission Denied');
    }
  };

  let openShareDialogAsync = async fileName => {
    //   const base64 = await fetch("https://i.imgur.com/TkIrScD.png", { encoding: 'base64' })
    //   Alert.alert(base64)
    // if (!(await Sharing.isAvailableAsync())) {
    //   alert(`Platform not supported`);
    //   return;
    // }
    // const shareOptions = {
    //   title: 'Share via',
    //   message: 'some message',
    //   url: 'some share url',
    //   social: Share.Social.WHATSAPP,
    //   whatsAppNumber: "9199999999",  // country code + phone number
    //   filename: 'file:///storage/emulated/0/Pictures/StatusPe/'+fileName , // only for base64 file in Android
    // };
    // Share.shareSingle(shareOptions)
    //   .then((res) => { console.log(res) })
    //   .catch((err) => { err && console.log(err); });
    // await Sharing.shareAsync(
    //   'file:///storage/emulated/0/Pictures/StatusPe/' + fileName,
    // );
    // setDisabledBtn(true);
  };

  return (
    <SafeAreaView style={{...styles.container}}>
      <Image source={{uri: BG_IMG}} style={styles.img} blurRadius={40} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <View style={styles.postsView}>
          {images.map(post => (
            <Post key={post.client_id} post={post} />
          ))}
        </View>
        <View style={{height: 20}} />
      </ScrollView>
      <Animated.View
        pointerEvents="none"
        style={[styles.header, {transform: [{translateY: translateHeader}]}]}>
        <Animated.Text
          onTextLayout={e => setTextWidth(e.nativeEvent.lines[0].width)}
          style={[
            styles.name,
            {
              transform: [{translateX: translateName}, {scale: scaleName}],
            },
          ]}>
          Dashboard
        </Animated.Text>
        <Image
          source={{uri: BG_IMG}}
          style={styles.imgHeader}
          blurRadius={20}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 100,
    marginBottom: 5,
    backgroundColor: 'grey',
    marginHorizontal: 10,
  },
  header: {
    height: headerHeight,
    backgroundColor: 'blue',
    position: 'absolute',
    width: '100%',
    paddingTop: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 80,
  },
  scrollContainer: {
    paddingTop: headerHeight + 5,
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'center',
    flex: 1,
    zIndex: -1,
  },
  imgHeader: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'center',
    flex: 1,
    zIndex: -1,
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 5,
  },
  name: {
    fontSize: 30,
    color: '#000',
    position: 'absolute',
    bottom: 0,
    height: headerFinalHeight - 30,
    textAlignVertical: 'center',
    letterSpacing: 2,
    fontWeight: '800',
  },
  container: {
    flex: 1,
    paddingTop: 42,
  },
  userProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  storiesView: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  storiesViewTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storiesViewTitle: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Roboto',
  },
  showAllText: {
    color: '#c1c1c1',
    fontFamily: 'Roboto',
    fontSize: 18,
  },
  storyUserProfile: {
    marginRight: 20,
    borderColor: '#B53471',
    borderWidth: 2.5,
    borderRadius: 100,
  },
  storyUserProfileImage: {width: 60, height: 60, borderRadius: 100},
  postsView: {paddingHorizontal: 10, marginTop: 10},
  postView: {
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    shadowColor: '#1e1e1e',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  postStatsOpacity: {
    backgroundColor: '#222',
    padding: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    alignSelf: 'center',
  },
  textStyle: {
    color: 'black',
    borderColor: '#307ecc',
    height: 40,
    fontWeight: '700',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    flexDirection: 'row',
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
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
  enabledButton: {
    height: '60%',
    alignItems: 'center',
    backgroundColor: '#307ecc',
    padding: 10,
    borderRadius: 200,
    width: '70%',
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
});
