import React, { Component,createRef } from 'react'
import './SaleCart.scss'
import Item from '../../Component/itemTable/itemTable'
import Background from '../../Component/Background/Background'
import CashToggle from '../../Component/CashToggle/cashToggle'
import Head from '../../Component/HeadModel/HeadModel'
import CodePayToggle from '../../Component/CodePayToggle/CodePayToggle'
import {nanoid} from 'nanoid'
import { Navigate } from 'react-router-dom'

import ex from '../../img/background.jpg'

import wechat from '../../img/wechat.svg'
import cash from '../../img/cash.svg'
import Ali from '../../img/Alipay.svg'

export default class SaleCart extends Component {
  constructor(){
    super()
    this.state={
        showcash:false,
        showcode:false,
        showWechat:false,
        showAli:false,
        Total:0,
        numberProduct:null,
        productInfo:[],
        totalAmount:0,
        showImg:null,
        url:"",
        payId:nanoid(),
        Logined:sessionStorage.getItem('access_token'),
        Payamount:'',
        version0Show:true,
        version1Show:false
        
    }
    this.auto = createRef()
    this.self = createRef()
    this.enternum = this.debounce(this.enternums)
  }
 

  // 计算总金额
  Totalcalculation=(amount)=>{
    let total = 0
    total += amount
    this.setState({
      total
    })
  }

  // 支付方式点击
  handleclick=(event)=>{
    console.log(event);
    switch(event.target.className){
      case 'method cash':
        this.setState({
          showcash:true
        })
        break;
      case 'method Wechat':
        this.setState({
          showcode:true
        })
        this.WechatPay()
        break;
      case 'method AliPay':
        this.setState({
          showcode:true
        })
        this.AliPay()
    }
  }
  // 是否显示弹窗回调
  showcash=(val)=>{
    this.setState({
      showcash:val
    })
  }  

  showcode=(val)=>{
    this.setState({
      showcode:val
    })
  }

  // 发送微信支付请求
  WechatPay =()=>{
    fetch('/api/wechatPay',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        price:this.state.totalAmount,
        payId:this.state.payId
      })
    }).then(res=>res.json()).then(res=>{
      console.log(res);
      this.setState({
        url:res.payUrl,
        Payamount: res.reallyPrice
      })
    })
  }
  AliPay=()=>{
    fetch('/api/AliPay',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        price:this.state.totalAmount,
        payId:this.state.payId
      })
    }).then(res=>res.json()).then(res=>{
      console.log(res);
      this.setState({
        url:res.payUrl
      })
    })
  }
  changePayId=(val)=>{
    
      this.setState({
        payId:nanoid()
      })
    

  }
  // 获取条形码内容，请求接口
  enternums=(event)=>{
    
    let val = event.target.value
    switch(event.target.name){      
      case "autoenter":
        this.setState({
          numberProduct:val
        })  
        this.getInfoItem(this.state.numberProduct)
        this.auto.current.value=''      
        break;
      case "selfenter":        
        this.setState({
          numberProduct:val
        })
        this.getInfoItem(this.state.numberProduct)

        this.self.current.value=''    
        
        break;
    }

  }
 // 防抖函数，在输入数据后一段时间执行，多次输入后重新计算时间
  debounce = (fn, delay = 1000)=> { 
    //期间间隔执行 节流
    let timeID = true;
    return function(event) {

      timeID && clearTimeout(timeID)
      
       timeID = setTimeout (()=>{         
         if(event.keyCode === 13){
          fn.apply(this,arguments)
        }
          
      },delay)
    }
    
  }
  // 调用防抖函数
  handlekeyup=(e)=>{
    this.enternum(e.target.value)
  }
  
  // 从服务器查找商品信息
  getInfoItem=(num)=>{
    fetch(`api/products/item?Id=${this.state.numberProduct}`).then(res=>res.json()).then(data=>{
      console.log(data.status === 200);
      if(data.status === 200){
        console.log(data.body)
        this.setState({
          productInfo : [...this.state.productInfo, data.body[0]]
        }
          
        )
      }

    })
  }
// 从子组件获取单件物品总价
  getAmount = (amount)=>{
    console.log(amount);
   let totalold = this.state.totalAmount
    this.setState({
      totalAmount: Number(totalold) + Number(amount)
    })
  }

  // 获取物品图片
  getImg=(url)=>{
    this.setState({
      showImg:url
    })
  }
  // componentDidUpdate(){
  //   this.auto.current.focus()

  // }
  componentDidMount(){
    if(this.state.Logined !== null&&this.state.version1Show){
      this.auto.current.focus()
    }
    let version = localStorage.getItem('abversion')
    if(version===null){
      localStorage.setItem("abversion",Math.round(Math.random()))
      version = localStorage.getItem('abversion')
    }
    if(version === '1')
    this.setState({
      version0show:false,
      version1show:true
    })
    
  }
  componentWillUnmount(){
    this.setState({
      totalAmount:0
    })
  }
  // 
  render() {
    if(this.state.Logined == null ||this.state.Logined==undefined){
      return <Navigate to='/Login'/>
   }else{
    return (
      <div className='CartContainer'>
          <Background/>
          <div className="CartMain">
              <Head progress={"Sale"}/>
              <main className='productInfo'>
                <div className="picInfo">
                  <div className="proimg" >
                    <img className='img' src={this.state.showImg?this.state.showImg :ex}  alt="没有图片" />
                  </div>
                  <div className="enter">
                    {                    
                      this.state.version0Show?
                      <input type="text" name="selfenter" id="selfenter" className='numcode' placeholder='手动输入，enter键确定' onKeyUp={this.enternum}  ref={this.self}/>
                      :''
                    }
                    {
                      this.state.version1Show?
                      <input type="text"  name="autoenter" id="autoenter" className='numcode' onKeyUp={this.enternum}  ref={this.auto}/>
                      :''

                    }
                    
                  </div>

                </div>
                <div className="cartAndPay">
                    <div className="cart">
                      <table  className="cartInfo">
                        <thead>
                          <tr className='row'>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>COUNT</th>
                            <th>AMOUNT</th>
                            <th>DEL</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.productInfo.map((element,index)=>(
                                  <Item key={element.Id} product={element} getamount={this.getAmount} getImg = {this.getImg}/>
                            )                              
                              
                            )
                          }                       
                          
                          
                        </tbody>
                      </table>

                    </div>
                    <div className='total'>
                        Total:<b>{
                          this.state.totalAmount}</b>元
                    </div>
                    <ol className="pay">
                      <li className="method cash" onClick={this.handleclick}>
                          <embed src={cash} type="" />
                      </li>
                      <li className="method Wechat" onClick={this.handleclick}>
                        <embed src={wechat} type="" />

                      </li>
                      <li className="method AliPay" onClick={this.handleclick}>
                        <embed src={Ali} type="" />

                      </li>
                    </ol>
                </div>

              </main>
          </div>
          {this.state.showcash?<CashToggle showcash={this.showcash} total={this.state.totalAmount}/>:''}
          {this.state.showcode?<CodePayToggle showcode={this.showcode} url={this.state.url} Payamount={this.state.Payamount} payId = {this.state.payId} changePayId = {this.changePayId}/>:''}

      </div>
    )
   }
    
  }

 
}
 // 防抖函数
