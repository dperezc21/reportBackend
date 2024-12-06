
import File from "../../models/modelFile";
import Report from "../../models/modelReport";
const {getAuthUser} = require( "../../middleware/verifyToken");

const getReportByDateRepository = async(dataReport:any) =>{
    const {start_date, final_date} = dataReport;
    try {
        const {_id } = getAuthUser();
        const reports = await Report.find({
                user_code:_id,
                $or: [
                        {rep_create_date: {$gte:start_date, $lte:final_date}},
                        {rep_create_date:start_date}
                    ],
                    rep_status:true
        });

        if(!reports){
            return {
                status:805,
                message:"reporte no existe"
            };
        }
        
        let list_reports:any = []
        
        for (let report of reports){
            console.log(report.rep_code)
            let archivos = await File.find({rep_code:report.rep_code});
            console.log(archivos)
            list_reports.push({report, archivos});

        }
            
        return {
            status:200,
            list_reports
        }
        
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        }
    }
}

export = getReportByDateRepository;