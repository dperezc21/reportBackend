import express, { Request, Response } from 'express';
import cors from 'cors';
import {PORT} from '../config';

import database from './dataBase/connectionToMongoDb';

//const dataBase = new connectionToDB();

class Server{
    
    app = express();
    //sllServer:any;
     
    constructor(){ 
        // this.sllServer = https.createServer({
        //     cert: fs.readFileSync(path.join(__dirname,'/novedades.ludyorder.com.csr')),
        //     key: fs.readFileSync(path.join(__dirname,'/novedades.ludyorder.com.key'))
        // }, this.app)
        this.middleware();
        this.routers();
        this.connectionDB().then();
    }
    
    private routers = () => {
        //routers de la api
        this.app.get('/', (req:Request,res: Response) => {
            return res.status(200).json({
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
        this.app.use(require('./routers/routerIdType'));
        this.app.use(require('./routers/routerGender'));
    }
   
    private connectionDB = async() => {
        //connection a la base de datos en mongodb
        await database.connectionToDB();
    }

    private middleware = () => {
        //uso de middlewares
        this.app.use(express.json())
        this.app.use(cors());
    }

    listening = () => {
        //listening
        this.app.listen(PORT, () => {
            console.log(`server is listening on ${PORT}`)
        });
    }

}

export = new Server();