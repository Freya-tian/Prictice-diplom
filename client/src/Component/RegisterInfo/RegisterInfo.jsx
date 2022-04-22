import React, { Component } from 'react'
import { Link,Redirect } from 'react-router-dom'
import "./RegisterInfo.scss"

export default class RegisterInfo extends Component {
    constructor(){
        super()
        this.state = {
            width:"931px",
            height:"622px",
            UserHelp:"",
            PasswordHelp:"",
            AliHelp:"",
            WechatHelp:"",
            goto:false,
            Info:{
                Ali:null,
                Wechat:null,
                Avatar:null,
                User:null,
                Password:null,
            }
            
        }
    }

    setVal = (event)=>{
        switch(event.target.name){
            case "ALIpay":
                this.setState({
                    AliHelp:"",
                    Info:{
                        ...this.state.Info,
                         Ali:event.target.value
                    }
                    
                })
                break;
            case "WeChatPay":
                this.setState({
                    WechatHelp:"",
                    Info:{...this.state.Info,Wechat:event.target.value}
                })
                break;
            case "Avatar":
                this.setState({
                    Info:{...this.state.Info,Avatar:event.target.value}
                })
                break; 
            case "Password":
                this.setState({
                    PasswordHelp:"",
                    Info:{...this.state.Info,Password:event.target.value}
                })
                break; 
            case "username":
                this.setState({
                    Info:{...this.state.Info,User:event.target.value},
                    UserHelp:"",
                })
                break; 
        }
         
        
    }

    handleClick=()=>{
        const stat = {...this.state.Info}
        var count = 0
        Object.keys(stat).forEach(key=>{
            if(key !=="Avatar"){
                if (stat[key]===""||stat[key]===null){
                    this.setState({
                        [`${key}Help`]:"* can't be null",
                        goto:false
                    })
        
                   }else{
                       count++
                   }
            }
           
        })
        if(count === 4){
            this.setState({
                UserHelp:"",
                PasswordHelp:"",
                WechatHelp:"",
                ALiHelp:"",
                goto:true
            })
            window.location.href= '/Login' 
        }
        
    }
  render() {
      
    return (
      <div className='RegisterContainer' style={{width:this.state.width,height:this.state.height}}>
          <ul className="RegisterInfo">
              <div className='blockContainer'>
                <li><label htmlFor="UserName" className='enterlaber'>UserName : </label></li>
                <li className="inputContainer user">                  
                    <input type="text" name="username" id="UserName" className='enterinput'  onChange={this.setVal} placeholder={this.state.UserHelp==""?'':this.state.UserHelp}/>
                </li>
              </div>
              
            <div className="blockContainer">
                <li><label htmlFor="Password" className='enterlaber'>Password : </label></li>              
                <li className="inputContainer Password">                  
                  <input type="text" name="Password" id="Password" className='enterinput'  onChange={this.setVal} placeholder={this.state.PasswordHelp==""?'':this.state.PasswordHelp}/>
                </li>
            </div>
            <div className="blockContainer">
                <li><label htmlFor="ALIpaycontainer" className='choicelaber'>Alipay QRcode : </label></li>
                <li className="inputContainer ALiPay">
                  <span  className='ChoiceInputContainer'>{this.state.Info.Ali == null?"Choose File":this.state.Info.Ali }</span>
                  <input type="file" name="ALIpay" id="ALIpay" className='choiceinput' onChange={this.setVal} />  
                  <span className='message'>{this.state.AliHelp==""?'':this.state.AliHelp}</span>

                </li>
            </div>
            <div className="blockContainer">
                <li><label htmlFor="WeChatPay" className='choicelaber'>WeChatPay QRcode : </label></li>
                <li className="inputContainer WeChatPay">

                    <span  className='ChoiceInputContainer'>{this.state.Info.Wechat == null?"Choose File":this.state.Info.Wechat } </span>
                    <input type="file" name="WeChatPay" id="WeChatPay" className='choiceinput' onChange={this.setVal} />
                    <span className='message'>{this.state.WechatHelp==""?'':this.state.WechatHelp}</span>
                </li>
            </div>
            <div className="blockContainer">
                <li><label htmlFor="Avatar" className='choicelaber'>Avatar : </label></li>
                <li className="inputContainer Avatar">
                    <span  className='ChoiceInputContainer'>{this.state.Info.Avatar == null?"Choose File":this.state.Info.Avatar }</span>
                    <input type="file" name="Avatar" id="Avatar" className='choiceinput'  onChange={this.setVal}/>
                </li>
            </div>
              
              
             
              
              
          </ul>
            
                <button  value="Register" className='Register' onClick={this.handleClick}>Register
                    {/* <Link style={{textDecoration:'none'}} onClick={this.handleClick}  to={this.state.goto?'/Login':''} >Register</Link> */}
                </button>
                
           
            
            
            
                
            
          
            
      </div>
    )
  }
}
