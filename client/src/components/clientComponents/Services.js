import React, { useState } from 'react';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-chip';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');

  const services = [
    {
      icon: 'map',
      title: 'GIS Mapping & Cartography',
      category: 'mapping',
      description: 'Create professional, high-quality maps that transform complex spatial data into clear visual stories.',
      color: '#35ac46'
    },
    {
      icon: 'layers',
      title: 'Spatial Analysis',
      category: 'analysis',
      description: 'Uncover patterns and relationships in your data with advanced spatial analysis techniques.',
      color: '#149ece'
    },
    {
      icon: 'satellite-3',
      title: 'Remote Sensing',
      category: 'remote-sensing',
      description: 'Leverage satellite imagery for environmental monitoring, land cover mapping, and change detection.',
      color: '#a6ce39'
    },
    {
      icon: 'gear',
      title: 'GIS Consulting',
      category: 'consulting',
      description: 'Expert guidance for implementing and optimizing your GIS infrastructure and workflows.',
      color: '#007ac2'
    },
    {
      icon: 'code',
      title: 'Custom Development',
      category: 'development',
      description: 'Tailored GIS applications and tools built specifically for your business requirements.',
      color: '#8b4789'
    },
    {
      icon: 'data-check',
      title: 'Data Management',
      category: 'data',
      description: 'Comprehensive spatial data management, quality control, and database administration services.',
      color: '#f89927'
    },
    {
      icon: 'urban-model',
      title: 'Urban Planning',
      category: 'analysis',
      description: 'Smart city planning solutions with advanced 3D modeling and scenario analysis.',
      color: '#007ac2'
    },
    {
      icon: 'organization',
      title: 'Field Operations',
      category: 'field',
      description: 'Mobile GIS solutions for field data collection, asset tracking, and workforce management.',
      color: '#35ac46'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'mapping', label: 'Mapping' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'remote-sensing', label: 'Remote Sensing' },
    { id: 'consulting', label: 'Consulting' },
    { id: 'development', label: 'Development' },
    { id: 'data', label: 'Data' },
    { id: 'field', label: 'Field Ops' }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <section className="services-section">
      {/* Hero Header */}
      <div className="services-hero">
        <div className="services-hero-content">
          <calcite-icon icon="layers" scale="l"></calcite-icon>
          <h1 className="services-hero-title">Our Services</h1>
          <p className="services-hero-subtitle">
            Comprehensive GIS solutions tailored to meet your organization's unique spatial data challenges
          </p>
        </div>
      </div>

      <div className="services-container">
        {/* Overview Section */}
        <div className="services-overview">
          <h2 className="section-title">Professional GIS Services</h2>
          <p className="section-description">
            We offer a complete range of Geographic Information System services designed to help 
            organizations leverage spatial data for better decision-making. Our team of experienced 
            GIS professionals delivers high-quality solutions using industry-leading technologies.
          </p>

          {/* Stats */}
          <div className="services-stats">
            <div className="stat-item">
              <calcite-icon icon="check-circle" scale="l"></calcite-icon>
              <h3 className="stat-number">500+</h3>
              <p className="stat-label">Projects Delivered</p>
            </div>
            <div className="stat-item">
              <calcite-icon icon="users" scale="l"></calcite-icon>
              <h3 className="stat-number">150+</h3>
              <p className="stat-label">Satisfied Clients</p>
            </div>
            <div className="stat-item">
              <calcite-icon icon="award" scale="l"></calcite-icon>
              <h3 className="stat-number">15+</h3>
              <p className="stat-label">Years Experience</p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((category) => (
            <calcite-button
              key={category.id}
              appearance={activeCategory === category.id ? 'solid' : 'outline'}
              kind="brand"
              scale="m"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </calcite-button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {filteredServices.map((service, index) => (
            <div 
              key={index} 
              className="service-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="service-icon"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <calcite-icon 
                  icon={service.icon} 
                  scale="l"
                  style={{ color: service.color }}
                ></calcite-icon>
              </div>
              
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
              <calcite-button 
                appearance="transparent" 
                kind="brand"
                icon-end="arrow-right"
                width="full"
              >
                Learn More
              </calcite-button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="services-cta">
          <calcite-icon icon="lightbulb" scale="l"></calcite-icon>
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Let's discuss how our GIS services can help transform your spatial data into actionable insights
          </p>
          <div className="cta-buttons">
            <calcite-button
              appearance="solid"
              kind="brand"
              scale="l"
            >
              Contact Us
            </calcite-button>
            <calcite-button
              appearance="outline"
              kind="brand"
              scale="l"
              icon-start="download"
            >
              Download Brochure
            </calcite-button>
          </div>
        </div>
      </div>

      <style>{`
        .services-section {
          background: #ffffff;
          margin: 0;
          padding: 0;
        }

        .services-hero {
          background: linear-gradient(135deg, #2d5f8d 0%, #35ac46 100%);
          padding: 5rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .services-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="none"/><circle cx="30" cy="30" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
          opacity: 0.5;
        }

        .services-hero-content {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
        }

        .services-hero calcite-icon {
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .services-hero-title {
          font-size: 3.5rem;
          font-weight: 300;
          color: #ffffff;
          margin: 0 0 1.5rem 0;
          line-height: 1.2;
        }

        .services-hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 300;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .services-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 5rem 2rem;
        }

        .services-overview {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 400;
          color: #151515;
          margin: 0 0 1.5rem 0;
        }

        .section-description {
          font-size: 1.125rem;
          color: #6a6a6a;
          max-width: 800px;
          margin: 0 auto 3rem;
          line-height: 1.8;
        }

        .services-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .stat-item {
          text-align: center;
        }

        .stat-item calcite-icon {
          color: #35ac46;
          margin-bottom: 1rem;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #35ac46;
          margin: 0 0 0.5rem 0;
        }

        .stat-label {
          font-size: 1rem;
          color: #6a6a6a;
          margin: 0;
        }

        .category-filter {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 3rem;
        }

        calcite-button[appearance="solid"]::part(button) {
          background-color: #35ac46;
          border-color: #35ac46;
        }

        calcite-button[appearance="solid"]:hover::part(button) {
          background-color: #2d8f3a;
          border-color: #2d8f3a;
        }

        calcite-button[appearance="outline"]::part(button) {
          border-color: #35ac46;
          color: #35ac46;
        }

        calcite-button[appearance="outline"]:hover::part(button) {
          background-color: rgba(53, 172, 70, 0.1);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .service-card {
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 2rem;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out backwards;
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

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          border-color: #35ac46;
        }

        .service-icon {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .service-title {
          font-size: 1.5rem;
          font-weight: 400;
          color: #151515;
          margin: 0 0 1rem 0;
        }

        .service-description {
          font-size: 1rem;
          color: #6a6a6a;
          line-height: 1.6;
          margin: 0 0 1.5rem 0;
          flex-grow: 1;
        }

        calcite-button[appearance="transparent"]::part(button) {
          color: #35ac46;
          font-weight: 500;
          justify-content: flex-start;
          padding-left: 0;
        }

        calcite-button[appearance="transparent"]:hover::part(button) {
          background-color: transparent;
          color: #2d8f3a;
        }

        .services-cta {
          background: linear-gradient(135deg, #2d5f8d 0%, #35ac46 100%);
          border-radius: 12px;
          padding: 4rem 3rem;
          text-align: center;
          color: #ffffff;
        }

        .services-cta calcite-icon {
          color: #ffffff;
          margin-bottom: 1.5rem;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 400;
          margin: 0 0 1rem 0;
        }

        .cta-description {
          font-size: 1.125rem;
          opacity: 0.95;
          max-width: 700px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-buttons calcite-button[appearance="solid"]::part(button) {
          background-color: #ffffff;
          border-color: #ffffff;
          color: #35ac46;
        }

        .cta-buttons calcite-button[appearance="solid"]:hover::part(button) {
          background-color: #f0f0f0;
          border-color: #f0f0f0;
          transform: translateY(-2px);
        }

        .cta-buttons calcite-button[appearance="outline"]::part(button) {
          border-color: #ffffff;
          color: #ffffff;
        }

        .cta-buttons calcite-button[appearance="outline"]:hover::part(button) {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .services-hero {
            padding: 3rem 1.5rem;
          }

          .services-hero-title {
            font-size: 2.5rem;
          }

          .services-hero-subtitle {
            font-size: 1.1rem;
          }

          .services-container {
            padding: 3rem 1.5rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .services-stats {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .services-cta {
            padding: 3rem 2rem;
          }

          .cta-title {
            font-size: 2rem;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .cta-buttons calcite-button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}