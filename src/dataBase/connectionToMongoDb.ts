
import {connect, Mongoose} from 'mongoose';
import {URL_MONGODB} from '../../config';

class ConnectionDB {
    private static connection: ConnectionDB;
    private readonly URL_CONNECTION: string = URL_MONGODB;

    constructor() {
        if(ConnectionDB.connection == null) {
            ConnectionDB.connection = this;
        }
        return ConnectionDB.connection;
    }

    connectionDB(): Promise<Mongoose> {
        return connect(this.URL_CONNECTION);
    }

    async connectionToDB() {
        try {
            //function de mongoose para establecer la conexion
            await this.connectionDB();
            console.log("connected to data base");

        } catch (error) {
            console.log(error);
            throw new Error('Error to connect at date base')
        }
    }
}

export default new ConnectionDB();
/*

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

export = connectionToDB;*/
