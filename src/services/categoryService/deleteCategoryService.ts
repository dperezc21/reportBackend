import CategoryInterface from '../../interfaces/categoryInterface';
import Category from '../../models/modelCategory';

const deleteCategoryRepository = async (cat_name:any) => {
    try {
        const category: CategoryInterface = await Category.findOneAndUpdate({cat_name, cat_status:true}, {cat_status:false}, {new:true}) as CategoryInterface;
        if (!category){
            return {
                status:803,
                message:"categoria no existe"
            };
        }
        return {
            status:200,
            message:"categoria eliminada"
        }

    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        }
    }
}

export = deleteCategoryRepository;