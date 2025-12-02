import React from 'react';
import { CheckCircle, Zap, Award, TrendingUp } from 'lucide-react';
 import { useNavigate } from 'react-router-dom';
export default function WhyChooseUs() {

   

  const navigate = useNavigate();


    const handleClick = (e) => {
    e.preventDefault();
    navigate('/services');          // navigate to products page
    window.scrollTo({ top: 0, behavior: 'smooth' });  // scroll to top
  };
const rightFeatures = [
  {
    icon: TrendingUp,
    title: 'Competitive Pricing',
    description: 'Get high-quality solutions at prices that work for growing businesses.'
  },
  {
    icon: Zap,
    title: 'Fast & Innovative',
    description: 'We move quickly and think creatively to deliver solutions that make a difference.'
  },
  {
    icon: CheckCircle,
    title: 'Reliable Support',
    description: 'Our team is always ready to help—guidance, troubleshooting, and ongoing assistance included.'
  },
  {
    icon: Award,
    title: 'Trusted by Clients',
    description: 'We build relationships, not just products. Our clients rely on us to deliver consistently.'
  }
];

  return (
    <section className="why-choose-section">
      <div className="why-choose-container">
        
        {/* Left Side Content */}
        <div className="left-side">
          <div className="breadcrumb">(Why Shieldify?)</div>
          <h1 className="main-title">The Shieldify<br />Difference</h1>
          
          <p className="description">
“Premium safety equipment, trusted nationwide—from Colombo to the remotest sites, we keep your teams safe.”          </p>

          <div className="cta-links">
            <a href="#" className="cta-link primary" onClick={handleClick}>Our Services →</a>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="right-side">
          <div className="features-right">
            {rightFeatures.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div key={idx} className="feature-card">
                  <div className="feature-icon">
                    <IconComponent size={24} strokeWidth={2} />
                  </div>
                  <div className="feature-content">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .why-choose-section {
          background: #f8f8f8;
          padding: 0;
          margin: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Avenir Next', 'Helvetica Neue', Arial, sans-serif;
        }

        .why-choose-container {
          max-width: 1400px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          padding: 5rem 3rem;
          margin: 0 auto;
        }

        /* LEFT SIDE - Calcite Design */
        .left-side {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .breadcrumb {
          font-size: 0.875rem;
          color: #007ac2;
          font-weight: 500;
          margin-bottom: 1rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 300;
          color: #323232;
          margin: 0 0 2rem 0;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .description {
          font-size: 1.125rem;
          color: #6e6e6e;
          line-height: 1.75;
          margin: 0 0 2.5rem 0;
          font-weight: 400;
        }

        .cta-links {
          display: flex;
          gap: 1rem;
          margin-bottom: 0;
          flex-wrap: wrap;
        }

        .cta-link {
          padding: 0.875rem 1.75rem;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9375rem;
          transition: all 0.2s ease;
          border-radius: 2px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid transparent;
        }

        .cta-link.primary {
          background: #007ac2;
          color: #ffffff;
          border-color:  linear-gradient(5deg, #141929ff  0%, #192349 100%);
        }

        .cta-link.primary:hover {
          background:  linear-gradient(5deg, #141929ff  0%, #192349 100%);
          border-color:  linear-gradient(5deg, #141929ff  0%, #192349 100%);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .cta-link.secondary {
          background: transparent;
          color:  linear-gradient(5deg, #141929ff  0%, #192349 100%);
          border-color:  linear-gradient(5deg, #141929ff  0%, #192349 100%);
        }

        .cta-link.secondary:hover {
          background: rgba(0, 122, 194, 0.05);
        }

        /* RIGHT SIDE - Calcite Design Features */
        .right-side {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .features-right {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .feature-card {
          background: #ffffff;
          padding: 2rem;
          border-radius: 2px;
          border: 1px solid #d4d4d4;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .feature-card:hover {
          border-color:  linear-gradient(5deg, #141929ff  0%, #192349 100%);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          background:  linear-gradient(5deg, #141929ff  0%, #192349 100%);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
        }

        .feature-content {
          flex: 1;
        }

        .feature-title {
          font-size: 1.125rem;
          font-weight: 500;
          color: #323232;
          margin: 0 0 0.75rem 0;
          line-height: 1.3;
        }

        .feature-description {
          font-size: 0.9375rem;
          color: #6e6e6e;
          margin: 0;
          line-height: 1.6;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .why-choose-container {
            grid-template-columns: 1fr;
            gap: 4rem;
            padding: 4rem 2rem;
          }

          .main-title {
            font-size: 3rem;
          }
        }

        @media (max-width: 768px) {
          .why-choose-section {
            min-height: auto;
          }

          .why-choose-container {
            gap: 3rem;
            padding: 3rem 1.5rem;
          }

          .main-title {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
          }

          .description {
            font-size: 1rem;
            margin-bottom: 2rem;
          }

          .cta-links {
            gap: 0.75rem;
          }

          .features-right {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .feature-card {
            padding: 1.5rem;
          }

          .feature-icon {
            width: 40px;
            height: 40px;
          }

          .feature-title {
            font-size: 1rem;
          }

          .feature-description {
            font-size: 0.875rem;
          }
        }

        @media (max-width: 480px) {
          .why-choose-container {
            padding: 2rem 1rem;
            gap: 2.5rem;
          }

          .breadcrumb {
            font-size: 0.8125rem;
          }

          .main-title {
            font-size: 2rem;
            margin-bottom: 1.25rem;
          }

          .description {
            font-size: 0.9375rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }

          .cta-links {
            flex-direction: column;
            gap: 0.75rem;
          }

          .cta-link {
            padding: 0.75rem 1.5rem;
            font-size: 0.875rem;
            justify-content: center;
          }

          .feature-card {
            padding: 1.25rem;
          }

          .feature-icon {
            width: 36px;
            height: 36px;
          }

          .feature-title {
            font-size: 0.9375rem;
            margin-bottom: 0.5rem;
          }

          .feature-description {
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </section>
  );
}