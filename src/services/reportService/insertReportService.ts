

import CategoryInterface from "../../interfaces/categoryInterface";
import ReportInterface from "../../interfaces/reportInterface";
import modelCategory from "../../models/modelCategory";
import Report from "../../models/modelReport";
const {getAuthUser} = require( "../../middleware/verifyToken");

const insertReportRepository = async(dataReport:any) => {
    const {cat_code, ...data} = dataReport;
    try {
        const {_id } = getAuthUser();

        const searchCategory:CategoryInterface = await modelCategory.findById({_id:cat_code, cat_status:true});
        if (!searchCategory){
            return {
                status: 803,
                message:"categoria no existe"
            }
        }
       
        data.cat_code = searchCategory?._id;
        data.user_code = _id;
        const report: ReportInterface = new Report(data);
        report.save((error:any) =>{
            if (error){
                return {
                    status:500, message:error.message
                };
            }
        
        });
        return {
            status:200,
            message:"reporte insertado"
        };
        
    } catch (error) {
        return {
            status:500,
            message:error
        }
    }
}

export = insertReportRepository
