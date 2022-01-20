import { Request, Response } from "express";
import FileInterface from "../interfaces/fileInterface";
import modelFile from "../models/modelFile";
const { configFile } = require("../helpers/dataConfig");
const { numberFiles } = require('../helpers/helperFile')


class ValidFiles {

    validNumberImages = async (req: Request, res: Response, next: any) => {
        const { files, rep_code } = req.body;
        try {
            //let numImages = await numberFiles(files, rep_code, configFile.image_format);
            let images = await modelFile.find({ rep_code, type_file:configFile.image_format});
            let numImages = images.length
            console.log("numero imagenes", numImages)
            files.forEach((file: FileInterface) => {
                if (file.file_type == configFile.image_format) {
                    numImages += 1;
                    console.log("tipo de archivo",file.file_type)
                }
            });
            if (numImages > configFile.number_images) {
                return res.json({
                    status: 400,
                    message: "numero de imagenes exedidias"
                })
            }
    
            next();
            
        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                message: error
            })
        }
    }

    validNumberVideos = async (req: Request, res: Response, next: any) => {
        const { files, rep_code } = req.body;
        try {
            let videos:FileInterface[] = await modelFile.find({ rep_code, type_file:configFile.video_format})
            let numVideos:number = videos.length;
            console.log("numero de videos", numVideos)
            files.forEach((file: FileInterface) => {
                if (file.file_type == configFile.video_format) {
                    numVideos += 1;
                    console.log("tipo de archivo",file.file_type)
                }
            });
            if (numVideos > configFile.number_videos) {
                return res.json({
                    status: 400,
                    message: "numero de videos excedidos"
                })
            }
            next();

        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                message: error
            })
        }
    }

    validNumberAudios = async (req: Request, res: Response, next: any) => {
        const { files, rep_code } = req.body;
        try {
            let audios:FileInterface[] = await modelFile.find({ rep_code, type_file:configFile.audio_format});
            let numAudios:number = audios.length
            console.log("numero de auidos", numAudios)
            files.forEach((file: FileInterface) => {
                if (file.file_type == configFile.audio_format) {
                    numAudios += 1;
                    console.log("tipo de archivo",file.file_type)
                }
            });
            if (numAudios > configFile.number_audios) {
                return res.json({
                    status: 400,
                    message: "numero de audios exedidos"
                })
            }
            next();
            
        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                message: error
            })
        }
    }


}

export = new ValidFiles()