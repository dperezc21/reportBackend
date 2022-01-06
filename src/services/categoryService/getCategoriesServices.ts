import CategoryInterface from '../../interfaces/categoryInterface';
import Category from '../../models/modelCategory';

const getCategoriesService = async() => {
    try {
        const categories: CategoryInterface[] = await Category.find({cat_status:true});
        
        if (!categories){
            return {
                status:803,
                message:"categoria no existe"
            };
        }
        return {
            status:200,
            message:categories
        }
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        };
    }
}

export = getCategoriesService