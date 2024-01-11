import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Person} from '../types/person';

const dataStatus = [
    { label: 'Плохл', value: 'Плохо' },
    { label: 'Очень плохо', value: 'Очень плохо' },
    { label: 'Хорошо', value: 'Хорошо' },
];

export default function AddScreen({ navigation, route }) {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [status, setStatus] = useState("");
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const handleAddPerson = () => {
        const newPerson = new Person(
            Math.floor(Math.random() * 11),
            name,
            age,
            status
        );

        route.params.add(newPerson);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Введите имя:</Text>
            <TextInput
                editable
                multiline
                numberOfLines={1}
                maxLength={40}
                onChangeText={text => setName(text)}
                value={name}
                style={styles.input}
            />

            <Text style={styles.label}>Введите возраст:</Text>
            <TextInput
                editable
                multiline
                numberOfLines={1}
                maxLength={40}
                onChangeText={text => setAge(text)}
                value={age.toString()} // Ensure age is a string for TextInput
                style={styles.input}
            />
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
                placeholder={!isFocus ? 'Как он себя вел? Нажми и выбери' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                    setStatus(item.value)
                }}

            />

            <Button
                onPress={handleAddPerson}
                title="Добавить"
                style={styles.button}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {

        backgroundColor: 'gray',
    },
});
