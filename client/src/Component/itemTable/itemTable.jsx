import React, { Component ,createRef} from 'react'
import './itemTable.scss'
import del from '../../img/del.png'
export default class itemTable extends Component {
  constructor(props){
    super()
    this.state={ 
      ...props.product,   
      del:false,
      countBuy:1,
      amount:0,
           
    }
    this.enternumbers = createRef()
  }

  returnAmount = ()=>{
    return this.props.getamount(this.state.amount)
  }
  delitem=()=>{
    
    let amount = this.state.amount
    this.setState({
      del:true,
      amount:-amount
    })
    this.props.getamount(-this.state.amount)
    this.updatecount(this.state.count,0)

  }
  dealwithAmount = ()=>{   

    this.setState((state,props)=>({
      amount:Number(props.product.retail) * Number(state.countBuy)
    }))
  }
  add=()=>{
    
    this.setState((state)=>({
      countBuy: Number(state.countBuy)+1
    }))  



  }
  minuc=(state)=>{
    this.setState((state)=>({
      countBuy: Number(state.countBuy)-1
    }))
  }

  Buy = (e)=>{
    this.setState({
      countBuy:e.target.value
    })
  }

  returnImg=()=>{
    this.props.getImg(this.state.img)
  }

  // 更新数据库数量
  updatecount=(count,countBuy)=>{
    fetch('/api/products/update',{
      method:'POST',
      headers:{ 'Content-Type': 'application/json' },
      body:JSON.stringify({
        Id:this.state.Id,          
        update:{
          count:count-countBuy
        } 
      })
    }).then(res=>res.json()).then(res=>{
      console.log(res.msg);
    })
  }
  componentDidMount(){  
    setTimeout(this.dealwithAmount(),2000) 
    this.props.getamount(this.state.retail)
    this.props.getImg(this.state.img)
    this.updatecount(this.state.count,this.state.countBuy)

  }

  componentDidUpdate(prevProps,prevState){
    // console.log(prevState.amount);
    // console.log(this.state.amount)
    // if (Number(prevState.countBuy)  !== Number(this.state.countBuy) ) {

    //   this.props.getamount(-this.state.retail)
    // if(this.state.countBuy === "1"){
    //   this.props.getamount(this.state.retail)
    // }
    if(prevState.countBuy !== this.state.countBuy){
      this.dealwithAmount()
      let returnAmount = (Number(this.state.countBuy)-Number(prevState.countBuy))*Number(this.state.retail)
      this.props.getamount(returnAmount)
      this.updatecount(this.state.count,this.state.countBuy)
      
    }
  }

  render() {
    const {product} =this.props
    console.log(product);
    return (
     
        <tr className='row' style={{display:(this.state.del)?"none":''} } onClick={this.returnImg}> 
          
             
            <td>{product.Id}</td>
            <td>{product.name}</td>
            <td>{product.retail}</td>
            <td className='count'>
              <div className="reduce" onClick={this.minuc}>-</div>
              <div className="num" >
                <input type="text"  name="number" id="number" className='number'   value={this.state.countBuy}   ref={this.enternumbers} onChange={this.Buy}/>
              </div>                             
              <div className="add" onClick={this.add}> + </div>

            </td>
            <td>{this.state.amount}</td>
            <td className='del' onClick={this.delitem}>
              <img src={del} alt="删除" />
            </td>

        </tr>
    )
  }
}
