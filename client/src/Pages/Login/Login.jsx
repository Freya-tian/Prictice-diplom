import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import "./Login.scss"
import Background from '../../Component/Background/Background'
import LoginInfo from '../../Component/LoginInfo/LoginInfo'

export default class Login extends Component {
  constructor(){
    super()
    this.state={
      
      showLogin:true
    }
  }

  

  takeSowLogin=(showor)=>{
    this.setState({
      showLogin:showor
    })
  }
  
  render() {
    return (
      <div id='LoginContainer' className='LoginContainer'>
       
                    
        <Background/> 
        <LoginInfo takeSowLogin={this.takeSowLogin}/>
         
                   

       
          
      </div>
    )
  }
}
