import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Contact form submitted:", formData);
    setIsSubmitted(true);
  };

  return (
    <div className='contact-page'>
      {/* Hero Section */}
      <section className='hero-section text-center py-5 bg-light'>
        <div className='container'>
          <h1 className='display-4 fw-bold mb-4'>Contact Us</h1>
          <p className='lead mb-0'>
            Have questions? We're here to help and would love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className='contact-info py-5'>
        <div className='container'>
          <div className='row g-4 mb-5'>
            <div className='col-md-4'>
              <div className='contact-card text-center p-4 h-100 bg-white rounded-3 shadow-sm'>
                <i className='bi bi-geo-alt fs-1 text-primary mb-3'></i>
                <h3 className='h5'>Visit Us</h3>
                <p className='mb-0'>
                  123 Student Street, Campus Area
                  <br />
                  City, State 12345
                </p>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='contact-card text-center p-4 h-100 bg-white rounded-3 shadow-sm'>
                <i className='bi bi-envelope fs-1 text-primary mb-3'></i>
                <h3 className='h5'>Email Us</h3>
                <p className='mb-0'>
                  <a
                    href='mailto:contact@dormmate.com'
                    className='text-decoration-none'
                  >
                    contact@dormmate.com
                  </a>
                </p>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='contact-card text-center p-4 h-100 bg-white rounded-3 shadow-sm'>
                <i className='bi bi-telephone fs-1 text-primary mb-3'></i>
                <h3 className='h5'>Call Us</h3>
                <p className='mb-0'>
                  <a href='tel:+1234567890' className='text-decoration-none'>
                    +1 (234) 567-890
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='row justify-content-center'>
            <div className='col-lg-8'>
              <div className='card shadow-sm'>
                <div className='card-body p-4'>
                  {!isSubmitted ? (
                    <>
                      <h2 className='h4 text-center mb-4'>Send us a Message</h2>
                      <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                          <label htmlFor='name' className='form-label'>
                            Your Name
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
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
                          <label htmlFor='subject' className='form-label'>
                            Subject
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='subject'
                            name='subject'
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className='mb-4'>
                          <label htmlFor='message' className='form-label'>
                            Message
                          </label>
                          <textarea
                            className='form-control'
                            id='message'
                            name='message'
                            rows='5'
                            value={formData.message}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                        <div className='text-center'>
                          <button
                            type='submit'
                            className='btn btn-primary px-5'
                          >
                            Send Message
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div className='text-center py-4'>
                      <i className='bi bi-check-circle text-success fs-1 mb-3'></i>
                      <h3 className='h4 mb-3'>Thank You!</h3>
                      <p className='mb-0'>
                        We have received your message and will get back to you
                        soon.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
