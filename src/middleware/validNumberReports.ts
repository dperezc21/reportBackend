import { Request, Response } from "express";
const { configUser } = require( "../helpers/dataConfig");
import CompanyInterface from "../interfaces/companyInterface";
import modelCompany from "../models/modelCompany";
import modelUser from "../models/modelUser";

const validNumberReports = (req:Request, res:Response, next:any) => {
    
}