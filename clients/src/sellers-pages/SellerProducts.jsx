import React from 'react'
import SellerNav from '../sellers-components/SellerNav';
import {CurrentDateTime} from '../sellers-components/CurrentDateTime';
import './sellerProducts.scss';
import DataGridComponent from '../sellers-components/DataGridComponent';
import { Link } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'Invoice', width: 90 },
    {
      field: 'imgBig', headerName: 'Image', width: 20,
      renderCell: (params)=>{
        return <img className='img-edit' src={params.row.imgBig || "./noavatar.png" } alt="no-img" />
      }
    },
    {
      field: 'Product',
      headerName: 'Product',
      width: 300,
      editable: false,
    },
    {
      field: 'InitialPrice',
      headerName: 'Initial Price',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'price',
      headerName: 'Selling Price',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field:'brand',
      headerName:'Brand',
      width:130,
      editable:false,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
        return (
          <div className="action">
            <Link to={`/sellProduct/${params.row.id}`} className="link">
              <img  className='actionImg' src="./svgviewer-png-output.png" alt="" />
            </Link>
            <div className="delete">
              <img  className='actionImg' src="./delete.svg" alt="" />
            </div>
          </div>
        );
      },
    },
  ];
  
  const rows = [
    { id: 1, Product: 'Snow', InitialPrice: 500, sellingPrice: 14, brand:'AGM'  },
    { id: 2, Product: 'Lannister', InitialPrice: 300, sellingPrice: 31, brand:'AGM' },
    { id: 3, Product: 'Lannister', InitialPrice: 1000, sellingPrice: 31, brand:'AGM' },
    { id: 4, Product: 'Stark', InitialPrice: 550, sellingPrice: 11, brand:'AGM' },
    { id: 5, Product: 'Targaryen', InitialPrice: 456, sellingPrice: null, brand:'AGM' },
    { id: 6, Product: 'Melisandre', InitialPrice: 789, sellingPrice: 150, brand:'AGM' },
    { id: 7, Product: 'Clifford', InitialPrice: 900, sellingPrice: 44, brand:'AGM' },
    { id: 8, Product: 'Frances', InitialPrice: 'Rossini', sellingPrice: 36, brand:'AGM' },
    { id: 9, Product: 'Roxie', InitialPrice: 'Harvey', sellingPrice: 65, brand:'AGM' },
  ];
const SellerProducts = () => {
  return (
    <div className='sellers-products'>
    <div className="sell-center-left">
      <SellerNav/>
      </div>
      <div className="sell-center-right">
        <div className="sell-center-title">
          <h1>Seller Center</h1>
          <div className="sell-date">
          <i className='bx bxs-calendar'></i>
            <CurrentDateTime/>
          </div>
        </div>
        <div className='recent-order-grid'>
          <div className="order-grid-heading">
            <h1>All Products</h1>
            <p>Recent Products Listed</p>
          </div>
          <DataGridComponent rows={rows} columns={columns}/>
        </div>
        </div>

    </div>
  )
}

export default SellerProducts;