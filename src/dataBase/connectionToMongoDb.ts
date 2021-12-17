require('dotenv').config();
import {config} from 'dotenv';
config();
import {connect} from 'mongoose';

 
const URL_MONGODB:any = process.env.URL_MONGODB;

const connectionToDB = async() =>{
    try {

        await connect(URL_MONGODB);
        console.log("connected to data base");
        
      } catch (error) {
        //console.log(error);
        throw new Error('Error to connect at date base')
      }
}

export = connectionToDB;