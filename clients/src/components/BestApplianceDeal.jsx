import './bestApplianceDeal.scss';
import { Link, useParams } from 'react-router-dom'
import { categories, flashSales } from '../data'
import { ArrowRight } from '@mui/icons-material';
import ProductComponent from './ProductComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import ProductCarousel from './ProductCarousel';

const BestApplianceDeal = () => {
    // const phone = categories[3].cat;
    const [applianceProducts, setApplianceProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] =  useState(null);
   const category = ['Generators','Electronics'];
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/latest-products?categories=${encodeURIComponent(category.join(','))}`, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTY5OTA1YThiMDViMTk3MjRkNWRjZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMTcxOTUwOSwiZXhwIjoxNzI0MzExNTA5fQ.DgGnu-oMS7QWQ9zL6SqNdCgqhC1PbvGAo9bOv5rEI2U"
                    }
                });
                setApplianceProducts(response.data);
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
    <div className='appliance-deal'>
         <div className='main-wrapper'>
            <div className='main-content'>
            <h1>Best Appliance Deals</h1>
            <Link to={`/products/${category.join(',')}`} className='link'>
            <div className='link-btn'>
            <span>See All</span>
            <ArrowRight/>
            </div>
            </Link>
            
            </div>
        <div className='topselling-wrapper'>
        <div className='mobile-flash'>
        <ProductComponent products={applianceProducts}   showProgressBar = {false}/>
            {/* <ProductCarousel products={flashSales} showProgressBar={false} /> */}
            </div>
            {
                applianceProducts.map((items)=>(
            <Link  to={`/product/${items.productTitle}`} className='link content-edit' >
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

export default BestApplianceDeal