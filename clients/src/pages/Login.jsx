import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setErrors({ ...errors, email: 'Email is required', password: 'Password is required' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ ...errors, email: 'Invalid email address' });
      return;
    }

    // Form is valid, proceed with submission
    try {
     const response  = await axios.post("http://localhost:5000/api/auth/login", formData );
     console.log(response.data);
     localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/');
    } catch (err) {
      console.error("Login error:", err);
      console.error("Server error message:", err.response?.data?.message);
    }
   
  };

  return (
    <div className='form1'>
      <div className='form1-header'>
        <i className='bx bx-store-alt'></i>
        <h1>Login to start Shopping</h1>
      </div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder='Email'
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className='error'>{errors.email}</p>}
        <input
          type="password"
          placeholder='Password'
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <p className='error'>{errors.password}</p>}
        <button type="submit">Continue</button>
      </form>
      <p>Don't have an account? <Link to='/register' className='link'>Register</Link></p>
    </div>
  );
};

export default Login;