import { Request, Response } from "express";
import insertFilesRepository from "../services/fileService/insertFileService";

class ControllerFile {
    insertFiles = async(req:Request, res:Response) => {
        const {rep_code, files} = req.body;
        try {
            const response = await insertFilesRepository(rep_code, files);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }
}


exports = new ControllerFile;