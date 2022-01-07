import React, { useEffect, useState } from 'react';
import { StyleSheet, Text,SafeAreaView,Image, TouchableOpacity,buttonRef } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { TextInput } from 'react-native';



const Wallet = (props) => {
    const [amount, setAmount] = useState('')
    const [paymentMethod, setPaymentMethod] = useState(false)
    const [initialAmount, setInitialAmount] = useState('')

    useEffect(() => {
      if (props.route.params){
        setInitialAmount(props.route.params.wallet)
      }
    }, [props.route.params])

    const WithdrawScreen = () => {
      const [value, setValue] = useState('')
      const [isValidAmount, setIsValidAmount] = useState(true)
      const [isMinAmount, setIsMinAmount] = useState(true)

      
      const checkValueIsNumberOrNot = value => {
        value = value.replace('.', '');
        value = value.replace(',', '');
        value = value.replace(' ', '');
        value = value.replace('-', '');
        if (value < 100){
          setIsMinAmount(false)
          setIsValidAmount(true);
        }else if (value > initialAmount){
          setIsMinAmount(true)
          setIsValidAmount(false)
        }else {
          setIsValidAmount(true);
          setIsMinAmount(true)
        }
        setValue(value);
      };

      const paymentMethod = (e) => {
        if (isValidAmount && isMinAmount && value != '' && value <= initialAmount){
          setAmount(value)
          setPaymentMethod(true)
        }else{
          return
        }
      }
      
      return(
        <View >
          <MaterialCommunityIcons name="keyboard-backspace" color={"#000"} size={26} onPress={()=>props.navigation.navigate('Dashboard')} />
            <View style={styles.premiumContainer}>
              <Text style={styles.premiumTitle}>Withdraw Money</Text>
              <View style={styles.textInputBox}>
                  <Text style={styles.startTextBox}>₹</Text>
                  <TextInput
                      style={styles.text}
                      placeholder="Enter Amount"
                      placeholderTextColor="lightgrey" 
                      keyboardType="numeric"
                      value={value}
                      onChangeText={value => checkValueIsNumberOrNot(value)}
                  />
              </View>
              <Text style={styles.premiumDesc}>Available Balance: {initialAmount}</Text>
              <TouchableOpacity
                      style={styles.enabledVerifyToggle}
                      ref={buttonRef}
                      onPress = {(e)=> paymentMethod(e)}
                      >
                      <Text style={styles.verifyText}>Next</Text>
              </TouchableOpacity>
              {isValidAmount ? <></> : <Text style={styles.errMsg}>Insufficient Balance.</Text>}
              {isMinAmount ? <></> : <Text style={styles.errMsg}>Minimum withdraw limit is ₹100.</Text>}
            </View>
        </View>
      )
    }

    const SelectMethodScreen = () => {
      const [upiId, setUpiId] = useState('')
      const [cardNo, setCardNo] = useState('')
      const [date, setDate] = useState('')
      const [cvv, setCvv] = useState('')

      return(
        <View>
          <MaterialCommunityIcons name="keyboard-backspace" color={"#000"} size={26} onPress={()=>setPaymentMethod(false)} />
          <Text style={styles.Title}>Payment Methods</Text>
          <Text style={styles.amount}>Amount: {amount}</Text>
          {/* <Collapse>
              <CollapseHeader style={styles.CollapseHeader}>
                  <Text style={styles.CollapseHeaderTitle}>Credit/Debit Card</Text>
              </CollapseHeader>
              <CollapseBody style={styles.CollapseBody}>
                <View style={styles.cardInputBox}>
                    <TextInput
                        style={styles.cardNumberText}
                        placeholder="Enter Card Number"
                        placeholderTextColor="lightgrey"
                        value={cardNo}
                        onChange = {(v)=> setCardNo(v)}
                    />
                    <View style={styles.cardInputSubBox}>
                      <TextInput
                          style={styles.expireText}
                          placeholder="MM/YY"
                          placeholderTextColor="lightgrey"
                          value={upiId}
                          onChange = {(v)=> setUpiId(v)}
                      />
                      <TextInput
                          style={styles.cvvText}
                          placeholder="CVV"
                          placeholderTextColor="lightgrey"
                          value={upiId}
                          onChange = {(v)=> setUpiId(v)}
                      />
                    </View>
                    <TouchableOpacity
                            style={styles.enabledVerifyToggle}
                            ref={buttonRef}>
                            <Text style={styles.verifyText}>Withdraw</Text>
                    </TouchableOpacity>
                </View>
              </CollapseBody>
          </Collapse> */}
          <Collapse>
              <CollapseHeader style={styles.CollapseHeader}>
                  <Text style={styles.CollapseHeaderTitle}>UPI</Text>
              </CollapseHeader>
              <CollapseBody style={styles.CollapseBody}>
                <View style={styles.upiInputBox}>
                    <TextInput
                        style={styles.upiText}
                        placeholder="Enter UPI"
                        placeholderTextColor="lightgrey" 
                        // keyboardType="number-pad"
                        value={upiId}
                        onChange = {(v)=> setUpiId(v)}
                    />
                    <MaterialCommunityIcons name='check-circle-outline' color={"green"} style={{marginLeft:-25}} size={28}/>
                </View>
              </CollapseBody>
          </Collapse>
          <View style={{width:'100%',alignItems:'center'}}>
            <TouchableOpacity
                style={styles.enabledVerifyToggle}
                ref={buttonRef}>
                <Text style={styles.verifyText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/blur2.jpg')} style={styles.background}/>
            <ScrollView>
                {
                  paymentMethod ? < SelectMethodScreen />  :<WithdrawScreen/>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Wallet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        // paddingTop: 40,
        paddingHorizontal: 15,
        paddingTop: 40
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
        marginTop:40
    },
    premiumTitle:{
        fontSize:28,
        marginTop:5,
        marginBottom: 40,
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
        // padding: 15
    },
    premiumBenifits:{
        marginTop:20,
        fontWeight: 'bold',
        fontSize: 15,
        color: 'darkslategrey',
        fontFamily: "Roboto",
    },
    errMsg: {
      color: "red",
      fontSize: 13,
      marginLeft: 5,
      marginTop: 10,
      zIndex: 0,
    },
    enabledVerifyToggle: {
        marginTop:20,
        backgroundColor: "green",
        paddingHorizontal: 20,
        paddingVertical: 15,
        width: "60%",
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
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        textTransform: "uppercase",
      },
      textInputBox: {
        alignItems:'center',
        backgroundColor: 'azure',
        borderRadius: 14,
        flexDirection: 'row',
        width: '90%',
        padding: 10,
        marginVertical: 15,
        textAlign: 'center',
        shadowColor: '#6e6969',
        shadowOffset: {
          width: 3,
          height: 7,
        },
        shadowOpacity: 10.2,
        shadowRadius: 10.41,
        elevation: 2,
      },
      startTextBox: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10,
        textAlign: 'center',
        color: '#6e6969',
      },
      text: {
        color: '#6e6969',
        fontSize: 20,
        fontFamily: 'Roboto',
        width: '100%',
        fontWeight: 'bold',
      },
      CollapseHeader:{
        borderRadius:8,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey',
        backgroundColor:'white',
        padding:20,
        marginBottom:15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    CollapseHeaderTitle:{
        // marginTop:10,
        fontSize:17,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: "Roboto",
    },
    CollapseBody:{
        // paddingTop:10,
        paddingBottom:15,
    },
    Title:{
      fontSize:28,
      marginTop:20,
      marginBottom:30,
      fontWeight: 'bold',
      color: 'darkslategrey',
      fontFamily: "Roboto",
      textAlign: 'center',
      zIndex: 0
    },
    amount:{
      textAlign:'right',
      fontWeight: 'bold',
      color: 'grey',
      fontFamily: "Roboto",
      marginVertical:10
    },
    upiInputBox: {
      alignItems:'center',
      borderBottomWidth:1,
      borderBottomColor:'grey',
      flexDirection: 'row',
      width: '100%',
      padding: 5,
      marginVertical: 5,
      textAlign: 'center',
    },
    upiText: {
      color: '#6e6969',
      fontSize: 18,
      fontFamily: 'Roboto',
      width: '100%',
      fontWeight: 'bold',
    },
    cardInputBox: {
      alignItems:'center',
      flexDirection: 'column',
      width: '100%',
      padding: 5,
      marginVertical: 5,
      textAlign: 'center',
    },
    cardInputSubBox: {
      alignItems:'center',
      flexDirection: 'row',
      width: '100%',
      padding: 5,
      marginVertical: 5,
      textAlign: 'center',
    },
    cardNumberText: {
      color: 'black',
      borderBottomWidth:1,
      borderBottomColor:'grey',
      fontSize: 18,
      fontFamily: 'Roboto',
      width: '100%',
      fontWeight: 'bold',
    },
    expireText: {
      color: 'black',
      borderBottomWidth:1,
      borderBottomColor:'grey',
      fontSize: 18,
      fontFamily: 'Roboto',
      width: '40%',
      marginRight:20,
      fontWeight: 'bold',
    },
    cvvText: {
      color: 'black',
      borderBottomWidth:1,
      borderBottomColor:'grey',
      fontSize: 18,
      fontFamily: 'Roboto',
      width: '30%',
      fontWeight: 'bold',
    },
})
