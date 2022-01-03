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

    // controlador para insertar los datos del reporte
    insertReport = async(req:Request, res:Response) => {
        const body: object = req.body;//datos obtenidos de la request
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

    //controlador para consultar los reportes por codigo de usuario
    getReportByUserCode = async(req:Request, res:Response) => {
        const {user_code} = req.query;//codigo usuario obtenido de la request
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

    //controlador para consultar reporte por codigo de reporte
    getReportByCode = async(req:Request, res:Response) =>{
        const {rep_code} = req.query;//codigod del reporte obtenido de la request
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

    // controlador para obtener todos los reportes 
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

    //controlador para consultar reportes por fecha
    getReportByDate = async(req:Request, res:Response) => {
        const body: object = req.body;//fechas obtenidas de la request
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

    //controlador para eliminar un reporte o reportes por codigo
    deleteReportByCode = async(req:Request, res:Response) =>{ 
        let {ids} = req.body;//lista de reportes obtenidos de la request
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