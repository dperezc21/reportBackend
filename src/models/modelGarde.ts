
const { URL_MONGODB } = require("../../config");
const {Schema, model, createConnection} = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const connection = createConnection(URL_MONGODB);
autoIncrement.initialize(connection)


const modelGarde = Schema({
    garde:{
        type:String,
        required:true,
        unique:true
    },
    garde_status:{
        type:Boolean,
        default:true
    }
    
});

modelGarde.plugin(autoIncrement.plugin, {model:'garde', startAt:1});
modelGarde.methods.toJSON = function(){
    const {__v, garde_status, ...garde} = this.toObject();
    
    return garde;
}
export = model('garde', modelGarde);