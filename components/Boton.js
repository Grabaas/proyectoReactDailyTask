import React from "react";
import {View, Text,StyleSheet, TouchableOpacity, handlePress} from 'react-native'

const Boton =({btnText, onPress}) =>{
    return(
        <View>
            <TouchableOpacity style={StyleSheet.boton} onPress={onPress}> 
                <Text style={StyleSheet.textBoton}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
   
})
export default Boton;