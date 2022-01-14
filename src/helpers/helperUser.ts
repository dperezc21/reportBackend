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
            return datos._id;
        })
    }

    orderReports = (data: object[]) => {
        let ordered_list: object[] = [];

        ordered_list = data.sort( (element1: any, element2: any) => 
            ( element1.date > element2.date)? 1: -1)
        return ordered_list;
    }

    dataReportsUser = (reports: ReportInterface[]) => {
        let data_list: object[] = [];
        let data: any = {};
        reports.forEach((report: ReportInterface) => {
            const date = new Date(report.rep_create_date)
            const d = moment(date).format("YYYY-M");
            
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
        const orderedReports: object[] = this.orderReports(data_list);
        return orderedReports;

    }

}


export = new HelperUser;