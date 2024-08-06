import './product.scss';
import { getState, products } from '../data';
import { useEffect, useState } from 'react';
import {CSSTransition} from 'react-transition-group';
import moment from 'moment';
import RelatedProducts from '../components/RelatedProducts';
import ProgressBar    from '../components/ProgressBar';
import { Link, useParams } from 'react-router-dom';
import { useShare } from 'react-facebook';
import axios from 'axios';
import {addProduct} from '../redux/cartRedux';
import {useDispatch} from 'react-redux';

const Product = () => {
  const { productTitle } = useParams();
  console.log(productTitle.productTitle);
  const [selectedItems, setSelectedItems] = useState(null);
  const isArrayEmpty = array => array.length === 0;
  const { share } = useShare();
  const[selectedIndex, setSelectedIndex] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [showLGAOptions, setShowLGAOptions] = useState(false);
  const [timeLeft, setTimeLeft]  = useState(365 *24 * 60 * 60 *1000);
  const [singleProduct, setSingleProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seller, setSeller] =  useState([]);
  const dispatch =  useDispatch();
  const [quantity, setQuantity] = useState(1); 
  const product = singleProduct;
  const price = singleProduct?.price * quantity;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/title/${productTitle}`, {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTY5OTA1YThiMDViMTk3MjRkNWRjZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMTcxOTUwOSwiZXhwIjoxNzI0MzExNTA5fQ.DgGnu-oMS7QWQ9zL6SqNdCgqhC1PbvGAo9bOv5rEI2U"
          }
        });
        console.log(response.data); // Log the response data
        setSingleProduct(response.data);
      } catch (err) {
        console.error(err); // Log the error
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [productTitle]);

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
  const vendorId  =  singleProduct?.vendorId;

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/seller/vendor/${vendorId}`, {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTY5OTA1YThiMDViMTk3MjRkNWRjZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMTcxOTUwOSwiZXhwIjoxNzI0MzExNTA5fQ.DgGnu-oMS7QWQ9zL6SqNdCgqhC1PbvGAo9bOv5rEI2U"
          }
        });
        console.log(response.data); // Log the response data
        setSeller(response.data);
      } catch (err) {
        console.error(err); // Log the error
      } 
    };
    fetchSeller();
  }, [vendorId]);

  useEffect(()=>{
    const timerId = setInterval(()=>{
     setTimeLeft((prevTime)=> prevTime - 1000);
    }, 1000);

    return ()  =>{
     clearInterval(timerId);
    };
 }, []);
 const  timeLeftDisplay = formatTime(timeLeft);


 const firstImg = singleProduct?.img_1;
 const secondImg = singleProduct?.img_2;
 const thirdImg = singleProduct?.img_3;
 const fourthImg = singleProduct?.img_4;

  const images   =  [firstImg, secondImg, thirdImg, fourthImg];

  const handleImageClick =(index)=>{
    setSelectedIndex(index);
  }
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setShowLGAOptions(true);
  };

  const handleLGAChange = (event) => {
    setSelectedLGA(event.target.value);
  };
  //facebook data.
  const shareImg = singleProduct?.img_1;
  const shareTitle = singleProduct?.productTitle;
  const sharePrice = singleProduct?.price;
  const shareLink = `/product/${singleProduct?.productTitle}`;

  const handleShare = () => {
    const product = {
      title: shareTitle,
      image: shareImg,
      price: sharePrice,
    };

    share({
      href: shareLink,
      quote: `Checkout this awesome product: ${product.title} for ${product.price}!`,
      hashtag: '#ProductSharing',
      media: [
        {
          type: 'image',
          src: product.image,
          alt: product.title,
        },
      ],
    });
  };
  const handleItemClick = (size) => {
  
    setSelectedItems(size);
  };
const now = new Date();
const oneHourFromNow = new Date(now.getTime() + 1 * 60 * 60 * 1000);
const fiveDaysFromOneHour = new Date(oneHourFromNow.getTime() + 5 * 24 * 60 * 60 * 1000);
const day = fiveDaysFromOneHour.getDate();
const month = fiveDaysFromOneHour.toLocaleString('default', { month: 'long' });


