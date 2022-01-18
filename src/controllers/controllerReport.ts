import { Request, Response } from "express";
import moment from "moment";
const { configCompany } = require('../helpers/dataConfig');
const { getAuthUser } = require("../middleware/verifyToken");
const { dayDateRange } = require('../helpers/helperCompany')

const {
    insertReportService,
    getReportByUserCodeService,
    getReportByCodeService,
    getReportsService,
    getDataReportByDateService,
    deleteReportByCodeService,
    getDataReportByDateForAdminService,
    getReportsForAdminService,
    getNumberReportsByDay,
    getNumberReportsByTable
} = require('../services/reportService')

class ControllerReport {

    // controlador para insertar los datos del reporte
    insertReport = async (req: Request, res: Response) => {
        const body: object = req.body;//datos obtenidos de la request
        try {
            const response: object = await insertReportService(body);
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message: error
            })
        }
    }

    //controlador para consultar los reportes por codigo de usuario
    getReportByUserCode = async (req: Request, res: Response) => {
        const { user_code } = req.query;//codigo usuario obtenido de la request
        try {
            const response: object = await getReportByUserCodeService(user_code);
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message: error
            })
        }
    }

    //controlador para consultar reporte por codigo de reporte
    getReportByCode = async (req: Request, res: Response) => {
        const { rep_code } = req.query;//codigod del reporte obtenido de la request
        try {
            const response: object = await getReportByCodeService(rep_code);
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message: error
            })
        }
    }

    // controlador para obtener todos los reportes 
    getReports = async (req: Request, res: Response) => {
        const { pro_code, com_id } = getAuthUser();
        try {
            let response: object;
            if (pro_code.pro_name == configCompany.pro_name) {
                response = await getReportsForAdminService(com_id);
            } else {
                response = await getReportsService();
            }

            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message: error
            })
        }
    }

    //controlador para consultar reportes por fecha
    getReportByDate = async (req: Request, res: Response) => {
        const { _id, pro_code, com_id } = getAuthUser();
        let { start_date = 0, final_date } = req.query; //fechas obtenidas de la request

        try {
            let dataReport: object = req.query;
            if (start_date == final_date) {
                dataReport = dayDateRange(start_date);
            }

            let response: object | undefined;

            if (pro_code.pro_name == configCompany.pro_name) {
                response = await getDataReportByDateForAdminService(dataReport);
            } else {
                response = await getDataReportByDateService(dataReport);
            }
            return res.json(response);
        } catch (error: any) {
            console.log(error);
            return res.json({
                status: 500,
                message: error.message
            })
        }
    }

    //controlador para eliminar un reporte o reportes por codigo
    deleteReportByCode = async (req: Request, res: Response) => {
        let { ids } = req.body;//lista de reportes obtenidos de la request
        try {
            const response: object = await deleteReportByCodeService(ids);
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                mesaage: error
            })
        }
    }

    getNumberReportsByDay = async (req: Request, res: Response) => {
        const dataReport = req.query; //fechas obtenidas de la request
        try {
            const response: object = await getNumberReportsByDay(dataReport);
            return res.json({
                status: 200,
                message: response
            })
        } catch (error: any) {
            return res.json({
                status: 500,
                message: error.message
            })
        }
    }

    getNumberReportsByTable = async(req: Request, res: Response) =>{
        try {
            const response:object = await getNumberReportsByTable();
            return res.json(response)
        } catch (error:any) {
            res.json({
                status:500,
                message:error.mesaage
            })
        }
    }



}

export = new ControllerReport;