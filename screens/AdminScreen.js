import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getAPI} from '../services/http-delegate.service';

export default function AdminDashboard(props) {
  const [client, clientList] = useState([]);

  useEffect(() => {
    async function getSaved() {
      getAPI(
        'https://statuspe.herokuapp.com/user/admin-dashboard?admin_id=' +
          '71734234',
      ).then(result => {
        if (result && result?.user_uploads) {
          clientList(JSON.parse(result.user_uploads));
        } else {
          Alert.alert('Empty image upload list', 'Try again later');
        }
      }).catch(() => {
        Alert.alert('Empty image upload list', 'Try again later');
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
                uri: 'https://randomuser.me/api/portraits/women/73.jpg',
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
              Name
            </Text>
            <Text style={{color: '#fff', fontFamily: 'Roboto', fontSize: 16}}>
              {post.client_id}
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
            {post.postText}
          </Text>
          {post.client && post.client.image_url ? (
            <Image
              style={{width: '100%', height: 300, marginTop: 10}}
              source={{
                uri: post.client.image_url,
              }}
            />
          ) : null}
        </View>
        {/* Post Stats */}
        <View
          style={{marginTop: 10, flexDirection: 'row', paddingHorizontal: 10}}>
          <TouchableOpacity style={styles.postStatsOpacity}>
            <MaterialCommunityIcons
              name="cloud-upload-outline"
              size={24}
              color="white"
            />
            <Text
              style={{
                marginLeft: 6,
                fontFamily: 'Roboto',
                color: '#fff',
              }}>
              {post.uploads.length}
            </Text>
            <Text style={{marginLeft: 6, fontFamily: 'Roboto', color: '#fff'}}>
              User uploads
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              post.pending_approval > 0 &&
                props.navigation.navigate('UserUploadScreen', {
                  clientId: post.client_id,
                });
            }}
            style={{
              ...styles.postStatsOpacity,
              marginLeft: 10,
              backgroundColor: 'green',
            }}>
            <MaterialCommunityIcons
              name="progress-upload"
              color="white"
              size={26}
            />
            {/* <MaterialIcons name="approval" size={24} color="white" /> */}
            <Text
              style={{
                marginLeft: 6,
                fontFamily: 'Roboto',
                color: '#fff',
              }}>
              {post.pending_approval}
            </Text>
            <Text
              style={{
                marginLeft: 4,
                fontFamily: 'Roboto',
                color: '#fff',
                flexShrink: 1,
              }}>
              Pending Approvals
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{...styles.container}}>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/3378993/pexels-photo-3378993.jpeg',
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={100}
      />
      <ScrollView>
        <View style={{...styles.storiesView}}>
          <View style={styles.storiesViewTitleView}>
            <Text style={{...styles.storiesViewTitle}}>Clients</Text>
          </View>
        </View>
        {/* Posts View */}
        <View style={styles.postsView}>
          {client.length > 0 &&
            client.map(post => <Post key={post._id} post={post} />)}
        </View>
        <View style={{height: 20}}></View>
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
  },
});
