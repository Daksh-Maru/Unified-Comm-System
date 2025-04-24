import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Help.css';
import Navbar from '../components/Navbar';

function HelpSupport() {
    const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowAlert(true);
        // Optional: clear form
        setFormData({ name: '', email: '', message: '' });

        // Hide alert after 5 seconds
        setTimeout(() => setShowAlert(false), 5000);
    };

    return (
        <div>
            <Navbar />

            <section className="hero-section">
                <div className="container">
                    <h1 className="display-4">Help & Support</h1>
                    <p className="lead">Find answers to your questions or contact us for further assistance.</p>
                </div>
            </section>

            <section className="container">
                <div className="section-box">
                    <h3 className="text-center">Frequently Asked Questions (FAQs)</h3>
                    <div className="faq-item">
                        <h5>1. How do I reset my password?</h5>
                        <p>To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions to receive a reset link via email.</p>
                    </div>
                    <div className="faq-item">
                        <h5>2. How can I change my email address?</h5>
                        <p>You can update your email address by going to the 'Account Settings' section under your profile settings.</p>
                    </div>
                    <div className="faq-item">
                        <h5>3. How do I contact support?</h5>
                        <p>You can contact support through the 'Contact Us' form below or reach out to our support email at support@ucp.com.</p>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="section-box">
                    <h3 className="text-center">Submit a Query</h3>

                    {showAlert && (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            Your query has been accepted. We will reach out to you shortly!
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(false)}></button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Your Message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                rows="4"
                                placeholder="Enter your query or message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-3">Submit Query</button>
                    </form>
                </div>
            </section>

            <section className="container">
                <div className="section-box">
                    <h3 className="text-center">Further Contact Information</h3>
                    <p>If you require immediate assistance or have urgent matters to discuss, feel free to contact us directly via the following methods:</p>
                    <ul>
                        <li>Email: <a href="mailto:support@ucp.com">support@ucp.com</a></li>
                        <li>Phone: +1 800 123 4567</li>
                        <li>Address: 123 Business Avenue, Suite 100, City, Country</li>
                    </ul>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <p>&copy; 2025 Unified Communication Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default HelpSupport;
