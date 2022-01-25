import express, { Request, Response } from 'express';
import connectionToDB from './dataBase/connectionToMongoDb';
const cors = require('cors');
const { PORT } = require('../config');


class Server{
    
    app = express();
     
    constructor(){ 

        this.middleware();
        this.routers();
        this.connetionDB();
    }
    
    private routers = () => {
        //routers de la api
        this.app.get('/', (req:Request,res: Response) => {
            return res.json({
                status:200
            })
        })
        this.app.use(require('./routers/routerCompany'));
        this.app.use(require('./routers/routerUser'));
        this.app.use(require('./routers/routerReport'));
        this.app.use(require('./routers/routerUserProfile'));
        this.app.use(require('./routers/routerCategory'));
        this.app.use(require('./routers/routerFile'));
        this.app.use(require('./routers/routerToken'));
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

    listening = () => {
        //listening
        this.app.listen(PORT, () => {
            console.log(`server is listening on 5000`)
        });
    }

}

export = new Server();