
const { configReport } = require( "../helpers/dataConfig");
import { Request, Response } from "express";
import ReportInterface from "../interfaces/reportInterface";
import UserInterface from "../interfaces/userInterface";
import modelReport from "../models/modelReport";
import modelUser from "../models/modelUser";
const { listIds } = require('../helpers/helperUser')

const { getAuthUser } = require("./verifyToken");

const validNumberReports = async(req:Request, res:Response, next:any) => {
    
    try {
        const { com_id } = getAuthUser();
        const users: UserInterface[] = await modelUser.find({
            com_id,
            user_status: true
        });
        
        if(users.length == 0) {
            return {
                status:805,
                message:"reporte no existe"
            };
        }

        const idsUser: number[] = listIds(users);
        console.log(idsUser)
      
        const reports: ReportInterface[] = await modelReport.find({user_code:idsUser})
        console.log(reports.length)
        if(reports.length <= configReport.number_reports-1){
            next()
            return;  
            
        }
        return res.status(400).json({
            status:400,
            message: "limite de reportes alcanzado"
        })

        
    } catch (error:any) {
        return res.status(500).json({
            status:500,
            message: error.message
        })
    }
}

export = validNumberReports