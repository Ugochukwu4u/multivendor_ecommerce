import './cart.scss';
import {cart, products} from '../data';
import { Link, useNavigate } from 'react-router-dom';
import TopSelling from '../components/TopSelling';
import RelatedProducts from '../components/RelatedProducts';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Cart = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const cart = useSelector(state =>state.cart);
const productTitle = cart?.products?.[0]?.productTitle;
const size = cart?.products?.find((item) => item._id === products._id)?.selectedItems;
console.log(cart);
const user = false;
const navigate = useNavigate();
const handleCheckout = () => {
  if (user) {
    alert('payment received');
  } else {
    navigate('/login');
  }
};
useEffect(() => {
  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/related-products/${productTitle}`, {
        headers: {
          token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTY5OTA1YThiMDViMTk3MjRkNWRjZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMTcxOTUwOSwiZXhwIjoxNzI0MzExNTA5fQ.DgGnu-oMS7QWQ9zL6SqNdCgqhC1PbvGAo9bOv5rEI2U"
        }
      });
      console.log(response.data); // Log the response data
      setRelatedProducts(response.data);
    } catch (err) {
      console.error(err); // Log the error
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  fetchRelatedProducts();
}, [productTitle]);

// if (loading) return <p>Loading...</p>;
// if (error) return <p>Error: {error.message}</p>

  if(cart?.products?.length === 0){
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
            <h1>Cart ({cart?.quantity})</h1>
            <div className='cart-left-wrapper'>
            <ul>
        {cart?.products?.map((item) => (
          <li key={item._id}>
            <div className='cart-left-img'>
            <img src={item.img_1} alt={item.productTitle} />
            </div>
            <div className='cart-left-items'>
              <div className='cart-left-title'>
              <p className='cart-left-t'>{item.productTitle}</p>
              <p className='cart-left-p'><span>N</span>{item.price * item.quantity}</p>
              </div>
              <div className='cart-left-desc'>
                <p>Size:{item.selectedItems}</p>
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
              <p><span>N</span> {cart.total}</p>
            </div>
            <button onClick={handleCheckout}>Checkout ({cart.total})</button>
          </div>
      </div>
      <TopSelling/>
      <div className='related-items'>
          <h1>You may also like</h1>
          
          <div className='related-item-wrapper'>
          {
            relatedProducts.map((items)=>(
              <Link to={`/product/${items.productTitle}`} className='link content-edit'>
               <RelatedProducts
              key={items._id}
              img={items.img_1}
              {...(items.initialPrice ? {
                discount: (((items.price - items.initialPrice) / items.initialPrice) * 100).toFixed(2) + '%'
              } : {})}
              title={items.productTitle} 
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