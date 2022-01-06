import ReportInterface from "../interfaces/reportInterface";
import UserProfileInterface from "../interfaces/userProfileInterface";
import modelUserProfile from "../models/modelUserProfile";

const encript = require('bcryptjs');

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
                const profile: UserProfileInterface = await modelUserProfile.findOne({pro_name:data[key], pro_status:true});
                if (profile.pro_name == null){
                    return {
                        status:800,
                        message:"perfil de usuario no existe"}
                }
                data[key] = profile._id;
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

    listIds = ( model: object[] ) => {
        return model.map((datos:any) => {
            return datos._id;
        })
    }

    dataReportsUser = (reports: ReportInterface[]) => {
        let dataList: object[] = [];
        
        reports.forEach( (report: ReportInterface) => {
            const user_name = report.user_code.user_name;
            const rep_code = report.rep_code;
            const rep_create_date = report.rep_create_date;
            const dataReport = {
                user_name,
                rep_create_date,
                rep_code
            }
            dataList.push(dataReport);
        })
        
        return dataList

    }

}


export = new HelperUser;