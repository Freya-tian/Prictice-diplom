var express = require('express')

let router = express.Router()


let productsModel = require("../database/database_products.js")

router.get('/products',function(res,req){
    productsModel.find({},(error,docs)=>{
        req.send(docs)
    })
    
})
router.post('/products/add',(res,req)=>{
    let data = res.query;
    let infomation = new productsModel(data) ;
    

    productsModel.find({$or:[{name:data.name},{Id:data.Id}]},(erroe,doc)=>{
       
        if(doc.length== 0){
            infomation.save((error,data)=>{

                if(error){
                    req.send('发生了一些错误，请重试\n Something went wrong, please try again')
                }else{
                    req.send('成功输入Success,yessss!')
                }
            })
        }else{
            req.send("你已经保存过这个产品数据了哦~~~~~\n You have already saved this product data~~~~~~");
        }
        
    })
    
   
})
router.post('/products/delete',(res,req)=>{
    let data = res.query;
    let infomation = new productsModel(data) ;
    console.log(data.Id);

    productsModel.findOneAndDelete(Number(data.Id),(error,doc)=>{
        
        
            if(error){
                req.send("发生了一些错误，请重试\n Something went wrong, please try again")
            }else if(doc!= null ){
                req.send("成功删除"+data.Id+"Delete successfuly")
            }else if(doc == null){
                req.send("没有找到该产品\n Don't find this product")
            }
        
       
    })
})
router.get('/products/item',(res,req)=>{
    
    let data = res.query;   
    console.log(data.Id);
    productsModel.find({id:Number(data.Id)},(error,doc)=>{
        console.log(error)
        if(error){
            req.send("发生了一些错误，请重试\n Something went wrong, please try again")
        }else if(doc.length != 0){
            req.send(doc)
        }else{
            req.send("系统中找不到该数据\n Can not find it in system")
        }
    })
    
})
module.exports = router