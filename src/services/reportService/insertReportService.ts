

import modelCategory from "../../models/modelCategory";
import Report from "../../models/modelReport";
import User from "../../models/modelUser";
import insertFilesRepository from "../fileService/insertFileService";

const insertReportRepository = async(dataReport:any) =>{
    const {cat_code, files, ...data} = dataReport;
    try {
        const searchUser = await User.findOne({_id:data.user_code, user_status:true});
        
        if(!searchUser){
            return {
                status: 602,
                message:"usuario no existe"
            }
        }

        const searchCategory = await modelCategory.findById({_id:cat_code, cat_status:true});
        if (!searchCategory){
            return {
                status: 803,
                message:"categoria no existe"
            }
        }

        const searchReport = await Report.findOne({rep_code:data.rep_code, rep_status:true});
        if(searchReport){
            return {
                status:806,
                message:"codigo de reporte existe en base de datos"
            }
        }
        data.cat_code = searchCategory._id;
        const report = new Report(data);
        report.save((error:any) =>{
            if (error){
                return {
                    status:500, message:error.message
                };
            }
        
        });
        const response = await insertFilesRepository(report.rep_code, files);
        return response;
        
    } catch (error) {
        return {
            status:500,
            message:error
        }
    }
}

export = insertReportRepository
