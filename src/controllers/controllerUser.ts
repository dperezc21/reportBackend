import { Request, Response } from "express";
import UserInterface from "../interfaces/userInterface";
const {
    deleteCompanyUserService,
    getCompanyUserService,
    updateCompanyUserService,
    insertUserService,
    login,
    updateUserStatusService
} = require('../services/userServices')
const {validIdsDelete} = require('../helpers/helperUser');

class ControllerUser{
    
    //controlador para insertar los usuarios de una compañia
    insertUser = async(req:Request, res:Response) => {
        try {
            let Uobject: UserInterface = req.body;//datos del usuario obtenidos de la request
            let response: object = await insertUserService(Uobject);
            console.log("log", response)
            return res.status(200).json(response);
            
        } catch (error) {
            return res.status(500).json({
                status:500,
                message:error
            })
        }
        
    }

    //controlador para inicio de sesion de un usuario
    loginUser = async(req:Request, res:Response) =>{
        const data: object = req.body;//datos de inicio de seseion obtenidos de la request
        try {
            const response: object = await login(data);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                status:500,
                message:error
            })
        }
    }

    //controlador para consultar los usuario de una compañia
    getCompanyUser = async(req:Request, res:Response) =>{
        const {user_id} = req.query;//identificador de usuario obtenido de la request
        try {
            const response: object = await getCompanyUserService(user_id);
            return res.status(200).json(response);
            
        } catch (error) {
            return res.status(500).json({
                status:500,
                message:error
            })
        }
    }

    // controlador para eliminar un usuario
    deleteCompanyUser = async(req:Request, res:Response) => {
        let {ids, status} = req.body;//lista de identicadores de usuarios obtenidos de la request
        try {
            ids = validIdsDelete(ids);//metodo para ignorar el tipo de dato diferente a entero
            const response: object =  await deleteCompanyUserService(ids, status);
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status:500,
                message:error
            })
        }

    } 

    //controlador para actualizar datos del usuario
    updateCompanyUser = async(req:Request, res:Response) =>{
        //datos del usuario obtenidos de la request
        let data: object = req.body;
        const {user_id} = req.query;//id del usuario para actualizar

        try {
            const response = await updateCompanyUserService({user_id, data});
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status:500,
                message:error
            })
        }
    }

    updateUserStatus = async(req:Request, res:Response) => {
        try {
            const {data} = req.body;
            const response:object = await updateUserStatusService(data)
            return res.status(200).json(response)
        } catch (error:any) {
            return res.status(500).json({
                status:500,
                message:error.message
            })
        }
    }

}


export = new ControllerUser();
