import FileInterface from "../../interfaces/fileInterface";
import ReportInterface from "../../interfaces/reportInterface";
import File from "../../models/modelFile";
import Report from "../../models/modelReport";

const getReportByCodeRepository = async(rep_code:any) =>{
    try {
        const report: ReportInterface = await Report.findOne({rep_code})
                                   .populate('cat_code', ['cat_name'])
                                   .populate('user_code',['user_name', 'pro_code'])
        if(!report){
            return {
                status:805,
                message:"reporte no existe"
            }
        }
        const archivos: FileInterface[] = await File.find({rep_code});
        return {
            report, archivos
        }
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        }
    }

}

export = getReportByCodeRepository;