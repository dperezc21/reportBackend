import CategoryInterface from '../../interfaces/categoryInterface';
import Category  from '../../models/modelCategory';

const insertCategoryRepositpory = async(cat_name:string) =>{
    try {
       
    const searchCategory: CategoryInterface = await Category.findOne({cat_name, cat_status:true});
    
    if (searchCategory){
        return {
            status:802,
            message:"categoria existe en la base de datos"
        }    
    }
    const c = await Category({cat_name});
    c.save((error:any, cat:any) =>{
        if (error){
            console.log(error);
            return {
                status:500,
                message:error.message
            };
        }
          
    })
    return {
        status:200,
        message:"category inserted"
    }
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:error
        };
    }
}


export = insertCategoryRepositpory;