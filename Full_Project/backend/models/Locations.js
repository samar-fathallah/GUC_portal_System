const mongoose = require("mongoose");

const Location = new mongoose.Schema({
    room_number: { type: String, required: true},
    type: { type:String, enum:["lab","tut_room","hall","office"], required: true},
    max_capacity:{ type: Number, required: true},
    current_capacity:{ type: Number,default:0}
  });
    module.exports = mongoose.model("Location", Location);


  