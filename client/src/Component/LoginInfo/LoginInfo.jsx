import React, { Component } from 'react'
import { Link,Navigate } from 'react-router-dom'

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
      },
      Logined:false,
      version0show:true,
      version1show:false
    }
    
  }
  componentDidMount(){
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
  postdata = ()=>{
    fetch('/api/cashier/find',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        Login:this.state.logInfo.username,
        password:this.state.logInfo.password
      })
    }).then(res=>res.json()).then(res=>{
      if(res.status == 200){
        console.log(res);
        sessionStorage.setItem('access_token', res.accessToken); 
        sessionStorage.setItem('name', res.name); 

        this.setState({
          Logined:true
        })
      }else{
        alert('Login Unsuccess')
      }
    })
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
      this.postdata()
  }
  }
  render() {
    const {width,height} = this.props
    if(this.state.Logined){
      return <Navigate to='/Menu'/>
    }
   

    return (
      <div id='LoginInfo' className='LoginInfo' style={{width:this.state.width, height: this.state.height}}>
     {this.state.version0show?
         <div className="userinfo version0">
         <div className="login">
           <span >UserName: 
             </span>
             <input type="text" name="login" id="LoginInfo"  onChange={this.handleinput}/>
           
           <label htmlFor="LoginInfo">{this.state.usernameHelp===""?'':this.state.usernameHelp}</label>
         </div>
         <div className="Password">
           <span>
             Password:
           </span>
           <input type="password" name="password" id="Password"  onChange={this.handleinput} />

           <label htmlFor="Password">{this.state.passwordHelp===""?'':this.state.passwordHelp}</label>

         </div>
       </div>
        :""}
        {this.state.version1show?
        <div className="userinfo version1">
          <div className="login">
            <input type="text" name="login" id="LoginInfo" placeholder={'USERNAME'} onChange={this.handleinput}/>
            <label htmlFor="LoginInfo">{this.state.usernameHelp===""?'':this.state.usernameHelp}</label>
          </div>
          <div className="Password">
            <input type="password" name="password" id="Password"  placeholder='PASSWORD' onChange={this.handleinput} />
            <label htmlFor="Password">{this.state.passwordHelp===""?'':this.state.passwordHelp}</label>

          </div>
        </div>:""}     
       

        <div className="Button">
          <input className='Login' type="button" value="Login" onClick={this.handlclick}/>
          <Link className='Register' style={{ textDecoration:'none'}} to='/Register'>Register</Link>
        </div>
      </div>
    )
  }
}
