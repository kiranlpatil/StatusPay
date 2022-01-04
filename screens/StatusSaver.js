import React, { useEffect } from 'react'
import { Platform } from 'react-native';
import { StyleSheet, Text,SafeAreaView,Image, TouchableOpacity,buttonRef,View,PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';

const StatusSaver = () => {
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
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/blur2.jpg')} style={styles.background}/>
            {/* <MaterialCommunityIcons name="keyboard-backspace" color={"#000"} size={26} onPress={()=>props.navigation.navigate('Dashboard')} /> */}
            <View style={styles.premiumContainer}>
                {/* <MaterialCommunityIcons name="diamond" color={"green"} size={70} /> */}
                <Text style={styles.premiumTitle}>Get Premium</Text>
                <Text style={styles.premiumDesc}>jsad asndasdnad hd ahsdkad  asodasd ad ajd dlkjaaldjladjfsh dash djafdf agb agasdih asihda diskj i iuaiihd iauh</Text>
                <View>
                    {/* <Text style={styles.premiumBenifits}><MaterialCommunityIcons name='check-circle' size={18}/> Unlimited Monthly Posts.</Text> */}
                    {/* <Text style={styles.premiumBenifits}><MaterialCommunityIcons name='check-circle' size={18}/> Advanced Promotion Tools.</Text> */}
                    {/* <Text style={styles.premiumBenifits}><MaterialCommunityIcons name='check-circle' size={18}/> Unlimited Monthly Posts.</Text> */}
                </View>
                <TouchableOpacity
                        style={styles.enabledVerifyToggle}
                        ref={buttonRef}>
                        <Text style={styles.verifyText}>Purchase</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default StatusSaver

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        // paddingTop: 40,
        paddingHorizontal: 40,
        paddingTop: 50
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        alignSelf: "center",
        flex: 1,
        width: "130%",
        height: "110%",
        alignItems: "center",
        justifyContent: "center",
      },
    premiumContainer:{
        flex:1,
        alignItems:'center',
        marginTop:80
    },
    premiumTitle:{
        fontSize:28,
        marginTop:15,
        fontWeight: 'bold',
        color: 'darkslategrey',
        fontFamily: "Roboto",
        textAlign: 'center',
        zIndex: 0
    },
    premiumDesc:{
        textAlign:'center',
        // marginBottom:20,
        fontWeight: 'bold',
        fontSize: 14,
        color: 'darkslategrey',
        fontFamily: "Roboto",
        zIndex: 0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    premiumBenifits:{
        marginTop:20,
        fontWeight: 'bold',
        fontSize: 15,
        color: 'darkslategrey',
        fontFamily: "Roboto",
    },
    enabledVerifyToggle: {
        marginTop:50,
        backgroundColor: "green",
        paddingHorizontal: 30,
        paddingVertical: 15,
        width: "80%",
        alignItems: "center",
        borderRadius: 20,
        fontFamily: "Roboto",
        shadowColor: "#6e6969",
        shadowOffset: {
          width: 3,
          height: 7,
        },
        shadowOpacity: 10.2,
        shadowRadius: 10.41,
        elevation: 2,
      },
      verifyText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        textTransform: "uppercase",
      },
})
