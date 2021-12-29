import { Request, Response } from "express";
import insertFilesService from "../services/fileService/insertFileService";
import updateStatusFileService from "../services/fileService/updateStatusFileService";
import getFilesByCodeReportService from "../services/fileService/getFilesByCodeReportService";

class ControllerFile {
    insertFiles = async(req:Request, res:Response) => {
        const data: object = req.body;
        try {
            const response: object = await insertFilesService(data);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }

    updateStatusFiles = async(req:Request, res:Response) => {
        const body: object = req.body;
        try {
            const response: object = await updateStatusFileService(body);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }

    getFilesByCodeReport = async(req:Request, res:Response) => {
        try {
            const {rep_code} = req.query;
            const response:object = await getFilesByCodeReportService(rep_code)
            return res.json(response)
        } catch (error) {
            return res.json({
                status: 500,
                message: error
            })
        }
    }
}


export = new ControllerFile;