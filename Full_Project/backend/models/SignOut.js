const mongoose = require("mongoose");

const SignOut = new mongoose.Schema({
    member_id: { type: String, required: true},
    Time: { type: Date, default:Date.now }
  });
    module.exports = mongoose.model("SignOut", SignOut);