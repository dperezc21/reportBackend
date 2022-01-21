
import moment from "moment";
import ReportInterface from "../../interfaces/reportInterface";
import UserInterface from "../../interfaces/userInterface";
import modelReport from "../../models/modelReport";
import modelUser from "../../models/modelUser";
const { dayDateRange } = require('../../helpers/helperCompany')
const { listIds } = require('../../helpers/helperUser')
const {dataReportsAdmin} = require('../../helpers/helperCompany');

const { getAuthUser } = require("../../middleware/verifyToken");

const getNumberReportsByTable = async (date: any) => {
    
    const { com_id } = getAuthUser();

    try {
        const {start_date, final_date} = dayDateRange(date);
        console.log(moment(start_date).format("YYYY-MM-DD HH:mm:ss"), moment(final_date).format("YYYY-MM-DD HH:mm:ss"))
        //console.log(moment(1642579200000).format("YYYY-MM-DD HH:mm:ss"), moment(1642615200000).format("YYYY-MM-DD HH:mm:ss"))
        const users: UserInterface[] = await modelUser.find({
            com_id,
            user_status: true
        });
        
        if(users.length == 0) {
            return {status:602, message:"usuarios de compañia no encontrado"}
        }

        const idsUser: number[] = listIds(users);
        console.log(idsUser)
        const reports: ReportInterface[] = await modelReport.find({user_code:idsUser, 
            rep_create_date: { $gte: start_date, $lte: final_date },
            }).populate('user_code',['user_name']);
            console.log(reports.length)
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