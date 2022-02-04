
import ReportInterface from "../../interfaces/reportInterface";
import UserInterface from "../../interfaces/userInterface";
import Report from "../../models/modelReport";
const {getAuthUser} = require( "../../middleware/verifyToken");
const {dataReportsUser} = require('../../helpers/helperUser');


const getDataReportByDateRepository = async(dataReport:any) =>{
    const {start_date, final_date} = dataReport;
    const userAuth: UserInterface = getAuthUser();
    try {
        const reports: ReportInterface[] = await Report.find({
                user_code:userAuth._id,
                rep_create_date: {$gte:start_date, $lte:final_date}
        }).populate('cat_code', ['cat_name'])
        .populate('user_code',['-user_password','-__v']);
        if(reports.length == 0){
            return {
                status:805,
                message:"reporte no existe"
            };
        }
        const data = dataReportsUser(reports);
        return{
            status:200,
            data
        }  
        
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        }
    }
}




export = getDataReportByDateRepository;