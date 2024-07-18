import { Link } from 'react-router-dom'
import { flashSales } from '../data'
import './ourcollection.scss'

const OurCollection = () => {
  return (
    <div  className='collection'>
        <h1>Shop From Our Collection</h1>
        <div className='collection-wrapper'>
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
  )
}

export default OurCollection