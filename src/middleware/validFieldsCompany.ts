import { Request, Response } from "express";
import { validationResult } from "express-validator";
import CompanyInterface from "../interfaces/companyInterface";
import modelCompany from "../models/modelCompany";
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

    validNitCompany = async(req: Request, res: Response, next: any) => {
        const { company } = req.body;
        if (!company.com_nit) {
            return res.json({
                status: 424,
                message: "contraseña de usuario requerido"
            });
        }
        try {

            const getCompany: CompanyInterface = await modelCompany.findOne({com_nit:company.com_nit})
            if(getCompany) {
                return res.json({
                    status:400,
                    message:"nit de empresa ya existe"
                })
            }
            next();
        } catch (error:any) {
            return res.json({
                status:500,
                message:error.message
            })
        }

        next();
    }

    validAddressCompany = (req: Request, res: Response, next: any) => {
        const { company } = req.body;

        if (!company.com_address) {
            return res.json({
                status: 424,
                message: "direccion de la compañia es requerida"
            });
        }
        next();

    }


    validChecks = (req: Request, res: Response, next: any) => {
        const error:any = validationResult(req);
        if (!error.isEmpty()){
            let errores:string[] = [];
            error["errors"].forEach((element:any) => {
                errores.push(element.msg)
            });
            return res.json({status:400, errores});
        }
        next();
    }


}

export = new ValidFieldsCompany()