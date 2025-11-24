import React from 'react';

export default function HomeInitiatives() {
  const initiatives = [
    {
      title: 'Sustainable Development Goals',
      description: 'Collect, analyze, and share SDG data for planning, policymaking, and decision-making with GIS.',
      link: 'More on SDGs',
      url: 'https://www.esri.com/en-us/industries/sustainable-development/sdg',
      gradient: 'linear-gradient(135deg, #0d4d6b 0%, #1e5a7a 100%)'
    },
    {
      title: 'Humanitarian Assistance',
      description: 'Prepare, manage, and deliver effective humanitarian assistance programs with GIS.',
      link: 'More on assistance',
      url: 'https://www.esri.com/en-us/industries/humanitarian/overview',
      gradient: 'linear-gradient(135deg, #1e5a7a 0%, #2a6d8f 100%)'
    },
    {
      title: 'Conservation',
      description: 'Preserve biodiversity with GIS.',
      link: 'More on conservation',
      url: 'https://www.esri.com/en-us/industries/conservation/overview',
      gradient: 'linear-gradient(135deg, #2a6d8f 0%, #3680a4 100%)'
    },
    {
      title: 'Racial Equity',
      description: 'Advance racial equity and social justice with GIS.',
      link: 'More on racial equity',
      url: 'https://www.esri.com/en-us/racial-equity/overview',
      gradient: 'linear-gradient(135deg, #3680a4 0%, #4293b9 100%)'
    }
  ];

  return (
    <section className="initiatives-section">
      <div className="initiatives-header">
        <h2 className="initiatives-title">Initiatives that support nonprofits and NGOs</h2>
      </div>
      
      <div className="initiatives-grid">
        {initiatives.map((initiative, index) => (
          <div 
            key={index} 
            className="initiative-card"
            style={{ background: initiative.gradient }}
          >
            <div className="initiative-content">
              <h3 className="initiative-heading">{initiative.title}</h3>
              <p className="initiative-description">{initiative.description}</p>
            </div>
            <a 
              href={initiative.url} 
              className="initiative-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {initiative.link} →
            </a>
          </div>
        ))}
      </div>

  
      <style>{`
        .initiatives-section {
          background: #ffffff;
          padding: 0;
          margin: 0;
        }

        .initiatives-header {
          background: #f8f8f8;
          padding: 3rem 2rem;
          text-align: center;
        }

        .initiatives-title {
          font-size: 2rem;
          font-weight: 400;
          color: #151515;
          margin: 0;
          max-width: 1400px;
          margin: 0 auto;
        }

        .initiatives-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 100%;
          margin: 0;
        }

        .initiative-card {
          padding: 3rem 2rem;
          color: #ffffff;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s ease;
          position: relative;
          box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0);
        }

        .initiative-card:last-child {
          border-right: none;
        }

        .initiative-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .initiative-card:hover {
          box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.5);
        }

        .initiative-card:hover::before {
          opacity: 1;
        }

        .initiative-content {
          flex-grow: 1;
        }

        .initiative-heading {
          font-size: 1.75rem;
          font-weight: 400;
          margin: 0 0 1.5rem 0;
          line-height: 1.3;
        }

        .initiative-description {
          font-size: 1rem;
          line-height: 1.6;
          margin: 0 0 2rem 0;
          opacity: 0.95;
        }

        .initiative-link {
          color: #ffffff;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 400;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s ease;
          position: relative;
        }

        .initiative-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #ffffff;
          transition: width 0.3s ease;
        }

        .initiative-link:hover {
          opacity: 0.9;
        }

        .initiative-link:hover::after {
          width: 100%;
        }

        @media (max-width: 1200px) {
          .initiatives-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .initiative-card {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          }

          .initiative-card:nth-child(odd) {
            border-right: 1px solid rgba(255, 255, 255, 0.15);
          }

          .initiative-card:nth-child(3),
          .initiative-card:nth-child(4) {
            border-bottom: none;
          }
        }

        @media (max-width: 768px) {
          .initiatives-grid {
            grid-template-columns: 1fr;
          }

          .initiative-card {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            min-height: 280px;
            padding: 2.5rem 2rem;
          }

          .initiative-card:nth-child(odd) {
            border-right: none;
          }

          .initiative-card:last-child {
            border-bottom: none;
          }

          .initiatives-title {
            font-size: 1.75rem;
          }

          .initiatives-header {
            padding: 2rem 1.5rem;
          }

          .initiative-heading {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .initiatives-title {
            font-size: 1.5rem;
          }

          .initiative-card {
            padding: 2rem 1.5rem;
          }

          .initiative-heading {
            font-size: 1.35rem;
          }

          .initiative-description {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
}