import { Request, Response } from "express";
import FileInterface from "../interfaces/fileInterface";
import modelFile from "../models/modelFile";
const { configFile } = require("../helpers/dataConfig");
const { numberFiles } = require('../helpers/helperFile')


class ValidFiles {


    constructor() {

    }

    validNumberFiles = async (req: Request, res: Response, next: any) => {
        const { files, rep_code } = req.body;
        console.log("archivos", files)
        try {
            let numberImages: number;
            let numberAudios: number;
            let numberVideos: number;
            for (const file of files) {
                if (file.file_type == configFile.image_format) {
                    numberImages = await modelFile.find({ rep_code, type_file: configFile.image_format }).count()
                    console.log("numero de imagenes", numberImages)
                    numberImages += 1;
                    if (numberImages > configFile.number_images) {
                        return res.json({
                            status: 400,
                            message: "numero de imagenes excedidias"
                        })
                    }
                    console.log("tipo de archivo", file.file_type)
                    next();
                    return;
                }

                if (file.file_type == configFile.video_format) {
                    numberVideos = await modelFile.find({ rep_code, type_file: configFile.video_format }).count()
                    console.log("numero de videos", numberVideos)
                    numberVideos += 1;
                    if (numberVideos > configFile.number_videos) {
                        return res.json({
                            status: 400,
                            message: "numero de videos excedidos"
                        })
                    }
                    console.log("tipo de archivo", file.file_type)
                    next();
                    return;
                }

                if (file.file_type == configFile.audio_format) {
                    numberAudios = await modelFile.find({ rep_code, type_file: configFile.audio_format }).count()
                    console.log("numero de audios", numberAudios)
                    numberAudios += 1;
                    if (numberAudios > configFile.number_audios) {
                        return res.json({
                            status: 400,
                            message: "numero de audios excedidos"
                        })
                    }
                    console.log("tipo de archivo", file.file_type)
                    next();
                    return;
                }
            }


            next();

        } catch (error: any) {
            console.log(error)
            return res.json({
                status: 500,
                message: error
            })
        }
    }
    // validNumberImages = async (req: Request, res: Response, next: any) => {
    //     const { files, rep_code } = req.body;
    //     try {
    //         let numImages = await numberFiles(files, rep_code, configFile.image_format);
    //         if (numImages > configFile.number_images) {
    //             return res.json({
    //                 status: 400,
    //                 message: "numero de imagenes excedidias"
    //             })
    //         }

    //         next();

    //     } catch (error) {
    //         console.log(error)
    //         return res.json({
    //             status: 500,
    //             message: error
    //         })
    //     }
    // }

    // validNumberVideos = async (req: Request, res: Response, next: any) => {
    //     const { files, rep_code } = req.body;
    //     try {
    //         const numVideos = await numberFiles(files, rep_code, configFile.video_format);
    //         if (numVideos > configFile.number_videos) {
    //             return res.json({
    //                 status: 400,
    //                 message: "numero de videos excedidios"
    //             })
    //         }
    //         next();

    //     } catch (error) {
    //         console.log(error)
    //         return res.json({
    //             status: 500,
    //             message: error
    //         })
    //     }
    // }

    // validNumberAudios = async (req: Request, res: Response, next: any) => {
    //     const { files, rep_code } = req.body;
    //     try {
    //         const numAudios = await numberFiles(files, rep_code, configFile.audio_format)
    //         if (numAudios > configFile.number_audios) {
    //             return res.json({
    //                 status: 400,
    //                 message: "numero de audios excedidos"
    //             })
    //         }
    //         next();

    //     } catch (error) {
    //         console.log(error)
    //         return res.json({
    //             status: 500,
    //             message: error
    //         })
    //     }
    // }


}

export = new ValidFiles()