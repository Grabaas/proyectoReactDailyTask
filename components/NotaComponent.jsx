import React from "react";
import { View, Text, StyleSheet } from 'react-native'
import Boton from "./Boton";

const Nota = ({ titulo, contenido, onPressAbrir, onPressEliminar }) => {
    return (
        <View style={styles.noteContainer}>
            <Text style={styles.noteTitle}>{titulo}</Text>
            <Text style={styles.noteContent}>"{contenido}"</Text>
            <View style={styles.buttonsContainer}>
                <Boton btnText={'ABRIR NOTA'} onPress={onPressAbrir} />
                <Boton btnText={'ELIMINAR NOTA'} onPress={onPressEliminar} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    noteContainer: {
        backgroundColor: '#F5F5F5',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noteContent: {
        fontSize: 16,
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
})

export default Nota;