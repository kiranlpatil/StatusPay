import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Share, ScrollView} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getAPI} from '../services/http-delegate.service';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Selector from './LanguageSelector';
import { useTranslation } from 'react-i18next';


const ProfileScreen = props => {
  const [user, userData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    async function getSaved() {
      //   let res = await getData();
      let body = 9695228178;
      getAPI('https://statuspe.herokuapp.com/user/getuser?mobile=' + body).then(
        result => {
          if (result.status === 'Success') {
            userData(JSON.parse(result.user));
          } else {
            alert('Bye');
          }
        },
      );
    }
    getSaved().then();
  }, []);

  //   const getData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("keyId");
  //       if (value !== null) {
  //         return value;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       Alert.alert("Access not granted", "Give Permission to access storage");
  //     }
  //   };

  const myCustomShare = async () => {
    const shareOptions = {
      title: 'AndroClick',
      message:
        'Earn money just by uploading images. Become a millionaire. Download it from here: ' +
        'https://play.google.com/store/apps/details?id=com.my11circle1.android',
    };

    try {
      const ShareResponse = await Share.share(shareOptions, {
        dialogTitle: 'Share App via',
      });
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <Avatar.Image
              source={require('../assets/profile-pic.jpg')}
              size={80}
            />
            <View style={{marginLeft: 20}}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}>
                {user.name}
              </Title>
              <Caption style={styles.caption}>@{user.user_id}</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              {user.district}, {user.state}, {user.country}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              +91-{user.mobile}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="face" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              Age {user.age}
            </Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: '#dddddd',
                borderRightWidth: 1,
              },
            ]}>
            <Title>₹ {user.wallet}</Title>
            <Caption>{t('profile:wallet')}</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>{t('profile:uploads')}</Caption>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="heart-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Your Favorites</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <FontAwesome5 name="history" size={24} color="#FF6347" />
              <Text style={styles.menuItemText}>My History</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <FontAwesome5 name="whatsapp" size={25} color="#FF6347" />
              <Text style={styles.menuItemText}>{t('profile:whatsappStatusSaver')}</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => props.navigation.navigate('AdCampaign')}>
            <View style={styles.menuItem}>
              <MaterialCommunityIcons
                name="caps-lock"
                size={25}
                color="#FF6347"
              />
              <Text style={styles.menuItemText}>My Ad Campaign</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => props.navigation.navigate('PremiumScreen')}>
            <View style={styles.menuItem}>
              <MaterialCommunityIcons
                name="account-star"
                size={24}
                color="#FF6347"
              />
              <Text style={styles.menuItemText}>{t('profile:premiumUser')}</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="credit-card" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>{t('profile:payment')}</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {props.navigation.navigate("LangSetting")}}>
            <View style={styles.menuItem}>
              <Ionicons color='#FF6347' size={28} name='ios-language-outline' />
              <Text style={styles.menuItemText}>{t('profile:changeLang')}</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={myCustomShare}>
            <View style={styles.menuItem}>
              <Icon name="share-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>{t('profile:share')}</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="account-check-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>{t('profile:contactUs')}</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => props.navigation.navigate('FAQ')}>
            <View style={styles.menuItem}>
              <Icon name="phone-settings-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>FAQ</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 42,
    marginHorizontal: 16,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
