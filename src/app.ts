import express, { Request, Response } from 'express';
import connectionToDB from './dataBase/connectionToMongoDb';
const cors = require('cors');
const app = express();
connectionToDB();
app.set('port', process.env.PORT || 3000);
app.use(express.json())
app.use(cors());
app.use(require('./routers/routerCompany'));
app.use(require('./routers/routerUser'));
app.use(require('./routers/routerReport'));
app.use(require('./routers/routerUserProfile'));
app.use(require('./routers/routerCategory'));
app.get('/', (req:Request, res:Response) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(app.get('port'), () =>console.log(`server is listening on ${app.get('port')}`));