import { ArrowRightOutlined } from '@mui/icons-material';
import './flashsales.scss';
import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import { flashSales } from '../data';
import {Link} from 'react-router-dom'
// import ProductCarousel from './ProductCarousel';
import ProductComponent from './ProductComponent';
import axios from  'axios';

const FlashSales = () => {
    const [timeLeft, setTimeLeft]  = useState(365 *24 * 60 * 60 *1000);
    const catLink  = flashSales[0].cat;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] =  useState(null);
    
    useEffect(()=>{
       const timerId = setInterval(()=>{
        setTimeLeft((prevTime)=> prevTime - 1000);
       }, 1000);

       return ()  =>{
        clearInterval(timerId);
       };
    }, []);
    const  timeLeftDisplay = formatTime(timeLeft);

    useEffect(()=>{
        const fetchFlashSalesProducts =  async ()=>{
            try{
                const response =  await axios.get('http://localhost:5000/api/products/top-five?flashSales=true',{
                    headers:{
                        token:  "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTY5OTA1YThiMDViMTk3MjRkNWRjZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMTcxOTUwOSwiZXhwIjoxNzI0MzExNTA5fQ.DgGnu-oMS7QWQ9zL6SqNdCgqhC1PbvGAo9bOv5rEI2U"
                    },
                });
                setProducts(response.data);
            }catch(err){
                setError(err);
            }finally{
                setLoading(false);
            }
        };
        fetchFlashSalesProducts();
    }, []);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error.message}</p>

  return (
    <div className='flashsales'>
        <div className='flashsale-header'>
            <h4>Flash Sales</h4>
            <div className='time-left'>
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
            <ProductComponent products={products}   showProgressBar = {true}/>
            {/* <ProductCarousel products={flashSales}showProgressBar={true} /> */}
            </div>
            {
                products.map((items)=>(
            <Link  to={`/product/${items.productTitle}`} className='link content-edit' >
                 <div className="content" key={items._id}>
                    <img src={items.img_1} alt="" />
                    <p className='title'>{items.productTitle}</p>
                    <p className='price'><span>N</span>{items.price}</p>
                    <p className='initial-pice'><span>N</span>{items.initialPrice}</p>
                    <p>{items.productLeft} items left</p>
                    <ProgressBar totalItems={items.totalProduct} itemsLeft={items.productLeft}/>
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