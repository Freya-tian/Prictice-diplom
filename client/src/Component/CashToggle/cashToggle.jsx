import React, { Component } from 'react'
import moment from 'moment'
import {nanoid} from 'nanoid'
import './cashToggle.scss'


export default class cashToggle extends Component {
    constructor(props){
        super()
        this.state={
            reviced:null,
            change:null,
            datapost:{
                ID:nanoid(),
                Amount: props.total,
                YY:moment().format('YYYY'),
                MM:moment().format('MM'),
                DD:moment().format('DD'),
                Time:moment().format('hh:mm A')
            }
            
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

    // 上传销售记录
    postRecord = ()=>{
        fetch('/api/records/add',{
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body:JSON.stringify(this.state.datapost)
        }).then(res=>res.json()).then(res=>{
            console.log(res)
            if(res.code == 200){
                window.location.reload()
            }
            // 
        })
    }
    componentWillUnmount(){
        this.postRecord()
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
