import React, { useContext, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const AddService =() => {
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPice] = useState('0');
    const {userInfo} = useContext(AuthContext);
    const loginToken = userInfo.token;
    
    const funcAdd = (newName, newPrice, loginToken) => {
        const config = {
            headers: {
                Authorization: `Bearer ${loginToken}`
            }
        };
        
        axios.post(
            "https://kami-backend-5rs0.onrender.com/services",
            { name: newName, price: newPrice }, // Payload (request body)
            config // Configuration (headers)
        )
        .then(res => {
            console.log(res);
        }).catch(e => {
            console.log(loginToken);
            console.error("fetch error:" ,e);
            
        })
    }

    return(
        <SafeAreaView style = {styles.layout}>
            <Text style = {styles.title}>Service name *</Text>
            <TextInput 
                style = {styles.input}
                placeholder="Input a service name"
                value={newName}
                onChangeText={setNewName}
            />
            <Text style = {styles.title}>Price *</Text>
            <TextInput
                style = {styles.input}
                value={newPrice}
                onChangeText={setNewPice}
            />

            <TouchableOpacity style={styles.button}
                onPress= {() => funcAdd(newName, newPrice, loginToken)}>
                <Text style={styles.buttonTitle}>Add</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    layout:{
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },

    title: {
        fontWeight: "700",
        fontSize: 17,
        color: "black"
    },

    input: {
        backgroundColor: "lightgrey",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
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
})

export default AddService;