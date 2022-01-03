import { Request, response, Response } from "express";
import insertCategoryRepositpory from '../services/categoryService/insertCategoryService';
import getCategoriesService from '../services/categoryService/getCategoriesServices';
import deleteCategoryService from '../services/categoryService/deleteCategoryService';


class ControllerCategory {

    //controllador para insertar categoria
    insertCategory = async(req: Request, res:Response) =>{
        const {cat_name} = req.body;//nombre de la categoria obtenido de la request
        try {
            const response: object = await insertCategoryRepositpory(cat_name);
            return res.json(response);
        } catch (error) {
            return res.json({
                status:500,
                message:error
            })
        }
    }

    //controllador para obtener todas la categorias categoria
    getCategories = async(req: Request, res:Response) => {
        try {
            const response: object = await getCategoriesService();
            return res.json(response);
        } catch (error) {
            return response.json({
                status:500,
                message:error
            })
        }
    }

    //controllador para eliminar categoria por el nombre
    deleteCategory = async(req: Request, res:Response) => {
        const {cat_name} =  req.query;//nombre categoria obtenido de la request
        try {
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