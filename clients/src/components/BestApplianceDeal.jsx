import './bestApplianceDeal.scss';
import { Link } from 'react-router-dom'
import { categories, flashSales } from '../data'
import { ArrowRight } from '@mui/icons-material';
import ProductComponent from './ProductComponent';
// import ProductCarousel from './ProductCarousel';
const BestApplianceDeal = () => {
    const phone = categories[3].cat;
  return (
    <div className='appliance-deal'>
         <div className='main-wrapper'>
            <div className='main-content'>
            <h1>Best Appliance Deals</h1>
            <Link to={`/products/${phone}`} className='link'>
            <div className='link-btn'>
            <span>See All</span>
            <ArrowRight/>
            </div>
            </Link>
            
            </div>
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

export default BestApplianceDeal