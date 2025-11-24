import React, { useState, useEffect } from 'react';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-notice';
import '../../styles/clientStyles/hero.css';

export default function Hero({ setPage }) {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigateToEvents = () => {
    setShowNotification(false);
    sessionStorage.setItem('openEventsTab', 'true');
    if (setPage) {
      setPage('services');
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 64;
      const targetPosition = section.offsetTop - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleGetStarted = () => {
    scrollToSection('home-arcgis-section');
  };

  const handleLearnMore = () => {
    scrollToSection('home-capabilities-section');
  };

  return (
    <section className="gis-hero-section">
      <video 
        className="gis-video-background" 
        autoPlay 
        muted 
        loop 
        playsInline
        preload="metadata"
      >
        <source 
          src="https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-online/assets/arcgis-online-banner.mp4" 
          type="video/mp4" 
        />
      </video>
      
      <div className="gis-hero-container">
        <div className="gis-hero-content">
          <div className="gis-hero-text">
            <div className="gis-hero-logo-wrapper">
              <img 
                src="/assets/logoGIS.png" 
                alt="GIS Solutions Logo" 
                className="gis-hero-logo-main"
              />
            </div>
            <h1 className="gis-hero-title">
              GIS Solutions
              <br />
              (Private) Limited
            </h1>
            <p className="gis-hero-subtitle">
              Transforming data into actionable insights with cutting-edge geographic intelligence and spatial analysis solutions
            </p>
            <div className="gis-hero-actions">
              <calcite-button 
                appearance="solid" 
                kind="brand" 
                scale="l"
                onClick={handleGetStarted}
              >
                Get Started
              </calcite-button>
              <calcite-button 
                appearance="outline" 
                kind="neutral" 
                scale="l"
                onClick={handleLearnMore}
              >
                Learn More
              </calcite-button>
            </div>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="event-notification-popup">
          <div className="event-notification-content">
            <button 
              className="event-notification-close"
              onClick={() => setShowNotification(false)}
              aria-label="Close notification"
            >
              <calcite-icon icon="x" scale="s"></calcite-icon>
            </button>
            
            <div className="event-notification-grid">
              <div className="event-notification-image">
                <img 
                  src="/assets/storymap.jpeg" 
                  alt="GIS Day 2025 Event"
                  onError={(e) => {
                    e.target.src = "https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-storymaps/assets/arcgis-storymaps.jpg";
                  }}
                />
              </div>

              <div className="event-notification-text">
                <div className="event-notification-header">
                  <calcite-icon icon="まつり" scale="s"></calcite-icon>
                  <span className="event-notification-badge">Upcoming Event</span>
                </div>
                
                <h3 className="event-notification-title">
                  GIS Day 2025 Celebration
                </h3>
                
                <p className="event-notification-description">
                  Join our StoryMaps Competition & Online Webinar celebrating the beauty of Sri Lanka!
                </p>

                <div className="event-notification-details">
                  <div className="event-detail-item">
                    <calcite-icon icon="calendar" scale="s"></calcite-icon>
                    <span>November 19, 2025</span>
                  </div>
                  <div className="event-detail-item">
                    <calcite-icon icon="award" scale="s"></calcite-icon>
                    <span>Win Exciting Prizes</span>
                  </div>
                </div>

                <div className="event-notification-actions">
                  <calcite-button
                    appearance="solid"
                    kind="brand"
                    scale="s"
                    icon-end="arrow-right"
                    onClick={handleNavigateToEvents}
                  >
                    View Event Details
                  </calcite-button>
                  <calcite-button
                    appearance="outline"
                    kind="brand"
                    scale="s"
                    icon-end="launch"
                    onClick={() => window.open('https://arcg.is/0DvGT4', '_blank')}
                  >
                    Register Now
                  </calcite-button>
                  <calcite-button
                    appearance="outline"
                    kind="neutral"
                    scale="s"
                    icon-end="launch"
                    onClick={() => window.open('https://storymaps.gislk.com/', '_blank')}
                  >
                    Competition Website
                  </calcite-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}