import React, { useEffect, useRef } from 'react';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';

export default function HomeArcGIS() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay failed:', err);
      });
    }
  }, []);

  return (
    <section  id="home-arcgis-section"  className="hero-section">
      <div className="hero-video-container">
        <video
          ref={videoRef}
          className="hero-video"
          muted
          playsInline
          loop
          preload="metadata"
        >
          <source
            src="https://www.esri.com/content/dam/esrisites/en-us/arcgis/about-arcgis/images/about-arcgis-hero-video.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text-container">
          <h1 className="hero-title">What is ArcGIS?</h1>
          
          <div className="hero-description">
            <p>
              ArcGIS is a comprehensive geospatial platform for professionals and organizations. 
              It is the leading geographic information system (GIS) technology.
            </p>
            <p>
              Built by Esri, ArcGIS integrates and connects data through the context of geography. 
              It provides world-leading capabilities for creating, managing, analyzing, mapping, 
              and sharing all types of data.
            </p>
            <p>
              Organizations that use ArcGIS to understand and analyze their data in geographic 
              context have a distinct advantage and decision-making edge.
            </p>
          </div>

          <div className="hero-actions">
            <calcite-button appearance="solid" kind="brand" scale="l" onClick={() => window.open('https://www.esri.com/en-us/about/about-esri', '_blank')}>
              Learn about Esri
              <calcite-icon icon="arrow-right" slot="icon-end"></calcite-icon>
            </calcite-button>
            
            <calcite-button appearance="outline" kind="brand" scale="l" onClick={() => window.open('https://www.esri.com/en-us/arcgis/about-arcgis/overview', '_blank')}>
              Explore GIS
              <calcite-icon icon="arrow-right" slot="icon-end"></calcite-icon>
            </calcite-button>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
          background-color: #000;
        }

        .hero-video-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0.2) 100%
          );
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .hero-text-container {
          max-width: 600px;
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 300;
          color: #ffffff;
          margin: 0 0 2rem 0;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .hero-description {
          margin-bottom: 2.5rem;
        }

        .hero-description p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #e0e0e0;
          margin: 0 0 1.5rem 0;
          font-weight: 300;
        }

        .hero-description p:last-child {
          margin-bottom: 0;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        calcite-button {
          --calcite-button-padding-x-l: 2rem;
          --calcite-button-padding-y-l: 0.875rem;
        }

        calcite-button::part(button) {
          font-size: 1rem;
          font-weight: 400;
          transition: all 0.3s ease;
        }

        calcite-button[appearance="solid"]::part(button) {
          background-color: #007ac2;
          border-color: #007ac2;
        }

        calcite-button[appearance="solid"]:hover::part(button) {
          background-color: #005a8f;
          border-color: #005a8f;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 122, 194, 0.4);
        }

        calcite-button[appearance="outline"]::part(button) {
          border-color: #ffffff;
          color: #ffffff;
        }

        calcite-button[appearance="outline"]:hover::part(button) {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-description p {
            font-size: 1rem;
          }

          .hero-text-container {
            max-width: 100%;
          }

          .hero-actions {
            flex-direction: column;
          }

          calcite-button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-content {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}