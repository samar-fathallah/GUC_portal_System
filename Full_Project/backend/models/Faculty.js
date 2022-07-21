const mongoose = require("mongoose");
const FacultySchema = new mongoose.Schema({
    name: { type: String, required: true},
    department: [String],
    });
    module.exports = mongoose.model("faculty", FacultySchema);