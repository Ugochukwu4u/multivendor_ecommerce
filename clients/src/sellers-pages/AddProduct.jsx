import React, { useState } from 'react'
import SellerNav from '../sellers-components/SellerNav';

import './addProduct.scss';
import { Link } from 'react-router-dom';

const AddProduct = () => {
 const[formData, setFormData] =useState({
   productTitle:'',
   category:'',
   color:[],
   sizes:[],
   model:'',
   price:'',
   initialPrice:'',
   productDescription:'',
   brand:'',
   productLine:'',
   totalProduct:'',
   productLeft:'',
   flashSales:false,
   payOnDelivery:false,
   shippingLocation:'',
   shippingFee:'',
   specification:[],
   boxContent:[]
 });
 const handleChange =(e)=>{
    const {name,value}= e.target;
    setFormData((prevData)=>({
        ...prevData,
        [name]:value,
    }));
 };
 const handleArrayChange =(e)=>{
    const {name,value}   = e.target;
    setFormData((prevData)=>({
        ...prevData,
        [name]: value.split(',').map((item)=> item.trim()),
    }));
 };
 const handleSelectChange =(e)=>{
    const {name, value}= e.target;
    setFormData((prevData)=>({
        ...prevData,
        [name]:value === 'yes'
    }));
 };
 const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(formData);
 }
  return (
    <div className='add-product'>
        <div className='product-navigation'>
            <ul>
                <Link to='/sellDashboard' className='link'><li>Dashboard -</li></Link>
                <li className='add-link'>Add Product</li>
            </ul>
        </div>
        <div className="add-product-heading">
            <h1>Add Product</h1>
            {/* <button><i class='bx bx-upload' ></i>Upload</button> */}
        </div>
        <div className="add-product-wrapper">
            <form onSubmit={handleSubmit}>
            <div className="add-product-left">
           <div className="add-left-basic-info">
            <h3>Basic Information</h3>
            <label htmlFor="">Product Title</label>
            <input type="text" name='productTitle' value={formData.productTitle} onChange={handleChange}/>
            <div className="input-wrapper">
                <div className="inputs">
                <label htmlFor="">Category</label>
                <input type="text" name='category' value={formData.category} onChange={handleChange}/>
                </div>
                <div className="inputs">
                <label htmlFor="">Color<span>(comma-seperated)</span></label>
                <input type="text" name='color'value={formData.color.join(',')}  onChange={handleArrayChange} />
                </div>
                <div className="inputs">
                <label htmlFor="">Size(s)<span>(comma-seperated)</span></label>
                <input type="text"  name='sizes' value={formData.sizes.join(',')} onChange={handleArrayChange} />
                </div>
                <div className="inputs">
                <label htmlFor="">Model</label>
                <input type="text" name='model' value={formData.model} onChange={handleChange}/>
                </div>
                <div className="inputs">
                <label htmlFor="">Price *</label>
                <input type="text" name='price' value={formData.price} onChange={handleChange}/>
                </div>
                <div className="inputs">
                <label htmlFor="">Initial Price</label>
                 <input type="text" name='initialPrice' value={formData.initialPrice} onChange={handleChange}/>
                </div>
            </div>
            <label htmlFor="">Product Description *</label>
            <textarea name="productDescription" id="" value={formData.productDescription} onChange={handleChange}></textarea>
           </div>
           <div className="add-left-basic-info">
            <h3>Basic Information</h3>
            <div className="input-wrapper">
                <div className="inputs">
                <label htmlFor="">Brand</label>
                <input type="text" name='brand' value={formData.brand} onChange={handleChange} />
                </div>
                <div className="inputs">
                <label htmlFor="">Product Line</label>
                <input type="text" name='productLine'value={formData.productLine} onChange={handleChange} />
                </div>
                <div className="inputs">
                <label htmlFor="">Total Product *</label>
                <input type="text" name='totalProduct' value={formData.totalProduct} onChange={handleChange}/>
                </div>
                <div className="inputs">
                <label htmlFor="">Product Left</label>
                 <input type="text"  name='productLeft' value={formData.productLeft} onChange={handleChange}/>
                </div>
            </div>
            <div className="input-wrapper">
                <div className="inputs">
                <label htmlFor="">Flash Sales</label>
                <select name="flashSales" id="" value={formData.flashSales ? 'yes':'no'} onChange={handleSelectChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
                </div>
                <div className="inputs">
                <label htmlFor="">Pay On Delivery</label>
                <select name="payOnDelivery" id="" value={formData.payOnDelivery ? 'yes':'no'} onchange={handleSelectChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
                </div>
                <div className="inputs">
                <label htmlFor="">Shipping Location *</label>
                <input type="text" name='shippingLocation' value={formData.shippingLocation} onChange={handleChange}/>
                </div>
                <div className="inputs">
                <label htmlFor="">Shipping Fee</label>
                 <input type="text" name='shippingFee' value={formData.shippingFee} onChange={handleChange} />
                </div>
            </div>
           </div>
            </div>
            <div className="add-product-right">
            <div className="add-product-sec">
                <label htmlFor="">Specification(s) <span>(comma-seperated)</span> </label>
                <input type="text" name='specification' value={formData.specification.join(',')} onChange={handleArrayChange}/>
            </div>
            <div className="add-product-sec">
                <label htmlFor="">Box Content(s) <span>(comma-seperated)</span></label>
                <input type="text" name='boxContent' value={formData.boxContent.join(',')} onChange={handleArrayChange}/>
            </div>
            <div className="add-product-sec">
                <label htmlFor="">Product Image *</label>
                <input type="file" />
                <div className='icon-img-upload'>
                <div className="add-product-sec">
                <input type="file" />
                </div>
                <div className="add-product-sec">
                <input type="file" />
                </div>
                <div className="add-product-sec">
                <input type="file" />
                </div>
                </div>
            </div>
            <button><i class='bx bx-upload' ></i>Upload</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default AddProduct