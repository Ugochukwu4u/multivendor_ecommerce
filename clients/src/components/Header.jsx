import './header.scss';
import {categories, smallAdvert}from '../data';
import {Link} from 'react-router-dom';
import Slideshow from './Slideshow';

const Header = () => {
  return (
    <div className='header'>
       <div className="left">
        {
            categories.map((items)=>(
              <Link to={`/products/${items.cat}`} className='link' >
              <div className='cat-items' key={items.id}>
                <img src={items.img} alt="" />
                <span>{items.title}</span>
                </div>
              </Link>
                
            ))
        }
        
       </div>
       <div className="center">
        <Slideshow/>
        </div>
       <div className="right">
        <div className='advert-1-mobile'>
          <p>Call To Order: 0816 822 9789</p>
        </div>
        <div className='advert-1'>
          <div className='advert-container'>
          <i class='bx bx-phone'></i>
            <div className='advert-content'>
            <p>Call to order</p>
            <span>0816 822 9789</span>
            </div>
          </div>
          <div className='advert-container'>
          <i class='bx bxs-store' ></i>
            <div className='advert-content'>
            <p>Sell On Ecom</p>
            </div>
          </div>
          <div className='advert-container'>
            <i class='bx bxl-dropbox' ></i>
            <div className='advert-content'>
            <p>best deals</p>
            </div>
          </div>
        </div>
        <div className='advert-2'>
          {
            smallAdvert.map((item)=>(
              <div className='advert-icon'>
                <img src={item.img} alt="" />
              </div>
            ))
          }
        </div>
       </div>
    </div>
  )
}

export default Header