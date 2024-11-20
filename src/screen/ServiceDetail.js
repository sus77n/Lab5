import React, { createContext, useContext } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconButton } from 'react-native-paper';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ServiceDetail =({route, navigation}) => {
    const {service} = route.params; 
    // const {userInfo} = useContext(AuthContext);
    const funcDelete = async (id) =>{
        const token = (await AsyncStorage.getItem('loginToken'))?.replace(/"/g, '');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.delete(
            "https://kami-backend-5rs0.onrender.com/services/" + id,
            {id: id}, // Payload (request body)
            config // Configuration (headers)
        )
        .then(res => {
            Alert.alert("Delete done","",[
                {
                    text: "OK",
                    onPress: () => navigation.goBack()
                }
            ] );
        }).catch(e => {
            console.error("fetch error:" ,e);
        })
    }

    return(
        <SafeAreaView style = {styles.layout}>
            <View style ={styles.top}>
                <IconButton icon="arrow-left" iconColor="white" size={24} onPress={()=>navigation.goBack()}/> 
                <Text style ={styles.titleTop}>Service detail</Text>
                <Menu>
                    <MenuTrigger>
                        <IconButton icon="dots-vertical" iconColor="white" size={24}/>
                    </MenuTrigger>
                    <MenuOptions customStyles={{optionsContainer: styles.optionsWrapper}} >
                        <MenuOption customStyles={
                                                    {optionWrapper: styles.menuOption,
                                                     optionText: styles.optionText   }} 
                                    text="Delete"
                                    onSelect={() =>{
                                        Alert.alert('Warning', 'Are you sure ?', [
                                            {
                                                text: 'No',
                                                onPress: () => Alert.alert("Cancel successful"),
                                            },
                                            {
                                                text: 'Yes',
                                                onPress: () => {funcDelete(service._id)}
                                            }
                                        ])
                                        }}
                        ></MenuOption>
                        <MenuOption customStyles={
                                                    {optionWrapper: styles.menuOption,
                                                     optionText: styles.optionText   }} 
                                    text="Edit"
                                    onSelect={()=> navigation.navigate('Edit', {service: service})}
                        ></MenuOption>
                    </MenuOptions>
                </Menu>
            </View>

            <Text style = {styles.title}>Service name:
                <Text style = {styles.detail}> {service.name}</Text>
            </Text>
            <Text style = {styles.title}>Price: 
                <Text style = {styles.detail}> {service.price}</Text>
            </Text>
            <Text style = {styles.title}>Creator: 
                <Text style = {styles.detail}> {service.createdBy}</Text>
            </Text>
            <Text style = {styles.title}>Time: 
                <Text style = {styles.detail}> {service.createdAt}</Text>
            </Text>
            <Text style = {styles.title}>Final update: 
                <Text style = {styles.detail}> {service.updatedAt}</Text>
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: "white",
    },

    top : {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#E64E6A",
      height: 60,
      paddingTop: 5,
    },

    titleTop: {
      color: "#fff",
      fontWeight: "500",
      fontSize: 20,
      marginTop: 10,
      marginLeft: -150
    },

    title: {
        fontWeight: "700",
        color: "black",
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 18,
    },

    detail: {
        fontWeight:"400",
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
    },

    optionsWrapper: {
        marginTop: 38,
        width: 150,
        marginLeft: -22,
    },

    menuOption: {
        marginLeft: 10,
    },

    optionText: {
        color: "black",
        fontSize: 20,

    }
})
export default ServiceDetail;