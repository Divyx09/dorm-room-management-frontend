import { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup form submitted:", formData);
  };

  return (
    <div className='login-page py-5'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6 col-lg-5'>
            <div className='card shadow-sm'>
              <div className='card-body p-4'>
                <div className='text-center mb-4'>
                  <h1 className='h3'>Create Account</h1>
                  <p className='text-muted'>Join DormMate today</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-md-6 mb-3'>
                      <label htmlFor='firstName' className='form-label'>
                        First Name
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='firstName'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder='Enter first name'
                        required
                      />
                    </div>
                    <div className='col-md-6 mb-3'>
                      <label htmlFor='lastName' className='form-label'>
                        Last Name
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='lastName'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder='Enter last name'
                        required
                      />
                    </div>
                  </div>

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
                      placeholder='Enter your email'
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
                      placeholder='Create password'
                      required
                    />
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='confirmPassword' className='form-label'>
                      Confirm Password
                    </label>
                    <input
                      type='password'
                      className='form-control'
                      id='confirmPassword'
                      name='confirmPassword'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder='Confirm password'
                      required
                    />
                  </div>

                  <div className='mb-3'>
                    <div className='form-check'>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        id='terms'
                        required
                      />
                      <label className='form-check-label' htmlFor='terms'>
                        I agree to the{" "}
                        <Link to='/terms' className='text-primary'>
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to='/privacy' className='text-primary'>
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  <button type='submit' className='btn btn-primary w-100 mb-3'>
                    Sign Up
                  </button>

                  <div className='text-center'>
                    <p className='mb-0'>
                      Already have an account?{" "}
                      <Link
                        to='/login'
                        className='text-primary text-decoration-none'
                      >
                        Login
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

export default SignupPage;
