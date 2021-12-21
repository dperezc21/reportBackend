import { Request, response, Response } from "express";
import insertCategoryRepositpory from '../services/categoryService/insertCategoryService';
import getCategoriesService from '../services/categoryService/getCategoriesServices';
import deleteCategoryService from '../services/categoryService/deleteCategoryService';


class ControllerCategory {

    insertCategory = async(req: Request, res:Response) =>{
        try {
            const {cat_name} = req.body;
            const response = await insertCategoryRepositpory(cat_name);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }


    getCategories = async(req: Request, res:Response) => {
        try {
            const response = await getCategoriesService();
            return res.json(response);
        } catch (error) {
            return response.json({
                status:500,
                message:error
            })
        }
    }

    deleteCategory = async(req: Request, res:Response) => {
        try {
            const {cat_name} =  req.query;
            const response = await deleteCategoryService(cat_name);
            return res.json(response);
        } catch (error) {
            return response.json({
                status:500,
                message:error
            })
        }
    }

}



export = new ControllerCategory;