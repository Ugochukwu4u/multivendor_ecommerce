import './productComponent.scss'
import ProgressBar from './ProgressBar';
import {Link} from 'react-router-dom';

const ProductComponent = ({products, showProgressBar}) => {
  return (
    <div className='products-mobile'>
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
  )
};
ProductComponent.defaultProps = {
    showProgressBar: false,
  };

export default ProductComponent