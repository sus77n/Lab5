import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from "../context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddService from "./AddService";
import ServiceDetail from "./ServiceDetail";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const Service = ({navigation}) => {
  // const { userInfo, services, loadService} = useContext(AuthContext);
  // userInfo
  const [userInfo, setUserInfo] = useState({});
  const [services, setServices] = useState([]);

  const getUserInfo = async () =>{
      try {
          const storedData = await AsyncStorage.getItem('userInfo');
          if (storedData) {
              const parsedData = JSON.parse(storedData);
              setUserInfo(parsedData);
              return parsedData;   
          } else {
              console.log("parsedData is null");
          }
      } catch (error) {
        console.log("Error when load userinfo: ", error);
      }
  }

  const loadService = async() => {
    try {
        const serRes = await axios.get('https://kami-backend-5rs0.onrender.com/services')
        const ser = serRes.data;
        await AsyncStorage.setItem('services', JSON.stringify(ser));
    } catch (error) {
        console.log("Load service failed")
    }
}

  const getService = async () => {
    await loadService();
    try {
      const storedData = await AsyncStorage.getItem('services');
      if (storedData) {
          const parsedData = JSON.parse(storedData);
          setServices(parsedData);
          return parsedData;
      } else {
          console.log("parsedData is null");
      }
    } catch (error) {
      console.log("Error when load userinfo: ", error);
    }
  }

    const nav = useNavigation();
    useEffect(() => {
        const focused = nav.addListener('focus', () =>{
          getService();
          getUserInfo();
        });
        return focused;
    }, [navigation]);

    return (
        <SafeAreaView style = {styles.layout}>
            <View style ={styles.top}>
                <Text style ={styles.title}>{userInfo.name}</Text>
                <TouchableOpacity style={styles.button} 
                    onPress={() => {}}>
                    <Icon name="user" color="#E64E6A" size={20}/> 
                </TouchableOpacity>
            </View>
            <View style = {styles.main}>
                <View style = {styles.logo}>

                </View>
                <View style = {styles.wrap}>
                    <View style={styles.row}>
                        <Text style = {styles.titleList}>Danh sách dịch vụ</Text>
                        <TouchableOpacity onPress={ () => navigation.navigate('Add')}>
                            <Icon name="plus-circle" color="#E64E6A" size={30}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.list}>
                        <FlatList
                            data={services}
                            renderItem={({item}) =>
                            <TouchableOpacity 
                              style={styles.service}
                              onPress={() => navigation.navigate('Service detail', {service: item})}>
                                <Text style = {styles.titleList}>{item.name}</Text>
                                <Text style = {styles.price}>{item.price} đ</Text>
                            </TouchableOpacity>
                            }
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    layout: {
      flex: 1,
      backgroundColor:"white",
    },

    top : {
      paddingVertical: 15,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#E64E6A",
      height: 60,
    },

    title: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 20,
    },

    button : {
      backgroundColor: "white",
      width: 30,
      height: 30,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },

    main: {
      flex: 1,
      marginHorizontal: 15,
      marginVertical: 20,
    },

    logo: {

    },

    image: {

    },

    wrap :{
        flex: 1,
    },

    titleList: {
      fontWeight: "700",
      fontSize: 18,
      width: 230,
      color: "black",
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between"
    },

    list: {
      marginVertical: 10,
    },

    service: {
      flexDirection: "row",
      justifyContent:"space-between",
      borderWidth: 1,
      borderColor: "#E2E2E2",
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 10,
      marginBottom: 10,
    },

    price: {
      fontWeight: "400",
      fontSize: 18,
      color: "black",
    }
})

export default Service;