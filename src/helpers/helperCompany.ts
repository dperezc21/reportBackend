import { Request, Response } from "express"
const { consultProfile } = require("../controllers/controllerUserProfile");
const {encriptPassword} = require("./helperUser")

class HelperCompany{

    getDataCompany = async(req:Request, res:Response, data?:any) => {
        for (const key in data) {
            //console.log(data[key])
            if(key == "pro_name"){
                const idProfile = await consultProfile(data[key]);
                if (idProfile == null){
                    return res.json({
                        status:800,
                        message:"perfil de usuario no existe"})
                }
                data[key] = idProfile;
            }

            if (key =="user_password"){
                
                data.user_password = encriptPassword(data.user_password);
            }
        }
        return data;
    }
}

export = new HelperCompany;