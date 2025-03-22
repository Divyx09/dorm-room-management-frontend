import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Mock password reset logic
    try {
      // In a real app, this would make an API call
      // For now, we'll just simulate success
      setIsSubmitted(true);
    } catch (error) {
      // eslint-disable-line no-unused-vars
      console.log(error);
      setError("Failed to send reset email");
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
                  <h1 className='h3'>Reset Password</h1>
                  <p className='text-muted'>
                    Enter your email address to reset your password
                  </p>
                </div>

                {error && (
                  <div className='alert alert-danger' role='alert'>
                    {error}
                  </div>
                )}

                {isSubmitted ? (
                  <div className='text-center'>
                    <div className='alert alert-success' role='alert'>
                      If an account exists with {email}, you will receive
                      password reset instructions.
                    </div>
                    <Link to='/auth/login' className='btn btn-primary'>
                      Return to Login
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                      <label htmlFor='email' className='form-label'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type='submit'
                      className='btn btn-primary w-100 mb-3'
                    >
                      Send Reset Link
                    </button>

                    <div className='text-center'>
                      <p className='mb-0'>
                        Remember your password?{" "}
                        <Link
                          to='/auth/login'
                          className='text-primary text-decoration-none'
                        >
                          Login
                        </Link>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
