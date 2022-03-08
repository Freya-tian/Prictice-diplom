var express = require('express');
var app = express();
// 引入数据库
const route = require("../code/Route/Router.js")


app.use(route)

app.listen(3000,()=>{
    console.log("success");
})