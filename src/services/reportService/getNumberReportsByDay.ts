const { configUser } =require( "../../helpers/dataConfig");
import moment from "moment";
import ReportInterface from "../../interfaces/reportInterface";
import UserInterface from "../../interfaces/userInterface";
import Report from "../../models/modelReport";
import modelUser from "../../models/modelUser";
const {getAuthUser} = require( "../../middleware/verifyToken");
const {listIds} = require('../../helpers/helperUser');
const {dataReportByGrafic} = require('../../helpers/helperCompany');


const getNumberReportsByDay = async(dataReport:any) => {
    const {start_date, final_date} = dataReport;
    const {com_id, pro_code, _id} = getAuthUser();
    console.log(moment(parseInt(start_date)).format("YYYY-MM-DD HH:mm"), moment(parseInt(final_date)).format("YYYY-MM-DD HH:mm"))
    try {
        let users: UserInterface[] | UserInterface;
        //mapea los usuarios y devuelve una lista de id de usuarios
        if(pro_code.pro_name == configUser.pro_name) {
            users = await modelUser.find({com_id,_id, user_status:true});
        }else{
           users = await modelUser.find({com_id, user_status:true});
        }
        const ids_user:number[] = listIds(users);
        const reports: ReportInterface[] = await Report.find({
            user_code:ids_user,
            rep_create_date: {$gte:start_date, $lte:final_date},
                 })
        if(reports.length == 0) {
            return {
                status:805,
                message:"reporte no existe"
            };
        }
        let data: object[];
        
        data = dataReportByGrafic(reports)
        return {
            status:200,
            message:data
        };

        
    } catch (error:any) {
        console.log(error)
        return {
            status:500,
            message:error.message
        };
    }
}

export = getNumberReportsByDay