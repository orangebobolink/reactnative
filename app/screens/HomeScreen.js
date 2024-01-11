import {FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View} from 'react-native';
import {useEffect, useState} from 'react';
import DropMenu from '../components/DropMenu';
import React, { Component } from 'react'
import DialogPost from '../components/dialog/DialogPost';
import DialogWork from '../components/dialog/DialogWork';
import DialogDelete from '../components/dialog/DialogDelete';
import * as FileSystem from 'expo-file-system';
import {useCustomColorScheme} from '../components/ColorSchemeContext';
import ThemeSwitch from '../components/ThemeSwitch';


export default function HomeScreen({navigation, route}) {
    const [selectedPerson, setSelectedPerson] = useState({})
    const [people, setPeople] = useState(route.params.people)
    const [viewPeople, setViewPeople] = useState(people)
    const { colorScheme, setCustomColorScheme } = useCustomColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,

            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
        },
        text: {
            color: colorScheme === 'dark' ? 'white' : 'black',
        },
        button: {
            backgroundColor: colorScheme === 'dark' ? 'gray' : 'lightgray',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
        },
        buttonText: {
            fontSize: 16,
            color: 'blue',
            // Add any other styles you want for the Text component
        },
        flatListContainer: {
            flex: 1,
            marginTop: -200,
        },
        itemContainer: {
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
        },
        menu: {

        },
    });

    useEffect(() => {
        setViewPeople(people);
    }, [people]);

    const showAddView = () => {
        navigation.navigate("Добавить человечка", {
            add: add
        })
    }

    const add = (employee) => {
        setPeople((prevEmployees) => [...prevEmployees, employee]);
        setViewPeople(people);
    }


    const remove = () => {
        setPeople(people.filter(item => item.status === "Хорошо"))
        setViewPeople(people)

    }

    const writeToJsonFile = async (fileName) => {
        try {

            const path =  FileSystem.documentDirectory + 'yourfile.json';
            await FileSystem.writeAsStringAsync(path, JSON.stringify(people));
            console.log(`Data has been written to ${path}`);
        } catch (error) {
            console.error('Error writing to file:', error);
        }
    };

    return (
        <View style={styles.container}>

            <DropMenu add={showAddView}
                      remove={remove}
                      style={styles.menu}
                      saveDate={writeToJsonFile}/>
            <FlatList
                data={viewPeople}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => setSelectedPerson(item)}
                        style={styles.itemContainer} // Add a style for the item container
                    >
                        <Text style={styles.buttonText}>{item.name} {item.status}</Text>
                    </TouchableOpacity>
                )}
                style={styles.flatListContainer} // Add a style for the FlatList container
            />

        </View>

    );
}


