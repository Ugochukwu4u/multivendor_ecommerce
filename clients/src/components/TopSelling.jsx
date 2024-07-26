import './topSelling.scss';
import { flashSales } from '../data';
import {Link} from 'react-router-dom';
// import ProductCarousel from './ProductCarousel'
import ProductComponent from './ProductComponent'
import { useEffect, useState } from 'react';
import axios from 'axios';

const TopSelling = () => {
  const[topSellingItems, setTopSellingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] =  useState(null);

  useEffect(()=>{
    const fetchTopSellingProducts =  async ()=>{
        try{
            const response =  await axios.get('http://localhost:5000/api/products/top-selling-products',{
                headers:{
                    token:  "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTY5OTA1YThiMDViMTk3MjRkNWRjZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMTcxOTUwOSwiZXhwIjoxNzI0MzExNTA5fQ.DgGnu-oMS7QWQ9zL6SqNdCgqhC1PbvGAo9bOv5rEI2U"
                },
            });
            setTopSellingItems(response.data);
        }catch(err){
            setError(err);
        }finally{
            setLoading(false);
        }
    };
    fetchTopSellingProducts();
}, []);

if(loading) return <p>Loading...</p>;
if(error) return <p>Error: {error.message}</p>
console.log(topSellingItems);
  return (
    <div className='top-selling'>
        <div className='main-wrapper'>
          <h1>Top Selling Items</h1>
        <div className='topselling-wrapper'>
        <div className='mobile-flash'>
        <ProductComponent products={topSellingItems}   showProgressBar = {false}/>
            {/* <ProductCarousel products={flashSales} showProgressBar={false} /> */}
            </div>
            {
                topSellingItems.map((items)=>(
            <Link  to={`/product/${items.product.productTitle}`} className='link content-edit' >
                 <div className="content" key={items._id}>
                    <img src={items.product.img_1} alt="" />
                    <p className='title'>{items.product.productTitle}</p>
                    <p className='price'><span>N</span>{items.product.price}</p>
                    <p className='initial-pice'><span>N</span>{items.product.initialPrice}</p>
                </div>
            </Link>
                ))
            }
        </div>
        </div>
          
    </div>
  )
}

export default TopSelling