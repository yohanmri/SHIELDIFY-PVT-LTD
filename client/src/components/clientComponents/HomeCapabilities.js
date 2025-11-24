import React from 'react';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';

export default function HomeCapabilities() {
  const capabilities = [
    {
      image: 'https://www.esri.com/content/dam/esrisites/en-us/arcgis/about-arcgis/images/about-arcgis-mts-cap-mapping.jpg',
      title: 'Mapping',
      description: 'Understand data in a new way by mapping and visualizing it in 2D, 3D, and real time. Leverage location services and advanced cartographic tools.'
    },
    {
      image: 'https://www.esri.com/content/dam/esrisites/en-us/arcgis/about-arcgis/images/about-arcgis-mts-cap-spatial-analytics.jpg',
      title: 'Spatial analytics',
      description: 'Perform spatial modeling and analysis with data from any source, enriched by geography. AI-infused workflows power advanced analytics.'
    },
    {
      image: 'https://www.esri.com/content/dam/esrisites/en-us/arcgis/about-arcgis/images/about-arcgis-mts-cap-field-ops.jpg',
      title: 'Field operations',
      description: 'Empower teams to work in disconnected environments. Streamline field data collection and workforce planning, routing, and management.'
    },
    {
      image: 'https://www.esri.com/content/dam/esrisites/en-us/arcgis/about-arcgis/images/about-arcgis-mts-cap-data-mgmt.jpg',
      title: 'Data management',
      description: 'Implement a reliable system of record for data editing, offline data management, and data sharing across an organization.'
    },
    {
      image: 'https://www.esri.com/content/dam/esrisites/en-us/arcgis/about-arcgis/images/about-arcgis-mts-cap-imagery-sensing.jpg',
      title: 'Imagery and remote sensing',
      description: 'Leverage an end-to-end system for imagery collection, management, and processing, enhanced by AI workflows.'
    }
  ];

  return (
    <section id="home-capabilities-section" className="capabilities-section">
      <div className="capabilities-background"></div>
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Geography-driven capabilities offer unique advantages</h2>
          <p className="section-description">
            ArcGIS provides capabilities for elevating business practices with geographic context. 
            Capabilities, data, and tools work together within ArcGIS to form insight-generating, 
            problem-solving systems.
          </p>
          <div className="header-cta">
            <calcite-button 
              appearance="outline" 
              kind="brand" 
              scale="m"
              icon-end="arrow-right"
              onClick={() => window.open('https://www.esri.com/en-us/arcgis/geospatial-platform/how-arcgis-works', '_blank')}
            >
              Learn how ArcGIS works
            </calcite-button>
          </div>
        </div>

        <div className="capabilities-grid">
          {capabilities.map((capability, index) => (
            <article 
              key={index} 
              className="capability-card"
              style={{ animationDelay: `${180 + (index % 3) * 42}ms` }}
            >
              <div className="capability-image">
                <img 
                  src={capability.image} 
                  alt={capability.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="capability-content">
                <h3 className="capability-title">{capability.title}</h3>
                <p className="capability-description">{capability.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="footer-cta">
          <calcite-button 
            appearance="outline" 
            kind="brand" 
            scale="m"
            icon-end="arrow-right"
            onClick={() => window.open('https://www.esri.com/en-us/arcgis/geospatial-platform/how-arcgis-works', '_blank')}
          >
            Learn how ArcGIS works
          </calcite-button>
        </div>
      </div>

      <style>{`
        .capabilities-section {
          position: relative;
          background-color: #151515;
          padding: 5rem 0;
          color: #ffffff;
          overflow: hidden;
        }

        .capabilities-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('https://www.esri.com/content/dam/esrisites/en-us/arcgis/about-arcgis/images/about-arcgis-backround-2.jpg');
          background-size: cover;
          background-position: center center;
          opacity: 0.3;
          z-index: 0;
        }

        .container {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 1.5rem 0;
          line-height: 1.3;
          letter-spacing: -0.02em;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-description {
          font-size: 1.15rem;
          color: #e0e0e0;
          font-weight: 300;
          max-width: 800px;
          margin: 0 auto 2rem auto;
          line-height: 1.7;
        }

        .header-cta {
          margin-top: 2rem;
        }

        .capabilities-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .capability-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out backwards;
          backdrop-filter: blur(10px);
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

        .capability-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
        }

        .capability-image {
          width: 100%;
          height: 280px;
          overflow: hidden;
        }

        .capability-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .capability-card:hover .capability-image img {
          transform: scale(1.05);
        }

        .capability-content {
          padding: 2rem;
        }

        .capability-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 1rem 0;
        }

        .capability-description {
          font-size: 1rem;
          line-height: 1.7;
          color: #d0d0d0;
          margin: 0;
          font-weight: 300;
        }

        .footer-cta {
          text-align: center;
          margin-top: 3rem;
        }

        calcite-button::part(button) {
          font-size: 1rem;
          font-weight: 400;
          transition: all 0.3s ease;
          border-color: #007ac2;
          color: #ffffff;
        }

        calcite-button:hover::part(button) {
          background-color: rgba(0, 122, 194, 0.2);
          border-color: #0096db;
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .capabilities-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .capabilities-section {
            padding: 3rem 0;
          }

          .section-title {
            font-size: 1.875rem;
          }

          .section-description {
            font-size: 1rem;
          }

          .capabilities-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .section-header {
            margin-bottom: 2.5rem;
          }

          .capability-image {
            height: 220px;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.5rem;
          }

          .container {
            padding: 0 1.5rem;
          }

          .capability-content {
            padding: 1.5rem;
          }

          calcite-button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}