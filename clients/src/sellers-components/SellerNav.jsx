import React from 'react'
import './sellersNav.scss';
import { Link } from 'react-router-dom';

const SellerNav = () => {
  return (
    <div className='sellersNav'>
      <div className="logo">
      <i className='bx bx-store-alt'></i>
      <h1>E-COM</h1>
      </div>
      <ul>
        <Link to='/sellDashboard' className='link'>
        <li>Dashboard</li>
        </Link>
        <li>Orders</li>
        <li>Payments</li>
        <li>Customer Service</li>
        <Link to='/sellProducts' className='link'>
        <li>Product Listing</li>
        </Link>
      </ul>
      <Link to='/addProduct' className='link'>
      <div className='upload'>
        <div className="cirlce">
          <div className="small-circle"></div>
        </div>
        <i class='bx bx-plus'></i>
        <p>Upload your products</p>
        <button>Upload</button>
      </div>
      </Link>
     
    </div>
  )
}

export default SellerNav