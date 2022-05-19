import React, { Component } from 'react'
import ItemStock from '../../Component/ItemStock/ItemStock'
import MSG from '../../Component/MSG/MSG'
import './AllInfo.scss'
export default class AllInfo extends Component {
    constructor(){
        super()
        this.state={
            productAll:[],
            request:{
                findId:' ',
                findName:''
            },
            showcover:false,
            findproductInfo:{},
            updateproduct:{
                Id:null,
                update:{}
            },
            msg:null
            
        }
    }
    // 获取所有商品列表
    getAllInfo=()=>{
        fetch('/api/products').then(res=>res.json()).then(res=>{
            console.log(res);
            this.setState({
                productAll:[...res]
            })
        })
    }
    // 按照Id,或者名称查找产品
    findProduct =(e)=>{
        var patrn = /^(-)?\d+(\.\d+)?$/;
        let isNumber=false
       
        if (patrn.exec(e.target.value) == null ) {
            isNumber= false
            this.setState({
                request:{
                    findName:e.target.value,
                    findId:''
                }
               
            })                 

        } else {
            isNumber= true
            this.setState({
                request:{
                    findId:e.target.value,
                    findName:''
                }
                
            })             

        }
    }
    // 根据id或者名称查找
    find=()=>{
        if(this.state.request.findId!=='' || this.state.request.findName!==''){
            fetch(`/api/products/item?${this.state.request.findId===''?'name='+this.state.request.findName : 'Id='+this.state.request.findId}`,{
                method:'GET',
                
            }).then(res=>res.json()).then(res=>{
                console.log(res);
                if(res.status == 200){
                    this.setState({
                        findproductInfo:{...res.body[0]},
                        updateproduct:{
                            ...this.state.updateproduct,
                            Id:res.body[0].Id
                        },
                        showcover:true,
                        msg:null
                    })
                }else{
                    this.setState({
                        showcover:true,
                        msg:res.msg
                    })
                }
                
            })
        }
        
        
    }

    // 监听元素修改
    onChangeInput=(event)=>{
        switch(event.target.name){
            case 'count':
                this.setState({
                    updateproduct:{
                        ...this.state.updateproduct,
                        update:{
                            ...this.state.updateproduct.update,
                            count:event.target.value
                        }
                        
                    }
                })
                break;
            case 'purchase':
                this.setState({
                    updateproduct:{
                        ...this.state.updateproduct,
                        update:{
                            ...this.state.updateproduct.update,
                            purchase:event.target.value
                           
                        }
                    }
                })
                break;
            case 'wholesale':
                this.setState({
                    updateproduct:{
                        ...this.state.updateproduct,
                        update:{
                            ...this.state.updateproduct.update,
                            wholesale:event.target.value

                           
                        }
                    }
                })
                break;
            case 'retail':
                this.setState({
                    updateproduct:{
                        ...this.state.updateproduct,
                        update:{
                            ...this.state.updateproduct.update,
                            retail:event.target.value


                           
                        }
                    }
                })
                break;
            case 'Production_Date':
                this.setState({
                    updateproduct:{
                        ...this.state.updateproduct,
                        update:{
                            ...this.state.updateproduct.update,
                            Production_Date:event.target.value



                           
                        }
                    }
                })
                break;
            case 'shelf_life':
                this.setState({
                    updateproduct:{
                        ...this.state.updateproduct,

                        shelf_life:event.target.value
                    }
                })
                break;
            
            
            
        }
    }
    // 上传更新
    update=()=>{
        fetch('/api/products/update',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(this.state.updateproduct)
            
        }).then(res=>res.json()).then(res=>{
            console.log(res);
            this.setState({
                msg:res.msg
            })
        })
    }
    getstatuscover=(val)=>{
        this.setState({
            showcover:val,
            msg:null
        })
    }
    componentDidMount(){
        this.getAllInfo()
    }
  render() {
    return (
      <div className='AllInfoContaier'>
          <div className="SerchBlock">
              <input type="text" name="serch" id="serch" className='serch' onChange={this.findProduct} />
              <label htmlFor="serch" onClick={this.find} >Serch</label>
          </div>
          <div className="allInfo">
              <table className='tableAll'>
                  <thead>
                      <tr className='headTable'>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Count</th>
                          <th>Purchase</th>
                          <th>Wholesale</th>
                          <th>Retail</th>
                          <th>Production_Date</th>
                          <th>Shelf_life</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                        this.state.productAll.map((e,i)=>{
                            return <ItemStock key={e.Id} element={e}/>
                        })
                    }

                  </tbody>
              </table>
          </div>
          <div className="cover" style={{display:this.state.showcover?'block':'none'}}>
              <div className="info">
                  <ul style={{display:this.state.msg!== null?'none':'grid'}}>
                      <li>
                          ID:{this.state.findproductInfo.Id}
                      </li>
                      <li>
                          Name:{this.state.findproductInfo.name}
                      </li>
                      <li>
                        Count:
                        <input type="text" name="count" id="count" defaultValue={this.state.findproductInfo.count} className='enter' onChange={this.onChangeInput}/>
                      </li>
                      <li>
                      purchase:
                      <input type="text" name="purchase" id="purchase" defaultValue={this.state.findproductInfo.purchase} className='enter' onChange={this.onChangeInput}/>
                      
                      </li>
                      <li>
                      wholesale:
                      <input type="text" name="wholesale" id="wholesale" defaultValue={this.state.findproductInfo.wholesale} className='enter' onChange={this.onChangeInput}/>

                      </li>
                      <li>
                      retail:
                      <input type="text" name="retail" id="retail" defaultValue={this.state.findproductInfo.retail}  className='enter' onChange={this.onChangeInput}/>

                      </li>
                      <li>
                      Production_Date:
                      <input type="text" name="Production_Date" id="Production_Date" defaultValue={this.state.findproductInfo.Production_Date}  className='enter' onChange={this.onChangeInput}/>

                      </li>
                      <li>
                      shelf_life:
                      <input type="text" name="shelf_life" id="shelf_life" defaultValue={this.state.findproductInfo.shelf_life}  className='enter' onChange={this.onChangeInput}/>

                      </li>
                      <li className='submitBtn'>
                          <input type="button" value="Save"  onClick={this.update} />
                      </li>
                  </ul>
                  {
                        this.state.msg=== null?'':(<MSG msg ={this.state.msg} getstatuscover={this.getstatuscover}/>)
                  }
                  
                  
              </div>
          </div>
      </div>
    )
  }
}
