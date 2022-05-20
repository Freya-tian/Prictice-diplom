var express = require('express')


let recordRouter = express.Router()


let recordsModel = require("../database/saled")

recordRouter.post('/api/records/add',express.json(),(res,req)=>{
    let data = res.body
    console.log(data);
    let infomation = new recordsModel(data) ;
    infomation.save((error,data)=>{
        if(error){
            req.status(400).send({
                'msg':'发生了一些错误，请重试\n Something went wrong, please try again',
                "error":error
            })
        }else{
            req.status(200).send({'code': 200,
                "msg":'成功输入Success,yessss!'
            })
        }
    })
})

recordRouter.get('/api/records/get',express.json(),(res,req)=>{
    recordsModel.find({},(error,docs)=>{
        if(error){
            req.send({
                msg:"error"
            })
        }else{
            req.send(docs)

        }
    })

   
    
})

recordRouter.get('/api/records/getday',express.json(),(res,req)=>{  
    // console.log(res.query);
    let data = res.query
    recordsModel.aggregate([
    {
        $match:{
            YY:data.YY,
            MM:data.MM,
            DD:data.DD
        }
    }
    ]).exec((error,records)=>{
        req.send(records)
    })
    
})

recordRouter.get('/api/records/getmonth',(res,req)=>{  
    console.log(res.query);
    let data = res.query
    recordsModel.aggregate([
    {
        $match:{
            YY:data.YY,
            MM:data.MM,            
        }
    },{
        $group:{
            _id:"$DD",
            daysum:{$sum:'$Amount'}
        }
    }
    
    ]).exec((error,records)=>{
        if(error){
            console.log(error);
        }else{
            console.log(records);
            req.send(records)
        }
        
    })
    
})
recordRouter.get('/api/records/geteverymonth',(res,req)=>{  
    console.log(res.query);
    let data = res.query
    recordsModel.aggregate([
    {
        $match:{
            YY:data.YY
                    
        }
    },{
        $group:{
            _id:"$MM",
            monthsum:{$sum:'$Amount'}
        }
    }
    
    ]).exec((error,records)=>{
        if(error){
            console.log(error);
        }else{
            console.log(records);
            req.send(records)
        }
        
    })
    
})
recordRouter.get('/api/records/year',(res,req)=>{  
    console.log(res.query);
    let data = res.query
    recordsModel.aggregate([
    {
        $group:{
            _id:"$YY",
            yearsum:{$sum:'$Amount'}
        }
    }
    
    ]).exec((error,records)=>{
        if(error){
            console.log(error);
        }else{
            console.log(records);
            req.send(records)
        }
        
    })
    
})
// 查询是否支付成功
recordRouter.get('/api/records/PaySuccess',(res,req)=>{
    recordsModel.find({ID:res.query.payId},(error,doc)=>{
        
        if(error){
            req.status(400).send({"status":400,
                "error":"发生了一些错误，请重试\n Something went wrong, please try again"})
        }else {
            req.status(200).send({"status":200,
                "msg": "Pay success"})
        }
    })
})



module.exports= recordRouter