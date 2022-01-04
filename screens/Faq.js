import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView, StyleSheet, Text, View,Image } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { ScrollView } from 'react-native';

const FAQ = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/blur2.jpg')} style={styles.background}/>
            <MaterialCommunityIcons name="keyboard-backspace" color={"#000"} size={26} onPress={()=>props.navigation.navigate('Dashboard')} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.Title}>FAQ</Text>
                <Collapse>
                    <CollapseHeader style={styles.CollapseHeader}>
                        <Text style={styles.CollapseHeaderTitle}>What are benefits of this app?</Text>
                    </CollapseHeader>
                    <CollapseBody style={styles.CollapseBody}>
                        <Text style={styles.CollapseBodyDesc}>Posse expetendis percipitur mei et. An nonumes ponderum pri, an dicant ocurreret consequuntur vix. Option nonumes sed ne, eum numquam scaevola ea. </Text>
                    </CollapseBody>
                </Collapse>
                <Collapse>
                    <CollapseHeader style={styles.CollapseHeader}>
                        <Text style={styles.CollapseHeaderTitle}>How to Withdraw Money?</Text>
                    </CollapseHeader>
                    <CollapseBody style={styles.CollapseBody}>
                        <Text style={styles.CollapseBodyDesc}>Eam at putant persius disputationi, sea an minim viris singulis. Natum menandri nominati cum id, mnesarchum accommodare ut sed. Platonem posidonium cum ei.</Text>
                    </CollapseBody>
                </Collapse>
                <Collapse>
                    <CollapseHeader style={styles.CollapseHeader}>
                        <Text style={styles.CollapseHeaderTitle}>What are benefits of this app?</Text>
                    </CollapseHeader>
                    <CollapseBody style={styles.CollapseBody}>
                        <Text style={styles.CollapseBodyDesc}>Posse expetendis percipitur mei et. An nonumes ponderum pri, an dicant ocurreret consequuntur vix. Option nonumes sed ne, eum numquam scaevola ea. </Text>
                    </CollapseBody>
                </Collapse>
                <Collapse>
                    <CollapseHeader style={styles.CollapseHeader}>
                        <Text style={styles.CollapseHeaderTitle}>How to Withdraw Money?</Text>
                    </CollapseHeader>
                    <CollapseBody style={styles.CollapseBody}>
                        <Text style={styles.CollapseBodyDesc}>Eam at putant persius disputationi, sea an minim viris singulis. Natum menandri nominati cum id, mnesarchum accommodare ut sed. Platonem posidonium cum ei.</Text>
                    </CollapseBody>
                </Collapse>
                <Collapse>
                    <CollapseHeader style={styles.CollapseHeader}>
                        <Text style={styles.CollapseHeaderTitle}>What are benefits of this app?</Text>
                    </CollapseHeader>
                    <CollapseBody style={styles.CollapseBody}>
                        <Text style={styles.CollapseBodyDesc}>Posse expetendis percipitur mei et. An nonumes ponderum pri, an dicant ocurreret consequuntur vix. Option nonumes sed ne, eum numquam scaevola ea. </Text>
                    </CollapseBody>
                </Collapse>
                <Collapse>
                    <CollapseHeader style={styles.CollapseHeader}>
                        <Text style={styles.CollapseHeaderTitle}>How to Withdraw Money?</Text>
                    </CollapseHeader>
                    <CollapseBody style={styles.CollapseBody}>
                        <Text style={styles.CollapseBodyDesc}>Eam at putant persius disputationi, sea an minim viris singulis. Natum menandri nominati cum id, mnesarchum accommodare ut sed. Platonem posidonium cum ei.</Text>
                    </CollapseBody>
                </Collapse>
                <Collapse>
                    <CollapseHeader style={styles.CollapseHeader}>
                        <Text style={styles.CollapseHeaderTitle}>What are benefits of this app?</Text>
                    </CollapseHeader>
                    <CollapseBody style={styles.CollapseBody}>
                        <Text style={styles.CollapseBodyDesc}>Posse expetendis percipitur mei et. An nonumes ponderum pri, an dicant ocurreret consequuntur vix. Option nonumes sed ne, eum numquam scaevola ea. </Text>
                    </CollapseBody>
                </Collapse>
                <Collapse>
                    <CollapseHeader style={styles.CollapseHeader}>
                        <Text style={styles.CollapseHeaderTitle}>How to Withdraw Money?</Text>
                    </CollapseHeader>
                    <CollapseBody style={styles.CollapseBody}>
                        <Text style={styles.CollapseBodyDesc}>Eam at putant persius disputationi, sea an minim viris singulis. Natum menandri nominati cum id, mnesarchum accommodare ut sed. Platonem posidonium cum ei.</Text>
                    </CollapseBody>
                </Collapse>
            </ScrollView>
        </SafeAreaView>
    )
}

export default FAQ

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
    FaqContainer:{
        flex:1,
        alignItems:'center',
        marginTop:40
    },
    Title:{
        fontSize:28,
        marginTop:30,
        marginBottom:40,
        fontWeight: 'bold',
        color: 'darkslategrey',
        fontFamily: "Roboto",
        textAlign: 'center',
        zIndex: 0
    },
    CollapseHeader:{
        borderBottomWidth:1,
        borderBottomColor:'lightgrey',
        paddingVertical:10,
    },
    CollapseHeaderTitle:{
        marginTop:10,
        fontSize:17,
        fontWeight: 'bold',
        color: 'green',
        fontFamily: "Roboto",
    },
    CollapseBody:{
        paddingTop:10,
        paddingBottom:15,
    },
    CollapseBodyDesc:{
        fontWeight: 'bold',
        fontFamily: "Roboto",
        color:'grey'
    }
})
