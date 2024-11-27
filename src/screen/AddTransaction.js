import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const AddTransaction = () => {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);

  const loadCustomer = async () => {
    try {
      const getCus = await axios.get(
        'https://kami-backend-5rs0.onrender.com/customers',
      );
      const cus = getCus.data;
      setCustomers(cus);
    } catch (error) {
      console.log('Customer load error:', error);
    }
  };
  const getService = async () => {
    try {
      const storedData = await AsyncStorage.getItem('services');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setServices(parsedData);
        return parsedData;
      } else {
        console.log('parsedData is null');
      }
    } catch (error) {
      console.log('Error when load userinfo: ', error);
    }
  };
  const nav = useNavigation();
  useEffect(() => {
    const focused = nav.addListener('focus', () => {
      loadCustomer();
      getService();
    });
    return focused;
  }, [customers]);
  return (
    console.log('list cus: ' + customers),
    (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Customers*</Text>
        <Dropdown
          style={styles.dropdown}
          data={customers}
          labelField="name"
          valueField="_id"
          placeholder="Select customer"
        />
        <FlatList
          data={services}
          renderItem={({item}) => 
            <BouncyCheckbox
            style={styles.checkboxContainer}
              text={item.name}
              textStyle={{
                textDecorationLine: 'none', // This removes the line-through
              }}
              fillColor="orange"
              onPress={() => {}}
            />
          }
          keyExtractor={item => item.id}
        />
        
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },

  title: {
    fontWeight: '600',
    color: 'black',
  },
  dropdown: {
    margin: 10,
    marginBottom: 30,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  checkboxContainer: {
    marginBottom: 10,
  },

  detailContainer: {

  },
});

export default AddTransaction;
