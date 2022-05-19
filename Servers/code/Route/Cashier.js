var express = require('express')


let cashierRouter = express.Router()


let cashierModel = require("../database/cashier")

// let infomation = new cashierModel({
//     "Id":1,
//     Login : 'tianqi',
//     password: '123456'
// }) ;
// infomation.save((error,data)=>{
//     if(error){
//        console.log(error);
//     }else{
//         console.log(data);
//     }
// })

cashierRouter.post('/api/cashier/find',express.json(),(res,req)=>{
    console.log(res);
    let data = res.body
    
    cashierModel.aggregate([
        {
            $match:{
                Login:data.Login,
                password:data.password,            
            }
        }                
        ]).exec((error,records)=>{
            if(error){
                console.log(error);
                req.send({
                    status:400,
                    msg:"Login  Unsuccess"
                })
            }else{
                console.log(Date.now());
                req.status(200).send({
                    accessToken: Date.now(),
                    status:200,
                    msg:"Login Success",
                    name:data.Login
                })
            }
            
        })
})
module.exports= cashierRouter