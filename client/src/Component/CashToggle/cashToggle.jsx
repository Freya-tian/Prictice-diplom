import React, { Component } from 'react'
import './cashToggle.scss'


export default class cashToggle extends Component {
    constructor(){
        super()
        this.state={
            reviced:null,
            change:null,
            
        }
    }
    //找零计算
    calculation =(event)=>{
        let reviced = event.target.value
        let changenew = Number(reviced) - Number(this.props.total)
        this.setState({
            change:changenew
        })
    }

    // 现金计算器显示与否
    showorhidden=()=>{
        this.props.showcash(false)
    }

    componentDidUpdate(){

    }
  render() {
    return (
      <div className='cashToggleContainer'>
          <div className="cashToggle">
              <div className="enterAmount">
                    <label htmlFor="recived">Amount Recivied : </label>
                    <input type="text" name="recived" id="recived" className='recived' onChange={this.calculation}/><br/><br/>
                    <label htmlFor="changeContain"> Change: </label>
                    <span type="text" name="change" id="change" className='change'>
                        {
                            this.state.change===null?'':this.state.change
                        }
                    </span>
                    
              </div>
             <input type="button" value="Cancel" className='btn' onClick={this.showorhidden}/>
              
          </div>

      </div>
    )
  }
}
