import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Product Consultation',
      description: 'We help you choose the right safety gear based on your industry, job type, and risk level. Get fast guidance to ensure you purchase the most suitable PPE for your team.',
      whatsapp: 'https://wa.me/94704400210',
      phone: '+94 70 440 0210',     
      image: '1service.jpg' 
    },
    {
      title: 'Custom Branding & Printing',
      description: 'Add your company logo or custom design to helmets, vests, uniforms, and more. Perfect for corporate identity, branding, and safety compliance.',
      whatsapp: 'https://wa.me/94774716901',
      phone: '+94 77 471 6901',
      image: '2service.webp'
    },
    {
      title: 'Corporate & Bulk Order Solutions',
      description: 'Get specialized support, priority handling, and competitive pricing for bulk PPE orders. Ideal for construction firms, factories, warehouses, and institutions.',
      whatsapp: null,
      phone: '+94 77 471 6901',
      image: '3service.webp'
    },
    {
      title: 'Fast Delivery & Distribution',
      description: 'We offer reliable, island-wide delivery with efficient packaging and fast processing times.',
      whatsapp: 'https://wa.me/94701406489',
      phone: '+94 70 140 6489',
      image: '4service.webp'
    },
    {
      title: 'Safety Kit Preparation',
      description: 'We prepare ready-to-use safety kits tailored for construction, offices, factories, and emergency use.',
      whatsapp: 'https://wa.me/94704400210',
      phone: '+94 70 440 0210',
      image: '5service.jpg'
    },
    {
      title: 'After-Sales Support',
      description: 'We\'re here to assist with product usage, replacements, warranty guidance, and continuous support for your orders.',
      whatsapp: null,
      phone: '+94 70 140 6489',
      image: '6service.jpg'
    }
  ];

  return (
    <section className="services-page">
      <div className="services-hero">
        <div className="hero-content">
          <img 
            src="/assets/images/picture-logo.png" 
            alt="Shieldify Logo" 
            className="hero-logo"
          />
          <h1 className="hero-title">Our Services</h1>
          {/* <p className="hero-subtitle">Comprehensive safety solutions tailored to your needs</p> */}
        </div>
      </div>

      <div className="services-container">
        {services.map((service, index) => (
          <div key={index} className={`service-row ${index % 2 === 1 ? 'reverse' : ''}`}>
            <div className="service-image-wrapper">
              <div className="service-image-placeholder">
                <img 
                  src={`/assets/images/${service.image}`} 
                  alt={service.title}
                  className="service-image"
                />
              </div>
            </div>
            
            <div className="service-content">
              <h2 className="service-title">{service.title}</h2>
              <p className="service-description">{service.description}</p>
              
              <div className="service-actions">
                {service.whatsapp && (
                  <a 
                    href={service.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    <MessageCircle size={18} />
                    Chat on WhatsApp
                  </a>
                )}
                <a 
                  href={`tel:${service.phone.replace(/\s/g, '')}`}
                  className="btn btn-phone"
                >
                  <Phone size={18} />
                  Call {service.phone}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .services-page {
          background: #f8f8f8;
          font-family: 'Avenir Next', 'Helvetica Neue', Arial, sans-serif;
          min-height: 100vh;
          margin-top: 3%;
        }

        .services-hero {
          background: linear-gradient(135deg, rgba(0, 94, 149, 0.5) 0%, rgba(0, 122, 194, 0.9) 100%),
                      url('https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1600&q=80') center/cover;
          padding: 2rem 2rem;
          text-align: center;
          color: #ffffff;
          position: relative;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-logo {
          width: 180px;
          height: auto;
        
          display: block;
          filter: brightness(0) invert(1);
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 300;
          margin: 0 0 1rem 0;
          letter-spacing: -1px;
          color: #ffffff;
        }

        

        .services-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .service-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-bottom: 4rem;
          background: #ffffff;
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          border: 1px solid #d4d4d4;
          transition: all 0.3s ease;
        }

        .service-row:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          border-color: #007ac2;
        }

        .service-row.reverse {
          grid-template-columns: 1fr 1fr;
        }

        .service-row.reverse .service-image-wrapper {
          order: 2;
        }

        .service-row.reverse .service-content {
          order: 1;
        }

        .service-image-wrapper {
          position: relative;
          overflow: hidden;
        }

        .service-image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .service-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .service-content {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .service-title {
          font-size: 2rem;
          font-weight: 400;
          color: #323232;
          margin: 0 0 1.5rem 0;
          letter-spacing: -0.5px;
        }

        .service-description {
          font-size: 1.0625rem;
          line-height: 1.75;
          color: #6e6e6e;
          margin: 0 0 2rem 0;
          font-weight: 400;
        }

        .service-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.875rem 1.75rem;
          border-radius: 2px;
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
          border: 1px solid transparent;
          cursor: pointer;
        }

        .btn-whatsapp {
          background: #25D366;
          color: #ffffff;
          border-color: #25D366;
        }

        .btn-whatsapp:hover {
          background: #1DA851;
          border-color: #1DA851;
          box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);
        }

        .btn-phone {
          background: transparent;
          color: #007ac2;
          border-color: #007ac2;
        }

        .btn-phone:hover {
          background: rgba(0, 122, 194, 0.05);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .service-row,
          .service-row.reverse {
            grid-template-columns: 1fr;
          }

          .service-row.reverse .service-image-wrapper,
          .service-row.reverse .service-content {
            order: initial;
          }

          .hero-title {
            font-size: 3rem;
          }
        }

        @media (max-width: 768px) {
          .services-hero {
            padding: 4rem 1.5rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.125rem;
          }

          .services-container {
            padding: 3rem 1.5rem;
          }

          .service-row {
            margin-bottom: 3rem;
            gap: 0;
          }

          .service-image-placeholder {
            min-height: 300px;
          }

          .service-content {
            padding: 2rem;
          }

          .service-title {
            font-size: 1.75rem;
            margin-bottom: 1.25rem;
          }

          .service-description {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }

          .service-actions {
            gap: 0.75rem;
          }

          .btn {
            padding: 0.75rem 1.5rem;
            font-size: 0.875rem;
          }
        }

        @media (max-width: 480px) {
          .services-hero {
            padding: 3rem 1rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .services-container {
            padding: 2rem 1rem;
          }

          .service-row {
            margin-bottom: 2rem;
          }

          .service-image-placeholder {
            min-height: 250px;
          }

          .service-content {
            padding: 1.5rem;
          }

          .service-title {
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }

          .service-description {
            font-size: 0.9375rem;
            line-height: 1.6;
            margin-bottom: 1.25rem;
          }

          .service-actions {
            flex-direction: column;
            gap: 0.75rem;
          }

          .btn {
            width: 100%;
            justify-content: center;
            padding: 0.875rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}