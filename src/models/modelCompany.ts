const {Schema, model, createConnection} = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const connection = createConnection(process.env.URL_MONGODB);
autoIncrement.initialize(connection)

const modelCompany = Schema({

    com_code:{
        type:String,
        require:true,
        unique: true
    },
    com_name:{
        type:String,
        require:true,
        unique:true
    },
    com_description:{
        type:String,
        default:""
    },
    // com_nit:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    // com_email:{
    //     type:String,
    //     unique:true
    // },
    // com_address:{
    //     type:String
    // },
    // com_land_line:{
    //     type:Number
    // },
    // com_cell_phone:{
    //     type:Number
    // },
    com_status:{
        type:Boolean,
        default:true
    },
    com_create_date:{
        type:Number,
        default:Date.now
    }
});

modelCompany.plugin(autoIncrement.plugin, {model:'company', startAt:1});

modelCompany.methods.toJSON = function(){
    const {__v, _id, com_status, ...company} = this.toObject();
    company.com_id = _id;
    return company;
}

export = model('company', modelCompany);