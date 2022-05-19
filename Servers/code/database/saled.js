const mongoose = require('mongoose');


const recordSchema = new mongoose.Schema({
    ID:String,
    Amount:Number,
    YY:String,
    MM:String,
    DD:String,
    Time:String
},{collection:"record"});
const record = mongoose.model('Record',recordSchema,'record');
module.exports = record