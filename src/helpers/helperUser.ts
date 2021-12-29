const encript = require('bcryptjs');
const { consultProfile } = require("../controllers/controllerUserProfile");

class HelperUser{

    encriptPassword = (password:string) => {
        const salt = encript.genSaltSync();
        const user_password = encript.hashSync(password, salt);
        return user_password;
    }

    getDataUserValid = async(data?:any) => {
        for (const key in data) {
            //console.log(data[key])
            if(key == "pro_name"){
                const idProfile = await consultProfile(data[key]);
                if (idProfile == null){
                    return {
                        status:800,
                        message:"perfil de usuario no existe"}
                }
                data[key] = idProfile;
            }
            if (key =="user_password"){
                data.user_password = this.encriptPassword(data.user_password);
            }
            if (key == "user_name") {
                data.user_name = data.user_name.toLowerCase();
            }
        }
        return data;
    }

    validIdsDelete = (ids:any[]) => {

        ids.forEach((id:any, index:number) => {
            if(typeof(id) != "number") {
                ids.splice(index)
            }
        });
        return ids
    }

}


export = new HelperUser;