import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Customer =({navigation}) => {
    const [customers, setCustomers] = useState([]);

    const loadCustomer = async () => {
        try {
            const getCus = await axios.get("https://kami-backend-5rs0.onrender.com/customers")
            const cus = getCus.data;
            setCustomers(cus);
            await AsyncStorage.setItem('Customers', JSON.stringify(cus));
            console.log(cus);
        } catch (error) {
            console.log("Customer load error:",error);
        }
    }

    const nav = useNavigation();

    useEffect(() => {
        const focused = nav.addListener('focus', () => {loadCustomer()});
        return focused;
    }, [customers])

    return(
        <SafeAreaView style = {styles.layout}>
            <FlatList style = {styles.layout}
                data={customers}
                renderItem={({item}) => 
                    <TouchableOpacity style={styles.customerContainer}
                                    onPress={()=>{}}
                    >
                        <View>
                            <Text style={styles.title}>Customer: <Text style={styles.info}>{item.name}</Text></Text>
                            <Text style={styles.title}>Phone: <Text style={styles.info}>{item.phone}</Text></Text>
                            <Text style={styles.title}>Total money: <Text style={styles.info}>{item.totalSpent}</Text></Text>
                        </View>
                        <View style={styles.role}>
                            <Icon name="bookmark" color="#E64E6A" size={30}></Icon>
                            <Text style={styles.roleText}>Member</Text>
                        </View>
                    </TouchableOpacity>
                }
            />

            <TouchableOpacity onPress={ () => navigation.navigate('Add customer')} style={styles.addButton}>
                <Icon name="plus-circle" color="#E64E6A" size={50}/>
            </TouchableOpacity>
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

    title: {
        marginVertical: 5,
        fontWeight: "bold",
        fontSize: 17,
    },

    info: {
        color: "black",
        fontWeight: "400",
    },

    role: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 40,
    },

    roleText: {
        color: "#E64E6A",
        fontWeight: "bold"
    },

    addButton: {
        position: "absolute",
        alignSelf: "flex-end",
        marginTop: 660,
        paddingRight: 20,
    }
})

export default Customer;