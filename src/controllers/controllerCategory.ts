import { Request, Response } from "express";
import Category  from '../models/modelCategory';

const insertCategory = async(req: Request, res:Response) =>{
    try {
        const {cat_name} = req.body;
        console.log("nombre de categoria",cat_name);
       
    const searchCategory = await Category.findOne({cat_name, cat_status:true});
    
    if (searchCategory){
        return res.json({status:802, message:"categoria existe en la base de datos"})    
    }
    const c = await Category({cat_name});
    c.save((error:any, cat:any) =>{
        if (error){
            return res.json({status:500,message:error.message});
        }else{
            return res.json({status:200,message:"category inserted"})
        }
    })
    } catch (error) {
        return res.json({status:500, message:error});
    }
}


const getCategories = async(req: Request, res:Response) => {
    try {
        const categories = await Category.find({cat_status:true});
        console.log("categorias",categories)
        if (!categories){
            return res.json({status:803, message:"categoria no existe"});
        }
        return res.json({status:200, message:categories})
    } catch (error) {
        return res.json({status:500, message:error});
    }
}

const deletecategory = async (req: Request, res:Response) => {
    try {
        const {cat_name} = req.query;
        const category = await Category.findOneAndUpdate({cat_name, cat_status:true}, {cat_status:false}, {new:true});
        console.log("categoria eleimnar", cat_name)
        if (!category){
            return res.json({status:803, message:"categoria no existe"});
        }
        return res.json({status:200, message:category})

    } catch (error) {
        return res.json({status:500, message:error})
    }
}


export = {
    insertCategory,
    getCategories,
    deletecategory
}