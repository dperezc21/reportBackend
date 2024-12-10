import {model, Schema} from 'mongoose';

const autoIncrement = require('mongoose-id-autoincrement');
import database from './../dataBase/connectionToMongoDb';

const connection = database.createConnection();
autoIncrement.initialize(connection)

const modelCategory = new Schema({
    cat_name: {
        type: String,
        required: true,
        unique: true
    },
    cat_status: {
        type: Boolean,
        default: true
    }
});

//modelCategory.plugin(autoIncrement.plugin, {model:'category', startAt:1});
modelCategory.methods.toJSON = function(){
    const {__v, _id, cat_status, ...category} = this.toObject();
    category.cat_id = _id;
    return category;
}
export = model('category', modelCategory);