import React, { useState } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';

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

  return (
    <div style={{ background: '#fff' }}>
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
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(2.5rem, 5vw, 5rem) clamp(1rem, 3vw, 2rem)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(2rem, 4vw, 4rem)',
          marginBottom: 'clamp(3rem, 5vw, 5rem)'
        }}>
          {/* Contact Information */}
          <div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '400',
              color: '#2b2b2b',
              marginBottom: '2rem'
            }}>
              Contact Information
            </h2>

            {/* Company Info */}
            <div style={{
              background: '#f8f9fa',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                fontWeight: '600',
                color: '#2b2b2b',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <calcite-icon icon="map-pin" scale="m" style={{ color: '#2d5f8d' }} />
                Head Office
              </h3>
              <p style={{
                fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                color: '#555',
                lineHeight: '1.8',
                marginBottom: '1rem'
              }}>
                <strong>GIS Solutions (Pvt) Ltd</strong><br />
                370 Galle - Colombo Rd, 
                <br />
                Colombo 00300
              </p>
              <calcite-button
                appearance="outline"
                icon-start="pin"
                scale="s"
                width="full"
                style={{
                  '--calcite-button-text-color': '#2d5f8d',
                  '--calcite-button-border-color': '#2d5f8d'
                }}
              >
                Get Directions
              </calcite-button>
            </div>

            {/* Phone & Fax */}
            <div style={{
              background: '#f8f9fa',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                fontWeight: '600',
                color: '#2b2b2b',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <calcite-icon icon="phone" scale="m" style={{ color: '#2d5f8d' }} />
                Phone & Fax
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>Hotline</p>
                  <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: '#2d5f8d', fontWeight: '600' }}>+0112 575 297</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>Mobile</p>
                  <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: '#2d5f8d', fontWeight: '600' }}>+94 77 525 5133</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div style={{
              background: '#f8f9fa',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                fontWeight: '600',
                color: '#2b2b2b',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <calcite-icon icon="clock" scale="m" style={{ color: '#2d5f8d' }} />
                Business Hours
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: 'clamp(0.875rem, 1.5vw, 0.95rem)',
                color: '#555'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <span style={{ fontWeight: '500' }}>Monday - Friday</span>
                  <span>8:30 AM - 5:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <span style={{ fontWeight: '500' }}>Saturday</span>
                  <span>8:30 AM - 1:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <span style={{ fontWeight: '500' }}>Sunday</span>
                  <span style={{ color: '#999' }}>Closed</span>
                </div>
              </div>
            </div>

            {/* Website */}
            <div style={{
              background: '#f8f9fa',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              borderRadius: '8px'
            }}>
              <h3 style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                fontWeight: '600',
                color: '#2b2b2b',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <calcite-icon icon="link" scale="m" style={{ color: '#2d5f8d' }} />
                Website
              </h3>
              <a 
                href="https://www.gislk.com" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                  color: '#2d5f8d',
                  textDecoration: 'none',
                  fontWeight: '600',
                  wordBreak: 'break-all'
                }}
              >
                www.gislk.com
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '400',
              color: '#2b2b2b',
              marginBottom: '1.5rem'
            }}>
              Send us a Message
            </h2>
            <p style={{
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              color: '#666',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Fill out the form below and our team will get back to you within 24 hours
            </p>

            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <calcite-label>
                  Full Name *
                  <calcite-input-text 
                    placeholder="John Doe" 
                    required
                    scale="l"
                  />
                </calcite-label>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
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

              <div style={{ marginBottom: '1.5rem' }}>
                <calcite-label>
                  Company Name
                  <calcite-input-text 
                    placeholder="Your Company" 
                    scale="l"
                  />
                </calcite-label>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
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

              <div style={{ marginBottom: '2rem' }}>
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
        <div style={{
          background: '#f8f9fa',
          padding: 'clamp(2rem, 4vw, 3rem)',
          borderRadius: '8px',
          marginBottom: 'clamp(2rem, 3vw, 3rem)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '400',
            color: '#2b2b2b',
            marginBottom: '2.5rem',
            textAlign: 'center'
          }}>
            Departmental Contacts
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)'
          }}>
            {[
              { icon: 'wrench', dept: 'Technical Support', email: 'support@gislk.com', desc: 'Technical assistance and troubleshooting' },
              { icon: 'organization', dept: 'Media & PR', email: 'info@gislk.com', desc: 'Press inquiries and media relations' }
            ].map((contact, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '1px solid #e0e0e0',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: 'clamp(50px, 10vw, 60px)',
                  height: 'clamp(50px, 10vw, 60px)',
                  background: '#e8f1f8',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <calcite-icon 
                    icon={contact.icon} 
                    scale="m"
                    style={{ color: '#2d5f8d' }}
                  />
                </div>
                <h3 style={{
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                  fontWeight: '600',
                  color: '#2b2b2b',
                  marginBottom: '0.5rem'
                }}>
                  {contact.dept}
                </h3>
                <p style={{
                  fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)',
                  color: '#666',
                  marginBottom: '1rem'
                }}>
                  {contact.desc}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  style={{
                    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                    color: '#2d5f8d',
                    textDecoration: 'none',
                    fontWeight: '600',
                    wordBreak: 'break-all'
                  }}
                >
                  {contact.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div style={{
          textAlign: 'center',
          padding: 'clamp(2rem, 4vw, 3rem)',
          background: '#fff',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '400',
            color: '#2b2b2b',
            marginBottom: '1.5rem'
          }}>
            Connect With Us
          </h2>
          <p style={{
            fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
            color: '#666',
            marginBottom: '2rem'
          }}>
            Follow us on social media for updates, insights, and GIS resources
          </p>

          <div style={{
            display: 'flex',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[
              { icon: 'organization', name: 'LinkedIn', color: '#0077b5', url: 'https://linkedin.com' },
              { icon: 'share', name: 'Facebook', color: '#1877f2', url: 'https://facebook.com' },
              { icon: 'twitter', name: 'Twitter', color: '#1da1f2', url: 'https://twitter.com' },
              { icon: 'camera', name: 'Instagram', color: '#e4405f', url: 'https://instagram.com' },
              { icon: 'video', name: 'YouTube', color: '#ff0000', url: 'https://youtube.com' }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 'clamp(50px, 10vw, 60px)',
                  height: 'clamp(50px, 10vw, 60px)',
                  background: '#f8f9fa',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = social.color;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 8px 20px ${social.color}40`;
                  e.currentTarget.querySelector('calcite-icon').style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.querySelector('calcite-icon').style.color = social.color;
                }}
              >
                <calcite-icon 
                  icon={social.icon} 
                  scale="m"
                  style={{ 
                    color: social.color,
                    transition: 'color 0.3s ease'
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div style={{
        height: 'clamp(300px, 50vh, 450px)',
        background: '#e0e0e0',
        position: 'relative'
      }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31685.987654321!2d79.8612!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7f0!2sColombo!5e0!3m2!1sen!2slk!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="GIS Solutions Location"
        />
      </div>
    </div>
  );
}