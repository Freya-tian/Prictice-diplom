import React, { Component } from 'react'
import Background from '../../Component/Background/Background'
import Head from '../../Component/HeadModel/HeadModel'
import AddItem from '../../Component/AddItem/AddItem'
import AllInfo from '../../Component/AllInfo/AllInfo'
import './Stock.scss'
export default class Stock extends Component {
    constructor(){
        super()
        this.state={
            AddShow:true
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
