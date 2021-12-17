const {Schema, model, createConnection} = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const connection = createConnection(process.env.URL_MONGODB);
autoIncrement.initialize(connection)


const modelCategory = Schema({
    
    cat_name:{
        type:String,
        required:true,
        unique:true
    },
    cat_status:{
        type:Boolean,
        default:true
    }
});

modelCategory.plugin(autoIncrement.plugin, {model:'category', startAt:1});
modelCategory.methods.toJSON = function(){
    const {__v, _id, cat_status, ...category} = this.toObject();
    category.cat_id = _id;
    return category;
}
export = model('category', modelCategory);