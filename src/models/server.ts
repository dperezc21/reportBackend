import express, { Request, Response } from 'express';
import connectionToDB from '../dataBase/connectionToMongoDb';
const cors = require('cors');


class Server{
    
    app = express();
    constructor(){
        
        this.configuracion();
        this.middleware();
        this.routers();
        this.connetionDB();
    }
    
    private routers = () => {
        //routers de la api
        this.app.use(require('../routers/routerCompany'));
        this.app.use(require('../routers/routerUser'));
        this.app.use(require('../routers/routerReport'));
        this.app.use(require('../routers/routerUserProfile'));
        this.app.use(require('../routers/routerCategory'));
        this.app.use(require('../routers/routerFile'));
        this.app.use(require('../routers/routerToken'));
    }

    private connetionDB = async() => {
        //connection a la base de datos en mongodb
        await connectionToDB();
    }

    private middleware = () => {
        //uso de middlewares
        this.app.use(express.json())
        this.app.use(cors());
    }

    private configuracion = () => {
        //asignando puerto 
        this.app.set('port', process.env.PORT || 3000);
    }

    listening = () => {
        //listening
        this.app.listen(this.app.get('port'), () => {
            console.log(`server is listening on ${this.app.get('port')}`)
        });
    }

}

export = new Server();