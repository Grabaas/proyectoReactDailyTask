import React from "react";
import {ActivityIndicator, StyleSheet,View} from "react-native";
import { useState,useEffect } from "react";

function Loading({ children }) {
    // Definición del estado "loading" utilizando useState
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Definición de un temporizador que cambiará el estado "loading" después de 10 segundos
        const timer = setTimeout(() => {
            setLoading(false); // Cambio del estado "loading" a false
        }, 10000); // El temporizador se establece para 10 segundos (10000 milisegundos)


        return () => clearTimeout(timer);
    }, []); // El efecto se ejecuta solo una vez después del montaje del componente (arreglo de dependencias vacío)

    // Renderizado condicional basado en el estado "loading"
    return (
        <View >
            {/* Si "loading" es true, muestra el indicador de actividad */}
            {loading ? (
                <ActivityIndicator size='large' color='black' />
            ) : (
                /* Si "loading" es false, muestra el contenido pasado como hijo */
                children
            )}
        </View>
    );
}

export default Loading;