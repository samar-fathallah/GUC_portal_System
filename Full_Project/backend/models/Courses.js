
const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
    day_slot: { type: String, required: true},
    assigned: { type: Boolean, required: true }
  });
const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true},
    department: { type: String, required: true},
    coverage: { type: Number, default:0, required: false},
    slot:[{type:SlotSchema}],
    CCid: { type: Number, default:0,required: false},
    CIid:{ type: Number, default:0,required: false},
    TAs:[Number],
    
    });
    module.exports = mongoose.model("Courses", CourseSchema);