import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import Background from '../../Component/Background/Background'
import Head from '../../Component/HeadModel/HeadModel'
import AddItem from '../../Component/AddItem/AddItem'
import AllInfo from '../../Component/AllInfo/AllInfo'
import './Stock.scss'
export default class Stock extends Component {
    constructor(){
        super()
        this.state={
            AddShow:true,
            Logined:sessionStorage.getItem('access_token')
        }
    }
    // 菜单点击
    addActive=(e)=>{
        switch(e.target.className){
            case "menu_one":
                this.setState({
                    AddShow:true
                })
                break;
            case "menu_two":{
                this.setState({
                    AddShow:false
                })
                break;
            }
        }
    }
  render() {
    if(this.state.Logined == null ||this.state.Logined==undefined){
        return <Navigate to='/Login'/>
     }
    return (
      <div className='StockContainer'>
          <Background/>
          <div className="MainContainer">
            <Head progress={"Stock"}></Head>
            <main className='main'>
                <div className="mainMenu">
                    <div className={`menu_one${this.state.AddShow? " active" : ''}`} onClick={this.addActive}>ADD</div>
                    <div className={`menu_two${this.state.AddShow? '' : ' active'}`} onClick={this.addActive}>All_Infomation</div>

                </div>
                <div className="mainBlock">
                    {
                        this.state.AddShow?(<AddItem/>):<AllInfo/>
                    }
                    
                </div>
                

            </main>
          </div>
      </div>
    )
  }
}
