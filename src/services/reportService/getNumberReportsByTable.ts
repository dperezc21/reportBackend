
import ReportInterface from "../../interfaces/reportInterface";
import UserInterface from "../../interfaces/userInterface";
import modelReport from "../../models/modelReport";
import modelUser from "../../models/modelUser";
const { dayDateRange } = require('../../helpers/helperCompany')
const { listIds } = require('../../helpers/helperUser')
const {dataReportsAdmin} = require('../../helpers/helperCompany');

const { getAuthUser } = require("../../middleware/verifyToken");

const getNumberReportsByTable = async () => {
    
    const { com_id } = getAuthUser();

    try {
        const date = new Date().getTime();
        const {start_date, final_date} = dayDateRange(date);
        const users: UserInterface[] = await modelUser.find({
            com_id,
            
            user_status: true
        });
        
        if(users.length == 0) {
            return {
                status:805,
                message:"reporte no existe"
            };
        }

        const idsUser: number[] = listIds(users);
      
        const reports: ReportInterface = await modelReport.find({user_code:idsUser, 
            rep_create_date: { $gte: start_date, $lte: final_date },
            rep_status:true}).populate('cat_code', ['cat_name'])
            .populate('user_code',['user_name']);
            console.log(reports)
            const data = dataReportsAdmin(reports);
            return {
                status:200,
                message:data
            };


    } catch (error: any) {
        return {
            status: 500,
            message: error.message
        }
    }
}

export = getNumberReportsByTable