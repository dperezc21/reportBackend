const {Schema, model, createConnection} = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const connection = createConnection(process.env.URL_MONGODB);
autoIncrement.initialize(connection)


const modelToken = Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    user_code:{
        type:Number,
        required: true,
        ref: 'user'
    },
    token_create_date:{
        type:Number,
        default: new Date().getTime()
    },
    token_status:{
        type:Boolean,
        default:true
    }
    
});

modelToken.plugin(autoIncrement.plugin, {model:'token', startAt:1});
modelToken.methods.toJSON = function(){
    const {__v, _id, token_status, ...token} = this.toObject();
    
    return token;
}
export = model('token', modelToken);