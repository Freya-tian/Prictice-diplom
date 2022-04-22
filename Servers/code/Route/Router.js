var express = require('express')

let router = express.Router()


let productsModel = require("../database/database_products.js")

router.get('/api/products',function(res,req){
    productsModel.find({},(error,docs)=>{
        req.send(docs)
    })
    
})
router.post('/api/products/add',express.json(),(res,req)=>{
    let data = res.body;
    let infomation = new productsModel(data) ;
    console.log(data);

    productsModel.find({$or:[{name:data.name},{Id:data.Id}]},(erroe,doc)=>{
       
        if(doc.length== 0){
            infomation.save((error,data)=>{

                if(error){
                    req.status(400).send({
                        'msg':'发生了一些错误，请重试\n Something went wrong, please try again'
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
router.post('/api/products/delete',express.json(),(res,req)=>{
    let data = res;
    let infomation = new productsModel(data) ;
    console.log(res.body);

    productsModel.findOneAndDelete(Number(data.Id),(error,doc)=>{
        
        
            if(error){
                req.send({msg:"发生了一些错误，请重试\n Something went wrong, please try again"})
            }else if(doc!= null ){
                req.send({msg:"成功删除"+data.Id+"Delete successfuly"})
            }else if(doc == null){
                req.send({msg:"没有找到该产品\n Don't find this product"})
            }
        
       
    })
})
router.get('/api/products/item',(res,req)=>{
    
    let data = res.query;   
    console.log(res);
    let datares='';
    if(data.id!==undefined){
        datares = data.Id
        productsModel.find({Id:Number(datares)},(error,doc)=>{
        
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
module.exports = router