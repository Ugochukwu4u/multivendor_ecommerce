import { Link } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-one'>
        <div className="left">
        <h1>E-Store</h1>
        <i class='bx bx-store-alt'></i>
        </div>
        <div className="center">
          <h2>New to E-Store?</h2>
          <p>Subscribe to our newsletter to get updates on our latest offers!</p>
        <form>
        <div className='input-container'>
          <div className='input-email'>
          <i class='bx bx-envelope'></i>
          <input type="email" placeholder='Enter Email Address'/>
          </div>
          <button>male</button>
          <button>Female</button>
          </div>
          <div className='checkbox'>
            <input type="checkbox"/>
            <p>I agree to E-Store’s Privacy and Cookie Policy. You can unsubscribe from newsletters at any time.</p>
          </div>
          <input type="submit"  value="I accept the legal terms" />
        </form>
         

        </div>
        <div className="right">
          <div className='right-container'>  
            <i class='bx bx-store-alt'></i>
              <div className='right-title'>
                <h1>Download E-Com App for free</h1>
                <p>Get access to exclusive offers!</p>
              </div>
          </div>
          <h2>Not Available Yet</h2>
        </div>
      </div>
      <div className='footer-two'>
        <div className='footer-two-wrapper'>
        <div className="one">
          <h3>NEED HELP?</h3>
          <ul>
            <li>Chat with us</li>
            <li>Help Center</li>
            <li>Contact Us</li>
          </ul>
          <h3>Useful Links</h3>
          <ul>
            <li>Service Center</li>
            <li>How to shop on E-Com</li>
            <li>Delivery Options and deadlines</li>
            <li>How to return a product on E-Com</li>
            <li>Corporate and bulk purchase</li>
            <li>Report a Product</li>
            <li>Dispute Resolution Policy</li>
            <li>Return & Refund Policy</li>
            <li>Return Policy</li>
          </ul>
        </div>
        <div className="one">
          <h3>ABOUT E-COM</h3>
          <ul>
            <li>About Us</li>
            <li>E-Com careers</li>
            <li>E-Com express</li>
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li>E-Com Store Credit</li>
            <li>E-Com Payment Information Guidelines</li>
            <li>Cookie Notice</li>
            <li>E-Com Global</li>
            <li>Official Stores</li>
            <li>Flash Sales</li>
            <li>Tech Week 2024</li>
          </ul>
        </div>
        <div className="one">
          <h3>MAKE MONEY WITH E-COM</h3>
          <ul>
            <Link to='/sellerRegister' className='link'><li>Sell on E-Com</li></Link>
            <li>Vendor hub</li>
            <li>Become a Sales Consultant</li>
            <li>Become a Logistics Service Partner</li>
          </ul>
        </div>
        <div className="one">
          <h3>E-COM LOCATIONS</h3>
          <ul>
            <li>Lagos</li>
            <li>Abuja</li>
          </ul>
        </div>
        </div>
          <div className='payment'>
            <h3>PAYMENT METHODS & DELIVERY PARTNERS</h3>
            <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="" />
          </div>
      </div>
    </div>
  )
}

export default Footer