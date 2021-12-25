import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import httpDelegateService, {getAPI} from '../services/http-delegate.service';
// import * as ImagePicker from "expo-image-picker";

export default function ClientScreen() {
  const [search, setSearchValue] = useState('');
  const [result, setResult] = useState({});

  const pickImage = async clientId => {
    // if (Platform.OS !== "web") {
    //   const { status } =
    //       await ImagePicker.requestMediaLibraryPermissionsAsync();
    //   if (status !== "granted") {
    //     alert("Sorry, we need camera roll permissions to make this work!");
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
    //       4 * Math.ceil(result.base64.length / 3) * 0.5624896334383812;
    //   const sizeInKb = sizeInBytes / 1000;
    //   if (sizeInKb <= 1024) {
    //     const imageSource = {
    //       file_bas64: result.base64,
    //       client_id: clientId,
    //       user_id: "71734234",
    //     };
    //     httpDelegateService(
    //         "https://statuspe.herokuapp.com/Upload/upload",
    //         imageSource
    //     ).then((result) => {
    //       if (result.status === "Success") {
    //         Alert.alert("Success", "Image uploaded successfully");
    //       } else {
    //         alert("Bye");
    //       }
    //     });
    //   } else {
    //     Alert.alert(
    //         "Upload size limit exceeded",
    //         "Image should not be more than 1MB"
    //     );
    //   }
    // }
  };

  const searchClient = () => {
    Alert.alert(search);
    getAPI(
      'https://statuspe.herokuapp.com/user/images-by-code?code=' + search,
    ).then(res => {
      setResult(JSON.parse(res.data)[0]);
      console.log(JSON.parse(res.data)[0]);
    });
  };

  const shareImage = (clientId, userId, image) => {
    const body = {client_id: clientId, user_id: userId, image_path: image};
    console.log(body);
    httpDelegateService(
      'https://statuspe.herokuapp.com/images/image-watermark',
      body,
    ).then(res => {
      console.log('HI -', res);
    });
  };

  const setSearch = searchValue => {
    setSearchValue(searchValue);
  };

  const searchedItem = () => {
    if (result && result.image_url) {
      return (
        <View style={{paddingTop: 20}}>
          <View style={{alignItems: 'center', marginHorizontal: 30}}>
            <Image style={styles.productImg} source={{uri: result.image_url}} />
            <Text style={styles.name}>{result.name}</Text>
            <Text style={styles.description}>
              {result.district + ', ' + 'Maharashtra' + ', India'}
            </Text>
          </View>
          <View style={styles.contentColors}>
            {/*<TouchableOpacity style={[styles.btnColor, {backgroundColor: "#00BFFF"}]}/>*/}
          </View>
          <View style={styles.contentSize}>
            {/*<TouchableOpacity style={styles.btnSize}><Text>S</Text></TouchableOpacity>*/}
          </View>
          {/*<View style={styles.separator}/>*/}
          <View style={styles.warningLabelBox}>
            <View
              style={{
                height: 20,
                width: 20,
                border: '5px solid white',
                backgroundColor: 'orange',
                top: 30,
                borderTopWidth: 0,
                position: 'absolute',
                transform: [{rotate: '45deg'}],
              }}
            />
            <Text
              style={{
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              Once you share image, it cannot be shared again later
            </Text>
          </View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => shareImage(result.client_id, 2, result.image_url)}>
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => pickImage(result.client_id)}>
              <Text style={styles.shareButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  StatusBar.setBarStyle('light-content', true);
  return (
    <View style={{...styles.container}}>
      <ScrollView>
        <View style={{...styles.searchBarView}}>
          <View style={{...styles.searchBar}}>
            <EvilIcons name="search" size={24} color="white" />
            <TextInput
              style={{
                paddingHorizontal: 6,
                color: '#c1c1c1',
                fontFamily: 'Roboto',
                fontSize: 16,
                width: '100%',
              }}
              placeholder="Search"
              placeholderTextColor="#c1c1c1"
              value={search}
              onChangeText={val => setSearch(val)}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              borderRadius: 20,
              height: 40,
              paddingLeft: 15,
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            }}
            onPress={() => searchClient()}>
            <Text style={{marginRight: 15}}>Search</Text>
          </TouchableOpacity>
        </View>
        {result && searchedItem()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    paddingTop: 40,
  },
  searchBarView: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#3f3f3f',
    marginRight: 10,
    borderRadius: 4,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningLabelBox: {
    height: 40,
    width: '90%',
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'orange',
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
  },
  productImg: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 28,
    paddingTop: 20,
    color: 'lightblue',
    fontWeight: 'bold',
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: '#696969',
  },
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  contentSize: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    marginHorizontal: 30,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  addToCarContainer: {
    paddingTop: 10,
    marginHorizontal: 30,
  },
});
