import { Request, Response } from "express";
import FileInterface from "../interfaces/fileInterface";
import modelFile from "../models/modelFile";
const { configFile } = require("../helpers/dataConfig");
const { numberFiles } = require('../helpers/helperFile')


class ValidFiles {
    numberImages: number;
    numberVideos: number;
    numberAudios: number;

    constructor() {
        this.numberImages = 0
        this.numberVideos = 0
        this.numberAudios = 0
    }

    validNumberFiles = async (req: Request, res: Response, next: any) => {
        const { files, rep_code } = req.body;
        try {
            files.forEach(async (file: FileInterface) => {

                if (file.file_type == configFile.image_format) {
                    this.numberImages = await modelFile.find({ rep_code, type_file:file.file_type}).count()
                    this.numberImages += 1;
                    if (this.numberImages > configFile.number_images) {
                        return res.json({
                            status: 400,
                            message: "numero de imagenes excedidias"
                        })
                    }
                    console.log(file.file_type)
                }

                if (file.file_type == configFile.video_format) {
                    this.numberVideos = await modelFile.find(files, rep_code, configFile.video_format).count()
                    this.numberVideos += 1;
                    if (this.numberVideos > configFile.number_videos) {
                        return res.json({
                            status: 400,
                            message: "numero de videos excedidos"
                        })
                    }
                    console.log(file.file_type)
                }

                if (file.file_type == configFile.audio_format) {
                    this.numberAudios = await modelFile.find(files, rep_code, configFile.audio_format).count()
                    this.numberAudios += 1;
                    console.log(file.file_type)
                    if (this.numberAudios > configFile.number_audios) {
                        return res.json({
                            status: 400,
                            message: "numero de audios excedidos"
                        })
                    }
                }

            });
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