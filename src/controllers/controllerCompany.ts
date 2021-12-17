import { Request, Response } from "express"
const { consultProfile } = require("./controllerUserProfile");
import companyCode from "../helpers/generateCompanyCode";
const {getUser} = require( "../middleware/verifyToken");
const {getDataCompany} = require( "../helpers/helperCompany");
const {encriptPassword} = require("./helperUser")

const Company = require('../models/modelCompany')
const User = require('../models/modelUser')


const insertCompany = async(req:Request, res:Response) =>{
    let data = req.body;
    console.log("datos de compañia",data);
    let com_code = await companyCode(data.com_name);
    data.com_code = com_code; 
    
    let {user_name, user_password,  ...companyData} = data

    try { 
        const company = await Company(companyData);
        const searchUser = await User.findOne({user_name, user_status:true})
        if(searchUser){
            return res.json({
                status:601,
                message:"usuario de compañia ya existe"});
        }
        const pro_name="admin";
        const idProfile = await consultProfile(pro_name);

        if (idProfile == null){
            return res.json({
                status:800,
                message:"perfil de usuario no existe"})
        }
        company.save(async(err:any, product:any, numAffected:number) =>{
            if (err) {
                return res.json({
                    status:500,
                    message: err.message});
            } else if(product) {
                
                user_password = encriptPassword(user_password);
                const data = {
                    user_name,
                    user_password,
                    com_id:product._id,
                    pro_code: idProfile
                } 
                const user = await User(data)
                user.save((err:any, user:any) =>{
                    if (err) {
                        return res.json({
                            status:500,
                            message: err.message});
                    }
                    return res.json({
                        status:200,
                        message:"usuario de compañia insertado",
                        com_code,
                    })
                });
            }
          });
    } catch (error:any) {
        console.log(error);
        return res.json({
            status:500,
            message:error})
    }
}

const getCompanyUser = async(req:Request, res:Response) =>{

    const {com_id, _id } = getUser();
    const {user_id} = req.query;
    console.log( com_id);
    
    try {
        let users:any;
        if(!user_id){
            users = await User.find({com_id, _id:{$ne:_id},user_status:true}).populate('pro_code');
        }else{
            users = await User.findOne({com_id, _id:{$eq:user_id, $ne:_id}, user_status:true}).populate('pro_code')
        }
        if (users){

            return res.json({status:200, message:users})
        }
        
        return res.json({status:602, message:"usuario de compañia no existe"})
    } catch (error:any) {
        console.log(error)
        return res.json({
            status:500,
            message:error})
    }
}

const generateCompanyCode = async(req:Request, res:Response) =>{
    const {com_id} = getUser();
    try {
        const company = await Company.findById({_id:com_id, com_status:true});
        if (!company){
            return res.json({
                status: 605,
                message:"compañia no existe"
            })
        }
        const {com_name} = company; 
        console.log(company);
        const code = await companyCode(com_name);
        await Company.findByIdAndUpdate({
            _id:com_id, com_status:true
        }, 
        {com_code:code});
        return res.json({
            status:200,
            code
        })
        
    } catch (error) {
        return res.json({
            status:500,
            message:error
        })
    }
}

const deleteCompanyUser = async(req:Request, res:Response) =>{
    let {ids} = req.body;
    const user = getUser();
    console.log("eliminar",ids)
    console.log(user)
    try {
        const company = await Company.findOne({_id: user.com_id, com_status:true});
        if(!company){
            return res.json({
                status:605,
                message:"compañia no existe"});
        }
        let deleteUser:any = undefined;
        let deleted:any = [];
        if(ids){

             for(let id of ids){
                if (id != user._id){
                    deleteUser = await User.findOneAndUpdate({_id:id, user_status:true}, {user_status:false}, {new:true});
                    if(deleteUser) deleted.push(deleteUser.user_name);
                    console.log(deleteUser);
                }
             }  
        }
        
        if (company && deleted.length>0){
            return res.json({
                status:200,
                message:deleted});
        }
        return res.json({
            status:602,
            message:"usuario de compañia no existe"})
    } catch (error:any) {
        console.log(error);
        return res.json({
            status:500,
            message:error})
    }
}


const updateCompanyUser = async(req:Request, res:Response) => {
    let data = req.body;
    const {user_id} = req.query;
    
    try {
        data = await getDataCompany(req, res, data);
        console.log("data compme", data)
        const updateUser = await User.findOneAndUpdate({_id:user_id, user_status:true}, {$set:data}, {new:true});
        if (!updateUser){
            return res.json({
                status:602,
                message:"usuario no actualizado, no existe"
            });
        }
        return res.json({
            status:200,
            message:"usuario actualizado"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status:500,
            message:error
        })
    }
}

export = {
    insertCompany,
    getCompanyUser,
    deleteCompanyUser,
    generateCompanyCode,
    updateCompanyUser
}