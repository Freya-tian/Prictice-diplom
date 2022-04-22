import React, { Component } from 'react'
import './MSG.scss'
export default class  extends Component {
    returnstatus=()=>{
        this.props.getstatuscover(false)
    }
  render() {
      const{msg}=this.props
    return (
      <div className='msg'>
          <div className="msginfo">{msg}</div>
          <input type="button" value="Cancel" onClick={this.returnstatus}/>
      </div>
    )
  }
}
