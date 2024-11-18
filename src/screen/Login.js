import axios from "axios";
import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({navigation}) => {
    const [password, setPassword] = useState('');
    const [showPassword,  setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const {login} = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.layout}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.inputForm}
                    placeholder="Phone"
                    placeholderTextColor="#888"
                    keyboardAppearance="number-pad"
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                />
                <TextInput
                    placeholder="Password"
                    style = {styles.inputForm}
                    placeholderTextColor="#888"
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                {/* <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="gray" />
                </TouchableOpacity> */}
                <TouchableOpacity style = {styles.button} onPress={() => {login(phone, password)}}>
                    <Text style = {styles.buttonTitle}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 48,
    },

    inputForm: {
        borderBlockColor: 'grey',
        borderWidth: 1,
        width: '100%',
        marginTop: 12,
        borderRadius: 10,
        paddingLeft: 12,
    },

    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#E64E6A',
        marginBottom: 24,
        marginTop: 72,
    },

    button: {
        backgroundColor: '#E64E6A',
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        marginTop: 16,
    },

    buttonTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    }
});