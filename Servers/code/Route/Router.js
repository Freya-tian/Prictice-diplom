var express = require('express')
const axios = require('axios')
const md5 = require('md5')
const moment =require('moment')
let router = express.Router()


let productsModel = require("../database/database_products.js")
let recordsModel = require("../database/saled")
const { json } = require('express')

router.get('/api/products',function(res,req){
    productsModel.find({},(error,docs)=>{
        req.send(docs)
    })
    
})
// 添加
router.post('/api/products/add',express.json(),(res,req)=>{
    let data = res.body;
    let infomation = new productsModel(data) ;
    console.log(data);

    productsModel.find({$or:[{name:data.name},{Id:data.Id}]},(erroe,doc)=>{
       
        if(doc.length== 0){
            infomation.save((error,data)=>{

                if(error){
                    req.status(400).send({
                        'msg':'发生了一些错误，请重试\n Something went wrong, please try again',
                        "error":error
                    })
                }else{
                    req.status(200).send({
                        "msg":'成功输入Success,yessss!'
                    })
                }
            })
        }else{
            req.status(500).send({
                "msg":"你已经保存过这个产品数据了哦~~~~~\n You have already saved this product data~~~~~~"});
        }
        
    })
    
   
})
// 删除
router.post('/api/products/delete',express.json(),(res,req)=>{
    let data = res.body;
    
    console.log(res.body);

    productsModel.remove({Id:Number(data.Id)},(error,doc)=>{
        
        
            if(error){
                req.send({msg:"发生了一些错误，请重试\n Something went wrong, please try again"})
            }else {
                req.send({msg:"成功删除"+data.Id+"Delete successfuly"})
            }
       
    })
})

// 查找数据
router.get('/api/products/item',(res,req)=>{
    
    let data = res.query;   
    console.log(res);
    let datares='';
    if(data.Id!==undefined){
        datares = data.Id
        productsModel.find({Id:Number(datares)},(error,doc)=>{
        
            if(error){
                req.status(400).send({"status":400,
                    "error":"发生了一些错误，请重试\n Something went wrong, please try again"})
            }else {
                req.status(200).send({"status":200,
                    "body": doc})
            }
        })
    }else{
        datares=data.name
        productsModel.find({name:datares},(error,doc)=>{
        
            if(error){
                req.status(400).send({"status":400,
                    "error":"发生了一些错误，请重试\n Something went wrong, please try again"})
            }else if(doc.length != 0){
                req.status(200).send({"status":200,
                    "body": doc})
            }else{
                req.status(500).send({"status":500,
                    "msg":"系统中找不到该数据\n Can not find it in system"})
            }
        })
    }
    console.log(datares)
    
    
})

router.post('/api/products/update',express.json(),(res,req)=>{
    console.log(res);
    productsModel.findOneAndUpdate({Id:res.body.Id},{$set:res.body.update},(err,data)=>{
        if(err){
            req.status(400).send({"status":400,
            "error":"发生了一些错误，请重试\n Something went wrong, please try again"})
        }else if(!data){
            req.status(500).send({
                msg:'can not find this item'
            })
        }else if(data){
            req.status(200).send({
                msg:'changed it,Please refresh site'
            })
        }

    })
})

router.post('/api/wechatPay',express.json(),(res,req)=>{
    let APPID= 'b87e843e3da5b336'
    let APPSECRET= 'b87e843e3da5b3364efdb67a3a9ae1ee'
    let singstr = md5(APPID+res.body.payId+''+'1'+res.body.price + APPSECRET)
    let appsign = md5(APPID+APPSECRET)
    
    axios.post('https://www.gogozhifu.com/createOrder',{
        payId:res.body.payId,
        type  :1,
        price:res.body.price,
        param:'',
        sign:singstr,
        notifyUrl: 'http://119.45.178.227:8080/api/response',
    },{
        headers:{
            "App-Id": APPID,
            "App-Sign":appsign
        }
    }).then(date=>{
        console.log(date.data);
        if(date.data.code == 1){
            console.log(date.data.data);
            req.send(date.data.data)
        }else{
            req.send(date.data.msg)
        }
       
    })
})
router.post('/api/AliPay',express.json(),(res,req)=>{
    let APPID= 'b87e843e3da5b336'
    let APPSECRET= 'b87e843e3da5b3364efdb67a3a9ae1ee'
    let singstr = md5(APPID+res.body.payId+''+'2'+res.body.price + APPSECRET)
    let appsign = md5(APPID+APPSECRET)
    
    axios.post('https://www.gogozhifu.com/createOrder',{
        payId:res.body.payId,
        type  :2,
        price:res.body.price,
        param:'',
        sign:singstr,
        notifyUrl: 'http://119.45.178.227:8080/api/response',
    },{
        headers:{
            "App-Id": APPID,
            "App-Sign":appsign
        }
    }).then(date=>{
        console.log(date.data);
        if(date.data.code == 1){
            console.log(date.data.data);
            req.send(date.data.data)
        }else{
            req.send(date.data.msg)
        }
       
    })
})

router.post('/api/response',express.json(),(res,req)=>{
    console.log(res.query)
    let data={
        ID:res.query.payId,
        Amount:res.query.reallyPrice,
        YY:moment().format('YYYY'),
        MM:moment().format('MM'),
        DD:moment().format('DD'),
        Time:moment().format('hh:mm A'),
    }
    let infomation = new recordsModel(data) ;
    infomation.save((error,data)=>{
        if(error){            
            console.log(error);             
        }else{
            req.send("success"),
            console.log("success"); 
        }
    })
})
module.exports = router