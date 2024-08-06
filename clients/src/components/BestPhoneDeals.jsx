import { Link } from 'react-router-dom';
import { flashSales } from '../data';
import {categories} from '../data'
import './bestphoneDeals.scss'
import { ArrowRight} from '@mui/icons-material';
// import ProductCarousel from './ProductCarousel';
import ProductComponent from './ProductComponent'
import { useEffect, useState } from 'react';
import axios from 'axios';

const BestPhoneDeals = () => {
    const phone = categories[4].cat;
    const [phoneProducts, setPhoneProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] =  useState(null);
    const category = ['Phone & Tablets','smart phones','tablets','phones'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/latest-products?categories=${encodeURIComponent(category)}`, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTY5OTA1YThiMDViMTk3MjRkNWRjZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMTcxOTUwOSwiZXhwIjoxNzI0MzExNTA5fQ.DgGnu-oMS7QWQ9zL6SqNdCgqhC1PbvGAo9bOv5rEI2U"
                    }
                });
                setPhoneProducts(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error.message}</p>
  return (
    <div className='best-phone'>
        <div className='main-wrapper'>
            <div className='main-content'>
            <h1>Best Phone Deals</h1>
            <Link to={`/products/${category}`} className='link'>
            <div className='link-btn'>
            <span>See All</span>
            <ArrowRight/>
            </div>
            </Link>
            
            </div>
        <div className='topselling-wrapper'>
        <div className='mobile-flash'>
        <ProductComponent products={phoneProducts}   showProgressBar = {false}/>
            {/* <ProductCarousel products={flashSales} showProgressBar={false} /> */}
            </div>
            {
                phoneProducts.map((items)=>(
                    <Link to={`/product/${encodeURIComponent(items.productTitle)}`} className='link content-edit' >
                    <div className="content" key={items._id}>
                       <img src={items.img_1} alt="" />
                       <p className='title'>{items.productTitle}</p>
                       <p className='price'><span>N</span>{items.price}</p>
                       <p className='initial-pice'><span>N</span>{items.initialPrice}</p>
                   </div>
                    </Link>
                ))
            }
        </div>
        </div>
    </div>
  )
}

export default BestPhoneDeals;