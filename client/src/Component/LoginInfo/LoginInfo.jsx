import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import "./LoginInfo.scss"
export default class LoginInfo extends Component {
  constructor(){
    super()
    this.state={
      width:"709px",
      height:"392px",
      usernameHelp:"",
      passwordHelp:"",
      logInfo:{
        username:"",
        password:""
      }
    }
  }
  handleinput=(event)=>{
    switch(event.target.name){
      case "login":
        this.setState({
          usernameHelp:"",
        
          logInfo:{
            ...this.state.logInfo,
            username:event.target.value
          }
        })
        break;
      case "password":
        this.setState({
          passwordHelp:"",
          logInfo:{
            ...this.state.logInfo,
            password:event.target.value
          }
        })
        break;
    }
  }
  handlclick=()=>{
    let loginfo = this.state.logInfo
    let count=0
    Object.keys(loginfo).forEach(key=>{
     
          if (loginfo[key]===""||loginfo[key]===null){
              this.setState({
                  [`${key}Help`]:`* ${key} can't be null`,
                 
              })
  
             }else{
                 count++
             }
      
     
  })
  if(count === 2){
      this.setState({
        usernameHelp:"",
        passwordHelp:"",
      })
      
  }
  }
  render() {
    const {width,height} = this.props
    return (
      <div id='LoginInfo' className='LoginInfo' style={{width:this.state.width, height: this.state.height}}>
        <div className="userinfo">
          <div className="login">
            <input type="text" name="login" id="LoginInfo" placeholder={'USERNAME'} onChange={this.handleinput}/>
            <label htmlFor="LoginInfo">{this.state.usernameHelp===""?'':this.state.usernameHelp}</label>
          </div>
          <div className="Password">
            <input type="password" name="password" id="Password"  placeholder='PASSWORD' onChange={this.handleinput} />
            <label htmlFor="Password">{this.state.passwordHelp===""?'':this.state.passwordHelp}</label>

          </div>
        </div>
        <div className="Button">
          <input className='Login' type="button" value="Login" onClick={this.handlclick}/>
          <Link className='Register' style={{ textDecoration:'none'}} to='/Register'>Register</Link>
        </div>
      </div>
    )
  }
}
