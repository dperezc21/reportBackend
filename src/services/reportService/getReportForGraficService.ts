import ReportInterface from "../../interfaces/reportInterface";
import UserInterface from "../../interfaces/userInterface";
import Report from "../../models/modelReport";
const {getAuthUser} = require( "../../middleware/verifyToken");
import User from "../../models/modelUser";
const {listIds} = require('../../helpers/helperUser');
const {dataReports} = require('../../helpers/helperCompany');


const getReportByGraficRepository = async (dataReport: any) => {
    const {start_date, final_date} = dataReport;
    const {com_id} = getAuthUser();
    try {
        const users: UserInterface[] = await User.find({com_id, user_status:true});
        //mapea los usuarios y devuelve una lista de id de usuarios
        const ids_user:number[] = listIds(users);
        const reports: ReportInterface[] = await Report.find({
            user_code:ids_user,
            $or: [
                {rep_create_date: {$gte: start_date, $lte:final_date}},
                {rep_create_date:start_date}
            ],
                rep_status:true})
                .populate('cat_code', ['cat_name'])
                .populate('user_code',['user_name']);
        if(reports.length == 0) {
            return {
                status:805,
                message:"reporte no existe"
            };
        }
        const data = dataReports(reports);
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

export = getReportByGraficRepository;