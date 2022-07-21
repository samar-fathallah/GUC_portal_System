var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb+srv://samarfathallah:10061999@cluster0.xetwj.mongodb.net/guc_portal?retryWrites=true&w=majority');
var bcrypt=require("bcrypt");
const jwt =require('jsonwebtoken');
autoIncrement.initialize(connection);
const salt=bcrypt.genSaltSync();
const hashedPassword=bcrypt.hashSync("123456",salt);
const scheduleSchema = new mongoose.Schema({
    day_slot: { type: String, required: true},
    course: { type: String, required: true},
    _id:{type:String,required:false}
  });

const StaffSchema = new mongoose.Schema(
    {
    Name: { type: String, required: true},
    gender: { type: String, enum:["male","female"],required: false,max: 1},
    email: { type: String, required: true, unique : true},
    password: { type: String, required: false,default:hashedPassword,min: 4},
    salary: { type: Number, required: true, min: 0 },
    faculty: { type: String, required: false},
    day_off:{ type: String, required: false},
    department: { type: String, required: false},
    TA: { type: Boolean, required: false},
    CI: { type: Boolean, required: false},
    CC: { type: Boolean, required: false},
    HOD: { type: Boolean, required: false},
    courses: [String], 
    schedule: [{type:scheduleSchema}],
    OfficeLocation:{type:String,required: true},
    annualleavebalance:{ type: Number,default:30, min: 0 },
    accidentalleavebalance:{type: Number,default:6, min: 0},
    Personal_info: { type: String, required: false}
    },
    );

    StaffSchema.plugin(autoIncrement.plugin, 'Staffmem');
    //StaffSchema.plugin(uniqueValidator);
    module.exports = mongoose.model("StaffMem", StaffSchema);