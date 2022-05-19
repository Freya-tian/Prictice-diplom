var express = require('express');
var app = express();
// 引入数据库
const route = require("../code/Route/Router.js")
const record = require("../code/Route/Record.js")
const cashier = require("../code/Route/Cashier.js")


app.use(route)
app.use(record)
app.use(cashier)

app.listen(8080,()=>{
    console.log("success");
})