if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>

const handleSubmit =()=>{
  //update cart
  dispatch(
    addProduct({...product, quantity,selectedState, selectedLGA,selectedItems})
  ) 
}
  return (
    <div className='product'>
        <div className='product-wrapper'>
          <div className="left-product">
            <div  className='product-info'>
                <div className='product-slide'>
                <CSSTransition in={true} timeout={500} className="preview">
                        <img src={images[selectedIndex]} alt="" key={selectedIndex} />
                    </CSSTransition>
                   <div className="thumbnails">
                    {
                      images.map((image,index)=>(
                        <img src={image} alt="" key={index} onClick={()=>handleImageClick(index)}/>
                      ))
                    }
                   </div>
                    <div className='product-share'>
                      <h1>Share this product</h1>
                      <div className='share-icon'>
                        <i class='bx bxl-facebook' onClick={handleShare}></i>
                      <i class='bx bxl-twitter'></i>
                      </div>
                    </div>
                </div>
                <div className="product-details">
                <div className='product-detail-wrapper'>
                    <h1>{singleProduct?.productTitle}</h1>
                    {
                      singleProduct?.flashSales === true ?
                      (
                        <div className='product-flash'>
                          <div className='product-flash-header'>
                            <p>Flash Sales</p>
                            <p>Time Left: {timeLeftDisplay}</p>
                          </div>
                          <div className='product-detail-price' key={singleProduct?._id}>
                              <p className='c-price'><span>N</span>{singleProduct?.price}</p>
                              {singleProduct?.initialPrice ? <p className='i-price'>N{singleProduct?.initialPrice}</p>: ''}
                              {singleProduct?.initialPrice !== '' && <p className='i-percent'>{(((singleProduct?.price - singleProduct?.initialPrice)/singleProduct?.initialPrice)  *  100).toFixed()}%</p> }
                          </div>
                          <div className='product-flash-left'>
                            <p>{singleProduct?.productLeft} items left</p>
                            <ProgressBar totalItems={singleProduct?.totalProduct} itemsLeft={singleProduct?.productLeft}/>
                          </div>
                        </div>
                      ):(
                      <div className='product-detail-price' key={singleProduct?._id}>
                      <p className='c-price'><span>N</span>{singleProduct?.price}</p>
                      {singleProduct?.initialPrice ? <p className='i-price'>N{singleProduct?.initialPrice}</p>: ''}
                      {singleProduct?.initialPrice !== '' && <p className='i-percent'>{(((singleProduct?.price - singleProduct?.initialPrice)/singleProduct?.initialPrice)  *  100).toFixed()}%</p> }
                      </div>
                      )}
                    <p className='product-detail-ship'>+Shipping from N{singleProduct?.shippingFee} from {singleProduct?.shipping_Address}</p>
                    {
                      isArrayEmpty(singleProduct?.size) ? '':(
                        <div className='varation'>
                        <h1>Variation Available</h1>
                          <ul>
                            {
                              singleProduct?.size?.map((v, index) =>(
                                <li
                                  key={index}
                                  onClick={() => handleItemClick(v)}
                                  style={{
                                    backgroundColor: selectedItems === v ? '#8A9A5B' : 'white',
                                    color: selectedItems === v ? 'white' : '#8A9A5B',
                                  }}
                                >
                                  {v}
                                </li>
                              ))
                            
                            }
                          </ul>
                        </div>
                      )
                      
                    }
                  
                    <button className='cart-btn' onClick={handleSubmit}><i class='bx bx-cart'></i> Add to Cart</button>
                  </div>
                </div>
            </div>
            <div className='mobile-delivery-view'>
                  <div className="right-product-view">
            <div className='delivery'>
              <h1>Delivery & Returns</h1>
              <p>Fee Delivery on thousands of products</p>
            </div>

            <div className='location'>
                <h1>Choose your location</h1>
                <select onChange={handleStateChange}>
                <option value="">Select a state</option>
              {Object.keys(getState).map((state) => (
             <option value={state}>{state}</option>
            ))}
            </select>
            {showLGAOptions && (
            <select onChange={handleLGAChange}>
              <option value="">Select a local government</option>
              {getState[selectedState].map((lga) => (
              <option value={lga}>{lga}</option>
              ))}
             </select>
            )}
            </div>
            <div className='pick-up-info'>
              <div className='pick-up'>
                <p className='pick-up-title'>Pickup Station</p>
                <p className='pick-up-amount'>Delivery Fees N 250</p>
                <p className='pick-up-desc'>Arriving at pickup station between {`${day} ${month}`} & {`${day + 2} ${month}`} when you order within  next 1hr</p>
              </div>
              <div className='pick-up'>
                <p className='pick-up-title'>Door  Delivery</p>
                <p className='pick-up-amount'>Delivery Fees N 620</p>
                <p className='pick-up-desc'>Ready for delivery between {`${day} ${month}`} &  {`${day + 2} ${month}`} when you order within 1hr</p>
              </div>
            </div>
            <div className='product-share-mobile'>
                      <h1>Share this product</h1>
                      <div className='share-icon'>
                        <i class='bx bxl-facebook' onClick={handleShare}></i>
                      <i class='bx bxl-twitter'></i>
                      </div>
                    </div>
          </div>

            </div>
           <div className='about-product'>
           <>
                <h1 className='about-product-title'>Product Details</h1>
              <h2>Welcome to {seller?.companyName}</h2>
              <p>{singleProduct?.productDescription}</p>
              <h2>About Us</h2>
              <p>{seller?.aboutCompany}</p>
                </>
           </div>
           <div className='product-specification'>
            <h1 className='spec-title'>Specification</h1>
            <div className='key-features'>
              <div className='key-left'>
                <h1 className='key-title'>Key Features</h1>
                {
                  singleProduct?.specification.map((item,index)=>(
                    <ul>
                  <li key={index}>{item}</li>
                </ul>
                  ))
                }
                
              </div>
              <div className='key-right'>
              <h1 className='key-title'>What's in the box</h1>
              {
                singleProduct?.boxContent.map((item,index)=>(
                  <ol>
                  <li key={index}>{item}</li>
                </ol>
                ))
              }
             
              </div>
            </div>
           </div>
          </div>
          <div className="right-product">
            <div className='delivery'>
              <h1>Delivery & Returns</h1>
              <p>Fee Delivery on thousands of products</p>
            </div>

            <div className='location'>
                <h1>Choose your location</h1>
                <select onChange={handleStateChange}>
                <option value="">Select a state</option>
              {Object.keys(getState).map((state) => (
             <option value={state}>{state}</option>
            ))}
            </select>
            {showLGAOptions && (
            <select onChange={handleLGAChange}>
              <option value="">Select a local government</option>
              {getState[selectedState].map((lga) => (
              <option value={lga}>{lga}</option>
              ))}
             </select>
            )}
            </div>
            <div className='pick-up-info'>
              <div className='pick-up'>
                <p className='pick-up-title'>Pickup Station</p>
                <p className='pick-up-amount'>Delivery Fees N {singleProduct?.shippingFee}</p>
                <p className='pick-up-desc'>Arriving at pickup station between {`${day} ${month}`} & {`${day + 2} ${month}`} when you order within  next 1hr</p>
              </div>
              <div className='pick-up'>
                <p className='pick-up-title'>Door  Delivery</p>
                <p className='pick-up-amount'>Delivery Fees N {singleProduct?.shippingFee}</p>
                <p className='pick-up-desc'>Ready for delivery between {`${day} ${month}`} &  {`${day + 2} ${month}`} when you order within 1hr</p>
              </div>
            </div>
          </div>
        </div>
        <div className='related-items'>
          <h1>Customers who viewed this also viewed</h1>
          
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
};
const formatTime = (time)=>{
  const hours =  Math.floor(time/(1000 * 60 * 60));
  const minutes  = Math.floor((time / (1000 * 60)) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  return `${hours}h:  ${minutes}m:  ${seconds}s`;
}

export default Product