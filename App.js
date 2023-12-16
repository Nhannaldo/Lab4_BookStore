import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { MyContextControllerProvider } from './context';
import { BookDetail } from "./screens/"; 
import Tabs from "./navigation/tabs";
import { Login } from './screens/Login';

const theme = {
    ...DefaultTheme, 
    colors: {
        ...DefaultTheme.colors, 
        border: "transparent"
    }
}
const Stack = createStackNavigator(); 
const App = () => {
    return (
        <MyContextControllerProvider>
        <NavigationContainer theme={theme}>
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Tab'}
            >
                {/* Tabs */}
                <Stack.Screen name="Tab" component={Tabs} />
                <Stack.Screen name="Login" component={Login} />
                {/* Screens */}
                <Stack.Screen name="BookDetail" component={BookDetail} 
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
        </MyContextControllerProvider>
    )
}

export default App;


