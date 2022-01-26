import { Request, Response } from "express";
const Company = require('../models/modelCompany')
const { getAuthUser } = require('../middleware/verifyToken')

class ValidFieldsCompany {
    validRol = (req: Request, res: Response, next: any) => {
        const { pro_code } = getAuthUser();
        const rol = pro_code["pro_name"];

        if (rol != 'admin') {
            return res.json({
                status: 401,
                message: "rol no permitido"
            });
        }
        next();
    }

    validCompanyName = async (req: Request, res: Response, next: any) => {
        let { company } = req.body;
        const com_name = company.com_name.toLowerCase()
        try {
            if (com_name.length < 3 || !com_name) {
                return res.json({
                    status: 606,
                    message: "nombre de la compañia muy corto"
                });
            }
            const consultCompanyByName = await Company.findOne({ com_name });
            if (consultCompanyByName) {
                return res.json({
                    status: 603,
                    message: "compañia existe en la base de datos"
                });
            }
            req.body.company.com_name = com_name;
            next()

        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message: error
            });
        }
    }


}

export = new ValidFieldsCompany()