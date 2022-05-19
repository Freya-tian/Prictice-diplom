import React, { Component } from 'react'
import QRCode from 'qrcode.react';
import wechat from '../../img/wechat.svg'
import './CodePayToggle.scss'
export default class CodePayToggle extends Component {
    handlecilck = ()=>{
      return  this.props.showcode(false)
    }

    visit =()=>{
      fetch( `/api/records/PaySuccess?payId=${this.props.payId}`).then(res=>res.json()).then(
        res=>{
          if(res.status==200){
            window.location.reload()
          }else{

            alert("Pay Unsuccess, Please one more time")
            this.props.showcode(false)
            this.props.changePayId(true)
          }
        }
      )
    }
  render() {
      const {url} = this.props
    return (
      <div className='PayCover'>
          <div className="codepic">
            <div className="qrcode">
              <QRCode  value={url}// 生成二维码的内容
                  size={300} // 二维码的大小
                  fgColor="#000000" // 二维码的颜色
              />
            </div>
            
            <input type="button" value="Cancel" className='close' onClick={this.handlecilck}/>
            <input type="button" value="Status Pay" className='Status' onClick={this.visit}/>

          </div>

      </div>
    )
  }
}
