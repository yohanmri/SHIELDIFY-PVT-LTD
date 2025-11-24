import React, { useState } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '../../styles/clientStyles/productsCard.css';

export default function ProductsComponent({ setPage }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Organized by Esri's three major product categories
  const productCategories = {
    online: {
      name: "ArcGIS Online",
      color: "#7b5fa6",
      description: "Cloud-based GIS platform for creating and sharing maps",
      products: [
        { 
          icon: "/assets/arcGISonline.png", 
          title: "ArcGIS Online", 
          desc: "Cloud-based mapping platform for creating, sharing, and managing web maps and spatial data across organizations.",
          features: ["Cloud Storage", "Collaboration", "Web Maps", "Data Management"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-online/overview"
        },
        { 
          icon: "/assets/survey.png", 
          title: "Survey123", 
          desc: "Create smart forms to collect field data quickly with customizable surveys that work online and offline.",
          features: ["Custom Forms", "Offline Mode", "Photo Capture", "GPS Integration"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-survey123/overview"
        },
        { 
          icon: "/assets/dashboards.png", 
          title: "ArcGIS Dashboards", 
          desc: "Build compelling data visualizations with interactive charts, maps, and indicators for real-time monitoring.",
          features: ["Real-time Data", "Interactive Charts", "KPI Indicators", "Custom Themes"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-dashboards/overview"
        },
        { 
          icon: "/assets/field-maps.png", 
          title: "Field Maps", 
          desc: "Mobile app for field data collection and asset management with offline capabilities and custom forms.",
          features: ["Offline Maps", "Asset Management", "Navigation", "Data Collection"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-field-maps/overview"
        },
        { 
          icon: "/assets/storymap.png", 
          title: "StoryMaps", 
          desc: "Transform your maps into immersive narrative experiences that combine text, multimedia, and interactive content.",
          features: ["Narrative Maps", "Multimedia", "Templates", "Sharing"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-storymaps/overview"
        },
        { 
          icon: "/assets/quickCapture.png", 
          title: "QuickCapture", 
          desc: "Rapidly collect field observations with one-tap buttons for fast data capture at walking or driving speeds.",
          features: ["One-tap Capture", "High-speed Collection", "Custom Buttons", "GPS Tracking"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-quickcapture/overview"
        },
        { 
          icon: "/assets/product6.png", 
          title: "ArcGIS Insights", 
          desc: "Perform spatial analytics and data science workflows with an intuitive drag-and-drop interface.",
          features: ["Spatial Analytics", "Data Science", "Visualization", "Drag & Drop"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-insights/overview"
        }
      ]
    },
    pro: {
      name: "ArcGIS Pro",
      color: "#6d4f96",
      description: "Professional desktop GIS for advanced analysis",
      products: [
        { 
          icon: "/assets/arcgis-pro.png", 
          title: "ArcGIS Pro", 
          desc: "Professional desktop GIS application for advanced mapping, spatial analysis, data management, and visualization workflows.",
          features: ["Advanced Analytics", "3D Mapping", "Geoprocessing", "Publishing"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview"
        }
      ]
    },
    enterprise: {
      name: "ArcGIS Enterprise",
      color: "#8b4c9f",
      description: "On-premises GIS platform for organizations",
      products: [
        { 
          icon: "/assets/product1.png", 
          title: "ArcGIS Enterprise", 
          desc: "Complete enterprise GIS platform for secure deployment and management of geospatial services within your infrastructure.",
          features: ["On-Premise", "Security", "Scalability", "Enterprise Ready"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-enterprise/overview"
        },
        { 
          icon: "/assets/experience-builderlogo.png", 
          title: "Experience Builder", 
          desc: "Build custom web applications with drag-and-drop widgets without writing code for map-centric experiences.",
          features: ["No-code Builder", "Drag & Drop", "Custom Widgets", "Responsive Design"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-experience-builder/overview"
        },
        { 
          icon: "/assets/product2.png", 
          title: "ArcGIS Hub", 
          desc: "Community engagement platform to share data, apps, and initiatives with citizens and stakeholders.",
          features: ["Community Portal", "Data Sharing", "Collaboration", "Engagement"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-hub/overview"
        },
        { 
          icon: "/assets/product8.png", 
          title: "ArcGIS Velocity", 
          desc: "Real-time and big data analytics platform for processing streaming IoT and sensor data.",
          features: ["Real-time Analytics", "IoT Integration", "Stream Processing", "Big Data"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-velocity/overview"
        },
        { 
          icon: "/assets/product10.png", 
          title: "ArcGIS Indoors", 
          desc: "Indoor mapping and space management platform for facilities, campuses, and indoor navigation.",
          features: ["Indoor Maps", "Space Management", "Wayfinding", "Facilities"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-indoors/overview"
        },
        { 
          icon: "/assets/product9.png", 
          title: "ArcGIS Urban", 
          desc: "3D urban planning solution for designing, planning, and visualizing city development projects.",
          features: ["3D Planning", "Urban Design", "Visualization", "Zoning"],
          link: "https://www.esri.com/en-us/arcgis/products/arcgis-urban/overview"
        }
      ]
    }
  };

  return (
    <div className="products-page">
      {/* Hero Section */}
      <div className="products-hero">
        <div className="products-hero-content">
          <div className="products-hero-text">
            <h1 className="products-hero-title">Products</h1>
            <p className="products-hero-subtitle">
              Comprehensive ArcGIS solutions for spatial intelligence
            </p>
          </div>
        </div>

        <div className="products-hero-image-container">
          <img 
            src="https://www.esri.com/content/dam/esrisites/en-us/industries/2020/business/sector/assets/overview/business-banner-large-background.jpg"
            alt="Background"
            className="products-hero-bg-image"
          />
          <div className="products-hero-overlay" />
        </div>

        <div className="products-hero-frames">
          <div className="products-hero-frame products-hero-frame-1">
            <img 
              src="https://www.esri.com/content/dam/esrisites/en-us/industries/2020/business/sector/assets/overview/business-banner-foreground-overview.png"
              alt="GIS Map"
            />
          </div>

          <div className="products-hero-frame products-hero-frame-2">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
              alt="Person using laptop"
            />
          </div>

          <div className="products-hero-frame products-hero-frame-3">
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
              alt="Field workers"
            />
          </div>
        </div>

        <div className="products-hero-gradient" />
      </div>

      {/* Purple Banner */}
      <div className="products-banner">
        <div className="products-banner-content">
          <p className="products-banner-text">
            As the authorized distributor of ESRI products in Sri Lanka, we provide access to the complete suite of ArcGIS applications. 
            From professional desktop software to mobile field apps and cloud platforms, location intelligence informs key decisions with 
            answers to questions including: Where are markets shifting? Where are the best customers? Where are operations at risk? 
            In a constantly changing world, GIS technology provides greater intelligence for more successful, resilient organizations.
          </p>
        </div>
      </div>

      {/* Product Categories */}
      <div className="products-categories">
        {Object.entries(productCategories).map(([key, category], catIndex) => (
          <div key={key} className="products-category-section">
            {/* Category Header */}
            <div className="products-category-header">
              <div className="products-category-badge" style={{ background: `${category.color}15` }}>
                <span style={{ color: category.color }}>
                  Platform {catIndex + 1}
                </span>
              </div>
              <h2 className="products-category-title">{category.name}</h2>
              <p className="products-category-description">{category.description}</p>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {category.products.map((product, index) => {
                const cardKey = `${key}-${index}`;
                return (
                  <div
                    key={cardKey}
                    className={`product-card ${hoveredCard === cardKey ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredCard(cardKey)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      borderColor: hoveredCard === cardKey ? category.color : '#e0e0e0',
                      boxShadow: hoveredCard === cardKey 
                        ? `0 16px 48px ${category.color}30` 
                        : '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                  >
                    {/* Color Bar */}
                    <div 
                      className="product-card-bar"
                      style={{
                        background: `linear-gradient(90deg, ${category.color} 0%, ${category.color}80 100%)`,
                        width: hoveredCard === cardKey ? '100%' : '0%'
                      }}
                    />

                    {/* Card Content */}
                    <div className="product-card-content">
                      {/* Product Icon */}
                      <div 
                        className="product-icon"
                        style={{
                          background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}05 100%)`,
                          border: `3px solid ${category.color}25`
                        }}
                      >
                        <img src={product.icon} alt={product.title} />
                      </div>

                      {/* Title */}
                      <h3 className="product-title">{product.title}</h3>

                      {/* Description */}
                      <p className="product-description">{product.desc}</p>

                      {/* Features */}
                      <div className="product-features">
                        {product.features.slice(0, hoveredCard === cardKey ? 4 : 2).map((feature, idx) => (
                          <div
                            key={idx}
                            className="product-feature-tag"
                            style={{
                              background: `${category.color}10`,
                              color: category.color,
                              border: `1px solid ${category.color}20`
                            }}
                          >
                            <calcite-icon 
                              icon="check-circle-f" 
                              scale="s" 
                              style={{ color: category.color }}
                            />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Button */}
                      <calcite-button
                        width="full"
                        appearance={hoveredCard === cardKey ? 'solid' : 'outline'}
                        icon-end="arrow-right"
                        onClick={() => window.open(product.link, '_blank')}
                        style={{
                          '--calcite-button-background': category.color,
                          '--calcite-button-text-color': hoveredCard === cardKey ? '#fff' : category.color,
                          '--calcite-button-border-color': category.color,
                          cursor: 'pointer'
                        }}
                      >
                        Learn More
                      </calcite-button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Full-Width Section */}
      <div className="products-fullwidth-section">
        <div className="products-fullwidth-image">
          <img 
            src="https://www.esri.com/content/dam/esrisites/en-us/industries/2020/business/sector/assets/overview/spatial-business-50-50.jpg"
            alt="Spatial Business Graphics"
          />
        </div>

        <div className="products-fullwidth-content">
          <div className="products-fullwidth-badge">
            <span>Your Trusted Partner</span>
          </div>

          <h2 className="products-fullwidth-title">
            Why Choose GIS Solutions as Your ArcGIS Provider?
          </h2>

          <p className="products-fullwidth-text">
            As the authorized ESRI distributor in Sri Lanka since 2012, we bring world-class GIS technology 
            combined with local expertise and dedicated support.
          </p>

          <div className="products-features-grid">
            {[
              { icon: 'ribbon', label: 'Authorized Distributor', desc: 'Official ESRI partner since 2012, providing genuine ArcGIS licenses and complete platform access.' },
              { icon: 'users', label: 'Expert Support', desc: 'Dedicated local technical team offering ongoing support and guidance.' },
              { icon: 'book', label: 'Training Programs', desc: 'Comprehensive certification courses to maximize capabilities.' },
              { icon: 'wrench', label: 'Implementation', desc: 'Full deployment support and custom solutions.' }
            ].map((item, idx) => (
              <div key={idx} className="products-feature-item">
                <div className="products-feature-icon">
                  <calcite-icon icon={item.icon} scale="s" />
                </div>
                <div className="products-feature-content">
                  <h4 className="products-feature-label">{item.label}</h4>
                  <p className="products-feature-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="products-fullwidth-actions">
            <calcite-button
              appearance="solid"
              scale="l"
              icon-end="arrow-right"
              onClick={() => {
                if (setPage) {
                  setPage('solutions');
                  window.scrollTo(0, 0);
                }
              }}
              style={{
                '--calcite-button-background': '#7b5fa6',
                '--calcite-button-text-color': '#ffffff',
                cursor: 'pointer'
              }}
            >
              Explore Solutions
            </calcite-button>
            <calcite-button
              appearance="outline"
              scale="l"
              icon-end="phone"
              onClick={() => {
                if (setPage) {
                  setPage('contact');
                  window.scrollTo(0, 0);
                }
              }}
              style={{
                '--calcite-button-border-color': '#7b5fa6',
                '--calcite-button-text-color': '#7b5fa6',
                cursor: 'pointer'
              }}
            >
              Contact Sales
            </calcite-button>
          </div>
        </div>
      </div>

      {/* View All Products Section */}
      <div className="products-cta-section">
        <div className="products-cta-content">
          <h2 className="products-cta-title">Explore the Complete ArcGIS Platform</h2>
          <p className="products-cta-text">
            Discover all ArcGIS products and find the perfect solution for your organization's needs. 
            From mobile apps to enterprise platforms, Esri offers comprehensive tools for every aspect of GIS work.
          </p>
          <calcite-button
            appearance="outline-fill"
            scale="l"
            icon-end="launch"
            onClick={() => window.open('https://www.esri.com/en-us/arcgis/products/index', '_blank')}
            style={{
              '--calcite-button-border-color': '#ffffff',
              '--calcite-button-text-color': '#7b5fa6',
              cursor: 'pointer'
            }}
          >
            View All Esri Products
          </calcite-button>
        </div>
      </div>
    </div>
  );
}