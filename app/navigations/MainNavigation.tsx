import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNavigationParams} from '../types';
import {
    Home,
} from '../screens';
//import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator<StackNavigationParams>();
const MainNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigation;