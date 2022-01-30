import React, { useEffect,useState } from 'react'
import { Platform } from 'react-native';
import { StyleSheet, Text,SafeAreaView,Image, TouchableOpacity,buttonRef,View,PermissionsAndroid, FlatList } from 'react-native';
import RNFS from 'react-native-fs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeModules} from 'react-native';
import Share from 'react-native-share';
import { Alert } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
const RNFetchBlob = NativeModules.RNFetchBlob

const StatusSaver = (props) => {
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [imageData, setimageData] = useState([])

    const moveAll = async (path, outputPath) => {
      console.log("RUNNING",path.split("."))
      // is a folder
      if (path.split(".").length == 1) {
        // CHeck if folder already exists
        console.log("YEDS")
        let exists = await RNFS.exists(outputPath);
        if (exists) {
          console.log('folder exist')
          await RNFS.unlink(outputPath);
          await RNFS.mkdir(outputPath);
        }
        // MAKE FRESH FOLDER
        let result = await RNFS.readDir(path);
        for (let i = 0; i < result.length; i++) {
          if (result[i].isDirectory()) {
            await RNFS.mkdir(outputPath + "/" + result[i].name);
          }
          let val = await moveAll(result[i].path, outputPath + "/" + result[i].name);
        }
        let val = await moveAll(result[i].path, outputPath + "/" + result[i].name);
      }
    }
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
                let originPath = `${RNFS.ExternalStorageDirectoryPath}/Android/media/com.whatsapp/WhatsApp/Media/.Statuses`;
                let originPathBusiness = `${RNFS.ExternalStorageDirectoryPath}/Android/media/com.whatsapp.w4b/WhatsApp Business/Media/.Statuses`;
                let outputPath = `${RNFS.ExternalStorageDirectoryPath}/Android/media/StatusPe`;
                RNFS.exists(originPath).then((success) => {
                  // fetchImageUrl(originPathBusiness)
                  fetchImageUrl(originPath)
                  // moveAll(originPath, outputPath).then(() => console.log('DONE')).catch(err => console.log('Error: - ', err)).finally(() => {
                  //   fetchImageUrl(originPath)
                  //   console.log('almost')})
                })
              } else {
                console.log("Storage permission denied");
              }
            } catch (err) {
              console.warn(err);
            }
        };
          console.log(granted);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            let originPath = `${RNFS.ExternalStorageDirectoryPath}/Android/media/com.whatsapp/WhatsApp/Media/.Statuses`;
            let outputPath = `${RNFS.ExternalStorageDirectoryPath}/Android/media/StatusPe`;
            console.log("Location permission allowed");
            RNFS.exists(originPath).then((success) => {
              //   console.log('File Exists!'); // <--- here RNFS can read the file and returns this
              //   RNFS.copyFile(originPath, outputPath)
              //     .then(result => {
              //       console.log('file copied:', result);
              //     })
              //     .catch(err => {
              //       console.log(err);
              //     });
              moveAll(originPath, outputPath).then(() => console.log('DONE')).catch(err => console.log('Error: - ', err)).finally(() => console.log('almost'))
            })
          } else {
            console.log("Location permission denied");
          }
      }

    const fetchImageUrl =async (statusPath) => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // let statusPath = `${RNFS.ExternalStorageDirectoryPath}/Android/media/StatusPe`;
          RNFS.readDir(statusPath)
          .then((result) => {
            const singleImageUrls = []
            let key = 1
            result.map((res)=>{
              if (res.isFile()){
                let filename = res['path'].substring(res['path'].lastIndexOf('/') + 1, res['path'].length)
                if (filename.match(/.(jpg|jpeg)$/i)){
                  let object = {'imageURI':"file://"+statusPath+'/'+filename,"key":key}
                  key += 1
                  singleImageUrls.push(object)
                }
              }
            })
            setimageData(singleImageUrls)
            console.log("Image Urls Set")
            return
          })
          .catch((err) => {
            console.log(err.message, err.code);
          });
        } else {
          console.log("Storage permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }

    useEffect(() => {
      fetchStatuses()
    }, [])

    const shareImage = (path) => {
      const shareOptions = {
        title: 'Share Status',
        url: path,
      };
      Share.open(shareOptions)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    }

    const downloadImage =async (filePath) => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            let fileName = filePath.split('/').slice(-1).pop()
            let destPath = `${RNFS.ExternalStorageDirectoryPath}/Download/${fileName}`
            RNFS.copyFile(filePath,destPath).then(()=>{
              Alert.alert('File Downloaded Successfully !!!','Check Download Folder')
            }).then(() => {
                  CameraRoll.save(destPath, "photo");
              })
              .catch((e) => {
              })
            return
        } else {
          console.log("Storage permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }

    function post({ item }) {
      return (
        <View style={styles.postView}>
          <View>
            {item.imageURI ? (
              <Image
                style={{width: '100%', height: 300,borderRadius:10}}
                source={{uri: item.imageURI}}
              />
            ) : null}
          </View>
          <View
            style={{
              marginVertical: 15,
              flexDirection: 'row-reverse',
            }}>
            <TouchableOpacity
              style={{ ...styles.postStatsOpacity }}
              onPress={() => shareImage(item.imageURI)}>
              <MaterialCommunityIcons
                name="share"
                size={26}
                color="white"
                style={{ paddingRight: 30 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => downloadImage(item.imageURI)}
              style={{
                ...styles.postStatsOpacity,
              }}>
              <MaterialCommunityIcons
                name="download"
                size={26}
                color="white"
                style={{ paddingRight: 20, paddingTop: 3 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.statusSaverContainer}>
                <View style={{flexDirection:'row',alignItems:'center', width:'100%',backgroundColor:'#FF6347'}}>
                  <MaterialCommunityIcons name="keyboard-backspace" color={"white"} size={34} onPress={()=>props.navigation.navigate('Dashboard')} style={{width:'20%',padding:15}} />
                  <Text style={styles.statusSaverTitle}>Status Saver</Text>
                </View>
                <FlatList
                  style={{flex:1,width:"100%",backgroundColor:'lightgrey'}}
                  data={imageData}
                  renderItem={post}
                  keyExtractor={imageData.key}
                />
            </View>
        </SafeAreaView>
    )
  }

export default StatusSaver;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    statusSaverContainer:{
        flex:1,
        alignItems:'center',
    },
    statusSaverTitle:{
        width:'60%',
        fontSize:28,
        marginTop:15,
        marginBottom:20,
        fontWeight: '500',
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
});
