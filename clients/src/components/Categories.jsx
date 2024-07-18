import { Link } from 'react-router-dom';
import { category } from '../data';
import './categories.scss';

const Categories = () => {
  return (
    <div  className='categories'>
        <div className='category-wrapper'>
            {
                category.map((item)=>(
                    <div className='content' key={item.id}>
                     <img src={item.img} alt="" />
                     <Link to={`/products/${item.cat}`} className='link'>
                     <p>{item.title}</p>
                     </Link>
                     
                    </div>
                ))
            }
        
        </div>
        
    </div>
  )
}

export default Categories