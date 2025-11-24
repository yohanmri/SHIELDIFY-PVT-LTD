import React from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';

export default function AboutExperts() {
  const experts = [
    {
      name: "Nimal Perera",
      title: "Managing Director",
      description: "Nimal leads GIS Solutions with over 20 years of experience in geospatial technology and enterprise solutions across Sri Lanka.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Priya Fernando",
      title: "Chief Technology Officer",
      description: "Priya oversees technical operations and innovation, bringing cutting-edge GIS solutions to organizations throughout the region.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      name: "Rohan Silva",
      title: "Head of Professional Services",
      description: "Rohan leads our consulting and implementation teams, ensuring successful GIS deployments for clients across all sectors.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
    {
      name: "Dilani Jayawardena",
      title: "Senior GIS Consultant",
      description: "Dilani specializes in spatial analysis and custom GIS solutions, with expertise in utility and infrastructure management.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      name: "Kasun Rajapaksa",
      title: "Solutions Architect",
      description: "Kasun designs enterprise GIS architectures and leads integration projects for government and private sector clients.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    }
  ];

  return (
    <section style={{
      padding: '6rem 0',
      background: '#fff'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: '400',
            color: '#2b2b2b',
            marginBottom: '1.5rem',
            lineHeight: '1.3'
          }}>
            Meet some of GIS Solutions' thought leaders
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#555',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Our experts are innovators, change makers, and action takers, leading conversations and advancing 
            the field of GIS across Sri Lanka.
          </p>
        </div>

        {/* First Row - 3 Experts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {experts.slice(0, 3).map((expert, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center'
              }}
            >
              {/* Circular Image */}
              <div style={{
                width: '220px',
                height: '220px',
                margin: '0 auto 2rem',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #f0f0f0',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.borderColor = '#2d5f8d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = '#f0f0f0';
              }}
              >
                <img
                  src={expert.image}
                  alt={expert.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Name */}
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '500',
                color: '#2b2b2b',
                marginBottom: '0.5rem'
              }}>
                {expert.name}
              </h3>

              {/* Title */}
              <p style={{
                fontSize: '1rem',
                color: '#666',
                marginBottom: '1rem',
                fontWeight: '400'
              }}>
                {expert.title}
              </p>

              {/* Description */}
              <p style={{
                fontSize: '0.95rem',
                color: '#666',
                lineHeight: '1.7',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                {expert.description}
              </p>
            </div>
          ))}
        </div>

        {/* Second Row - 2 Experts (Centered) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {experts.slice(3, 5).map((expert, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center'
              }}
            >
              {/* Circular Image */}
              <div style={{
                width: '220px',
                height: '220px',
                margin: '0 auto 2rem',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #f0f0f0',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.borderColor = '#2d5f8d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = '#f0f0f0';
              }}
              >
                <img
                  src={expert.image}
                  alt={expert.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Name */}
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '500',
                color: '#2b2b2b',
                marginBottom: '0.5rem'
              }}>
                {expert.name}
              </h3>

              {/* Title */}
              <p style={{
                fontSize: '1rem',
                color: '#666',
                marginBottom: '1rem',
                fontWeight: '400'
              }}>
                {expert.title}
              </p>

              {/* Description */}
              <p style={{
                fontSize: '0.95rem',
                color: '#666',
                lineHeight: '1.7',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                {expert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}