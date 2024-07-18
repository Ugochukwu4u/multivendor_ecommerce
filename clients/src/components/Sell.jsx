import React from 'react'
import './sell.scss';
import { Link } from 'react-router-dom';

const Sell = () => {
  return (
    <div className='sell'>
        <div className='left'>
        <i className='bx bx-store-alt'></i>
        <Link to='/sellerLogin' className='link'><p>Sell on E-Store</p></Link>
        </div>
        <div className='right'>
            <p>E-Store</p>
            <i class='bx bx-store-alt'></i>
        </div>
    </div>
  )
}

export default Sell