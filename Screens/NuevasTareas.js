import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateTasks = () => {
   
    const [taskName, setTaskName] = useState('');
    const [taskDate, setTaskDate] = useState(new Date());
    const [taskPriority, setTaskPriority] = useState('');
    const [taskContent, setTaskContent] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigation = useNavigation();

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || taskDate;
        setShowDatePicker(false);
        setTaskDate(currentDate);
    };

    const handleSaveTask = async () => {
        const taskData = {
            name: taskName,
            date: taskDate.toLocaleDateString(),
            priority: taskPriority,
            content: taskContent
        };
        try {
            const existingTasks = await AsyncStorage.getItem('tasks');
            let tasks = [];
            if (existingTasks) {
                tasks = JSON.parse(existingTasks);
            }

            tasks.push(taskData);
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            navigation.navigate('Tasks');
        } catch (error) {
            console.error('Error al guardar la tarea:', error);
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* Título de la pantalla */}
                <Text style={styles.title}>Crear Tarea</Text>
                {/* Input para el nombre de la tarea */}
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de la tarea"
                    value={taskName}
                    onChangeText={text => setTaskName(text)}
                />
                {/* Botón para abrir el selector de fecha */}
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Seleccionar Fecha</Text>
                </TouchableOpacity>
                {/* Selector de fecha (solo visible si showDatePicker es true) */}
                {showDatePicker && (
                    <DateTimePicker
                        value={taskDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                {/* Input para el contenido de la tarea */}
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    placeholder="Contenido"
                    multiline={true}
                    value={taskContent}
                    onChangeText={text => setTaskContent(text)}
                />
                {/* Selector de prioridad de la tarea */}
                <Picker
                    style={styles.inputPicker}
                    selectedValue={taskPriority}
                    onValueChange={(itemValue) => setTaskPriority(itemValue)}
                >
                    <Picker.Item label="Baja" value="baja" />
                    <Picker.Item label="Media" value="media" />
                    <Picker.Item label="Alta" value="alta" />
                    <Picker.Item label="Urgente" value="urgente" />
                </Picker>
                {/* Botón para guardar la tarea */}
                <TouchableOpacity
                    onPress={handleSaveTask}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>GUARDAR TAREA</Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: '#10454F',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 10,
    },
    inputPicker: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#BDE038',
        padding: 10,
        margin: 10,
        marginTop: 1,
        width: 200,
        alignSelf: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white'
    }
});

export default CreateTasks;