import './product.scss';
import { getState, products, singleProduct } from '../data';
import { useEffect, useState } from 'react';
import {CSSTransition} from 'react-transition-group';
import moment from 'moment';
import RelatedProducts from '../components/RelatedProducts';
import ProgressBar    from '../components/ProgressBar';
import { Link } from 'react-router-dom';
import { useShare } from 'react-facebook';

const Product = () => {
  const [selectedItems, setSelectedItems] = useState(null);
  const isArrayEmpty = array => array.length === 0;
  const { share } = useShare();
  const[selectedIndex, setSelectedIndex] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [showLGAOptions, setShowLGAOptions] = useState(false);
  const [timeLeft, setTimeLeft]  = useState(365 *24 * 60 * 60 *1000);

  useEffect(()=>{
    const timerId = setInterval(()=>{
     setTimeLeft((prevTime)=> prevTime - 1000);
    }, 1000);

    return ()  =>{
     clearInterval(timerId);
    };
 }, []);
 const  timeLeftDisplay = formatTime(timeLeft);


  const  firstImg = products[0].img;
  const  secondImg  = products[0].imgSm_1;
  const  thirdImg  =  products[0].imgSm_2;
  const fourthImg =  products[0].imgSm_3;

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
  const shareImg = singleProduct[0].img;
  const shareTitle = singleProduct[0].title;
  const sharePrice = singleProduct[0].price;
  const shareLink = `/product/${singleProduct[0].id}`;

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
                  {
                    singleProduct.map((item)=>(
                      <div className='product-detail-wrapper'>
                    <h1>{item.title}</h1>
                    {
                      item.flashSale === true ?
                      (
                        <div className='product-flash'>
                          <div className='product-flash-header'>
                            <p>Flash Sales</p>
                            <p>Time Left: {timeLeftDisplay}</p>
                          </div>
                          <div className='product-detail-price' key={item.id}>
                              <p className='c-price'><span>N</span>{item.price}</p>
                              {item.initialPrice ? <p className='i-price'>N{item.initialPrice}</p>: ''}
                              {item.initialPrice !== '' && <p className='i-percent'>{(((item.price - item.initialPrice)/item.initialPrice)  *  100).toFixed()}%</p> }
                          </div>
                          <div className='product-flash-left'>
                            <p>{item.itemLeft} items left</p>
                            <ProgressBar totalItems={item.totalItem} itemsLeft={item.itemLeft}/>
                          </div>
                        </div>
                      ):(
                      <div className='product-detail-price' key={item.id}>
                      <p className='c-price'><span>N</span>{item.price}</p>
                      {item.initialPrice ? <p className='i-price'>N{item.initialPrice}</p>: ''}
                      {item.initialPrice !== '' && <p className='i-percent'>{(((item.price - item.initialPrice)/item.initialPrice)  *  100).toFixed()}%</p> }
                      </div>
                      )}
                    <p className='product-detail-ship'>+Shipping from N{item.shipping_fee} from {item.shipping_Address}</p>
                    {
                      isArrayEmpty(item.size) ? '':(
                        <div className='varation'>
                        <h1>Variation Available</h1>
                          <ul>
                            {
                             singleProduct.map((product) => {
                              return product.size.map((v, index) => (
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
                            })
                            }
                          </ul>
                        </div>
                      )
                      
                    }
                  
                    <button className='cart-btn'><i class='bx bx-cart'></i> Add to Cart</button>
                  </div>
                    ))
                  }
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
            {
              singleProduct.map((item)=>(
                <>
                <h1 className='about-product-title'>Product Details</h1>
              <h2>Welcome to {item.company_name}</h2>
              <p>{item.product_detail}</p>
              <h2>About Us</h2>
              <p>{item.about_company}</p>
                </>
              ))
            }   
           </div>
           <div className='product-specification'>
            <h1 className='spec-title'>Specification</h1>
            <div className='key-features'>
              <div className='key-left'>
                <h1 className='key-title'>Key Features</h1>
                {
                  singleProduct[0].specification.map((item,index)=>(
                    <ul>
                  <li key={index}>{item}</li>
                </ul>
                  ))
                }
                
              </div>
              <div className='key-right'>
              <h1 className='key-title'>What's in the box</h1>
              {
                singleProduct[0].box_content.map((item,index)=>(
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
                <p className='pick-up-amount'>Delivery Fees N 250</p>
                <p className='pick-up-desc'>Arriving at pickup station between {`${day} ${month}`} & {`${day + 2} ${month}`} when you order within  next 1hr</p>
              </div>
              <div className='pick-up'>
                <p className='pick-up-title'>Door  Delivery</p>
                <p className='pick-up-amount'>Delivery Fees N 620</p>
                <p className='pick-up-desc'>Ready for delivery between {`${day} ${month}`} &  {`${day + 2} ${month}`} when you order within 1hr</p>
              </div>
            </div>
          </div>
        </div>
        <div className='related-items'>
          <h1>Customers who viewed this also viewed</h1>
          
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
};
const formatTime = (time)=>{
  const hours =  Math.floor(time/(1000 * 60 * 60));
  const minutes  = Math.floor((time / (1000 * 60)) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  return `${hours}h:  ${minutes}m:  ${seconds}s`;
}

export default Product