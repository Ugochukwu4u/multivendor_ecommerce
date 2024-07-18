import './relatedProduct.scss';

const RelatedProducts = (item) => {
  return (
    <div className='related-product'>
        <img src={item.img} alt="" />
        <p className='item-discount'>{item.discount}</p>
        <h1 className='related-title'>{item.title}</h1>
        <p className='price'><span>N</span> {item.price}</p>
        <p className='ini-price'>{item.initial_price}</p>
    </div>
  )
}

export default RelatedProducts