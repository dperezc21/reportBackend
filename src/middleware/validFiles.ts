import { Request, Response } from "express";
import FileInterface from "../interfaces/fileInterface";
import modelFile from "../models/modelFile";
const { configFile } = require("../helpers/dataConfig");
const { numberFiles } = require('../helpers/helperFile')


class ValidFiles {

    validNumberImages = async (req: Request, res: Response, next: any) => {
        const { files, rep_code } = req.body;
        try {
            let numImages = await numberFiles(files, rep_code, configFile.image_format);
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
            const numVideos = await numberFiles(files, rep_code, configFile.video_format);
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
            const numAudios = await numberFiles(files, rep_code, configFile.audio_format)
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