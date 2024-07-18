import './dashboard.scss';

const Dashboard = () => {
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
            <button>logout</button>
        </div>
      </div>
      <div className="dashboard-right">
        <h1>Account Overview</h1>
        <div className="dashbord-right-wrapper">
            <div className="dash-right-main">
              <h2>Account Details</h2>
              <div  className='acc-details'>
                  <p>Peter Ugochukwu</p>
                  <p>pjgraphixs@gmail.com</p>
              </div>
            </div>
            <div className="dash-right-main">
              <h2>Address book</h2>
              <div  className='acc-details'>
                  <p>Your default shipping address</p>
                  <p>Ugochukwu Peter</p>
                  <p>Plot 2B, Shagari Estate, Pako Bustop, Ipaja, Lagos</p>
                  <p>+234 8168229789</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard