import { Request, Response } from "express";
const User = require('../models/modelUser');

class ValidFieldsUser {

    validUserName = async (req: Request, res: Response, next: any) => {
        let { user, user_name } = req.body;
        let name: string
        try {
            if (!user?.user_name && !user_name) {
                return res.json({
                    status: 423,
                    message: "nombre de usuario requerido"
                })
            }
            if (user?.user_name) {
                name = user.user_name.toLowerCase()
            } else {
                name = user_name.toLowerCase()
            }

            const searchUser = await User.findOne({ user_name: name });

            if (searchUser) {
                return res.json({
                    status: 701,
                    message: "nombre de usuario ya existe"
                });
            }
            next();

        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message: error
            });
        }
    }

    validPassword = (req: Request, res: Response, next: any) => {
        const { user, user_password } = req.body;
        if (!user?.user_password && !user_password) {
            return res.json({
                status: 424,
                message: "contraseña de usuario requerido"
            });
        }
        next();
    }

    validIdType = (req: Request, res: Response, next: any) => {
        const { user, user_id_type } = req.body;

        if (!user?.user_id_type && !user_id_type) {
            return res.json({
                status: 424,
                message: "tipo de identificacion de usuario requerido"
            });
        }
        next();

    }

    validUserId = async(req: Request, res: Response, next: any) => {
        const { user, user_id } = req.body;

        if (!user?.user_id && !user_id) {
            return res.json({
                status: 424,
                message: "numero de identificacion de usuario requerido"
            });
        }
        let id;
        if (user?.user_id) {
            id = user.user_id
        } else {
            id = user_id
        }

        try {
            const searchUser = await User.findOne({ user_id: id });
    
            if (searchUser) {
                return res.json({
                    status: 701,
                    message: "identificacion de usuario ya existe"
                });
            }
            next();
            
        } catch (error) {
            
        }
    }

    validnamesUser = (req: Request, res: Response, next: any) => {
        const { user, names_user } = req.body;

        if (!user?.names_user && !names_user) {
            return res.json({
                status: 424,
                message: "nombre de pila de usuario requerido"
            });
        }
        next();

    }

    validLastName = (req: Request, res: Response, next: any) => {
        const { user, user_last_name } = req.body;

        if (!user?.user_last_name && !user_last_name) {
            return res.json({
                status: 424,
                message: "apellidos de usuario requerido"
            });
        }
        next();

    }

    validUserEmail = (req: Request, res: Response, next: any) => {
        const { user, user_email } = req.body;

        if (!user?.user_email && !user_email) {
            return res.json({
                status: 424,
                message: "correo de usuario requerido"
            });
        }
        next();

    }

    validFieldUpdateUser(req: Request, res: Response, next: any) {
        const data = req.body;
        for (const key in data) {
            if (data[key] == "") {
                return res.json({
                    status: 400,
                    message: "hay campos vacios"
                })
            }
        }
        next();
    }
}

export = new ValidFieldsUser