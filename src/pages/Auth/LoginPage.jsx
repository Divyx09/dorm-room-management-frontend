import { useState } from 'react';
import { Link } from 'react-router-dom';
const LoginPage = () => {  const [formData, setFormData] = useState({
    email: '',    password: '',
  });
  const handleChange = (e) => {    const { name, value } = e.target;
    setFormData(prevState => ({      ...prevState,
      [name]: value    }));
  };
  const handleSubmit = (e) => {    e.preventDefault();
    // Handle login logic here    console.log('Login form submitted:', formData);
  };
  return (    <div className="login-page py-5">
      <div className="container">        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">            <div className="card shadow-sm">
              <div className="card-body p-4">                <div className="text-center mb-4">
                  <h1 className="h3">Welcome Back!</h1>                  <p className="text-muted">Please login to your account</p>
                </div>
                <form onSubmit={handleSubmit}>                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">                      Email address
                    </label>                    <input
                      type="email"                      className="form-control"
                      id="email"                      name="email"
                      value={formData.email}                      onChange={handleChange}
                      placeholder="Enter your email"                      required
                    />                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">                      Password
                    </label>                    <input
                      type="password"                      className="form-control"
                      id="password"                      name="password"
                      value={formData.password}                      onChange={handleChange}
                      placeholder="Enter your password"                      required
                    />                  </div>
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <div className="form-check">                      <input
                        type="checkbox"                        className="form-check-input"
                        id="remember"                      />
                      <label className="form-check-label" htmlFor="remember">                        Remember me
                      </label>                    </div>
                    <Link to="/forgot-password" className="text-primary text-decoration-none">
                      Forgot Password?
                    </Link>                  </div>
                  <button
                    type="submit"                    className="btn btn-primary w-100 mb-3"
                  >                    Login
                  </button>
                  <div className="text-center">                    <p className="mb-0">
                      Don't have an account?{' '}                      <Link to="/signup" className="text-primary text-decoration-none">
                        Sign Up                      </Link>
                    </p>                  </div>
                </form>              </div>
            </div>          </div>
        </div>      </div>
    </div>  );
};

export default LoginPage;
