import File from "../../models/modelFile";
import Report from "../../models/modelReport";
import User from "../../models/modelUser";

const getReportByUserCodeRepository = async(user_code:any) => {
    
    try {
        const user = await User.findById({_id:user_code, user_status:true})
        if(!user){
            return {
                status:602, message:"usuario no existe"
            };
        }

        const reports = await Report.find({user_code, rep_status:true})
                                    .populate('cat_code', ['cat_name'])
                                    .limit(10);
        if(!reports){
            return {
                status:805,
                message:"reporte no existe"
            }
        }

        let list_reports:any = []
        
        for (let report of reports){
            console.log(report.rep_code)
            //let archivos = await File.find({rep_code:report.rep_code, file_status:true});
            const archivos= await File.find({rep_code:report.rep_code});
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

export = getReportByUserCodeRepository