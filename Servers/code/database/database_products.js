const mongoose = require('mongoose');

const connection = 'mongodb+srv://freya:tq9478586@bill.vlee0.mongodb.net/market?retryWrites=true&w=majority'
mongoose.connect(connection)
var db = mongoose.connection;
db.on('error',(error) => {
    console.log("Database connection failure")
})
db.once('open',()=>{
    console.log('mongoose连接成功了！');
})
const dataSchema = new mongoose.Schema({
Id:Number,
name:String,
description:String,
count:Number,
purchase: Number,//进价
retail:Number,//零售价
wholesale:Number,//批发价
Production_Date:String,//生产日期
shelf_life:String,//保质期
img:String//产品图片
},{collection:"products"});
const products = mongoose.model('Products', dataSchema,'products');
module.exports = products