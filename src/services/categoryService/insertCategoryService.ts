import CategoryInterface from '../../interfaces/categoryInterface';
import Category  from '../../models/modelCategory';

const insertCategoryRepository = async(cat_name:string) =>{
    try {
       
    const searchCategory: CategoryInterface = await Category.findOne({cat_name, cat_status:true}) as CategoryInterface;
    
    if (searchCategory){
        return {
            status:802,
            message:"categoria existe en la base de datos"
        }    
    }
    const c = await new Category({cat_name});
    const save = await c.save();
    if(save) return {
        status:500,
        message: "categoria no inserted"
    };
    /*c.save((error: any, cat:any) =>{
        if (error){
            console.log(error);
            return {
                status:500,
                message:error.message
            };
        }
          
    })*/
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


export = insertCategoryRepository;