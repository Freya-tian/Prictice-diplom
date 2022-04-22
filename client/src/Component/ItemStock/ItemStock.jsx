import React, { Component } from 'react'

import './ItemStock.scss'
export default class ItemStock extends Component {
  constructor(props){
    super()
    this.state={
      delInfo:{
        Id:props.element.Id
      },
      msg:null
    }
  }
// 删除商品
  delete  = ()=>{
    fetch('/api/products/delete',{
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(this.state.delInfo)
    }).then(res=>res.json()).then(res=>{
      alert(res.msg)
      this.setState({
        msg:res.msg
      })
    })
  }
  render() {
      const {element} =this.props
      
    return (
      <tr>
          <td>{element.Id}</td>
          <td>{element.name}</td>
          <td>{element.count}</td>
          <td>{element.purchase}</td>
          <td>{element.wholesale}</td>
          <td>{element.retail}</td>
          <td>{element.Production_Date}</td>
          <td>{element.shelf_life}</td>
          <td className='delete' onClick={this.delete}>delete</td>
      </tr>
    )
  }
}
