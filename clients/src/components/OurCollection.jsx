import { Link } from 'react-router-dom'
import { flashSales } from '../data'
import './ourcollection.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';

const OurCollection = () => {
  const [latestCollection, setLatestCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] =  useState(null);

    useEffect(() => {
      const fetchProducts = async () => {
          try {
              const response = await axios.get(`http://localhost:5000/api/products/latest-products`, {
                  headers: {
                      token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTY5OTA1YThiMDViMTk3MjRkNWRjZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMTcxOTUwOSwiZXhwIjoxNzI0MzExNTA5fQ.DgGnu-oMS7QWQ9zL6SqNdCgqhC1PbvGAo9bOv5rEI2U"
                  }
              });
              setLatestCollection(response.data);
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
    <div  className='collection'>
        <h1>Shop From Our Collection</h1>
        <div className='collection-wrapper'>
        {
                latestCollection.map((items)=>(
            <Link to={`/product/${encodeURIComponent(items.productTitle)}`}  className='link content-edit' >
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
  )
}

export default OurCollection