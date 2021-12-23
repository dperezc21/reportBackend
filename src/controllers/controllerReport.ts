import { Request, Response } from "express";
import insertReportService from "../services/reportService/insertReportService";
import getReportByUserCodeService from "../services/reportService/getReportByUserCodeService";
import getReportByCodeService from "../services/reportService/getReportByCodeService";
import getReportsService from "../services/reportService/getReportsService";
import getReportByDateService from "../services/reportService/getReportByDateService";
import deleteReportByCodeService from "../services/reportService/deleteReportByCodeService";

class ControllerReport {
    insertReport = async(req:Request, res:Response) => {
        const body = req.body;
        try {
            const response = await insertReportService(body);
            return res.json(response);
        } catch (error) {
            return res.json({
                status: 500,
                message: error
            })
        }
    }

    getReportByUserCode = async(req:Request, res:Response) => {
        const {user_code} = req.query;
        try {
            const response = await getReportByUserCodeService(user_code);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }

    getReportByCode = async(req:Request, res:Response) =>{
        const {rep_code} = req.query;
        try {
            const response = await getReportByCodeService(rep_code);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }

    getReports = async(req:Request, res:Response) =>{
        try {
            const response = await getReportsService();
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }

    getReportByDate = async(req:Request, res:Response) => {
        const body = req.body;
        try {
            const response = await getReportByDateService(body);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }

    deleteReportByCode = async(req:Request, res:Response) =>{ 
        const {ids} = req.body;
        try {
            const response = await deleteReportByCodeService(ids);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                mesaage:error
            })
        }
    }
    
}

export = new ControllerReport;