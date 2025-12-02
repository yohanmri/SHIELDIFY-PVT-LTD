import React, { useState, useEffect } from 'react';
import '@esri/calcite-components/components/calcite-button';
import '../../styles/clientStyles/hero.css';
import { useNavigate } from 'react-router-dom';
export default function Hero({ setPage }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
const navigate = useNavigate();


  const handleClick = (e) => {
    e.preventDefault();
    navigate('/products');
    
    // Wait a tick for the new page to render
    setTimeout(() => {
      const element = document.getElementById('products-top');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50); // 50ms delay
  };
  const videos = [
    '/assets/videos/helmet-puton.mp4',
    '/assets/videos/jacket-puton.mp4',
    // Add more videos here as needed
  ];

  useEffect(() => {
    const videoElement = document.getElementById('hero-video');
    if (!videoElement) return;

    const handleVideoEnd = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        setIsTransitioning(false);
      }, 500);
    };

    const handleCanPlay = () => {
      videoElement.play().catch(err => console.log('Video play error:', err));
    };

    videoElement.addEventListener('ended', handleVideoEnd);
    videoElement.addEventListener('canplay', handleCanPlay);
    
    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
      videoElement.removeEventListener('canplay', handleCanPlay);
    };
  }, [videos.length, currentVideoIndex]);

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

  return (
    <section className="gis-hero-section">
      {/* Background Video */}
      <div className={`gis-hero-bg-video ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        <video 
          id="hero-video"
          key={currentVideoIndex}
          autoPlay 
          muted 
          playsInline
          preload="metadata"
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="gis-hero-container">
        <div className="gis-hero-content">
          {/* Left Content */}
          <div className="gis-hero-left">
            <h1 className="gis-hero-title">
              Advancing the power of safety equipment
            </h1>
            <p className="gis-hero-subtitle">
              For business, government, and society
            </p>
            <div className="gis-hero-actions">
              <calcite-button 
                appearance="outline-fill" 
                kind="inverse" 
                scale="l"
                icon-end="play"
                onClick={handleClick}
              >
                Explore Products
              </calcite-button>
            </div>
          </div>

          {/* Right Content - Logo Frame */}
          <div className="gis-hero-right">
            <div className="gis-hero-frame">
              <div className="frame-border frame-top-left"></div>
              <div className="frame-border frame-top-right"></div>
              <div className="frame-border frame-bottom-left"></div>
              <div className="frame-border frame-bottom-right"></div>
              
              <div className="gis-hero-logo-container">
                <img 
                  src="/assets/images/picture-logo.png" 
                  alt="Shieldify Logo" 
                  className="gis-hero-frame-logo"
                />
                <h2 className="gis-hero-logo-text">SHIELDIFY</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right Company Badge */}
        {/* <div className="gis-hero-company-badge">
          <span className="company-badge-text">SHIELDIFY (Pvt) Ltd.</span>
        </div> */}
      </div>
    </section>
  );
}