import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Transaction =({navigation}) => {
    const [trans, setTrans] = useState([]);

    const loadTrans = async () => {
        try {
            const getTrans = await axios.get("https://kami-backend-5rs0.onrender.com/transactions")
            const trans = getTrans.data;
            setTrans(trans);
            await AsyncStorage.setItem('Transactions', JSON.stringify(trans));
            console.log(trans);
        } catch (error) {
            console.log("Transaction load error:",error);
        }
    }

    const nav = useNavigation();

    useEffect(() => {
        const focused = nav.addListener('focus', () => {loadTrans()});
        return focused;
    }, [trans])

    return(
        <SafeAreaView style = {styles.layout}>
            <FlatList style = {styles.layout}
                data={trans}
                renderItem={({item}) => 
                    <TouchableOpacity style={styles.customerContainer}
                                    onPress={()=> navigation.navigate('Transaction detail', {trans: item})}>
                        <View style={styles.info}>
                            <Text style={styles.id} numberOfLines={1} 
    ellipsizeMode="tail">{item.id} - {item.updatedAt}</Text>
                            <FlatList
                                data={item.services}
                                renderItem={({item:serItem}) => 
                                    <Text style={styles.services} numberOfLines={1} 
                                ellipsizeMode="tail">
                                        - {serItem.name}
                                    </Text>
                                }
                            />
                            <Text style={styles.title}>Customer: {item.customer.name}</Text>
                        </View>
                        <View style={styles.role} >
                            <Text style={styles.roleText} numberOfLines={1} 
    ellipsizeMode="tail">{item.price} đ</Text>
                        </View>
                    </TouchableOpacity>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: "white"
    },

    customerContainer: {
        backgroundColor: "white",
        borderColor: "#E2E2E2",
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,

    },

    info: {
        
    },

    id: {
        color: "black",
        fontWeight: "600",
        fontSize: 16,
        width: 280,
    }, 

    services: {
        color: "black",
        fontWeight: "500",
        width: 280
    },

    title: {
        fontWeight: "500",
        fontSize: 18
    },

    role: {
        marginTop: "auto",
        marginBottom: "auto",
        
    },

    roleText: {
        color: "#E64E6A",
        fontWeight: "600",
        fontSize: 17,
        textAlign: "right",
    },

})

export default Transaction;