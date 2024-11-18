import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Service from "../screen/Service";
import Icon from 'react-native-vector-icons/FontAwesome';
import Transaction from "../screen/Transaction";
import Customer from "../screen/Customer";
import Settings from "../screen/Setting";

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
            }
           })} >
                <Tab.Screen name="Home" component={Service} options={{headerShown: false}}/>
                <Tab.Screen name="Transaction" component={Transaction} options={{headerShown: false}}/>
                <Tab.Screen name="Customer" component={Customer} options={{headerShown: false}}/>
                <Tab.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
        </Tab.Navigator>
    )
}

export default MainNavigation;