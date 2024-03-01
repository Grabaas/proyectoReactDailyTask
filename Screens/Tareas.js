import React, { useEffect, useState } from "react"; 
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Tasks = () => { 
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const storedTasks = await AsyncStorage.getItem('tasks'); 
                if (storedTasks) {
                    setTasks(JSON.parse(storedTasks)); 
                }
            } catch (error) {
                console.error('Error al obtener las tareas:', error); 
            }
        };
        fetchTasks();
    }, []); 

    const handleDeleteTask = async (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1); 
        setTasks(updatedTasks);
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        } catch (error) {
            console.error('Error al guardar las tareas actualizadas:', error); 
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}> 
            <Text style={styles.title}>Mis Tareas</Text> 
            {tasks.map((task, index) => ( 
                <View style={styles.taskContainer} key={index}> 
                    <Text style={styles.taskText}>{task.name}</Text> 
                    <Text style={styles.taskText}>{task.date}</Text> 
                    <Text style={styles.taskText}>Prioridad: {task.priority}</Text> 
                    <Text style={styles.taskText}>{task.content}</Text> 
                    <TouchableOpacity onPress={() => handleDeleteTask(index)}> 
                        <Text style={styles.buttonText}>Eliminar</Text> 
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: '#10454F',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    taskContainer: {
        backgroundColor: '#F5F5F5',
        padding: 20,
        borderRadius: 10,
        borderWidth: 0.2,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    taskText: {
        fontSize: 16,
        marginBottom: 10,
    },
    buttonText: {
        color: 'red', 
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export default Tasks; 