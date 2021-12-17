import { Request, Response } from "express";
import File from "../models/modelFile";


const insertFiles = async(req:Request, res:Response, data?:any) =>{

    const {report, files} = req.body;
    try {
        for (let file of files){
            file.rep_code = report.rep_code;
            console.log(file)
            const insertFile = await File(file);
            insertFile.save()
        }
        return res.json({
            status:200,
            message:"reporte insertado existosamente"
        });
        
    } catch (error) {
        
    }
}


exports = {
    insertFiles
}