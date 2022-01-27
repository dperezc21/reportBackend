const { URL_MONGODB } = require("../../config");
const {Schema, model, createConnection} = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const connection = createConnection(URL_MONGODB);
autoIncrement.initialize(connection)


const modelIdType = Schema({
    id_type:{
        type:Number,
        required:true,
        unique:true
    },
    id_type_status:{
        type:Boolean,
        default:true
    }
    
});

modelIdType.plugin(autoIncrement.plugin, {model:'idType', startAt:1});
modelIdType.methods.toJSON = function(){
    const {__v, id_type_status, ...idType} = this.toObject();
    
    return idType;
}
export = model('idType', modelIdType);