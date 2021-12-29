import { Request, Response } from "express";
const {
    insertReportService,
    getReportByUserCodeService,
    getReportByCodeService,
    getReportsService,
    getReportByDateService,
    deleteReportByCodeService
} = require('../services/reportService')

class ControllerReport {
    insertReport = async(req:Request, res:Response) => {
        const body: object = req.body;
        try {
            const response: object = await insertReportService(body);
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
            const response: object = await getReportByUserCodeService(user_code);
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
            const response: object = await getReportByCodeService(rep_code);
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
            const response: object = await getReportsService();
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }

    getReportByDate = async(req:Request, res:Response) => {
        const body: object = req.body;
        try {
            const response: object | undefined = await getReportByDateService(body);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }

    deleteReportByCode = async(req:Request, res:Response) =>{ 
        let {ids} = req.body;
        try {
            const response: object = await deleteReportByCodeService(ids);
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