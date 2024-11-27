import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { IconButton } from 'react-native-paper';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

const CustomerDetail = ({route, navigation}) => {
  const {customer} = route.params;

  const [trans, setTrans] = useState([]);
  const loadTrans = async()=>{
    try {
        const transRes= await axios.get('https://kami-backend-5rs0.onrender.com/Customers/' + customer._id)
        setTrans(transRes.data.transactions);
    } catch (error) {
        console.log(error);
    }
}
const funcDelete = async (id) =>{
    const token = (await AsyncStorage.getItem('loginToken'))?.replace(/"/g, '');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    await axios.delete(
        "https://kami-backend-5rs0.onrender.com/Customers/" + id,
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
const nav = useNavigation();
useEffect(() =>{
    const focused = nav.addListener('focus', () => {
        loadTrans()
        console.log(trans);
        
    })
    return focused
}, [navigation])
  
  return (
    <SafeAreaView style={styles.container}>
    <View style ={styles.top}>
                <IconButton icon="arrow-left" iconColor="white" size={24} onPress={()=>navigation.goBack()}/> 
                <Text style ={styles.titleTop}>Customer detail</Text>
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
                                                onPress: () => {funcDelete(customer._id)}
                                            }
                                        ])
                                        }}
                        ></MenuOption>
                        <MenuOption customStyles={
                                                    {optionWrapper: styles.menuOption,
                                                     optionText: styles.optionText   }} 
                                    text="Edit"
                                    onSelect={()=> navigation.navigate('Edit customer', {customer: customer})}
                        ></MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
      <View style={styles.generalCard}>
        <Text style={styles.cardTitle}>General information</Text>
        <Text style={styles.subTitle}>
          Name: <Text style={styles.detail}>{customer.name}</Text>
        </Text>
        <Text style={styles.subTitle}>
          Phone: <Text style={styles.detail}>{customer.phone}</Text>
        </Text>
        <Text style={styles.subTitle}>
          Total spent:{' '}
          <Text style={{color: '#E64E6A', fontWeight: '600'}}>
            {customer.totalSpent}
          </Text>
        </Text>
        <Text style={styles.subTitle}>
          Time: <Text style={styles.detail}>{customer.createdAt}</Text>
        </Text>
        <Text style={styles.subTitle}>
          Last upadate: <Text style={styles.detail}>{customer.updatedAt}</Text>
        </Text>
      </View>
      <View style={styles.generalCard}>
        <Text style={styles.cardTitle}>Transaction history</Text>
        <FlatList
          style={styles.layout}
          data={trans}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.customerContainer}
              onPress>
              <View style={styles.info}>
                <Text style={styles.id} numberOfLines={1} ellipsizeMode="tail">
                  {item.id} - {item.updatedAt}
                </Text>
                <FlatList
                  data={item.services}
                  renderItem={({item: serItem}) => (
                    <Text
                      style={styles.services}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      - {serItem.name}
                    </Text>
                  )}
                />
              </View>
              <View style={styles.role}>
                <Text
                  style={styles.roleText}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.price} đ
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  generalCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    margin: 10,
  },
  cardTitle: {
    color: '#E64E6A',
    fontWeight: '600',
    paddingBottom: 10,
  },
  subTitle: {
    color: 'black',
    fontWeight: '600',
  },
  detail: {
    fontWeight: '400',
  },
  customerContainer: {
    backgroundColor: 'white',
    borderColor: '#E2E2E2',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },

  info: {},

  id: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    width: 280,
  },

  services: {
    color: 'black',
    fontWeight: '500',
    width: 280,
  },

  title: {
    fontWeight: '500',
    fontSize: 18,
  },

  role: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  roleText: {
    color: '#E64E6A',
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'right',
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
});

export default CustomerDetail;
