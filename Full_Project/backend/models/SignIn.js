const mongoose = require("mongoose");

const SignIn = new mongoose.Schema({
    member_id: { type: String, required: true},
    Day:{ type:Number, required: true},
    Month:{ type: Number, required: true},
    Year: { type: Number, required: true},
    Hour:{ type: Number, required: true},
    Minutes:{ type: Number, required: true}
  });
    module.exports = mongoose.model("SignIn", SignIn);