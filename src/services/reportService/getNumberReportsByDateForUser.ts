
import moment from "moment";
import ReportInterface from "../../interfaces/reportInterface";
import UserInterface from "../../interfaces/userInterface";
import modelReport from "../../models/modelReport";
import modelUser from "../../models/modelUser";
const {dataReportsUser} = require('../../helpers/helperUser');

const { getAuthUser } = require("../../middleware/verifyToken");

const getNumberReportsByDateForUser = async (date: any) => {
    const {start_date, final_date} = date;
    const { _id } = getAuthUser();
    try {
      
        const users: UserInterface = await modelUser.findOne({
            _id,
            user_status: true
        });
        
        if(!users ) {
            return {status:602, message:"usuario de compañia no encontrado"}
        }

        
        const reports: ReportInterface[] = await modelReport.find({user_code:users._id, 
            rep_create_date: { $gte: start_date, $lte: final_date },
            }).populate('user_code',['user_name']);
            console.log(reports.length)
            const data = dataReportsUser(reports, "YYYY-MM-DD");
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

export = getNumberReportsByDateForUser