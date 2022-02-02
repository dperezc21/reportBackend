import { Request, Response } from "express";
import insertFilesService from "../services/fileService/insertFileService";
import updateStatusFileService from "../services/fileService/updateStatusFileService";
import getFilesByCodeReportService from "../services/fileService/getFilesByCodeReportService";

class ControllerFile {

    //controlador para insertar archivos del reporte
    insertFiles = async(req:Request, res:Response) => {
        const data: object = req.body;//lista de archivos obtenidos de la request
        try {
            const response: object = await insertFilesService(data);
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status:500,
                message:error
            })
        }
    }

    //controlador para actualizar el estado de los archivos insertados
    updateStatusFiles = async(req:Request, res:Response) => {
        const body: object = req.body;//datos de los archivos listo para utilizar
        try {
            const response: object = await updateStatusFileService(body);
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status:500,
                message:error
            })
        }
    }

    //controlador para consultar los archivos por codigo de reporte
    getFilesByCodeReport = async(req:Request, res:Response) => {
        try {
            const {rep_code} = req.query;//codigo de reporte obtenido de la request
            const response:object = await getFilesByCodeReportService(rep_code)
            return res.status(200).json(response)
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: error
            })
        }
    }
}


export = new ControllerFile;