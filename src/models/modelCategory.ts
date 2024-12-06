import {Schema, createConnection, model} from 'mongoose';
//import autoIncrement from 'mongoose-auto-increment';
const connection = createConnection("mongodb://127.0.0.1:27017/test");
//autoIncrement.initialize(connection)

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