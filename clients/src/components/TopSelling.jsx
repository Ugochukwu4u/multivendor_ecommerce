import './topSelling.scss';
import { flashSales } from '../data';
import {Link} from 'react-router-dom';
// import ProductCarousel from './ProductCarousel'
import ProductComponent from './ProductComponent'
const TopSelling = () => {
  return (
    <div className='top-selling'>
        <div className='main-wrapper'>
          <h1>Top Selling Items</h1>
        <div className='topselling-wrapper'>
        <div className='mobile-flash'>
        <ProductComponent products={flashSales}   showProgressBar = {false}/>
            {/* <ProductCarousel products={flashSales} showProgressBar={false} /> */}
            </div>
            {
                flashSales.map((items)=>(
            <Link  to={`/product/${items.id}`} className='link content-edit' >
                 <div className="content" key={items.id}>
                    <img src={items.img} alt="" />
                    <p className='title'>{items.title}</p>
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

export default TopSelling