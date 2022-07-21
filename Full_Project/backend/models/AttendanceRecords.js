var mongoose = require("mongoose");
const Record = new mongoose.Schema({
    fulldate:{type: Date, default:Date.now,required: false},
    day: {type:Number ,required: true},
    dayname:{type:Number ,required: true}, // day/month/year
    month:{type:Number ,required: true},
    year:{type:Number ,required: true},
    Signin: { type: String, default:"none",required: false}, //time of sign in
    SignOut:{type:String,default:"none",required:false},  // time of sign out
    MinutesSpent:{type:Number,default:0,required:false} // hours spent on this day
  });
const AttendanceRecords = new mongoose.Schema(
    {
     member_id:{type:String,required:true}, // either ac-1 or hr-1
     Days:[{type:Record}]
    }
    );
    module.exports = mongoose.model("Attendance",AttendanceRecords);