import { useEffect, useState } from 'react';
import './dashboard.scss';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate =  useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);
  console.log(user);

   const signOut =()=>{
    localStorage.removeItem('user');
    navigate('/');
  }
  return (
    <div className='dashboard-account'>
      <div className="dashboard-left">
        <div className='left-header'>
        <i class='bx bx-user' ></i>
        <p>My Ecom Account</p>
        </div>
        <div className="left-main-1">
          <p>Orders</p>
          <p>Inbox</p>
          <p></p>
        </div>
        <div className="left-main-1">
          <p>Account Management</p>
          <p>Address book</p>
          <p>newsletter Prefrences</p>
          <p>Close Account</p>
        </div>
        <div className='main-left-logout'>
            <button onClick={signOut}>logout</button>
        </div>
      </div>
      <div className="dashboard-right">
        <h1>Account Overview</h1>
        <div className="dashbord-right-wrapper">
            <div className="dash-right-main">
              <h2>Account Details</h2>
              <div  className='acc-details'>
                  <p>{`${user.firstname} ${user.lastname}`}</p>
                  <p>{user.email}</p>
              </div>
            </div>
            <div className="dash-right-main">
              <h2>Address book</h2>
              <div  className='acc-details'>
                  <p>Your default shipping address</p>
                  <p>{`${user.firstname} ${user.lastname}`}</p>
                  <p>{user.address}</p>
                  <p>{user.phone}</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard