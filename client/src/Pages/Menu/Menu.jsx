import React, { Component } from 'react'
import { Link } from 'react-router-dom'


import './Menu.scss'
import ava from '../../img/千禧3.jpg'
import sale from '../../img/sale.svg'
import statistics from '../../img/statistics.svg'
import stock from '../../img/stock.svg'
import Background from '../../Component/Background/Background'
export default class Menu extends Component {
  render() {
    return (
      <div className='Menu' id='Menu'>
          <Background/>
          <div className="MenuContainer">
                <header className='headercontainer'>
                    <div className="ImgContainer">
                        <img className='Ava' src={ava} alt="user" />
                        <div className="cover">
                            User
                        </div>
                    </div>
                    <div className="showInfo">
                        <span>Received today: </span>
                        <div className='amount'><b>100</b>元</div>
                    </div>
                </header>
                <main className='mainContainer'>
                    <Link className='pathto' style={{textDecoration:'none'}} to='/ShopCart'>
                        <div className="block one">

                                <div className="imgContainer">
                                    <embed src={sale} alt="零售系统" />
                                </div>
                                <div className="explanation">
                                    <h1>Sale</h1>
                                </div>


                        </div>
                    </Link>
                    <div className="block two">
                        <div className="imgContainer">
                            <embed src={statistics} alt="销售记录" />
                        </div>
                        <div className="explanation">
                            <h1>Statistics</h1>
                        </div>
                    </div>
                    <Link className='pathto' style={{textDecoration:'none'}} to='/Stock'>
                        <div className="block three">
                            <div className="imgContainer">
                                <embed src={stock} alt="库存" />
                            </div>
                            <div className="explanation">
                                <h1>Stock</h1>
                            </div>
                        </div>
                    </Link>
                </main>
                <footer className='footerCntainer'></footer>
          </div>
          
      </div>
    )
  }
}
