import React, { useEffect,useState } from 'react'
import { Platform } from 'react-native';
import { StyleSheet, Text,SafeAreaView,Image, TouchableOpacity,buttonRef,View,PermissionsAndroid, FlatList } from 'react-native';
import RNFS from 'react-native-fs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const StatusSaver = (props) => {
  const [disabledBtn, setDisabledBtn] = useState(false);

    const fetchStatuses = async () => {
        if (Platform.OS === "android") {
            console.log("os : ANdroid");
            // console.log(Platform.constants['Release'] == 11)
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                  title: "Facex Location Permission",
                  message:
                    "App needs access to your location " +
                    "so we can show you directions",
                  buttonNegative: "Cancel",
                  buttonPositive: "OK"
                }
              );
              console.log(granted);
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Location permission allowed");
                console.log("RUNNNNNNNNNNNNNNNNNNNNNNNn")
                RNFS.readDir(`${RNFS.ExternalStorageDirectoryPath}/Android/media/com.whatsapp/WhatsApp/Media/.Statuses`).then(res => {
                    console.log(res)
                })
              } else {
                console.log("Location permission denied");
              }
            } catch (err) {
              console.warn(err);
            }
          }
    }
    useEffect(() => {
        fetchStatuses()
    }, [])

    const DATA = [
      {
        id: 0,
        postTitle: 'Lampost',
        imageURI:
          'https://images.unsplash.com/photo-1642986951104-428827cfe46b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      },
      {
        id: 1,
        postTitle: 'Planet of Nature',
        imageURI:
          'https://images.unsplash.com/photo-1642980074229-439281d19f29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      },
      {
        id: 2,
        postTitle: 'Lampost',
        imageURI:
          'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      },
      {
        id: 3,
        postTitle: 'Lampost',
        imageURI:
          'https://images.unsplash.com/photo-1642940792376-7819eeaa84a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
      }
    ]

    function post({item}) {
      return (
        <View style={styles.postView}>
          <View>
            {item.imageURI ? (
              <Image
                style={{width: '100%', height: 300,borderRadius:10}}
                source={{uri:  item.imageURI}}
              />
            ) : null}
          </View>
          <View
            style={{
              marginVertical: 15,
              flexDirection:'row-reverse',
            }}>
            <TouchableOpacity
              style={{...styles.postStatsOpacity}}
              onPress={() => shareImage(item.imageURI)}>
              <MaterialCommunityIcons
                name="share"
                size={30}
                color="white"
                style={{paddingRight: 30}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pickImage(post.client_id)}
              style={{
                ...styles.postStatsOpacity,
              }}>
              <MaterialCommunityIcons
                name="download"
                size={30}
                color="white"
                style={{paddingRight: 20,paddingTop:3}}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.premiumContainer}>
                <View style={{flexDirection:'row',alignItems:'center', width:'100%',backgroundColor:'#FF6347'}}>
                  <MaterialCommunityIcons name="keyboard-backspace" color={"white"} size={34} onPress={()=>props.navigation.navigate('Dashboard')} style={{width:'20%',padding:15}} />
                  <Text style={styles.premiumTitle}>Status Saver</Text>
                </View>
                <FlatList
                  style={{flex:1,width:"100%"}}
                  data={DATA}
                  renderItem={post}
                  keyExtractor={DATA.id}
                />
            </View>
        </SafeAreaView>
    )
}

export default StatusSaver

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    premiumContainer:{
        flex:1,
        alignItems:'center',
    },
    premiumTitle:{
        width:'60%',
        fontSize:28,
        marginTop:15,
        marginBottom:20,
        fontWeight: '900',
        // color: 'darkslategrey',
        color:'white',
        fontFamily: "Roboto",
        textAlign: 'center',
        zIndex: 0
    },
      card: {
        backgroundColor: "white",
        marginBottom: 10
      },
      cardImage: {
        width: '100%',
        height: 300
      },
      cardHeader: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      postsView: {paddingHorizontal: 10, marginTop: 10},
      postView: {
        marginTop: 10,
        marginBottom:15,
        marginHorizontal:5,
        backgroundColor:'#FF6347',
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
})
