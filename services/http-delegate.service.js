import {Alert} from 'react-native';

export default async function httpDelegateService(url, body) {
  return new Promise(resolve => {
    let requestOptions;
    requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    };
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(err => {
        console.log(err);
        Alert.alert(
          'Connection Lost',
          'Unable to connect to network!\nTry again after sometime',
        );
      });
  });
}

export async function getAPI(url) {
  return new Promise(resolve => {
    fetch(url)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(err => {
        console.log(err);
        Alert.alert(
          'Connection Lost',
          'Unable to connect to network!\nTry again after sometime',
        );
      });
  });
}
