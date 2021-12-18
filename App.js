import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, Image} from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
const fs = RNFetchBlob.fs;
let imagePath = null;

const share = () => {
  const shareOptions = {
    title: 'Share via',
    message: 'Image Shared',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    social: Share.Social.WHATSAPP,
    whatsAppNumber: '9199999999',
    filename:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
  };
  RNFetchBlob.config({
    fileCache: true,
  })
    .fetch(
      'GET',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    )
    // the image is now dowloaded to device's storage
    .then(resp => {
      // the image path you can use it directly with Image component
      imagePath = resp.path();
      console.log('image - ', imagePath);
      return resp.readFile('base64');
    })
    .then(base64Data => {
      // here's base64 encoded image
      console.log('hi kiran');
      shareOptions.filename = base64Data;
      Share.shareSingle(shareOptions)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
      // remove the file from storage
      return fs.unlink(imagePath);
    });
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
        onPress={() => share()}>
        <Text>Send </Text>
      </TouchableOpacity>
      <Image
        style={{height: 50, width: 50}}
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
      />
    </SafeAreaView>
  );
};

export default App;
