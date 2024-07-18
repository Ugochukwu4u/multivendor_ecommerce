import './adverts.scss';
import { advert} from '../data';
import { Link } from 'react-router-dom';
const Adverts = () => {
  return (
    <div className='adverts'>
      {
        advert.map((items)=>(
          <div className='advert-container' key={items.id}>
          <h1 className='title'>{items.title}</h1>
          <p  className='desc'>{items.desc}</p>
          <p className='date'>{items.date}</p>
          <Link to={`/products/${items.cat}`} className='link'>
          <div className='advert-order'>
            <span>Order Now</span>
            <i className='bx bx-right-arrow-alt'></i>
          </div>
          </Link>
          <img src={items.image} alt="" />
          <div className='advert-call'>
            <p>Call to Order</p>
            <h1>0816 822 9789</h1>
          </div>
        </div>
        ))
      }
     
    </div>
  )
}

export default Adverts