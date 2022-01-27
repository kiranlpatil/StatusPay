import React,{useEffect, useState} from 'react';
import { StyleSheet, Text,SafeAreaView,Image, TouchableOpacity,buttonRef } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
import LottieView from 'lottie-react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Alert } from 'react-native';
import httpDelegateService from "../services/http-delegate.service";



const PremiumScreen = (props) => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [animationPath, setAnimationPath] = useState(require("../assets/success.json"))
    const [userNumber, setUserNumber] = useState('')
    const [userId, setUserId] = useState('')
    const amount = "100"

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let number = await EncryptedStorage.getItem('user_mobile');
        let id = await EncryptedStorage.getItem('uniId');
        if (number && id){
            setUserNumber(number)
            setUserId(id)
        }else{
            Alert.alert('Unable To Fetch Data From Storage')
        }
    }


    const handlePurchase = () => {
        console.log('HandlePurchaseClicked')
        let body = {
            "user_id": userId,
            "user_email": "abc@gmail.com",
            'user_phone': userNumber,
            "amount": amount
        }
        httpDelegateService("https://statuspe.herokuapp.com/Payments/payment",body)
        .then((res)=>{
            try {
                if (res.status == "OK"){
                    initializePayment(res.cftoken,res.order_id)
                }
            } catch (error) {
                console.log(error)
                Alert.alert('Server Down')
            }
        })
    }

    const initializePayment = (token,orderId) => {
        let env = 'TEST'
        let map = {
            "orderId": orderId,
            "orderAmount": amount,
            "appId": "117381a6a858db677363736dad183711",
            "tokenData": token,
            "orderCurrency": "INR",
            "orderNote": "Premium Payment",
            "notifyUrl": "https://test.gocashfree.com/notify",
            "verifyExpiry": "100",
            "customerPhone": userNumber,
            "customerEmail": "cashfree@cashfree.com"
            }

        RNPgReactNativeSDK.startPaymentUPI(map, env, (result) => {
                try {
                    let res = JSON.parse(result)
                    console.log(res)
                    if (res.txStatus != 'FAILED'){
                        console.log("Payment Success")
                        setIsSuccess(true)
                        setAnimationPath(require("../assets/success.json"))
                        setTimeout(() => {
                            props.navigation.goBack()
                        }, 2500);
                    } else{
                        console.log("PAYMENT FAILED")
                        setIsSuccess(true)
                        setAnimationPath(require("../assets/failed.json"))
                        setTimeout(() => {
                            props.navigation.goBack()
                        }, 2500);
                    }  
                  } catch (error) {
                    console.log(error,"CATCH BLOCK")
                    setIsSuccess(true)
                    setAnimationPath(require("../assets/failed.json"))
                    setTimeout(() => {
                        props.navigation.goBack()
                    }, 2500);
                  }
        });
    }


    return (
        isSuccess ?
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <LottieView source={animationPath} autoPlay loop={false}/>
        </SafeAreaView>
        :
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/blur2.jpg')} style={styles.background}/>
            <MaterialCommunityIcons name="keyboard-backspace" color={"#000"} size={26} onPress={()=>props.navigation.navigate('Dashboard')} />
            <ScrollView>
                <View style={styles.premiumContainer}>
                    <MaterialCommunityIcons name="diamond" color={"green"} size={70} />
                    <Text style={styles.premiumTitle}>Get Premium</Text>
                    <Text style={styles.premiumDesc}>jsad asndasdnad hd ahsdkad  asodasd ad ajd dlkjaaldjladjfsh dash djafdf agb agasdih asihda diskj i iuaiihd iauh</Text>
                    <View>
                        <Text style={styles.premiumBenifits}><MaterialCommunityIcons name='check-circle' size={18}/> Unlimited Monthly Posts.</Text>
                        <Text style={styles.premiumBenifits}><MaterialCommunityIcons name='check-circle' size={18}/> Advanced Promotion Tools.</Text>
                        <Text style={styles.premiumBenifits}><MaterialCommunityIcons name='check-circle' size={18}/> Unlimited Monthly Posts.</Text>
                    </View>
                    <TouchableOpacity
                            style={styles.enabledVerifyToggle}
                            onPress={()=>handlePurchase()}
                            ref={buttonRef}>
                            <Text style={styles.verifyText}>Purchase</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PremiumScreen

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
