import React from 'react'
import './sellProduct.scss';
import { Link } from 'react-router-dom';

const SellerProduct = () => {
  return (
    <div className='sell-product'>
        <div className='product-navigation'>
            <ul>
                <Link to='/sellDashboard' className='link'><li>Dashboard -</li></Link>
                <li className='add-link'>Product - 2</li>
            </ul>
        </div>
        <div className="sell-product-wrapper">
        <div className="sell-product-left">
            <img className='big-img' src="https://img.freepik.com/premium-photo/purse-with-gold-red-design-is-shown-white-background_688921-2289.jpg?w=740" alt="" />
            <div className="multiple-img">
                <img src="https://img.freepik.com/premium-photo/elegance-woman-luxury-hand-bag-white-background-generative-ai_838900-8451.jpg?w=740" alt="" />
                <img src="https://img.freepik.com/premium-photo/elegance-woman-luxury-hand-bag-white-background-generative-ai_838900-8468.jpg?w=740" alt="" />
                <img src="https://img.freepik.com/premium-photo/stylish-brown-leather-tote-bag-isolated-white-background-created-with-generative-ai-technology_410516-52009.jpg?w=740" alt="" />
            </div>
        </div>
        <div className="sell-product-right">
            <div className="sell-product-basic">
            <div className="sell-product-heading">
                <p>Title:</p>
                <p>Price:</p>
                <p>Initial Price:</p>
                <p>Total Item:</p>
                <p>Item Left:</p>
                <p>Brand:</p>
                <p>Flash Sale: </p>
                <p>Categories:</p>
                <p>Out of Stock:</p>
                <p>Pay on Delivery:</p>
                <p>Shipping Location:</p>
                <p>Shipping Fee:</p>
                <p>Color:</p>
                <p>Size:</p>
                <p>Model:</p>
            </div>
            <div className="sell-product-content">
                <h1>3 piece of earpiece</h1>
                <p>5500</p>
                <p>5500</p>
                <p>50</p>
                <p>22</p>
                <p>AGN</p>
                <p>No</p>
                <p>Fashionable bags</p>
                <p>No</p>
                <p>Yes</p>
                <p>Lagos</p>
                <p>500</p>
                <p>Yellow</p>
                <p>42,44,48</p>
                <p>MX2345</p>
            </div>
            </div>
            <div className="single-product-main">
                <div className="single-product-main-heading">
                    <p>Product Details: </p>
                    <p>Sepecification:</p>
                    <p>box Content:</p>
                    <p>Product Line:</p>
                </div>
                <div className="single-product-main-content">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit est ullam numquam quas excepturi eligendi cumque illum, expedita impedit ut voluptas iste. Excepturi quae autem eaque adipisci cumque possimus repudiandae.</p>
                <p> Lorem ipsum dolor sit amet consectetur., Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                <p> Lorem ipsum dolor sit.,Lorem, ipsum dolor.</p>
                <p> Lorem ipsum dolor sit.</p>
                </div>
            </div>
            <div className="single-product-btn">
                <Link to={`/editProduct/id`} className='link'>
                <button><i class='bx bxs-edit'></i> Edit</button>
                </Link>
                <button><i class='bx bx-trash'></i>Delete</button>
            </div>
        </div>
        </div>
       
     
    </div>
  )
}

export default SellerProduct