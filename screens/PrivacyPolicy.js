import React from 'react';
import { StyleSheet, Text,SafeAreaView,Image, TouchableOpacity,buttonRef } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View,Linking } from 'react-native';
import { ScrollView } from 'react-native';

const PrivacyPolicy = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons name="keyboard-backspace" color={"#000"} size={26} style={{paddingBottom:10}} onPress={()=>props.navigation.goBack() } />
                <Text style={styles.privacyPolicyTitle}>Privacy Policy</Text>
            </View>
            <ScrollView>
                <View style={styles.privacyPolicyContainer}>
                    <Text style={styles.privacyPolicyDesc}>No Bar Pvt Ltd built the StatusPay app as a Commercial app. This SERVICE is provided by No Bar Pvt Ltd and is intended for use as is.{'\n'}
                        This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.{'\n'}
                        If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.{'\n'}
                        The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at StatusPay unless otherwise defined in this Privacy Policy.{'\n'}
                    </Text>
                    <Text style={styles.privacyPolicyDesc}>
                        <Text style={styles.privacyPolicyBold}>Information Collection and Use</Text>{'\n'}
                        For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained by us and used as described in this privacy policy.
                    </Text>
                    <Text style={styles.privacyPolicyDesc}>The app does use third-party services that declare their Terms and Conditions.
                            Link to Terms and Conditions of third-party service providers used by the app <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://policies.google.com/terms')}>Google Play Services.</Text>
                    </Text>
                    <Text style={styles.privacyPolicyDesc}>
                        <Text style={styles.privacyPolicyBold}>Log Data</Text>{'\n'}
                        We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
                    </Text>
                    <Text style={styles.privacyPolicyDesc}>
                        <Text style={styles.privacyPolicyBold}>Cookies</Text>{'\n'}
                        Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.{'\n'}
                        This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
                        </Text>
                    <Text style={styles.privacyPolicyDesc}>
                        <Text style={styles.privacyPolicyBold}>Service Providers</Text>{'\n'}
                        We may employ third-party companies and individuals due to the following reasons:{'\n'}
                        <Text>{'\u2B24'}</Text>To facilitate our Service;{'\n'}
                        <Text>{'\u2B24'}</Text>To provide the Service on our behalf;{'\n'}
                        <Text>{'\u2B24'}</Text>To perform Service-related services; or{'\n'}
                        <Text>{'\u2B24'}</Text>To assist us in analyzing how our Service is used.{'\n'}
                        We want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
                        </Text>
                    <Text style={styles.privacyPolicyDesc}>
                        <Text style={styles.privacyPolicyBold}>Security</Text>{'\n'}
                        We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                        </Text>
                    <Text style={styles.privacyPolicyDesc}>
                        <Text style={styles.privacyPolicyBold}>Links to Other Sites</Text>{'\n'}
                        This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                        </Text>
                    <Text style={styles.privacyPolicyDesc}>
                        <Text style={styles.privacyPolicyBold}>Children’s Privacy</Text>{'\n'}
                        These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do the necessary actions.
                        </Text>
                    <Text style={styles.privacyPolicyDesc}> <Text style={styles.privacyPolicyBold}>Changes to This Terms and Conditions</Text>{"\n"}
                    We may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Terms and Conditions on this page.
                    These terms and conditions are effective as of 2025-01-06
                    </Text>
                    <Text style={styles.privacyPolicyDesc}><Text style={styles.privacyPolicyBold}>Contact Us</Text>{'\n'}
                        If you have any questions or suggestions about our Terms and Conditions, do not hesitate to contact us at abc@gmail.com.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 25
    },
    header:{
        flexDirection:'row'
    },
    privacyPolicyContainer:{
        flex:1,
        marginTop:10,
        marginBottom:20
    },
    privacyPolicyTitle:{
        width:'85%',
        fontSize:24,
        marginBottom:15,
        fontWeight: 'bold',
        color: 'darkslategrey',
        fontFamily: "Roboto",
        textAlign: 'center',
        zIndex: 0
    },
    privacyPolicyDesc:{
        fontSize: 13,
        color: 'darkslategrey',
        fontFamily: "Roboto",
        zIndex: 0,
        paddingVertical: 10
    },
    privacyPolicyBold:{
        fontWeight:'900',
        fontSize: 14,
        color: 'darkslategrey',
        fontFamily: "Roboto",
        zIndex: 0,
    },
})
