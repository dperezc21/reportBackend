const {Schema, model, createConnection} = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const connection = createConnection(process.env.URL_MONGODB);
autoIncrement.initialize(connection)

const modelUserProfile = Schema({
    pro_name:{
        type:String,
        require:true,
        unique: true
    },
    pro_status:{
        type:Boolean,
        default:true
    }
    
});
modelUserProfile.plugin(autoIncrement.plugin, {model:'userProfile', startAt: 1});

modelUserProfile.methods.toJSON = function(){
    const {__v, _id, pro_status, ...profile} = this.toObject();
    profile.pro_id = _id;
    return profile;
}

export = model('userProfile', modelUserProfile)