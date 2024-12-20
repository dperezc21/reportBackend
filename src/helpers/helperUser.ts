import moment from "moment";
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
            return datos._id
        })
    }


    dataReportsUser = (reports: ReportInterface[], format_date:string ="YYYY-M") => {
        let data_list: object[] = [];
        let data: any = {};
        reports.forEach((report: ReportInterface) => {
            const date = new Date(report.rep_create_date)
            const d = moment(date).format(format_date);
            
            if(Object.keys(data).includes(d)){
                data[d] +=1;
            }else{
                data[d] = 1;
            }   
        });
        
        for (const key in data) {
            const date = key
            const num_reports = data[key];
            data_list.push({
                date,
                num_reports
            });
        }
        return data_list;

    }

}


export = new HelperUser;