import './cart.scss';
import {cart, products} from '../data';
import { Link, useNavigate } from 'react-router-dom';
import TopSelling from '../components/TopSelling';
import RelatedProducts from '../components/RelatedProducts';
import { useState } from 'react';

const Cart = () => {

const user = false;
const navigate = useNavigate();
const handleCheckout = () => {
  if (user) {
    alert('payment received');
  } else {
    navigate('/login');
  }
};

const cartData = cart;
  if(cartData.length === 0){
    return(
      <div className='empty-cart'>
        <div className='empty-cart-container'>
        <i class='bx bx-cart'></i>
        <p className='empty-title'>Your cart is empty!</p>
        <p className='empty-desc'>Browse our categories and discover our best deals</p>
        <Link to='/' className='link'>
        <button>Start Shopping</button>
        </Link>
        </div>
        <TopSelling/>
      </div>
    )
  }
  return (
    <div className='main-cart'>
      <div className='cart-wrapper'>
          <div className="cart-left">
            <h1>Cart (2)</h1>
            <div className='cart-left-wrapper'>
            <ul>
        {cartData.map((item) => (
          <li key={item.id}>
            <div className='cart-left-img'>
            <img src={item.img} alt={item.title} />
            </div>
            <div className='cart-left-items'>
              <div className='cart-left-title'>
              <p className='cart-left-t'>{item.title}</p>
              <p className='cart-left-p'><span>N</span>{item.price}</p>
              </div>
              <div className='cart-left-desc'>
                <p>Size:{item.size}</p>
                <div className='cart-left-ini'>
                  {item.initialPrice ? <p>N{item.initialPrice}</p>: ''}
                {item.initialPrice !== '' && <span>{(((item.price - item.initialPrice)/item.initialPrice)  *  100).toFixed()}%</span>}
                
                </div>
                
              </div>
            </div>
           
          </li>
        ))}
      </ul>
            </div>
          </div>
          <div className="cart-right">
            <h1>Cart Summary</h1>
            <div className='cart-right-wrapper'>
              <p>Subtotal</p>
              <p><span>N</span> 7,682</p>
            </div>
            <button onClick={handleCheckout}>Checkout (7,682)</button>
          </div>
      </div>
      <TopSelling/>
      <div className='related-items'>
          <h1>You may also like</h1>
          
          <div className='related-item-wrapper'>
          {
            products.map((items)=>(
              <Link to={`/product/${items.id}`} className='link content-edit'>
               <RelatedProducts
              key={items.id}
              img={items.img}
              {...(items.initialPrice ? {
                discount: (((items.price - items.initialPrice) / items.initialPrice) * 100).toFixed(2) + '%'
              } : {})}
              title={items.title} 
              price={items.price}
              {...(
                items.initialPrice ?
                  { initial_price: `N ${items.initialPrice}` } :
                  {}
              )}/>
              </Link>
            ))
          }
          </div>  
        </div>
    </div>
  )
}

export default Cart;