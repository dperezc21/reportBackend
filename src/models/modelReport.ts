
const {Schema, model, createConnection} = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const connection = createConnection(process.env.URL_MONGODB);
autoIncrement.initialize(connection)

const modelReport = Schema({
    rep_code:{
        type:String,
        required:true,
        unique:true
    },
    user_code:{
        type:Number,
        required: true,
        ref: 'user'
    },
    cat_code:{
        type: Number,
        required: true,
        ref: 'category'
    },
    rep_description:{
        type: String,
        required: true,
    },
    rep_address:{
        type: String,
        required: true,
    },
    coordinate:{
        type: JSON
    },
    rep_create_date:{
        type: Date,
        default:Date.now
    },
    rep_status:{
        type: Boolean,
        default:true
    }
});

modelReport.plugin(autoIncrement.plugin, {model:'report', startAt:1});
modelReport.methods.toJSON = function(){
    const {__v, _id, rep_status,  user_code, cat_code, ...report} = this.toObject();
    report.user = user_code;
    report.category = cat_code;
    return report;
}
export = model('report', modelReport);