import { Request, Response } from "express";
const { configFile } = require("../helpers/dataConfig");
const { numberFiles } = require('../helpers/helperFile')


class ValidFiles {

    validNumberImages = async (req: Request, res: Response, next: any) => {
        const { files, rep_code } = req.body;
        try {
            let numImages = await numberFiles(files, rep_code, configFile.video_format);
            if (numImages > configFile.number_images_allowed) {
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
            const numVideos = await numberFiles(files, rep_code, configFile.video_format);
            if (numVideos > configFile.number_videos_allowed) {
                return res.json({
                    status: 400,
                    message: "numero de videos exedidios"
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
            const numAudios = await numberFiles(files, rep_code, configFile.video_format)
            if (numAudios > configFile.number_audios_allowed) {
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