import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native"; //PONER DESPUES, HASTA CREAR EL BOTON
import Loading from "../components/loading/Index";
import NuevasTareas from "./NuevasTareas";

const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Loading loading={false}>
            <Text style={styles.title}>Que quieres hacer hoy?</Text>
            {/* Este es uno boton */}
            <GestureHandlerRootView>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Notas")}
                    style={styles.boton}
                >
                    <Text style={styles.btnText}>
                        IR A MIS NOTAS
                    </Text>

                </TouchableOpacity>
            </GestureHandlerRootView>
            {/* Este es otro Boton */}
            <GestureHandlerRootView>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Tareas")}
                    style={styles.boton}
                >
                    <Text style={styles.btnText}>
                        VER TAREAS
                    </Text>

                </TouchableOpacity>
            </GestureHandlerRootView>
            {/* Este es otro Boton */}
            <GestureHandlerRootView>
                <TouchableOpacity
                    onPress={() => navigation.navigate("NuevasTareas")}
                    style={styles.boton}
                >
                    <Text style={styles.btnText}>
                        VER NUEVAS TARERAS
                    </Text>

                </TouchableOpacity>
            </GestureHandlerRootView>
            </Loading>
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
    boton: {
        backgroundColor: '#BDE038',
        padding: 10,
        marginTop: '20%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10
    },
    btnText: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white'
    }
})

export default Home;