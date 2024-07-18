import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
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
    console.log('Form submitted:', formData);
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