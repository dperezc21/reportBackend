import { Request, Response } from "express";
import modelCategory from "../models/modelCategory";
import File from "../models/modelFile";
import Report from "../models/modelReport";
import User from "../models/modelUser";

const insertReport = async(req:Request, res:Response) =>{
    const {cat_code, files, ...data} = req.body;
    try {
        const searchUser = await User.findOne({_id:data.user_code, user_status:true});
        
        if(!searchUser){
            return res.json({status: 602, message:"usuario no existe"
            })
        }

        const searchCategory = await modelCategory.findById({_id:cat_code, cat_status:true});
        if (!searchCategory){
            return res.json({status: 803, message:"categoria no existe"})
        }

        const searchReport = await Report.findOne({rep_code:data.rep_code, rep_status:true});
        if(searchReport){
            return res.json({status:806, message:"codigo de reporte existe en base de datos"
            })
        }
        data.cat_code = searchCategory._id;
        const report = await Report(data);
        report.save(async(error:any, report:any) =>{
            if (error){
                return res.json({status:500, message:error.message});
            }else{
               
                for (let file of files){
                    file.rep_code = report.rep_code;
                    console.log(file)
                    const insertFile = await File(file);
                    insertFile.save()
                }
                return res.json({status:200, message:"reporte insertado existosamente"
                });
            } 

        });
        
    } catch (error) {
        return res.json({status:500, message:error})
    }
}

const getReportByCode = async(req:Request, res:Response) =>{
    const {rep_code} = req.query;
    
    try {
        const report = await Report.findOne({rep_code}).limit(10);
        if(!report){
            return res.json({status:805, message:"reporte no existe"})
        }
        const archivos= await File.find({rep_code, file_status:true});
        return res.json({report, archivos})
    } catch (error) {
        console.log(error);
        return res.json({message:error})
    }

}


const getReportByUserCode = async(req:Request, res:Response) => {
    const {user_code} = req.query;
    try {
        const user = await User.findById({_id:user_code, user_status:true})
        if(!user){
            return res.json({status:602, message:"usuario no existe"
            });
        }

        const reports = await Report.find({user_code, rep_status:true}).limit(10);
        if(!reports){
            return res.json({status:805, message:"reporte no existe"})
        }

        let list_reports:any = []
        
        for (let report of reports){
            console.log(report.rep_code)
            //let archivos = await File.find({rep_code:report.rep_code, file_status:true});
            const archivos= await File.find({rep_code:report.rep_code, file_status:true});
            console.log(archivos)
            list_reports.push({report, archivos});
        }

        return res.json({status:200,list_reports})
    } catch (error) {
        console.log(error);
        return res.json({message:error})
    }
}


const getReports = async(req:Request, res:Response) =>{
    
    try {
        const reports = await Report.find({rep_status:true}).limit(10)
        if(!reports){
            return res.json({status:805, message:"reporte no existe"})
        }
        // console.log(reports)
        let list_reports:any = []
        
        for (let report of reports){
            console.log(report.rep_code)
            let archivos = await File.find({rep_code:report.rep_code, file_status:true});
            console.log(archivos)
            list_reports.push({report, archivos});
        }
            
        return res.json({status:200, list_reports})
    } catch (error) {
        console.log(error);
        return res.json({message:error})
    }

}


const getReportByDate = async(req:Request, res:Response) =>{
    const {start_date, final_date} = req.body;
    try {

        const reports = await Report.find({
                $or: [
                        {rep_create_date: {$gte:start_date, $lte:final_date}},
                        {rep_create_date:start_date}
                    ],
                    rep_status:true
        });

        if(!reports){
            return res.json({status:805, message:"reporte no existe"});
        }
        
        let list_reports:any = []
        
        for (let report of reports){
            console.log(report.rep_code)
            let archivos = await File.find({rep_code:report.rep_code, file_status:true});
            console.log(archivos)
            list_reports.push({report, archivos});

        }
            
        return res.json({status:200,list_reports})
        
    } catch (error) {
        console.log(error);
        return res.json({message:error})
    }
}


const deleteReportByCode = async(req:Request, res:Response) =>{
    const {rep_code} = req.query;

    try {
        const report = await Report.findOneAndUpdate({rep_code, rep_status:true}, {rep_status:false}, {new:true});
    
        console.log(report)
        if(!report) {
            return res.json({status:805, message:"reporte no existe"});
        }
        return res.json({status:200, message:"reporte eliminado"})
        
    } catch (error) {
        return res.json({status:500, message:error})

    }
}


export = {
    insertReport,
    getReportByCode,
    getReports,
    getReportByUserCode,
    getReportByDate,
    deleteReportByCode
};