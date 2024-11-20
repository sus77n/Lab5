import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

const Settings =({navigation}) => {
    const handleLogout = () => {
        AsyncStorage.clear();
        navigation.navigate('Login')
    }
    return(
        <SafeAreaView>
            <TouchableOpacity style={styles.button}
                onPress= {() => handleLogout()}>
                <Text style={styles.buttonTitle}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    layout: {

    },

    button: {
        backgroundColor: '#E64E6A',
        borderRadius: 10,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        marginTop: 16,
        marginLeft: "auto",
        marginRight: "auto"
    },

    buttonTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    }
})

export default Settings;