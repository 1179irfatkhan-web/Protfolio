import React, { useState } from 'react';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiMessageSquare,
  FiCheckCircle,
  FiCalendar,
  FiClock,
  FiAlertCircle,
  FiXCircle
} from 'react-icons/fi';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { personalInfo, education, interests } from '../data';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Saving message to Firebase...');

      // Save message to Firebase Firestore
      const docRef = await addDoc(collection(db, 'messages'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'No Subject',
        message: formData.message,
        timestamp: serverTimestamp(),
        read: false,
        status: 'new',
        date: new Date().toISOString(),
        ip: 'unknown' // You can add IP tracking later
      });

      console.log('Message saved with ID: ', docRef.id);

      // Success - show success message
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('Error saving message:', error);

      // Show user-friendly error messages
      if (error.code === 'permission-denied') {
        setError('Database permission denied. Please check Firebase rules.');
      } else if (error.code === 'unavailable') {
        setError('Network error. Please check your internet connection.');
      } else {
        setError(`Failed to send message: ${error.message}`);
      }

      // Fallback: Save to localStorage if Firebase fails
      saveToLocalStorage(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fallback function to save messages locally
  const saveToLocalStorage = (data) => {
    try {
      const savedMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      savedMessages.push({
        ...data,
        id: Date.now(),
        date: new Date().toISOString(),
        savedLocally: true
      });
      localStorage.setItem('portfolio_messages', JSON.stringify(savedMessages));

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (localError) {
      console.error('Local storage error:', localError);
      setError('Failed to save message. Please email me directly at: ' + personalInfo.email);
    }
  };

  const contactMethods = [
    {
      icon: <FiPhone />,
      title: 'Phone',
      value: personalInfo.phone,
      action: 'tel:' + personalInfo.phone
    },
    {
      icon: <FiMail />,
      title: 'Email',
      value: personalInfo.email,
      action: 'mailto:' + personalInfo.email
    },
    {
      icon: <FiMapPin />,
      title: 'Location',
      value: personalInfo.location,
      action: 'https://maps.google.com/?q=' + encodeURIComponent(personalInfo.location)
    }
  ];

  const availability = [
    { day: 'Mon - Fri', time: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', time: 'Available for urgent projects' }
  ];

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-title">
          <h2>Get In Touch</h2>
          <p>Let's discuss your project or opportunity</p>
        </div>

        <div className="contact-container">
          {/* Contact Information Card */}
          <div className="contact-card fade-in">
            <h3>Contact Information</h3>

            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="contact-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-icon">
                  {method.icon}
                </div>
                <div className="contact-content">
                  <h4>{method.title}</h4>
                  <p>{method.value}</p>
                </div>
              </a>
            ))}

            <div className="availability-section">
              <h4>
                <FiClock />
                Availability
              </h4>
              <div className="availability-grid">
                {availability.map((slot, index) => (
                  <div key={index} className="availability-slot">
                    <span className="slot-day">{slot.day}</span>
                    <span className="slot-time">{slot.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="social-section">
              <h4>Connect With Me</h4>
              <div className="social-links">
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FiGithub />
                </a>
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />
                </a>
                <a
                  href={personalInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FiInstagram />
                </a>
                <a
                  href={personalInfo.socialLinks.email}
                  aria-label="Email"
                >
                  <FiMail />
                </a>
              </div>
            </div>
          </div>

          {/* Education & Interests Card */}
          <div className="contact-card fade-in">
            <h3>Education</h3>

            <div className="education-card">
              <div className="education-icon">
                <FiMessageSquare />
              </div>
              <div className="education-content">
                <h4>{education.degree}</h4>
                <p className="institution">{education.institution}</p>
                <p className="university">{education.university}</p>
                <div className="education-duration">
                  <FiCalendar />
                  {education.duration}
                </div>
              </div>
            </div>

            <div className="interests-section">
              <h3>Interests</h3>
              <div className="interests-grid">
                {interests.map((interest, index) => (
                  <div key={index} className="interest-item">
                    {interest}
                  </div>
                ))}
              </div>
            </div>

            <div className="quick-links">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <a
                  href={personalInfo.cvLink}
                  download
                  className="action-btn"
                >
                  <FiCheckCircle />
                  Download CV
                </a>
                <a
                  href="/admin"
                  className="action-btn"
                >
                  <FiMessageSquare />
                  View Messages
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-container fade-in">
          <div className="contact-form-card">
            <h3>
              <FiSend />
              Send me a message
            </h3>

            {isSubmitted ? (
              <div className="success-message">
                <FiCheckCircle />
                <h4>Message Sent Successfully!</h4>
                <p>Thank you for your message. I'll get back to you within 24 hours.</p>
                <p className="success-note">
                  <FiMessageSquare />
                  Your message has been saved.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {error && (
                  <div className="error-message">
                    <FiAlertCircle />
                    <div className="error-content">
                      <strong>Error:</strong> {error}
                      <button
                        type="button"
                        className="error-close"
                        onClick={() => setError('')}
                      >
                        <FiXCircle />
                      </button>
                    </div>
                  </div>
                )}

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows="6"
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Send Message
                    </>
                  )}
                </button>

                <div className="form-note">
                  <small>
                    <FiClock /> Messages are stored securely in Firebase
                  </small>
                </div>
              </form>
            )}
          </div>

          <div className="response-info">
            <div className="response-card">
              <div className="response-icon">
                <FiClock />
              </div>
              <div className="response-content">
                <h4>Response Time</h4>
                <p>Typically responds within 24 hours</p>
              </div>
            </div>

            <div className="response-card">
              <div className="response-icon">
                <FiCheckCircle />
              </div>
              <div className="response-content">
                <h4>Privacy</h4>
                <p>Your information is secure and private</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;