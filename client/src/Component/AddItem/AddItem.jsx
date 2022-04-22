import React, { Component } from 'react'
import MSG from '../../Component/MSG/MSG'
import './AddItem.scss'
export default class AddItem extends Component {
    constructor(){
        super()
        this.state={
            Id:null,
            name:null,
            purchase:null,
            wholesale:null,
            retail:null,
            count:null,
            Production_Date:null,
            shelf_life:null,
            img:null,
            description:null,
            msg:null,
            showcover:false
        }
    }
    // 收集产品信息

    CollectionInfo=(e)=>{
       let infoval= e.target.value
        switch(e.target.name){
            case 'Id':
                this.setState({
                    Id:infoval
                })
                break;
            case 'Name':
                this.setState({
                    name:infoval
                })
                break;
            case 'purchase':
                this.setState({
                    purchase:infoval
                })
                break;
            case 'wholesale':
                this.setState({
                    wholesale:infoval
                })
                break;
            case 'retail':
                this.setState({
                    retail:infoval
                })
                break;
            case 'count':
                this.setState({
                    count:infoval
                })
                break;
            case 'Production_Date':
                this.setState({
                    Production_Date:infoval
                })
                break;
    
            case 'shelf_life':
                this.setState({
                    shelf_life:infoval
                })
                break;
            case 'img':
                this.setState({
                    img:infoval
                })
                break;
            case 'description':
                this.setState({
                    description:infoval
                })
                break;
                
        }
    }

    // 提交产品信息
    uptoServer = ()=>{
        fetch('/api/products/add',{
            method:'POST',            
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }).then(req=>req.json()).then(req=>{
            console.log(req);
            this.setState({
                showcover:true,
                msg:req.msg
            })
        })
    }

    getstatuscover=(val)=>{
        this.setState({
            showcover:val,
            msg:null,
            
        })
    }
  render(){
    return (
      <div className='AddItemContainer'>
        <label htmlFor="Id"> ID:</label>
        <input type="text" id='Id' className='enter' name='Id' onChange={this.CollectionInfo}/>
        
        <label htmlFor="Name"> Name:</label>
        <input type="text" id='Name' className='enter' name='Name' onChange={this.CollectionInfo}/>
        
        <label htmlFor="purchase"> Purchase:</label>
        <input type="text" id='purchase' className='enter' name='purchase' onChange={this.CollectionInfo}/>

        <label htmlFor="wholesale"> Wholesale:</label>
        <input type="text" id='wholesale' className='enter' name='wholesale' onChange={this.CollectionInfo}/>

        <label htmlFor="retail"> Retail:</label>
        <input type="text" id='retail' className='enter' name='retail' onChange={this.CollectionInfo}/>

        <label htmlFor="count"> Count:</label>
        <input type="text" id='count' className='enter' name='count' onChange={this.CollectionInfo}/>

        <label htmlFor="Production_Date"> Production_Date:</label>
        <input type="text" id='Production_Date' className='enter' name='Production_Date' onChange={this.CollectionInfo}/>
        <label htmlFor="shelf_life"> shelf_life:</label>        
        <input type="text" id='shelf_life' className='enter' name='shelf_life' onChange={this.CollectionInfo}/>

        <label htmlFor="img"> Img:</label>
        <input type="file" id='img' className='enter' name='img' onChange={this.CollectionInfo}/>

        <label htmlFor="description"> Description:</label>
        <input type="text" id='description' className='enter' name='description' onChange={this.CollectionInfo}/>

        <input type="button" value={"ADD"}  className="Add" onClick={this.uptoServer}/>
        <div className="cover" style={{display:this.state.showcover?'block':'none'}}>
            <div className="info">
                <MSG msg={this.state.msg} getstatuscover={this.getstatuscover}/>


            </div>
        </div>
      </div>
    )
  }
}
