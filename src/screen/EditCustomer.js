import React, { useContext, useState } from "react";
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditCustomer =({route, navigation}) => {
    const {customer} = route.params;
    const [newName, setNewName] = useState(customer.name);
    const [newPhone, setNewPhone] = useState(customer.phone);
    // const {userInfo} = useContext(AuthContext);
    // const loginToken = userInfo.token;
    
    const edit = async (id, newName, newPrice) => {
        const token = (await AsyncStorage.getItem('loginToken'))?.replace(/"/g, '');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        
        axios.put(
            "https://kami-backend-5rs0.onrender.com/Customers/" + id,
            {name: newName, price: newPrice }, // Payload (request body)
            config // Configuration (headers)
        )
        .then(res => {
            Alert.alert("Updated successful","", [
                {
                    text: "OK",
                    onPress: () => navigation.navigate('Customer')
                }
            ])
        }).catch(e => {
            console.error("fetch error:" ,e);
        })
    }

    return(
        <SafeAreaView style = {styles.layout}>
            <Text style = {styles.title}>Customer name *</Text>
            <TextInput 
                style = {styles.input}
                value={newName}
                onChangeText={setNewName}
            />
            <Text style = {styles.title}>Phone *</Text>
            <TextInput
                style = {styles.input}
                value={newPhone}
                onChangeText={setNewPhone}
            />

            <TouchableOpacity style={styles.button}
                onPress= {() => edit(customer._id, newName, newPhone)}>
                <Text style={styles.buttonTitle}>Update</Text>
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

export default EditCustomer;