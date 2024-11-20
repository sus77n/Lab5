import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Service from "../screen/Service";
import Icon from 'react-native-vector-icons/FontAwesome';
import Transaction from "../screen/Transaction";
import Customer from "../screen/Customer";
import Settings from "../screen/Setting";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddService from "../screen/AddService";
import ServiceDetail from "../screen/ServiceDetail";
import EditService from "../screen/EditService";
import TransactionDetail from "../screen/TransactionDetail";
import AddCustomer from "../screen/AddCustomer";
import LoginScreen from "../screen/Login";

const Stack = createNativeStackNavigator();
const ServiceNavigator = ({navigation}) => {
    return(
        <Stack.Navigator screenOptions={({route})=>({
            headerStyle:{
                backgroundColor: "#E64E6A",
            },
            headerTintColor: "white",
            
        })}>
            <Stack.Screen name="Service" component={Service} options={{headerShown: false}}/>
            <Stack.Screen name="Add" component={AddService}/>
            <Stack.Screen name="Service detail" component={ServiceDetail} options={{headerShown: false}}/>
            <Stack.Screen name="Edit" component={EditService}/>
        </Stack.Navigator>
    )
}

const TransNavigator = ({navigation}) =>{
    return(
        <Stack.Navigator screenOptions={({route})=>({
            headerStyle: {
                backgroundColor: "#E64E6A",
            },

            headerTitleStyle: {
                color: "white",
                fontWeight: "bold",
            },

            headerTintColor: "white",
        })}>
            <Stack.Screen name="Transaction" component={Transaction}/>
            <Stack.Screen name="Transaction detail" component={TransactionDetail} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

const CustomerNavigator =({navigation}) => {
    return(
        <Stack.Navigator screenOptions={({route})=>({
            headerStyle: {
                backgroundColor: "#E64E6A",
            },

            headerTitleStyle: {
                color: "white",
                fontWeight: "bold",
            },

            headerTintColor: "white",
        })}>
            <Stack.Screen name="Customer" component={Customer}/>
            <Stack.Screen name="Add customer" component={AddCustomer}/>
        </Stack.Navigator>
    )
}

const SettingNavigator =({navigation}) =>{
    return(
        <Stack.Navigator screenOptions={({route})=>({
            headerStyle:{
                backgroundColor: "#E64E6A",
            },
            headerTintColor: "white",
            
        })}>
            <Stack.Screen name="Settings" component={Settings}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

const MainNavigation = ({navigation}) =>{
    const Tab = createBottomTabNavigator();

    return(
        <Tab.Navigator
           screenOptions={({route}) => ({
            tabBarIcon: ({ focused, color, size}) =>{
                let iconName;
                if(route.name ==="Home"){
                    iconName ="home"
                } else if (route.name ==="Transaction"){
                    iconName ="money"
                } else if (route.name ==="Customer"){
                    iconName ="users"
                } else {
                    iconName ="cog"
                }

                return <Icon name={iconName} size={size} color={color}/>
            },
            tabBarActiveTintColor: "#E64E6A",
            tabBarInactiveTintColor: "grey",
            tabBarLabelStyle:{
                fontSize: 12,
            },
            tabBarStyle: {
                height: 55,
            },

            headerStyle: {
                backgroundColor: "#E64E6A",
            },

            headerTitleStyle: {
                color: "white",
                fontWeight: "bold",
            },

           })} >
                <Tab.Screen name="Home" component={ServiceNavigator} options={{headerShown: false}}/>
                <Tab.Screen name="Transaction" component={TransNavigator} options={{headerShown: false}}/>
                <Tab.Screen name="Customer" component={CustomerNavigator} options={{headerShown: false}}/>
                <Tab.Screen name="Settings" component={SettingNavigator} options={{headerShown: false}}/>
        </Tab.Navigator>
    )
}

export default MainNavigation;