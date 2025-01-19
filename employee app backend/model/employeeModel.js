const mongoose = require('mongoose')
const employeeSchema = mongoose.Schema({
    name:String,
    designation:String,
    salary:Number,
    department:String,
    emplocation:String
})
const employeeModel = mongoose.model('employee',employeeSchema);
module.exports = employeeModel;