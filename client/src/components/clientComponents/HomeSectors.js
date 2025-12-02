import React, { useState } from 'react';

import { Building2, Stethoscope, Flame, Shield, Truck, Zap, Leaf, Fish } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function HomeSectors() {
  const [hoveredCard, setHoveredCard] = useState(null);
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

  const sectors = [
    {
      title: 'Industrial & Construction',
      description: 'We supply premium safety equipment for construction sites, manufacturing plants, and heavy machinery operations. Fast delivery across the island.',
      image: 'industry1.jpg',
      Icon: Building2
    },
    {
      title: 'Healthcare & Laboratory',
      description: 'Reliable PPE and safety equipment distribution for hospitals, clinics, medical labs, and research facilities. We ensure you have what you need, when you need it.',
      image: 'industry2.jpg',
      Icon: Stethoscope
    },
    {
      title: 'Emergency Services',
      description: 'Quality protective gear supply for fire departments, police, paramedics, and disaster response teams. Island-wide rapid delivery.',
      image: 'industry3.jpg',
      Icon: Flame
    },
    {
      title: 'Defence & Security',
      description: 'Professional safety equipment distribution for armed forces, security agencies, and border patrol operations. Reliable supply chain.',
      image: 'industry4.jpg',
      Icon: Shield
    },
    {
      title: 'Transportation & Logistics',
      description: 'Complete safety solutions for cargo handlers, warehouse workers, and port operations. We deliver the equipment you depend on.',
      image: 'industry5.jpg',
      Icon: Truck
    },
    {
      title: 'Utilities & Infrastructure',
      description: 'High-performance equipment distribution for electrical workers, maintenance crews, and infrastructure projects island-wide.',
      image: 'industry6.jpg',
      Icon: Zap
    },
    {
      title: 'Environmental & Agriculture',
      description: 'Protective gear distribution for agricultural workers, waste management, and environmental safety operations. Quick turnaround.',
      image: 'industry7.jpg',
      Icon: Leaf
    },
    {
      title: 'Fisheries and Marine Sector',
description: 'Protective gear support for fisheries, marine operations, and offshore environments. Reliable safety solutions for wet and high-risk conditions.',
      image: 'industry8.jpg',
      Icon: Fish
    }
  ];

  return (
    <section className="sectors-section">
      <div className="sectors-header">
        <div className="sectors-header-content">
          <h2 className="sectors-title">Industries We Serve</h2>
          <p className="sectors-subtitle">Trusted safety equipment distribution across all major sectors island-wide</p>
        </div>
      </div>

      <div className="sectors-grid">
        {sectors.map((sector, index) => {
          const IconComponent = sector.Icon;
          return (
            <div
              key={index}
              className="sector-card"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="sector-card-wrapper">
                <div className="sector-card-front">
                  <img
                    src={`/assets/images/${sector.image}`}
                    alt={sector.title}
                    className="sector-card-image"
                  />
                  <div className={`sector-overlay ${hoveredCard === index ? 'active' : ''}`}></div>
                  <div className="sector-card-front-content">
                    <div className="sector-icon">
                      <IconComponent size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="sector-card-title">{sector.title}</h3>
                  </div>
                </div>

                <div className={`sector-card-back ${hoveredCard === index ? 'show' : ''}`}>
                  <div className="sector-back-content">
                    <div className="sector-icon-back">
                      <IconComponent size={48} strokeWidth={1.5} />
                    </div>
                    <h3 className="sector-back-title">{sector.title}</h3>
                    <p className="sector-back-description">{sector.description}</p>
    <a href="#" className="sector-back-link" onClick={handleClick}>
      Explore Products →
    </a>           </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .sectors-section {
          background: linear-gradient(180deg, #f5f7fa 0%, #e8eef5 100%);
          padding: 0;
          margin: 0;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .sectors-header {
          background: linear-gradient(135deg, #141929 0%, #192349 100%);
          padding: 5rem 2rem;
          text-align: center;
          color: #ffffff;
          flex-shrink: 0;
        }

        .sectors-header-content {
          max-width: 900px;
          margin: 0 auto;
        }

        .sectors-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 1rem 0;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .sectors-subtitle {
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
          font-weight: 300;
          line-height: 1.6;
        }

        .sectors-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          padding: 4rem 2rem;
          width: 100%;
          flex: 1;
          max-width: 1600px;
          margin: 0 auto;
        }

        .sector-card {
          perspective: 1000px;
          min-height: 380px;
        }

        .sector-card-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transition: all 0.5s ease;
          transform-style: preserve-3d;
        }

        .sector-card-front {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #ffffff;
          border-radius: 1px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(20, 25, 41, 0.1);
          transition: all 0.5s ease;
          display: flex;
          flex-direction: column;
          z-index: 1;
          opacity: 1;
          backface-visibility: hidden;
        }

        .sector-card:hover .sector-card-front {
          opacity: 0;
          transform: translateZ(-100px);
        }

        .sector-card-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .sector-card:hover .sector-card-image {
          transform: scale(1.05);
        }

        .sector-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 180px;
          background: rgba(20, 25, 41, 0.3);
          transition: all 0.5s ease;
        }

        .sector-overlay.active {
          background: rgba(20, 25, 41, 0.15);
        }

        .sector-card-front-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .sector-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #141929 0%, #192349 100%);
          color: #ffffff;
          border-radius: 1px;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .sector-card:hover .sector-icon {
          transform: scale(1.1);
        }

        .sector-card-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #141929;
          margin: 0;
          line-height: 1.3;
        }

        .sector-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #141929 0%, #192349 100%);
          border-radius: 1px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(20, 25, 41, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 0;
          opacity: 0;
          transform: translateZ(0);
          transition: opacity 0.5s ease;
          backface-visibility: hidden;
        }

        .sector-card:hover .sector-card-back {
          opacity: 1;
          z-index: 2;
        }

        .sector-back-content {
          padding: 2.5rem;
          text-align: center;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .sector-icon-back {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          border-radius: 1px;
          margin-bottom: 1.5rem;
          border: 2px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
        }

        .sector-back-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 1rem 0;
          line-height: 1.3;
        }

        .sector-back-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 1.5rem 0;
        }

        .sector-back-link {
          color: #ffffff;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);
          padding-bottom: 4px;
        }

        .sector-back-link:hover {
          border-bottom-color: #ffffff;
          transform: translateX(4px);
        }

        @media (max-width: 1400px) {
          .sectors-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            padding: 3rem 2rem;
          }
        }

        @media (max-width: 992px) {
          .sectors-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            padding: 2.5rem 2rem;
          }

          .sectors-title {
            font-size: 2.4rem;
          }

          .sectors-subtitle {
            font-size: 1.05rem;
          }

          .sector-card {
            min-height: 350px;
          }

          .sector-card-image {
            height: 160px;
          }

          .sector-card-front-content {
            padding: 1.5rem;
          }

          .sector-icon {
            width: 55px;
            height: 55px;
          }

          .sector-card-title {
            font-size: 1.2rem;
          }

          .sector-back-title {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 768px) {
          .sectors-section {
            min-height: auto;
          }

          .sectors-header {
            padding: 3rem 1.5rem;
          }

          .sectors-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            padding: 2rem 1.5rem;
            max-width: 100%;
          }

          .sectors-title {
            font-size: 2rem;
            margin-bottom: 0.75rem;
          }

          .sectors-subtitle {
            font-size: 1rem;
          }

          .sector-card {
            min-height: 320px;
          }

          .sector-card-image {
            height: 140px;
          }

          .sector-back-description {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .sectors-header {
            padding: 2.5rem 1rem;
          }

          .sectors-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 1.5rem 1rem;
          }

          .sectors-title {
            font-size: 1.6rem;
            margin-bottom: 0.5rem;
          }

          .sectors-subtitle {
            font-size: 0.95rem;
          }

          .sector-card {
            min-height: 300px;
          }

          .sector-card-image {
            height: 120px;
          }

          .sector-card-front-content {
            padding: 1.25rem;
          }

          .sector-icon {
            width: 50px;
            height: 50px;
          }

          .sector-card-title {
            font-size: 1.1rem;
          }

          .sector-back-content {
            padding: 1.5rem;
          }

          .sector-icon-back {
            width: 60px;
            height: 60px;
          }

          .sector-back-title {
            font-size: 1.1rem;
            margin-bottom: 0.75rem;
          }

          .sector-back-description {
            font-size: 0.85rem;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </section>
  );
}