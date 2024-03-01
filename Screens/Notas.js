import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, Alert, TextInput , View} from 'react-native'
import Nota from "../components/NotaComponent";
import Boton from "../components/Boton";


const Notas = () => {

    

    //DEFINIR EL ESTADO DE LA NTS

    const [notas, setNotas] = useState([
        { id: 1, titulo: "NOTA 1", contenido: "Contenido de la Nota 1" },
        { id: 2, titulo: "NOTA 2", contenido: "Contenido de la Nota 2" },

    ]);
    // FUNCION DE ABRIR NT
    const abrirNota = (titulo) => {
        Alert.alert(`${titulo}: bla bla bla`);  //AQUI DEJAR TAREA PARA QUE AGREGUEN EL CONTENIDO DE CADA NOTA
    }
    //Función para eliminar una nota
    const eliminarNota = (id) => {
        setNotas(notas.filter(nota => nota.id !== id));
    }
    //Función para agregar una nueva nota
    const agregarNota = (titulo, contenido) => {
        const nuevaNota = {
            id: notas.length + 1,
            titulo: titulo,
            contenido: contenido
        };
        setNotas([...notas, nuevaNota]);
    }


    //AQUI DECIRLES QUE DEBEN INVESTIGAR COMO EDITAR LA NOTA EXISTENTE


    // Estado y funciones para mostrar/ocultar el formulario
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoTitulo, setNuevoTitulo] = useState('');
    const [nuevoContenido, setNuevoContenido] = useState('');


    // MANEJAR EL l botón "Agregar Nota"
    const handleAgregarNota = () => {
        setMostrarFormulario(true);
    }


    //fffffffffffffffffunción para manejar el botón "Guardar Nota
    const handleGuardarNota = () => {  //AQUI DECLARAMOS NUESTRA FUNCION FLECHA DE MANEJO DE ESTADO
        agregarNota(nuevoTitulo, nuevoContenido); //LLAMAMOS LA FUNCION AGREGAR NOTA CON ATRIBUTOS
        setNuevoTitulo(''); //SE ENVIA EL NUEVO TITULO CON EL CONTENIDO ESCRITO POR EL USUARIO
        setNuevoContenido(''); //LO MISMO CON EL CONTENIDO
        setMostrarFormulario(false);   //OCULTAMOS FORMULARIO, ENTIENDE GABRIEL!!!!!
    }  

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MIS NOTAS</Text>
            {notas.map(nota => (
                <Nota
                    key={nota.id}
                    titulo={nota.titulo}
                    contenido={nota.contenido}
                    onPressAbrir={() => abrirNota(nota.titulo)}
                    onPressEliminar={() => eliminarNota(nota.id)}
                />
            ))}


            {!mostrarFormulario && (  //SI NO ES FALSO, MOSTRAMOS EL BOTON DE AGREGAR NOTA
                <Boton btnText="Agregar Nota" onPress={handleAgregarNota} />
            )}


            {mostrarFormulario && (     
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de la nota"
                        value={nuevoTitulo}
                        onChangeText={setNuevoTitulo}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contenido de la nota"
                        value={nuevoContenido}
                        onChangeText={setNuevoContenido}
                    />
                    <Boton btnText="Guardar Nota" onPress={handleGuardarNota} />
                </View>
            )}
        </View>
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
    inputContainer: {
        marginBottom: 20,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
})

export default Notas;