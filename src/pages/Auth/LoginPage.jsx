import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Mock user data - In real app, this would come from your backend
    const mockUsers = [
      { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin User' },
      { id: 2, email: 'user@example.com', password: 'user123', role: 'user', name: 'Regular User' },
    ];

    const user = mockUsers.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      const userData = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      };
      
      // Login the user
      login(userData);

      // Get the redirect path from location state or use default based on role
      const from = location.state?.from?.pathname || (user.role === 'admin' ? '/admin' : '/dashboard/tasks');
      navigate(from, { replace: true });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className='login-page py-5'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6 col-lg-5'>
            <div className='card shadow-sm'>
              <div className='card-body p-4'>
                <div className='text-center mb-4'>
                  <h1 className='h3'>Welcome Back</h1>
                  <p className='text-muted'>Sign in to continue to DormMate</p>
                </div>

                {error && (
                  <div className='alert alert-danger' role='alert'>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                      Email address
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                      Password
                    </label>
                    <input
                      type='password'
                      className='form-control'
                      id='password'
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className='d-flex justify-content-between align-items-center mb-3'>
                    <div className='form-check'>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        id='remember'
                      />
                      <label className='form-check-label' htmlFor='remember'>
                        Remember me
                      </label>
                    </div>
                    <Link to='/auth/forgot-password' className='text-primary text-decoration-none'>
                      Forgot Password?
                    </Link>
                  </div>

                  <button type='submit' className='btn btn-primary w-100 mb-3'>
                    Login
                  </button>

                  <div className='text-center'>
                    <p className='mb-0'>
                      Don't have an account?{' '}
                      <Link to='/auth/signup' className='text-primary text-decoration-none'>
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
