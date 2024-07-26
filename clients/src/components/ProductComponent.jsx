import './productComponent.scss'
import ProgressBar from './ProgressBar';
import {Link} from 'react-router-dom';

const ProductComponent = ({products, showProgressBar}) => {
  return (
    <div className='products-mobile'>
      {products.map((product) => (
          <Link to={`/product/${product.productTitle}`} className='link'>
          <div className="product" key={product._id}>
            <img src={product.img_1} alt={product.img_1} />
            <Link to={`/product/${product.productTitle}`} className='link'>
            <h3>{product.productTitle}</h3>
            </Link>
            <h2><span>N</span> {product.price}</h2>
            {showProgressBar && (
              <>
               <p>{product.productLeft} items left</p>
              <ProgressBar totalItems={product.totalProduct} itemsLeft={product.productLeft} />
              </>
            )}
          </div>
          </Link>   
        ))}
    </div>
  )
};
ProductComponent.defaultProps = {
    showProgressBar: false,
  };

export default ProductComponent