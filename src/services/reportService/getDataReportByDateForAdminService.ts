import ReportInterface from "../../interfaces/reportInterface";
import UserInterface from "../../interfaces/userInterface";
import Report from "../../models/modelReport";
const {getAuthUser} = require( "../../middleware/verifyToken");
import User from "../../models/modelUser";
const {listIds} = require('../../helpers/helperUser');
const {dataReportsAdmin} = require('../../helpers/helperCompany');
const { orderReportsByNumReports } = require("../../helpers/helperReport");


const getDataReportByDateForAdminRepository = async (dataReport: any) => {
    const {start_date, final_date} = dataReport;
    const {com_id} = getAuthUser();
    try {
        const users: UserInterface[] = await User.find({com_id});
        //mapea los usuarios y devuelve una lista de id de usuarios
        const ids_user:number[] = listIds(users);
        const reports: ReportInterface[] = await Report.find({
            user_code:ids_user,
            rep_create_date: {$gte:start_date, $lte:final_date}})
                .populate('cat_code', ['cat_name'])
                .populate('user_code',['-user_password','-__v']);
        if(reports.length == 0) {
            return {
                status:805,
                message:"reporte no existe"
            };
        }
        let data = dataReportsAdmin(reports);
        data = orderReportsByNumReports(data)
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

export = getDataReportByDateForAdminRepository;