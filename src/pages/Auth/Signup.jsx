import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Mock signup - In real app, this would be an API call
    try {
      const newUser = {
        id: Date.now(),
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        role: "user", // Default role for new signups
      };

      // Store in localStorage (mock database)
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({ ...newUser, password: formData.password });
      localStorage.setItem("users", JSON.stringify(users));

      // Log the user in
      login(newUser);
      navigate("/dashboard/tasks");
    } catch (err) {
      console.log(err);
      setError("Failed to create account");
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
                  <h1 className='h3'>Create Account</h1>
                  <p className='text-muted'>Join DormMate today</p>
                </div>

                {error && (
                  <div className='alert alert-danger' role='alert'>
                    {error}
                  </div>
                )}

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
                        required
                      />
                    </div>
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                      Email Address
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
                        to='/auth/login'
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
