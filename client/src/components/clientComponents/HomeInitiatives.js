import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function ShieldifyServices() {
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

  const services = [
    {
      title: 'Individual Equipment',
      description: 'Pick exactly what you need! From safety helmets to gloves, vests, goggles, and more. Choose the perfect equipment for your specific needs.',
      image: 'service1.png'
    },
    {
      title: 'Safety Bundles',
      description: 'Smart combinations of complementary items! Get helmet + goggles bundles, protective gear sets, and more - all bundled for great value.',
      image: 'service2.png'
    },
    {
      title: 'Full Kits',
      description: 'Complete all-in-one solutions! Get fully equipped with our Construction Worker Kits, Medical Worker Kits, Industrial Kits, and more. Everything you need in one go!',
      image: 'service3.png'
    },
    {
      title: 'Island-Wide Delivery',
      description: 'We bring safety to your doorstep! Enjoy fast, reliable delivery across the entire island. For reasonable charges, we\'ll get your equipment to you wherever you are!',
      image: 'service4.png'
    }
  ];

  return (
    <section className="services-section">
      <div className="services-header">
        <h2 className="services-title">Shieldify Safety Solutions</h2>
        <p className="services-subtitle">We provide quality safety equipment island wide</p>
      </div>
      
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-card-inner">
              {/* Front side */}
              <div className="service-card-front">
                <img 
                  src={`/assets/images/${service.image}`}
                  alt={service.title}
                  className="service-image"
                />
                <div className="service-overlay"></div>
                <h3 className="service-title">{service.title}</h3>
              </div>

              {/* Back side */}
              <div className="service-card-back">
                <div className="service-content">
                  <h3 className="service-title-back">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <br></br>
                      <a href="#" className="sector-back-link" onClick={handleClick}>
      Explore Products →
    </a>   
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .services-section {
          background: #ffffff;
          padding: 0;
          margin: 0;
          font-family: 'Avenir Next', 'Helvetica Neue', Arial, sans-serif;
        }

        .services-header {
          background: linear-gradient(5deg, #141929ff  0%, #192349 100%);
          padding: 4rem 2rem;
          text-align: center;
          color: #ffffff;
        }

        .services-title {
          font-size: 2.5rem;
          font-weight: 400;
          color: #ffffff;
          margin: 0 0 1rem 0;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          letter-spacing: -0.5px;
        }

        .services-subtitle {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          font-weight: 300;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 100%;
          margin: 0;
          gap: 0;
        }

        .service-card {
          min-height: 380px;
          cursor: pointer;
          perspective: 1000px;
        }

        .service-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .service-card:hover .service-card-inner {
          transform: rotateY(180deg);
        }

        .service-card-front,
        .service-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          left: 0;
        }

        .service-card-front {
          position: relative;
        }

        .service-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .service-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(13, 77, 107, 0.5);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .service-card:hover .service-overlay {
          background: rgba(13, 77, 107, 0.3);
        }

        .service-title {
          position: absolute;
          font-size: 2rem;
          font-weight: 500;
          color: #ffffff;
          margin: 0;
          text-align: center;
          padding: 2rem;
          line-height: 1.3;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          z-index: 2;
          letter-spacing: -0.25px;
        }

        .service-card-back {
          background: linear-gradient(5deg, #141929ff  0%, #192349 100%)!important;
          transform: rotateY(180deg);
          padding: 2rem;
          flex-direction: column;
        }

        .service-content {
          text-align: center;
          color: #ffffff;
          width: 100%;
        }

        .service-title-back {
          font-size: 2rem;
          font-weight: 500;
          color: #ffffff;
          margin: 0 0 1.5rem 0;
          line-height: 1.3;
          letter-spacing: -0.25px;
        }

        .service-description {
          font-size: 1.125rem;
          line-height: 1.65;
          margin: 0;
          opacity: 0.95;
          color: #ffffff;
          font-weight: 300;
        }

        @media (max-width: 1200px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .services-title {
            font-size: 2rem;
          }

          .service-card {
            min-height: 350px;
          }
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }

          .services-header {
            padding: 3rem 1.5rem;
          }

          .services-title {
            font-size: 1.75rem;
          }

          .services-subtitle {
            font-size: 1rem;
          }

          .service-card {
            min-height: 300px;
          }

          .service-title {
            font-size: 1.375rem;
            padding: 1.5rem;
          }

          .service-title-back {
            font-size: 1.375rem;
          }

          .service-description {
            font-size: 0.9375rem;
          }
        }

        @media (max-width: 480px) {
          .services-title {
            font-size: 1.5rem;
          }

          .services-subtitle {
            font-size: 0.9375rem;
          }

          .service-card {
            min-height: 280px;
          }

          .service-title {
            font-size: 1.125rem;
            padding: 1rem;
          }

          .service-card-back {
            padding: 1.5rem;
          }

          .service-title-back {
            font-size: 1.125rem;
            margin-bottom: 1rem;
          }

          .service-description {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </section>
  );
}