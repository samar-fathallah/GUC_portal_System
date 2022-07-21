var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb+srv://samarfathallah:10061999@cluster0.xetwj.mongodb.net/guc_portal?retryWrites=true&w=majority');
var uniqueValidator = require('mongoose-unique-validator');
autoIncrement.initialize(connection);
var bcrypt=require("bcrypt");
const jwt =require('jsonwebtoken');
autoIncrement.initialize(connection);
const salt=bcrypt.genSaltSync();
const hashedPassword=bcrypt.hashSync("123456",salt);
const HRSchema = new mongoose.Schema(
    {
    Name: { type: String, required: true},
    gender: { type: String, enum:["male","female"],max: 1},
    email: { type: String, required: true, unique : true},
    password: { type: String,default:hashedPassword,min: 4},
    salary: { type: Number, required: true, min: 0 },
    day_off:{ type: String,default: 'saturday',  unmodifiable: true},
    OfficeLocation:{type:String,required: true},
    Personal_info: { type: String, required: false},
    annualleavebalance:{ type: Number,deafult:0, min: 0 },
    accidentalleavebalance:{type: Number,deafult:6, min: 0},
    });
    HRSchema.plugin(autoIncrement.plugin, 'HRmem');
   // HRSchema.plugin(uniqueValidator);
    module.exports = mongoose.model("HRStaff", HRSchema);