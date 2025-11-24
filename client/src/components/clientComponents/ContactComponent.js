import React, { useState } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '../../styles/clientStyles/contactComponent.css';

export default function ContactComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const departmentalContacts = [
    { 
      icon: 'wrench', 
      dept: 'Technical Support', 
      email: 'support@gislk.com', 
      desc: 'Technical assistance and troubleshooting' 
    },
    { 
      icon: 'organization', 
      dept: 'Media & PR', 
      email: 'info@gislk.com', 
      desc: 'Press inquiries and media relations' 
    }
  ];

  const socialLinks = [
    { 
      icon: 'organization', 
      name: 'LinkedIn', 
      color: '#0077b5', 
      url: 'https://lk.linkedin.com/company/gis-solutions-pvt-ltd'
    },
    { 
      icon: 'share', 
      name: 'Facebook', 
      color: '#1877f2', 
      url: 'https://www.facebook.com/GISSolutions370/'
    },
    { 
      icon: 'organization', 
      name: 'Email', 
      color: '#2d5f8d', 
      url: 'mailto:info@gislk.com'
    }
  ];

  return (
    <div className="contact-container">
         {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: 'clamp(250px, 40vh, 400px)',
        background: 'linear-gradient(135deg, #2d5f8d 0%, #1e4a6f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }} />
        
        <div style={{
          position: 'relative',
          textAlign: 'center',
          color: '#fff',
          maxWidth: '900px',
          padding: '0 2rem'
        }}>
          <calcite-icon icon="email" scale="l" style={{ marginBottom: '1rem' }} />
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: '300',
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            Get In Touch
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            opacity: 0.95,
            fontWeight: '300'
          }}>
            Ready to transform your spatial data? Let's discuss your GIS needs
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-main">
        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info-section">
            <h2>Contact Information</h2>

            {/* Company Info */}
            <div className="info-card">
              <h3 className="info-card-title">
                <calcite-icon icon="map-pin" scale="m" />
                Head Office
              </h3>
              <p className="info-card-content">
                <strong>GIS Solutions (Pvt) Ltd</strong><br />
                370 Galle - Colombo Rd,<br />
                Colombo 00300
              </p>
              <calcite-button
                appearance="outline"
                icon-start="pin"
                scale="s"
                width="full"
                href="https://maps.app.goo.gl/example"
                target="_blank"
                style={{
                  '--calcite-button-text-color': '#2d5f8d',
                  '--calcite-button-border-color': '#2d5f8d'
                }}
              >
                Get Directions
              </calcite-button>
            </div>

            {/* Phone & Fax */}
            <div className="info-card">
              <h3 className="info-card-title">
                <calcite-icon icon="phone" scale="m" />
                Phone & Fax
              </h3>
              <div className="phone-info">
                <div className="phone-item">
                  <p className="phone-label">Hotline</p>
                  <p className="phone-number">+0112 575 297</p>
                </div>
                <div className="phone-item">
                  <p className="phone-label">Mobile</p>
                  <p className="phone-number">+94 77 525 5133</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="info-card">
              <h3 className="info-card-title">
                <calcite-icon icon="clock" scale="m" />
                Business Hours
              </h3>
              <div className="business-hours">
                <div className="hours-row">
                  <span className="hours-day">Monday - Friday</span>
                  <span>8:30 AM - 5:00 PM</span>
                </div>
                <div className="hours-row">
                  <span className="hours-day">Saturday</span>
                  <span>8:30 AM - 1:00 PM</span>
                </div>
                <div className="hours-row">
                  <span className="hours-day">Sunday</span>
                  <span className="hours-closed">Closed</span>
                </div>
              </div>
            </div>

            {/* Website */}
            <div className="info-card">
              <h3 className="info-card-title">
                <calcite-icon icon="link" scale="m" />
                Website
              </h3>
              <a 
                href="https://www.gislk.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="website-link"
              >
                www.gislk.com
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h2 className="form-title">
              Send us a Message
            </h2>
            <p className="form-description">
              Fill out the form below and our team will get back to you within 24 hours
            </p>

            <div>
              <div className="form-group">
                <calcite-label>
                  Full Name *
                  <calcite-input-text 
                    placeholder="John Doe" 
                    required
                    scale="l"
                  />
                </calcite-label>
              </div>

              <div className="form-group">
                <calcite-label>
                  Email Address *
                  <calcite-input-text 
                    type="email"
                    placeholder="john@example.com" 
                    required
                    scale="l"
                  />
                </calcite-label>
              </div>

              <div className="form-group">
                <calcite-label>
                  Company Name
                  <calcite-input-text 
                    placeholder="Your Company" 
                    scale="l"
                  />
                </calcite-label>
              </div>

              <div className="form-group">
                <calcite-label>
                  Service Interested In
                  <calcite-select scale="l">
                    <calcite-option label="Select a service">Select a service</calcite-option>
                    <calcite-option value="mapping">GIS Mapping & Cartography</calcite-option>
                    <calcite-option value="analysis">Spatial Analysis</calcite-option>
                    <calcite-option value="remote">Remote Sensing</calcite-option>
                    <calcite-option value="consulting">GIS Consulting</calcite-option>
                    <calcite-option value="development">Custom Development</calcite-option>
                    <calcite-option value="data">Data Management</calcite-option>
                    <calcite-option value="training">Training</calcite-option>
                    <calcite-option value="other">Other</calcite-option>
                  </calcite-select>
                </calcite-label>
              </div>

              <div className="form-group-large">
                <calcite-label>
                  Message *
                  <calcite-text-area 
                    placeholder="Tell us about your project requirements..."
                    rows="6"
                    required
                    scale="l"
                  />
                </calcite-label>
              </div>

              <calcite-button 
                onClick={handleSubmit}
                appearance="solid"
                width="full"
                scale="l"
                icon-end="send"
                style={{
                  '--calcite-button-background': '#2d5f8d'
                }}
              >
                Send Message
              </calcite-button>
            </div>
          </div>
        </div>

        {/* Departmental Contacts */}
        <div className="dept-contacts-section">
          <h2 className="dept-title">
            Departmental Contacts
          </h2>

          <div className="dept-grid">
            {departmentalContacts.map((contact, idx) => (
              <div key={idx} className="dept-card">
                <div className="dept-icon-wrapper">
                  <calcite-icon 
                    icon={contact.icon} 
                    scale="m"
                  />
                </div>
                <h3 className="dept-name">
                  {contact.dept}
                </h3>
                <p className="dept-description">
                  {contact.desc}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="dept-email"
                >
                  {contact.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="social-section">
          <h2 className="social-title">
            Connect With Us
          </h2>
          <p className="social-description">
            Follow us on social media for updates, insights, and GIS resources
          </p>

          <div className="social-links">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = social.color;
                  e.currentTarget.style.boxShadow = `0 8px 20px ${social.color}40`;
                  e.currentTarget.querySelector('calcite-icon').style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.querySelector('calcite-icon').style.color = social.color;
                }}
              >
                <calcite-icon 
                  icon={social.icon} 
                  scale="m"
                  style={{ 
                    color: social.color
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798654!2d79.8498!3d6.9027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596d3cb8b88d%3A0x1!2s370%20Galle%20Road%2C%20Colombo%2000300!5e0!3m2!1sen!2slk!4v1234567890"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          title="GIS Solutions Location"
        />
      </div>
    </div>
  );
}