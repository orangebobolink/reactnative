import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from '../screens/MainScree';
import AddScreen from '../screens/AddScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator()

export default function Navigate(){
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Пункт выбора"
                          component={MainScreen}
                          options={{title:'Ho-ho-ho'}}/>
            <Stack.Screen name="Список деда мороза"
                          component={HomeScreen}
            />
            <Stack.Screen name="Добавить человечка"
                          component={AddScreen}
                          options={{title:'Добавление'}}/>
        </Stack.Navigator>
    </NavigationContainer>
}