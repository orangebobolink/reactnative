import React, { useState, useEffect } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import * as FileSystem from 'expo-file-system';
import {Person} from '../types/person';
import ImageApp from '../../assets/download.jpg'
import {Dropdown} from 'react-native-element-dropdown';

const dataStatus = [
    { label: 'Показать всех', value: 'Всех' },
    { label: 'Плохое', value: 'Плохо' },
    { label: 'Очень плохое', value: 'Очень плохо' },
    { label: 'Хорошее', value: 'Хорошо' },
];

export default function MainScreen({navigation}) {
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    const fetchData = async (status) => {
        try {
            const fileUri = FileSystem.documentDirectory + 'yourfile.json';
            const jsonData = await FileSystem.readAsStringAsync(fileUri);
            const parsedData = JSON.parse(jsonData);
            const people = parsedData.map(item => new Person(item.id,
                item.name,
                item.age,
                item.status,
            ))
            if(status ==='Всех') {

                setData(people);
            } else {
                const dataPeople = people.filter(p => p.status === status);
                setData(dataPeople);
            }
        } catch (error) {
            console.error('Error reading JSON file:', error);
        } finally {
            setLoading(false);
        }
    };



    const showHomePage = () => {
        navigation.navigate("Список деда мороза", {
            people: data
        })
    }

    return (
        <View>
            {

                isLoading
                ? ( <View>
                        <Image source={ImageApp}
                               style={styles.tinyLogo}/>

                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue'}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dataStatus}
                            maxHeight={500}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Нажми' : '...'}
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                                fetchData(item.value)
                            }}

                        />
                    </View>
                        )
                : (showHomePage())
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        borderColor:'blue'
    },
    dropdown: {
        paddingLeft:50,
        paddingRight:50
    },
    tinyLogo: {
        width: 300,
        height: 300,
        marginLeft:50,
        marginTop:10
    },
    logo: {
        width: 66,
        height: 58,
    },
});