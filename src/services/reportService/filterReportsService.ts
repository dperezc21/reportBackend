import CategoryInterface from "../../interfaces/categoryInterface";
import ReportInterface from "../../interfaces/reportInterface"
import UserInterface from "../../interfaces/userInterface";
import modelCategory from "../../models/modelCategory";
import modelReport from "../../models/modelReport"
import modelUser from "../../models/modelUser";
const { listIds } = require('../../helpers/helperUser');
const { getAuthUser } = require("../../middleware/verifyToken");


const filterReportsAdminService = async (key: string, value: string) => {
    const { com_id } = getAuthUser();
    try {
        let reports: ReportInterface[] = [];
        let users: UserInterface[] = [];

        if (key == 'user_name') {
            users = await modelUser.find({ com_id, user_name: eval("/" + value + "/") });
            const ids_user: number[] = listIds(users);

            reports = await modelReport.find({ user_code: ids_user })
                .populate('user_code', ['-user_password', '-__v'])
                .populate('cat_code', ['cat_name']);
            console.log(reports)
        } else if (key == 'rep_code') {
            users = await modelUser.find({ com_id });
            const ids_user: number[] = listIds(users);

            reports = await modelReport.find({ user_code: ids_user, rep_code: eval("/" + value + "/") })
                .populate('user_code', ['-user_password', '-__v'])
                .populate('cat_code', ['cat_name']);
            console.log(reports)
        } else if (key == 'name') {
            users = await modelUser.find({ com_id, names_user: eval("/" + value + "/") });
            const ids_user: number[] = listIds(users);

            reports = await modelReport.find({ user_code: ids_user })
                .populate('user_code', ['-user_password', '-__v'])
                .populate('cat_code', ['cat_name']);
        }else if(key == 'category'){
            users = await modelUser.find({ com_id});
            const category:CategoryInterface[] = await modelCategory.find({cat_name: eval("/" + value + "/") }) 
            const ids_user: number[] = listIds(users);
            const ids_cat: number[] = listIds(category);
            console.log(ids_cat)
            reports = await modelReport.find({ user_code:ids_user, cat_code:ids_cat })
                .populate('user_code', ['-user_password', '-__v'])
                .populate('cat_code', ['cat_name']);
        }
        if(reports.length == 0){
            return {
                status:805,
                message:"no existen reportes"
            }
        }

        return {
            status: 200,
            message: reports
        }
    } catch (error: any) {
        return {
            status: 500,
            message: error.message
        }
    }
}


const filterReportsUserService = async (key: string, value: string) => {
    const { _id } = getAuthUser();
    try {
        
        let reports: ReportInterface[] = [];
        console.log(_id)
      if (key == 'rep_code') {

            reports = await modelReport.find({ user_code: _id, rep_code: eval("/" + value + "/") })
                .populate('user_code', ['-user_password', '-__v'])
                .populate('cat_code', ['cat_name']);
            console.log(reports)
        }else if(key == 'category'){
            const category:CategoryInterface = await modelCategory.findOne({cat_name: eval("/" + value + "/")}) 

            reports = await modelReport.find({ user_code:_id, cat_code:category._id })
                .populate('user_code', ['-user_password', '-__v'])
                .populate('cat_code', ['cat_name']);
        }
        if(reports.length == 0){
            return {
                status:805,
                message:"no existen reportes"
            }
        }

        return {
            status: 200,
            message: reports
        }
    } catch (error: any) {
        return {
            status: 500,
            message: error.message
        }
    }
}

export = {
    filterReportsAdminService,
    filterReportsUserService
} 