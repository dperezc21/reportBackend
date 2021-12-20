import { Request, Response } from "express";
const insertUserRepository = require('../services/userServices/insertUserService');
const login = require('../services/userServices/loginUserService');
class ControllerUser{
    
    insertUser = async(req:Request, res:Response) => {
        try {
            let Uobject = req.body;
            let response = await insertUserRepository(Uobject);
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
        const data = req.body;
        try {
            const response = await login(data);
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
