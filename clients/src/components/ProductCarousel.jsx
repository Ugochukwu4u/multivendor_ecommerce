import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ProductCarousel.scss';
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';

const ProductCarousel = ({ products, showProgressBar }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productListRef = useRef(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handleTouchStart = (e) => {
    startXRef.current = e.touches ? e.touches[0].clientX : e.clientX;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const diffX = startXRef.current - currentX;
    productListRef.current.style.transform = `translateX(${-currentIndex * 170 - diffX}px)`; // Adjust 310 if the product width/margin changes
  };

  const handleTouchEnd = (e) => {
    isDraggingRef.current = false;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diffX = startXRef.current - endX;
    if (diffX > 50 && currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (diffX < -50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const productList = productListRef.current;
    productList.style.transform = `translateX(${-currentIndex * 170}px)`; // Adjust 310 if the product width/margin changes
  }, [currentIndex]);

  return (
    <div className="product-carousel">
      <div
        className="products"
        ref={productListRef}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {products.map((product) => (
          <Link to={`/product/${product.id}`} className='link'>
          <div className="product" key={product.id}>
            <img src={product.img} alt={product.title} />
            <Link to={`/product/${product.id}`} className='link'>
            <h3>{product.title}</h3>
            </Link>
            <h2><span>N</span> {product.price}</h2>
            {showProgressBar && (
              <>
               <p>{product.itemLeft} items left</p>
              <ProgressBar totalItems={product.totalItem} itemsLeft={product.itemLeft} />
              </>
            )}
          </div>
          </Link>   
        ))}
      </div>
      {/* <div className="indicator-container">
        {products.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
          ></div>
        ))}
      </div> */}
    </div>
  );
};

ProductCarousel.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    initialPrice: PropTypes.string.isRequired,
    itemLeft: PropTypes.number.isRequired,
    totalItem: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
  })).isRequired,
  showProgressBar: PropTypes.bool,
};

ProductCarousel.defaultProps = {
  showProgressBar: false,
};

export default ProductCarousel;
