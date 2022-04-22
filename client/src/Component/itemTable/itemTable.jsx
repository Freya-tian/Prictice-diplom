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
    this.enternumber = createRef()
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
  componentDidMount(){  
    setTimeout(this.dealwithAmount(),2000) 
    this.props.getamount(this.state.retail)
    this.props.getImg(this.state.img)

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
                <input type="text" defaultValue={this.state.countBuy}  onKeyUp={this.Buy} ref={this.enternumber }/>
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
