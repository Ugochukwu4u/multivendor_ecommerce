import { useState, useEffect } from 'react';
import { fourthAdvert } from '../data';
import './products.scss';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const params = useParams(); // Get the URL parameters
  console.log('URL parameters:', params); // Log the URL parameters
  const category = params; // Get the category parameter
  console.log('Category:', category); // Log the category parameter
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?category=${encodeURIComponent(category.id)}`, {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTY5OTA1YThiMDViMTk3MjRkNWRjZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMTcxOTUwOSwiZXhwIjoxNzI0MzExNTA5fQ.DgGnu-oMS7QWQ9zL6SqNdCgqhC1PbvGAo9bOv5rEI2U"
          }
        });
        console.log(response.data); // Log the response data
        setProductCategory(response.data);
      } catch (err) {
        console.error(err); // Log the error
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      if (!uniqueBrands.includes(name)) {
        setUniqueBrands((prevBrands) => [...prevBrands, name]);
      }
    } else {
      setUniqueBrands((prevBrands) => prevBrands.filter((brand) => brand !== name));
    }
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const filteredData = productCategory.filter((item) => {
    const brandFilter = uniqueBrands.length === 0 || uniqueBrands.includes(item.brand);
    const minPriceFilter = minPrice === '' || parseInt(item.price) >= parseInt(minPrice);
    const maxPriceFilter = maxPrice === '' || parseInt(item.price) <= parseInt(maxPrice);
    return brandFilter && minPriceFilter && maxPriceFilter;
  });
  const uniqueBrandNames = Array.from(new Set(productCategory.map(item => item.brand)));
  const uniqueCategories = Array.from(new Set(productCategory.flatMap(product => product.categories)));
  return (
    <div className='products'>
      {
        fourthAdvert.map((item) => (
          <div className='advert'>
            <img src={item.img} alt="" />
          </div>
        ))
      }
      <div className='product-wrapper'>
        <div className="left">
          <div className='category'>
            <h1>Category</h1>
            {
              uniqueCategories.map((category) => (
                <Link to={`/products/${category}`} className='link' key={category}>
                  <p>{category}</p>
                </Link>
              ))
            }
          </div>
          <div className='brand'>
            <h1>brand</h1>
            {
              uniqueBrandNames.map((brand) => (
                <div key={brand} className='checkbox'>
                  <input
                    type="checkbox"
                    name={brand}
                    checked={uniqueBrands.includes(brand)}
                    onChange={handleCheckboxChange}
                  />
                  <span>{brand}</span>
                </div>
              ))
            }
          </div>
          <div className='price-range'>
            <h1>Price Range</h1>
            <div className='price-wrapper'>
              <div className="left-price">
                <input
                  type="range"
                  min="0"
                  max="100" // Adjust max value according to your needs
                  value={minPrice}
                  onChange={handleMinPriceChange}
                />
                <p>Min Price: <span>{minPrice}</span> </p>
              </div>
              <div className="right-price">
                <input
                  type="range"
                  min="0"
                  max="100000" // Adjust max value according to your needs
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                />
                <p>Max Price: <span>{maxPrice}</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className='title'>
            <h1>best {category.id} deal</h1>
            <p>{filteredData.length} products found</p>
          </div>
          <div className='right-product-wrapper'>
            {
              filteredData.map((item) => (
                <Link to={`/product/${item.productTitle}`} className='link content-edit'>
                  <div className="content" key={item._id}>
                    <img src={item.img_1} alt="" />
                    {item.payOnDelivery === true && <span className='delivery'>Pay on Delivery</span>}
                    {item.outOfStock === true && <p className='out-of-stock'>Out of Stock</p>}
                    <p className='r-title'>{item.productTitle}</p>
                    <p className='r-price'><span>N</span>{item.price}</p>
                    <div className='content-price'>
                      <div className='init-price'>
                        {item.initialPrice !== '' && <span>N</span>}
                        <p className='inPrice'>{item.initialPrice}</p>
                      </div>
                      {item.initialPrice !== '' && <p className='percent-price'>{(((item.price - item.initialPrice) / item.initialPrice) * 100).toFixed()}%</p>}
                    </div>
                  </div>
                </Link>

              ))
            }

          </div>

        </div>
      </div>
    </div>
  )
}

export default Products