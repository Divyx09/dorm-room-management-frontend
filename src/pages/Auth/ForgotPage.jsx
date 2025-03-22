import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
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

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                      <label htmlFor='email' className='form-label'>
                        Email address
                      </label>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
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
                          to='/login'
                          className='text-primary text-decoration-none'
                        >
                          Back to Login
                        </Link>
                      </p>
                    </div>
                  </form>
                ) : (
                  <div className='text-center'>
                    <div className='alert alert-success' role='alert'>
                      <i className='bi bi-check-circle me-2'></i>
                      Password reset link has been sent to your email address.
                    </div>
                    <p className='mb-0'>
                      Didn't receive the email?{" "}
                      <button
                        className='btn btn-link p-0 text-primary text-decoration-none'
                        onClick={() => setIsSubmitted(false)}
                      >
                        Try again
                      </button>
                    </p>
                  </div>
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
