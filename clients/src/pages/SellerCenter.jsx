import React from 'react'
import SellerNav from '../sellers-components/SellerNav'
import './sellcenter.scss';
import { CurrentDateTime } from '../sellers-components/CurrentDateTime';
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
    field: 'sellingPrice',
    headerName: 'Selling Price',
    type: 'number',
    width: 110,
    editable: false,
  },
  {
    field:'Status',
    headerName:'Status',
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
          <Link to={`/edit/${params.row.id}`} className="link">
            <img  className='actionImg' src="./view.svg" alt="" />
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
  { id: 1, Product: 'Snow', InitialPrice: 500, sellingPrice: 14, Status:'Pending'  },
  { id: 2, Product: 'Lannister', InitialPrice: 300, sellingPrice: 31, Status:'Pending' },
  { id: 3, Product: 'Lannister', InitialPrice: 1000, sellingPrice: 31, Status:'Pending' },
  { id: 4, Product: 'Stark', InitialPrice: 550, sellingPrice: 11, Status:'Pending' },
  { id: 5, Product: 'Targaryen', InitialPrice: 456, sellingPrice: null, Status:'Pending' },
  { id: 6, Product: 'Melisandre', InitialPrice: 789, sellingPrice: 150, Status:'Pending' },
  { id: 7, Product: 'Clifford', InitialPrice: 900, sellingPrice: 44, Status:'Pending' },
  { id: 8, Product: 'Frances', InitialPrice: 'Rossini', sellingPrice: 36, Status:'Pending' },
  { id: 9, Product: 'Roxie', InitialPrice: 'Harvey', sellingPrice: 65, Status:'Pending' },
];
const SellerCenter = () => {
  return (
    <div className='sell-center'>
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
        <div className="summary-right">
          <div className="all-products">
          <i class='bx bxs-package' ></i>
          <div className="all-product-title">
            <h1>560</h1>
            <p>All Product</p>
          </div>
          </div>
          <div className="all-products">
          <i class='bx bxs-coin-stack'></i>
          <div className="all-product-title">
            <h1>678,563</h1>
            <p>Sale Products</p>
          </div>
          </div>
          <div className="all-products">
          <i class='bx bx-cart-download'></i>
          <div className="all-product-title">
            <h1>2,489</h1>
            <p>Orders</p>
          </div>
          </div>
        </div>
        <div className='recent-order-grid'>
          <div className="order-grid-heading">
            <h1>Recent Orders</h1>
            <p>Delivery Status and Invoice</p>
          </div>
          <DataGridComponent rows={rows} columns={columns}/>
        </div>
      </div>


    </div>
  )
}

export default SellerCenter