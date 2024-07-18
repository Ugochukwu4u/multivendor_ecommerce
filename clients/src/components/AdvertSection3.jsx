import { Link } from 'react-router-dom';
import { thirdAdvert } from '../data';
import './advertSection3.scss';

const AdvertSection3 = () => {
  return (
    <div className='advert-3'>
        {
            thirdAdvert.map((item)=>(
                <Link to={`/products/${item.cat}`} className='link'>
                 <div className='advert-wrapper' key={item.id}>
                <img src={item.img} alt="" />
            </div>
                </Link>
            ))
        }
    </div>
  )
}

export default AdvertSection3