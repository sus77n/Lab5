import React, { useContext } from "react";
import { Alert, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screen/Login";
import Service from "../screen/Service";
import { AuthContext } from "../context/AuthContext";
import MainNavigation from "./MainNavigation";
import AddService from "../screen/AddService";
import ServiceDetail from "../screen/ServiceDetail";
import EditService from "../screen/EditService";
import { IconButton } from 'react-native-paper';


const Stack = createNativeStackNavigator();

const Navigation = () => {
    const {userInfo} = useContext(AuthContext);
    
    return (
        <NavigationContainer>
             <Stack.Navigator
                screenOptions={({route})=>({
                    headerStyle:{
                        backgroundColor: "#E64E6A",
                    },
                    headerTintColor: "white",
                    
                })}
             >
                {userInfo.token ? 
                    <>
                        <Stack.Screen name="MainNavigation" component={MainNavigation} options={{headerShown: false}}/>
                        <Stack.Screen name="Service" component={Service} options={{headerShown: false}}/>
                        <Stack.Screen name="Add" component={AddService}/>
                        <Stack.Screen name="Service detail" component={ServiceDetail} options={{headerShown: false}}/>
                        {/* options={({navigation})=>({
                            headerTitle: "Service detail",
                            headerLeft: () => (
                                <IconButton icon="arrow-left" style={{ marginLeft: -10, marginRight: 15 }} iconColor="white" size={24} onPress={()=>navigation.goBack()}/>
                            ),
                            headerRight: () =>(
                                <IconButton icon="dots-vertical" iconColor="white" size={24} onPress={() => Alert.alert("Menu here")}/>
                            )
                        })} */}
                        <Stack.Screen name="Edit" component={EditService}/>
                    </>
                :
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                    </>
                }       
             </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation