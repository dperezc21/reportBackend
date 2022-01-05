const {Schema, model, createConnection} = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const connection = createConnection(process.env.URL_MONGODB);
autoIncrement.initialize(connection)


const modelFile = Schema({
    
    rep_code:{
        type:String,
        required: true,
        ref: 'report'
    },
    file_name:{
        type: String,
        required: true,
        unique:true
    },
    file_path:{
        type: String,
        required: true,
    },
    
    file_size:{
        type:Number,
        default:true
    },
    file_type:{
        type: String,
    }
});

modelFile.plugin(autoIncrement.plugin, {model:'file', startAt:1});
modelFile.methods.toJSON = function(){
    const {__v, _id, file_status, ...file} = this.toObject();
    file.file_code = _id;
    return file;
}
export = model('file', modelFile);