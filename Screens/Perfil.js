import React, { useState } from 'react'; // Importa React y el hook useState
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'; // Importa componentes de React Native
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP

// Importa la imagen de fondo
const backgroundImage = require('../imagenes/background.jpg');

// Define el componente Perfiles
const Perfiles = () => {
    // Define estados para almacenar datos de usuario, datos de inicio de sesión, estado de inicio de sesión, carga de datos, y errores
    const [userData, setUserData] = useState(null);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Función para manejar el inicio de sesión
    const handleLogin = async () => {
        setLoading(true); // Establece loading a true para mostrar que la carga está en progreso
        setError(''); // Reinicia el estado de error

        try {
            // Realiza una solicitud POST para iniciar sesión enviando los datos de inicio de sesión
            const response = await axios.post('http://172.31.99.145:3000/api/login', loginData);
            console.log('Usuario autenticado:', response.data); // Imprime los datos del usuario autenticado
            setUserData(response.data); // Almacena los datos del usuario autenticado en el estado
            setLoggedIn(true); // Establece loggedIn a true para mostrar los datos del usuario
        } catch (error) {
            console.error('Error al iniciar sesión:', error.response.data); // Maneja errores de inicio de sesión
            setError('Credenciales incorrectas. Inténtalo de nuevo.'); // Establece el mensaje de error
        } finally {
            setLoading(false); // Establece loading a false cuando la solicitud haya terminado (éxito o fracaso)
        }
    };

    return (
        // Componente de imagen de fondo
        <ImageBackground source={backgroundImage} style={styles.background}>
            {/* Contenedor principal */}
            <View style={styles.container}>
                {/* Si el usuario está autenticado, muestra los datos del usuario */}
                {loggedIn ? (
                    userData !== null && userData.length > 0 ? (
                        userData.map(user => (
                            <View key={user._id}>
                                <Text style={styles.userInfo}>Nombre: {user.nombre}</Text>
                                <Text style={styles.userInfo}>Email: {user.email}</Text>
                                <Text style={styles.userInfo}>Usuario: {user.usuario}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.loadingText}>Cargando...</Text> // Muestra "Cargando..." mientras se obtienen los datos
                    )
                ) : (
                    // Si el usuario no está autenticado, muestra el formulario de inicio de sesión
                    <View style={styles.loginContainer}>
                        <Text style={styles.title}>Iniciar Sesión</Text>
                        {/* Muestra el mensaje de error si existe */}
                        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
                        {/* Input para el email */}
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={loginData.email}
                            onChangeText={text => setLoginData({ ...loginData, email: text })}
                        />
                        {/* Input para la contraseña */}
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            value={loginData.password}
                            onChangeText={text => setLoginData({ ...loginData, password: text })}
                        />
                        {/* Botón para iniciar sesión */}
                        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>{loading ? "Cargando..." : "Iniciar Sesión"}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ImageBackground>
    );
};

// Estilos para los componentes
const styles = StyleSheet.create({
    // Estilo para la imagen de fondo
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Estilo para el contenedor principal
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fondo blanco con opacidad
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        width: '100%',
    },
    // Estilo para el contenedor del formulario de inicio de sesión
    loginContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo blanco con opacidad
        borderRadius: 10,
        alignItems: 'center',
    },
    // Estilo para el título
    title: {
        color: '#10454F',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    // Estilo para los inputs
    input: {
        height: 40,
        borderColor: '#10454F',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
        borderRadius: 5,
    },
    // Estilo para el texto de carga
    loadingText: {
        color: '#10454F',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Estilo para la información del usuario
    userInfo: {
        color: '#10454F',
        fontSize: 18,
        marginBottom: 10,
    },
    // Estilo para el texto de error
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
    // Estilo para el botón de inicio de sesión
    loginButton: {
        backgroundColor: '#10454F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    // Estilo para el texto del botón de inicio de sesión
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Perfiles;