const jwt = require('jsonwebtoken');

const generateJWT = (uid:string, user_name:string) =>{

    return new Promise((resolve, reject) =>{
        const payload = {uid, user_name};
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