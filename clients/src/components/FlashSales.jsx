import { ArrowRightOutlined } from '@mui/icons-material';
import './flashsales.scss';
import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import { flashSales } from '../data';
import {Link} from 'react-router-dom'
// import ProductCarousel from './ProductCarousel';
import ProductComponent from './ProductComponent';

const FlashSales = () => {
    const [timeLeft, setTimeLeft]  = useState(365 *24 * 60 * 60 *1000);
    const catLink  = flashSales[0].cat;
    
    useEffect(()=>{
       const timerId = setInterval(()=>{
        setTimeLeft((prevTime)=> prevTime - 1000);
       }, 1000);

       return ()  =>{
        clearInterval(timerId);
       };
    }, []);
    const  timeLeftDisplay = formatTime(timeLeft);

  return (
    <div className='flashsales'>
        <div className='flashsale-header'>
            <h4>Flash Sales</h4>
            <div className='time-left'>
                <p>Time left</p>
                <h4>{timeLeftDisplay}</h4>
            </div>
            <Link to={`/products/${catLink}`} className='link'>
                        <div className='see-all'>
                        <span>See All</span>
                        <ArrowRightOutlined/>
                        </div>
                    </Link>
        </div>
        <div className='flashsales-wrapper'>
            
            <div className='mobile-flash'>
            <ProductComponent products={flashSales}   showProgressBar = {true}/>
            {/* <ProductCarousel products={flashSales}showProgressBar={true} /> */}
            </div>
            {
                flashSales.map((items)=>(
            <Link  to={`/product/${items.id}`} className='link content-edit' >
                 <div className="content" key={items.id}>
                    <img src={items.img} alt="" />
                    <p className='title'>{items.title}</p>
                    <p className='price'><span>N</span>{items.price}</p>
                    <p className='initial-pice'><span>N</span>{items.initialPrice}</p>
                    <p>{items.itemLeft} items left</p>
                    <ProgressBar totalItems={items.totalItem} itemsLeft={items.itemLeft}/>
                </div>
            </Link>
                ))
            }
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


export default FlashSales