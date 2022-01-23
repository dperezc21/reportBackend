import { Request, Response } from "express";
const { configFile } = require("../helpers/dataConfig");
const { numberFiles, verifyFileTypes} = require('../helpers/helperFile')


class ValidFiles {

    validNumberImages = async (req: Request, res: Response, next: any) => {
        const { files, rep_code } = req.body;
        try {
            const file_type = verifyFileTypes(files, configFile.image_format)
            if(!file_type){
                return res.json({
                    status:400,
                    message:`tipo de archivo de imagen invalido`
                })
            }
            let numImages = await numberFiles(files, rep_code, file_type);
            console.log("imagenes", numImages)
            if (numImages > configFile.number_images) {
                return res.json({
                    status: 400,
                    message: "numero de imagenes excedidias"
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
            const file_type = verifyFileTypes(files, configFile.video_format)
            console.log(file_type,"hola")
            if(!file_type){
                return res.json({
                    status:400,
                    message:"tipo de archivo de video invalido"
                })
            }
            const numVideos = await numberFiles(files, rep_code, file_type);
            console.log("formato de videos",configFile.video_format)
            if (numVideos > configFile.number_videos) {
                return res.json({
                    status: 400,
                    message: "numero de videos excedidios"
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
            const file_type = verifyFileTypes(files, configFile.audio_format)
            if(!file_type){
                return res.json({
                    status:400,
                    message:"tipo de archivo de audio invalido"
                })
            }
            const numAudios = await numberFiles(files, rep_code, file_type)
            if (numAudios > configFile.number_audios) {
                return res.json({
                    status: 400,
                    message: "numero de audios excedidos"
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