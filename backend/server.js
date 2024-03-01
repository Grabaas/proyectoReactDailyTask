const express = require('express');//importaos el framework de express
const mongoose = require('mongoose');//Libreria de modelado de mongo
const bodyParser = require('body-parser')//middleware para analizar el cuerpo de la peticion
const cors = require('cors');//Permite solicitudes

const app = express();//creamos una instancia de express llamada app
const PORT = process.env.PORT || 3000;//Definimos el puerto del servidor

//AHORA INICIAMOS NUESTRO SERVIDOS
app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`) //Mensaje de inicio de servidor 

})

//AHORA EL MIDDLEWARE
app.use(bodyParser.json());//Usamos esto para analizar el cuerpo y pasarlo a json
app.use(cors());//Permite solicitudes de recursos

//AHORA LA CONEXION A MONGO ATLAS
//AQUI DEBEMOS ESTABLECER NUESTRO PROPIOS DATOS Y CADENA DE CONEXION OTORGADA ATLAS

mongoose.connect('mongodb+srv://JoseGabriel:Estoesmongo@cluster0.wlzz7pc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' , {
    dbName: 'Proyecto',//Nombre de mi base de datos(no coleccion)
    useNewUrlParser: true,//Para analizar la URL
    useUnifiedTopology: true//Para utilizar tipologia unificada
}).then(() => {//Una promesa, si la cadena de conexion es correcta y conecta nos muestra un mensaje
    console.log('Conenctado a la base de datos de mongo atlas');
}).catch((error) => {//Un catch de error, al tener un valor incorrecto o un problema de 
    console.log('Error Al conectar buuu', error)
})

/* A PARTIR DE AQUI GENERO AL USUARIO */
//Crear nuestra estructura schema de nuestrO DOCUMENTO
const UserSchama = new mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    usuario: String,
    email: String,
    contraseña: String
})
//Creamos el modelo de usuario y lo exportamos
const User = mongoose.model('Usuarios', UserSchama)
module.exports = User;

//Ruta para obtener todos los usuarios
app.get('/api/usuarios/', async (req, res) => {
    try {
        const users = await User.find({}); //Aqui consultamos todo
        res.json(users)
    }
    catch (error) {
        console.log(error)
        console.log('error al traer datos de la coleccion')
    }
})

/* A PARTIR DE AQUI GENERO AL NOTAS */

//Crear nuestra estructura schema de nuestrO DOCUMENTO
const NotaSchama = new mongoose.Schema({
    nombreN: String,
    nontenidoNontenidoN: String,

})
//Creamos el modelo de usuario y lo exportamos
const Notas = mongoose.model('Notas', NotaSchama)
module.exports = Notas;

//Ruta para obtener todos los usuarios
app.get('/api/notas/', async (req, res) => {
    try {
        const notas = await Notas.find({}); //Aqui consultamos todo
        res.json(notas)
    }
    catch (error) {
        console.log(error)
        console.log('error al traer datos de la coleccion')
    }
})
