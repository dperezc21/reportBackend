import Category from '../../models/modelCategory';

const getCategoriesService = async() => {
    try {
        const categories = await Category.find({cat_status:true});
        console.log("categorias",categories);
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
        return {
            status:500,
            message:error
        };
    }
}

export = getCategoriesService