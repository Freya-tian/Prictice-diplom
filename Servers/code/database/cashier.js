const mongoose = require('mongoose');


const cashierSchema = new mongoose.Schema({
    Id:Number,
    Login:String,
    password:String
},{collection:"cashier"});
const cashier = mongoose.model('Cashier',cashierSchema,'cashier');
module.exports = cashier