import React from 'react';
import { StyleSheet, Text,SafeAreaView,Image, TouchableOpacity,buttonRef } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View,Linking } from 'react-native';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';


const TAndC = (props) => {
    const { t } = useTranslation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons name="keyboard-backspace" color={"#000"} size={26} style={{paddingBottom:10}} onPress={()=>props.navigation.goBack() } />
                <Text style={styles.termAndCondTitle}>{t('termsAndCond:header1')}</Text>
            </View>
            <ScrollView>
                <View style={styles.termAndCondContainer}>
                    <Text style={styles.termAndCondDesc}>{t('termsAndCond:para1')}</Text>
                    <Text style={styles.termAndCondDesc}>{t('termsAndCond:para2')}</Text>
                    <Text style={styles.termAndCondDesc}>{t('termsAndCond:para3')}<Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://policies.google.com/terms')}>Google Play Services.</Text>
                    </Text>
                    <Text style={styles.termAndCondDesc}>{t('termsAndCond:para4')}</Text>
                    <Text style={styles.termAndCondDesc}>{t('termsAndCond:para5')}</Text>
                    <Text style={styles.termAndCondDesc}>{t('termsAndCond:para6')}
                    </Text>
                    <Text style={styles.termAndCondDesc}>{t('termsAndCond:para7')}</Text>
                    <Text style={styles.termAndCondDesc}> <Text style={styles.termAndCondBold}>{t('termsAndCond:header2')}</Text>{"\n"}{t('termsAndCond:para8')}</Text>
                    <Text style={styles.termAndCondDesc}><Text style={styles.termAndCondBold}>{t('termsAndCond:header3')}</Text>{'\n'}{t('termsAndCond:para9')}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TAndC

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 25
    },
    header:{
        display:'flex',
        flexDirection:'row'
    },
    termAndCondContainer:{
        flex:1,
        marginTop:10,
        marginBottom:20
    },
    termAndCondTitle:{
        width:'85%',
        fontSize:24,
        marginBottom:15,
        fontWeight: 'bold',
        color: 'darkslategrey',
        fontFamily: "Roboto",
        textAlign: 'center',
        zIndex: 0
    },
    termAndCondDesc:{
        fontSize: 13,
        color: 'darkslategrey',
        fontFamily: "Roboto",
        zIndex: 0,
        paddingVertical: 10
    },
    termAndCondBold:{
        fontWeight:'900',
        fontSize: 14,
        color: 'darkslategrey',
        fontFamily: "Roboto",
        zIndex: 0,
    },
})
