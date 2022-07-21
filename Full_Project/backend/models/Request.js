var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb+srv://samarfathallah:10061999@cluster0.xetwj.mongodb.net/guc_portal?retryWrites=true&w=majority');
autoIncrement.initialize(connection);
const RequestsSchema = new mongoose.Schema({
    member_id: { type: Number, required: true },
    reciever_id:{ type: Number, required: true},
    type: {type: String,enum:["replacement","annual-leave","accidental-leave","sick-leave","maternity-leave","compensation-leave","Change-dayOff","slotLinking"], required: true},
    college_id:{ type: Number },
    request_day:{type:Date,required:true},
    compensation_day:{type:Date,required:false},
    day_limit:{ type: Number, required: false, min: 1 },
    department:{type: String, required:true},
    state: {type: String,enum:["accepted","rejected","pending"]},
    course_name: {type: String,default:"none", required: false},
    document:{type:String,required:false},
    Comment:{type: String, required:false},
    reason:{type: String, required:false},
    dayoff:{type:String,required:false},
    slot:{type: String, required:false}

});
RequestsSchema.plugin(autoIncrement.plugin, 'request');
module.exports = mongoose.model("Request", RequestsSchema);