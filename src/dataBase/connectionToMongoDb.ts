require('dotenv').config();
import {connect} from 'mongoose';
const { URL_MONGODB } = require('../../config');

//url de conexion obtenido de las variables de entorno
const URL:any = process.env.URL_MONGODB;

const connectionToDB = async() =>{
    try {
        //function de mongoose para establecer la conexion
        await connect(URL);
        console.log("connected to data base");
        
      } catch (error) {
        console.log(error);
        throw new Error('Error to connect at date base')
      }
}

export = connectionToDB;