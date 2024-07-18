import { useState } from 'react';
import { fourthAdvert, phoneCategory, products } from '../data';
import './products.scss';
import {Link} from 'react-router-dom';

const Products = () => {
  const [checkedCategories, setCheckedCategories] =useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const uniqueBrands = [...new Set(products.map(product => product.brand))];


  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setCheckedCategories((prevCategories) => [...prevCategories, name]);
    } else {
      setCheckedCategories((prevCategories) =>
        prevCategories.filter((cat) => cat !== name)
      );
    }
  };
  
  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const filteredData = products.filter((item) => {
    const brandFilter = checkedCategories.length === 0 || checkedCategories.includes(item.brand);
    const minPriceFilter = minPrice === '' || parseInt(item.price) >= parseInt(minPrice);
    const maxPriceFilter = maxPrice === '' || parseInt(item.price) <= parseInt(maxPrice);
    return brandFilter && minPriceFilter && maxPriceFilter;
  });

  return (
    <div className='products'>
      {
        fourthAdvert.map((item)=>(
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
              phoneCategory.map((item)=>(
                <Link to={`/products/${item.cat}`} className='link'>
                <p>{item.title}</p>
                </Link>
                
              ))
            }
          </div>
          <div className='brand'>
            <h1>brand</h1>
            {
              uniqueBrands.map((cat)=>(
                <div key={cat} className='checkbox'>
                  <input type="checkbox"name={cat} checked={checkedCategories.includes(cat)} onChange={handleCheckboxChange}/>
                  <span>{cat}</span>
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
            <h1>best phone deal</h1>
            <p>{filteredData.length} products found</p>
          </div>
          <div className='right-product-wrapper'>
          {
            filteredData.map((item)=>(
              <Link to={`/product/${item.id}`} className='link content-edit'>
              <div className="content" key={item.id}>
                <img src={item.img} alt="" />
                {item.payOnDelivery === true && <span className='delivery'>Pay on Delivery</span>}
                {item.outOfStock === true && <p className='out-of-stock'>Out of Stock</p>}
                <p className='r-title'>{item.title}</p>
                <p className='r-price'><span>N</span>{item.price}</p>
                <div className='content-price'>
                  <div className='init-price'>
                  {item.initialPrice !== '' && <span>N</span>}
                  <p className='inPrice'>{item.initialPrice}</p>
                  </div>
                  {item.initialPrice !== '' && <p className='percent-price'>{(((item.price - item.initialPrice)/item.initialPrice)  *  100).toFixed()}%</p> }
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