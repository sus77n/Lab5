import React, { createContext, useContext } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconButton } from 'react-native-paper';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const TransactionDetail =({route, navigation}) => {
    const {trans} = route.params; 

    return(
        <SafeAreaView style = {styles.layout}>
            <View style ={styles.top}>
                <IconButton icon="arrow-left" iconColor="white" size={24} onPress={()=>navigation.goBack()}/> 
                <Text style ={styles.titleTop}>Transaction detail</Text>
                <Menu>
                    <MenuTrigger>
                        <IconButton icon="dots-vertical" iconColor="white" size={24}/>
                    </MenuTrigger>
                    {/* <MenuOptions customStyles={{optionsContainer: styles.optionsWrapper}} >
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
                                                onPress: () => {funcDelete(service._id, userInfo.token)}
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
                    </MenuOptions> */}
                </Menu>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>General information</Text>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.title}>Transaction code</Text>
                        <Text style={styles.info}>{trans.id}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>Customer</Text>
                        <Text style={styles.info}>{trans.customer.name} - {trans.customer.phone}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>Creation time</Text>
                        <Text style={styles.info}>{trans.createdAt}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Services list</Text>
                <FlatList 
                    data={trans.services}
                    renderItem={({item}) => 
                        <View style={styles.row}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text >x {item.quantity}</Text>
                            <Text style={styles.info}>{item.price} đ</Text>
                        </View>
                    }
                />
                <View style={styles.line}></View>
                <View style={styles.row}>
                        <Text style={styles.title}>Total</Text>
                        <Text style={styles.info}>{trans.price} đ</Text>
                </View>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Cost</Text>
                <View style={styles.row}>
                        <Text style={styles.title}>Amount of money</Text>
                        <Text style={styles.info}>{trans.priceBeforePromotion}</Text>
                </View>
                <View style={styles.row}>
                        <Text style={styles.title}>Discount</Text>
                        <Text style={styles.info}>{trans.priceBeforePromotion - trans.price}</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.row}>
                        <Text style={styles.title}>Total</Text>
                        <Text style={styles.info}>{trans.priceBeforePromotion} đ</Text>
                </View>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
    },

    top : {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#E64E6A",
      height: 60,
      paddingTop: 5,
      marginBottom: 10,
    },

    titleTop: {
      color: "#fff",
      fontWeight: "500",
      fontSize: 20,
      marginTop: 10,
      marginLeft: -150
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
    },

    card: {
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    cardTitle: {
        color: "#E64E6A",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 10,
    },
    container: {
        flex: 1,
    },

    row:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },

    title: {
        fontWeight: "bold",
        width: 170,
    },  

    info: {
        color: "black",
        fontWeight: "600"
    },

    name: {
        color: "black",
        fontWeight: "500"
    },

    line: {
        borderBottomWidth: 0.5,
        color: "gray",
        marginVertical: 10
    }
})
export default TransactionDetail;