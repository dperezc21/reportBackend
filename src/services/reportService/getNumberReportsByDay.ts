import ReportInterface from "../../interfaces/reportInterface";
import UserInterface from "../../interfaces/userInterface";
import Report from "../../models/modelReport";
import modelUser from "../../models/modelUser";
const {getAuthUser} = require( "../../middleware/verifyToken");
const {listIds} = require('../../helpers/helperUser');
const {dataReportByGrafic} = require('../../helpers/helperCompany');


const getNumberReportsByDay = async(dataReport:any) => {
    const {start_date, final_date} = dataReport;
    const {com_id} = getAuthUser();

    try {
        const users: UserInterface[] = await modelUser.find({com_id, user_status:true});
        //mapea los usuarios y devuelve una lista de id de usuarios
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
        const data: object[] = dataReportByGrafic(reports);
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