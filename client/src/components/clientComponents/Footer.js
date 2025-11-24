import React from 'react';
import { FaGlobe, FaEnvelope, FaLinkedin, FaFacebook } from 'react-icons/fa';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-input';
import '../../styles/clientStyles/footer.css';

export default function Footer({ setPage }) {
  const handleNavClick = (page) => {
    if (setPage) {
      setPage(page);
      window.scrollTo(0, 0);
    }
  };

  const iconLinkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    color: '#ffffff',
    fontSize: '20px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  };

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="footer-logo">
              <img 
                src="/assets/logoGIS.png" 
                alt="GIS Solutions Logo" 
                className="logo-image"
                style={{maxWidth: '60px'}}
              />
              <h3>GIS Solutions</h3>
            </div>

            <p className="footer-description">
              Professional Geographic Information Systems solutions powered by Esri technology. 
              Transforming spatial data into strategic intelligence.
            </p>
            <div className="social-links" style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <a 
                href="https://www.gissolutions.lk" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Visit Website"
                style={iconLinkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <FaGlobe />
              </a>
              <a 
                href="mailto:info@gissolutions.lk"
                title="Email Us"
                style={iconLinkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <FaEnvelope />
              </a>
              <a 
                href="https://www.linkedin.com/company/gis-solutions-pvt-ltd/" 
                target="_blank" 
                rel="noopener noreferrer"
                title="LinkedIn"
                style={iconLinkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://www.facebook.com/GISSolutionsSriLanka" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Facebook"
                style={iconLinkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <FaFacebook />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="https://www.esri.com/en-us/arcgis/products/arcgis-online/overview" target="_blank" rel="noopener noreferrer">GIS Mapping</a></li>
              <li><a href="https://www.esri.com/en-us/arcgis/products/arcgis-spatial-analyst/overview" target="_blank" rel="noopener noreferrer">Spatial Analysis</a></li>
              <li><a href="https://www.esri.com/en-us/capabilities/imagery-remote-sensing/overview" target="_blank" rel="noopener noreferrer">Remote Sensing</a></li>
              <li><a href="https://www.esri.com/en-us/arcgis/products/arcgis-solutions/overview" target="_blank" rel="noopener noreferrer">GIS Consulting</a></li>
              <li><a href="https://www.esri.com/en-us/arcgis/products/develop-with-arcgis/overview" target="_blank" rel="noopener noreferrer">Custom Development</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Solutions</h4>
            <ul className="footer-links">
              <li><a href="https://www.esri.com/en-us/industries/government/segments/urban-and-regional-planning" target="_blank" rel="noopener noreferrer">Urban Planning</a></li>
              <li><a href="https://www.esri.com/en-us/industries/agriculture" target="_blank" rel="noopener noreferrer">Agriculture</a></li>
              <li><a href="https://www.esri.com/en-us/industries/environment-conservation" target="_blank" rel="noopener noreferrer">Environmental</a></li>
              <li><a href="https://www.esri.com/en-us/industries/transportation" target="_blank" rel="noopener noreferrer">Transportation</a></li>
              <li><a href="https://www.esri.com/en-us/industries/electric-gas" target="_blank" rel="noopener noreferrer">Utilities</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}>Projects</a></li>
              <li><a href="https://www.esri.com/en-us/about/careers/overview" target="_blank" rel="noopener noreferrer">Careers at Esri</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a></li>
              <li><a href="https://www.esri.com/en-us/about/newsroom/blog" target="_blank" rel="noopener noreferrer">Esri Blog</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Subscribe to get the latest GIS insights and updates</p>
            <div className="newsletter-form">
              <calcite-input 
                type="email" 
                placeholder="Enter your email"
                scale="s"
              ></calcite-input>
              <calcite-button 
                appearance="solid" 
                kind="brand"
                scale="s"
                width="full"
                style={{marginTop: '8px'}}
              >
                Subscribe
              </calcite-button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 GIS Solutions Pvt Ltd. All rights reserved. Powered by Esri Technology.</p>
          <div className="footer-bottom-links">
            <a href="https://www.esri.com/en-us/privacy/overview" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <span>•</span>
            <a href="https://www.esri.com/en-us/legal/terms/full-master-agreement" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            <span>•</span>
            <a href="https://www.esri.com/en-us/privacy/cookies" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}