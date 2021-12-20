import { Request, Response } from "express";
import insertFilesService from "../services/fileService/insertFileService";
import updateStatusFileService from "../services/fileService/updateStatusFileService";

class ControllerFile {
    insertFiles = async(req:Request, res:Response) => {
        const data = req.body;
        try {
            const response = await insertFilesService(data);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }

    updateStatusFiles = async(req:Request, res:Response) => {
        const body = req.body;
        try {
            const response = await updateStatusFileService(body);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }
}


export = new ControllerFile;