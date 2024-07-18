import { Link } from 'react-router-dom'
import './phoneDeal.scss'
import { phoneCategory } from '../data'

const PhoneDeals = () => {
  return (
    <div className='phone-deals'>
        <h1>Best Phone Deals</h1>
        <div className='phone-wrapper'>
            {
                phoneCategory.map((item)=>(
                    <Link  to={`/products/${item.cat}`} className='link phone-cat'>
                    <div className='content'>
                        <img src={item.img} alt="" />
                        <p>{item.title}</p>
                    </div>
                    </Link>
                    
                ))
            }
            
        </div>
    </div>
  )
}

export default PhoneDeals