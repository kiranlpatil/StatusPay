import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' }
  ];

const Selector = (props) => {
const { t, i18n } = useTranslation();
const selectedLanguageCode = i18n.language;

const setLanguage = code => {
    return i18n.changeLanguage(code);
};

return (
    <View style={styles.container}>
    <MaterialCommunityIcons name="keyboard-backspace" color={"#000"} size={26} onPress={()=>props.navigation.navigate('Dashboard')} />
    <View style={styles.row}>
        <Text style={styles.title}>{t('common:languageSelector')}</Text>
        <Ionicons color='#444' size={28} name='ios-language-outline' />
    </View>
    {LANGUAGES.map(language => {
        const selectedLanguage = language.code === selectedLanguageCode;

        return (
        <Pressable
            key={language.code}
            style={styles.buttonContainer}
            disabled={selectedLanguage}
            onPress={() => setLanguage(language.code)}
        >
            <Text
            style={[selectedLanguage ? styles.selectedText : styles.text]}
            >
            {language.label}
            </Text>
        </Pressable>
        );
    })}
    </View>
);
};

const styles = StyleSheet.create({
container: {
    paddingTop: 30,
    paddingHorizontal: 16
},
row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
},
title: {
    color: '#444',
    fontSize: 28,
    fontWeight: '600'
},
buttonContainer: {
    marginTop: 10
},
text: {
    fontSize: 18,
    color: '#000',
    paddingVertical: 4
},
selectedText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'tomato',
    paddingVertical: 4
}
});

export default Selector;