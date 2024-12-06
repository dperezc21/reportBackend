
const { URL_MONGODB } = require("../../config");
const {Schema, model, createConnection} = require('mongoose');
//const autoIncrement = require('mongoose-auto-increment')
const connection = createConnection(URL_MONGODB);
//autoIncrement.initialize(connection)


const modelGender = Schema({
    gender:{
        type:String,
        required:true,
        unique:true
    },
    gender_status:{
        type:Boolean,
        default:true
    }
    
});

//modelGender.plugin(autoIncrement.plugin, {model:'gender', startAt:1});
modelGender.methods.toJSON = function(){
    const {__v, gender_status, ...gender} = this.toObject();
    
    return gender;
}
export = model('gender', modelGender);