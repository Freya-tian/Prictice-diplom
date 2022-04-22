import React, { Component } from 'react'
import {Route, Routes} from 'react-router-dom'

import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Menu from './Pages/Menu/Menu'
import ShopCart from './Pages/SaleCart/SaleCart'
import Stock from './Pages/Stock/Stock'
export default class App extends Component {


  render() {
    return (
      <div id='Container'>  
        <Routes>
          <Route path='/Login' element={
            <Login/>
          }></Route> 
           <Route path='/Register' element={
            <Register/>
          }></Route>
          <Route path='/Menu' element={<Menu/>}></Route>
          <Route path='/ShopCart'element={<ShopCart/>}></Route>
          <Route path='/Stock' element={<Stock/>}></Route>
        </Routes>    
        
      </div>
    )
  }
}