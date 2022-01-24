const { JSON_WEB_TOKEN_KEY } =require( "../../config");

const jwt = require('jsonwebtoken');

//metodo para generar json web token
const generateJWT = (uid:string, user_name:string) =>{

    return new Promise((resolve, reject) =>{
        const payload: object = {uid, user_name};
        jwt.sign(payload, process.env.JSON_WEB_TOKEN_KEY,{
        }, (error:any, token:string) =>{
            if (error){
                console.log(error);
                reject('token no generado')
            }else{
                resolve(token);
            }
        })

    })

}


export = generateJWT;