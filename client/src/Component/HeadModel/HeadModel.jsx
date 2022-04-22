import React, { Component } from 'react';
import './HeadModel.scss'
import { Link } from 'react-router-dom'
import ava from '../../img/千禧3.jpg'
import logout from '../../img/logout.svg'
export default class HeadModel extends Component {
  render() {
    const {progress} = this.props
    return (
      
        <header className='headerMenu'>
              <ol className='progress'>
                    <li><Link style={{ textDecoration:'none'}} to='/Menu'>
                       Menu   
                    </Link></li> \
                  <li> {progress}</li>
              </ol>
              <ol className='user'>
                  <li className="ImgContainer">                  
                        <img className='Ava' src={ava} alt="user" />
                                            
                  </li>
                  <li className='logout' title='退出'>
                    <embed src={logout} />
                  </li>
              </ol>
        </header>
      
    )
  }
}
