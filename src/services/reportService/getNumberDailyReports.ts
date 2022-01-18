import ReportInterface from "../../interfaces/reportInterface";
import modelReport from "../../models/modelReport";

const { getAuthUser } = require("../../middleware/verifyToken");

const getNumberReportsDaily = async (dataReport: any) => {
    const { start_date, final_date } = dataReport;
    const { com_id } = getAuthUser();

    try {

        const reports: ReportInterface[] = await modelReport.find({
            com_id,
            rep_create_date: { $gte: start_date, $lte: final_date },
            rep_status: true
        }).populate('cat_code', ['cat_name'])
            .populate('user_code', ['user_name']);
        if(reports.length == 0) {
            return {
                status:805,
                message:"reporte no existe"
            };
        }

        
    } catch (error: any) {
        return {
            status: 500,
            message: error.message
        }
    }
}

export = getNumberReportsDaily