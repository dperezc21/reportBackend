import { Request, Response } from "express";
const {
    getCompanyUserRepository,
    deleteCompanyUserRepository,
    updateCompanyUserRepository,
    insertUserRepository,
    login
} = require('../services/userServices')

class ControllerUser{
    
    insertUser = async(req:Request, res:Response) => {
        try {
            let Uobject: object = req.body;
            let response: object = await insertUserRepository(Uobject);
            console.log("log", response)
            return res.json(response);
            
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
        
    }

    loginUser = async(req:Request, res:Response) =>{
        const data: object = req.body;
        try {
            const response: object = await login(data);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }

    getCompanyUser = async(req:Request, res:Response) =>{
        const query: object = req.query;
        try {
            const response: object = await getCompanyUserRepository(query);
            return res.json(response);
            
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }
    deleteCompanyUser = async(req:Request, res:Response) => {
        let {ids} = req.body;
        try {
            const response: object =  await deleteCompanyUserRepository(ids);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }

    } 

    updateCompanyUser = async(req:Request, res:Response) =>{
        let data: object = req.body;
        const {user_id} = req.query;

        try {
            const response = await updateCompanyUserRepository({user_id, data});
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }

}


export = new ControllerUser();
        
// const getUsers = async(req:Request, res:Response) => {
        //     const {pro_code} = req.body.user;
        //     try {
        //         const users = await User.find({user_status:true, pro_code}).limit(5).populate('com_id').populate('pro_code')
        //         if (!users){
        //             return res.json({message:"there is not users"})
        //         }else{ 
        //             Object.keys(users).forEach(key => {
        //                 users[key].user_password = null;
        //             })
        //             return res.json({users});
        //         }
        //     } catch (error) {
        //         return res.json({message:error})
        //     }
        // }
        
        // const deleteUser = async(req:Request, res:Response) =>{
//     const data = req.body;
//     data.user_status = true
//     try {
//         const user = await User.findOneAndUpdate(data, {user_status:false},{new:true})
//         if (user){
//             return res.json({
//                 status:200,
//                 message:"user deleted"})
//         }
//         return res.json({
//             status:400,
//             message:"user don't exists"})
        
//     } catch (error) {
//         console.log(error);
//         return res.json({
//             status:500,
//             message:error})
//     }

// }
