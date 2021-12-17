const {Schema, model, createConnection} = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const connection = createConnection(process.env.URL_MONGODB);
autoIncrement.initialize(connection)

const modelUser = Schema({
    com_id:{
        type: Number,
        required: [true,'code that reference the table company in user required'], 
        ref:'company'
    },
    pro_code:{
        type:Number,
        required: true,
        ref: 'userProfile'
    },
    user_name:{
        type: String,
        required: true,
        unique: true
    },
    user_password:{
        type: String,
        required: true
    },
    user_create_date:{
        type: Date,
        default:Date.now
    },
    user_status:{
        type: Boolean,
        default:true
    },
});

modelUser.plugin(autoIncrement.plugin, {model:'user', startAt:1});

modelUser.methods.toJSON = function(){
    const {__v, user_password, _id, pro_code, user_status, com_id, ...user} = this.toObject();
    user.company = com_id;
    user.profile = pro_code;
    user.user_id = _id;
    return user;
}
export = model('user', modelUser);