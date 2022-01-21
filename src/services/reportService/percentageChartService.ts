
import CompanyInterface from "../../interfaces/companyInterface";
import FileInterface from "../../interfaces/fileInterface";
import ReportInterface from "../../interfaces/reportInterface";
import UserInterface from "../../interfaces/userInterface";
import modelCompany from "../../models/modelCompany";
import modelFile from "../../models/modelFile";
import modelReport from "../../models/modelReport";
import modelUser from "../../models/modelUser";
const { configFile } =require( "../../helpers/dataConfig");
const {configReport } = require( "../../helpers/dataConfig");
const {listIds} = require('../../helpers/helperUser');


const grafic = async(com_name:any) => {

    try {
        const company: CompanyInterface = await modelCompany.findOne({com_name, com_status:true});
        if (!company){
            return {
                status: 605,
                message:"compañia no existe"
            }
        }
        const users: UserInterface[] = await modelUser.find({com_id:company._id, user_status:true});
        if(users.length == 0){
            return {status:602, message:"usuarios de compañia no encontrado"}
        }

        const ids_users: number[] = listIds(users);
        const reports: ReportInterface[] = await modelReport.find({user_code:ids_users, rep_status:true});
        if(reports.length == 0){
            return {
                status:805,
                message:"no existen reportes"
            }
        }
        
        const ids_reports: number[] = reports.map((datos:any) => {
            return datos.rep_code;
        })
        const files: FileInterface[] = await modelFile.find({rep_code:ids_reports}).count();
        const files_allowed: number = configReport.number_files_repots*configReport.number_reports;
        return {
            status:200,
            num_reports: reports.length,
            reports_allowed: configReport.number_reports,
            num_files: files,
            files_allowed
        }

    } catch (error:any) {
        return {
            status:500,
            message:error.message
        }
    }

}

export = grafic;