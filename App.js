import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, Image} from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
const fs = RNFetchBlob.fs;
let imagePath = null;

const onShare =  async () => {
      RNFetchBlob.fetch('GET', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png')
        .then((resp) => {
          let base64image = resp.data;
          share('data:image/png;base64,' + base64image);
        })
        .catch((err) => share());
}

const share = (base64image) => {
    let shareOptions = {
      title: 'Title',
      url: base64image,
      message: "Hello This is StatusPe" ,
      social: Share.Social.WHATSAPP,
      subject: "Subject"
    }
    Share.shareSingle(shareOptions)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {});
};

const App = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'green',
          padding: 10,
          borderRadius: 20,
        }}
        onPress={() => onShare()}>
        <Text>Send </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
