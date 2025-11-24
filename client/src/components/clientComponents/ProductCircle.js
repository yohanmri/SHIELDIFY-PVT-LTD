import React, { useState, useEffect } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '../../styles/clientStyles/productCircle.css';

const tools = [
  {
    id: 1,
    name: "ArcGIS Pro",
    icon: "/assets/arcgis-pro.png",
    description: "Professional desktop GIS application for advanced mapping, spatial analysis, data management, and visualization workflows.",
    features: ["Advanced Mapping", "Spatial Analysis", "Data Management", "3D Visualization"],
    category: "Desktop",
    color: "#0079c1",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview",
    docsUrl: "https://pro.arcgis.com/en/pro-app/latest/get-started/get-started.htm"
  },
  {
    id: 2,
    name: "Survey123",
    icon: "/assets/survey.png",
    description: "Create smart forms to collect field data quickly with customizable surveys that work online and offline.",
    features: ["Custom Forms", "Offline Support", "Data Collection", "Real-time Sync"],
    category: "Field",
    color: "#00897b",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-survey123/overview",
    docsUrl: "https://doc.arcgis.com/en/survey123/"
  },
  {
    id: 3,
    name: "ArcGIS Dashboards",
    icon: "/assets/dashboards.png",
    description: "Build compelling data visualizations with interactive charts, maps, and indicators for real-time monitoring.",
    features: ["Interactive Charts", "Real-time Data", "KPI Tracking", "Custom Widgets"],
    category: "Visualization",
    color: "#8b4c9f",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-dashboards/overview",
    docsUrl: "https://doc.arcgis.com/en/dashboards/"
  },
  {
    id: 4,
    name: "Field Maps",
    icon: "/assets/field-maps.png",
    description: "Mobile app for field data collection and asset management with offline capabilities and custom forms.",
    features: ["Mobile Ready", "Offline Maps", "Asset Tracking", "GPS Integration"],
    category: "Field",
    color: "#d84315",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-field-maps/overview",
    docsUrl: "https://doc.arcgis.com/en/field-maps/"
  },
  {
    id: 5,
    name: "StoryMaps",
    icon: "/assets/storymap.png",
    description: "Transform your maps into immersive narrative experiences that combine text, multimedia, and interactive content.",
    features: ["Rich Media", "Interactive Maps", "Storytelling", "Responsive Design"],
    category: "Communication",
    color: "#0277bd",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-storymaps/overview",
    docsUrl: "https://doc.arcgis.com/en/arcgis-storymaps/"
  },
  {
    id: 6,
    name: "QuickCapture",
    icon: "/assets/quickCapture.png",
    description: "Rapidly collect field observations with one-tap buttons for fast data capture at walking or driving speeds.",
    features: ["One-tap Capture", "GPS Tracking", "Photo Capture", "Fast Input"],
    category: "Field",
    color: "#558b2f",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-quickcapture/overview",
    docsUrl: "https://doc.arcgis.com/en/quickcapture/"
  },
  {
    id: 7,
    name: "Experience Builder",
    icon: "/assets/experience-builderlogo.png",
    description: "Build custom web applications with drag-and-drop widgets without writing code for map-centric experiences.",
    features: ["Drag & Drop", "No Code", "Custom Widgets", "Responsive Apps"],
    category: "Development",
    color: "#6d4c87",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-experience-builder/overview",
    docsUrl: "https://doc.arcgis.com/en/experience-builder/"
  },
  {
    id: 8,
    name: "ArcGIS Online",
    icon: "/assets/arcGISonline.png",
    description: "Cloud-based mapping platform for creating, sharing, and managing web maps and spatial data across organizations.",
    features: ["Cloud Platform", "Web Mapping", "Data Sharing", "Collaboration"],
    category: "Cloud",
    color: "#00796b",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-online/overview",
    docsUrl: "https://doc.arcgis.com/en/arcgis-online/"
  },
  {
    id: 9,
    name: "ArcGIS Enterprise",
    icon: "/assets/product1.png",
    description: "Complete enterprise GIS platform for secure deployment and management of geospatial services within your infrastructure.",
    features: ["On-Premise", "Security", "Scalability", "Enterprise Ready"],
    category: "Enterprise",
    color: "#7b5fa6",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-enterprise/overview",
    docsUrl: "https://enterprise.arcgis.com/en/documentation/"
  },
  {
    id: 10,
    name: "ArcGIS Hub",
    icon: "/assets/product2.png",
    description: "Community engagement platform to share data, apps, and initiatives with citizens and stakeholders.",
    features: ["Community Portal", "Data Sharing", "Collaboration", "Engagement"],
    category: "Engagement",
    color: "#00acc1",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-hub/overview",
    docsUrl: "https://doc.arcgis.com/en/hub/"
  },
  {
    id: 11,
    name: "Workforce",
    icon: "/assets/product3.png",
    description: "Coordinate field workforce operations with real-time assignment management and mobile accessibility.",
    features: ["Assignment Management", "Real-time Tracking", "Mobile Apps", "Dispatching"],
    category: "Field",
    color: "#f57c00",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-workforce/overview",
    docsUrl: "https://doc.arcgis.com/en/workforce/"
  },
  {
    id: 12,
    name: "Collector",
    icon: "/assets/product4.png",
    description: "Efficient data collection app for capturing accurate field information with your mobile device.",
    features: ["Mobile Capture", "Offline Work", "Photo Attachments", "GPS Accuracy"],
    category: "Field",
    color: "#5e35b1",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-collector/overview",
    docsUrl: "https://doc.arcgis.com/en/collector/"
  },
  {
    id: 13,
    name: "Navigator",
    icon: "/assets/product5.png",
    description: "Turn-by-turn navigation app designed for field workforce with optimized routing and offline maps.",
    features: ["Turn-by-Turn", "Route Optimization", "Offline Maps", "Fleet Ready"],
    category: "Field",
    color: "#1565c0",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-navigator/overview",
    docsUrl: "https://doc.arcgis.com/en/navigator/"
  },
  {
    id: 14,
    name: "Insights",
    icon: "/assets/product6.png",
    description: "Perform spatial analytics and data science workflows with an intuitive drag-and-drop interface.",
    features: ["Spatial Analytics", "Data Science", "Visualization", "Drag & Drop"],
    category: "Analytics",
    color: "#c62828",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-insights/overview",
    docsUrl: "https://doc.arcgis.com/en/insights/"
  },
  {
    id: 15,
    name: "Web AppBuilder",
    icon: "/assets/product7.png",
    description: "Create custom web applications without coding using configurable widgets and templates.",
    features: ["No Code Builder", "Widget Library", "Templates", "Customizable"],
    category: "Development",
    color: "#2e7d32",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-web-appbuilder/overview",
    docsUrl: "https://doc.arcgis.com/en/web-appbuilder/"
  },
  {
    id: 16,
    name: "Velocity",
    icon: "/assets/product8.png",
    description: "Real-time and big data analytics platform for processing streaming IoT and sensor data.",
    features: ["Real-time Analytics", "IoT Integration", "Stream Processing", "Big Data"],
    category: "Analytics",
    color: "#6a1b9a",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-velocity/overview",
    docsUrl: "https://doc.arcgis.com/en/arcgis-velocity/"
  },
  {
    id: 17,
    name: "Urban",
    icon: "/assets/product9.png",
    description: "3D urban planning solution for designing, planning, and visualizing city development projects.",
    features: ["3D Planning", "Urban Design", "Visualization", "Zoning"],
    category: "Planning",
    color: "#00838f",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-urban/overview",
    docsUrl: "https://doc.arcgis.com/en/arcgis-urban/"
  },
  {
    id: 18,
    name: "Indoors",
    icon: "/assets/product10.png",
    description: "Indoor mapping and space management platform for facilities, campuses, and indoor navigation.",
    features: ["Indoor Maps", "Space Management", "Wayfinding", "Facilities"],
    category: "Facilities",
    color: "#4e342e",
    learnMoreUrl: "https://www.esri.com/en-us/arcgis/products/arcgis-indoors/overview",
    docsUrl: "https://doc.arcgis.com/en/indoors/"
  },
];

export default function ProductCircle() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [hoveredTool, setHoveredTool] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adjust circle parameters based on screen size
  const getCircleParams = () => {
    if (window.innerWidth <= 480) {
      return { radius: 120, centerX: 160, centerY: 160, svgSize: 320 };
    } else if (window.innerWidth <= 768) {
      return { radius: 150, centerX: 200, centerY: 200, svgSize: 400 };
    } else if (window.innerWidth <= 1024) {
      return { radius: 180, centerX: 250, centerY: 250, svgSize: 500 };
    }
    return { radius: 220, centerX: 300, centerY: 300, svgSize: 600 };
  };

  const { radius, centerX, centerY, svgSize } = getCircleParams();

  const getPosition = (index, total) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const selected = tools.find((tool) => tool.id === selectedTool);

  return (
    <div className="product-circle-container">
      {/* Header */}
      <div className="product-circle-header">
        <div className="product-badge">
          <span className="product-badge-text">Interactive Explorer</span>
        </div>
        <h1 className="product-title">ArcGIS Essentials</h1>
        <p className="product-subtitle">
          Click on any product icon to discover comprehensive GIS solutions for your organization
        </p>
      </div>

      {/* Main Container */}
      <div className={`product-main-grid ${selected ? 'has-selection' : ''}`}>
        {/* Circle Visualization */}
        <div className="product-circle-wrapper">
          <div className="circle-background" />

          <svg 
            className="product-svg" 
            width={svgSize} 
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connection lines from center */}
            {tools.map((tool, index) => {
              const pos = getPosition(index, tools.length);
              const isSelected = selectedTool === tool.id;
              return (
                <line
                  key={`line-${tool.id}`}
                  x1={centerX}
                  y1={centerY}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isSelected ? tool.color : '#e0e0e0'}
                  strokeWidth={isSelected ? "2" : "1"}
                  opacity={isSelected ? "0.6" : "0.3"}
                  style={{ transition: 'all 0.3s ease' }}
                />
              );
            })}

            {/* Center Circle */}
            <g style={{ cursor: 'pointer' }} onClick={() => setSelectedTool(null)}>
              <circle
                cx={centerX}
                cy={centerY}
                r={isMobile ? "35" : "45"}
                fill="url(#centerGradient)"
                filter="url(#shadow)"
                style={{ transition: 'all 0.3s ease' }}
              />
              <text
                x={centerX}
                y={centerY - (isMobile ? 3 : 5)}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: isMobile ? '0.7rem' : '0.875rem',
                  fill: '#ffffff',
                  fontWeight: '600',
                  pointerEvents: 'none'
                }}
              >
                ArcGIS
              </text>
              <text
                x={centerX}
                y={centerY + (isMobile ? 8 : 10)}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: isMobile ? '0.65rem' : '0.75rem',
                  fill: '#ffffff',
                  fontWeight: '300',
                  pointerEvents: 'none'
                }}
              >
                Platform
              </text>
            </g>

            {/* Tool Circles */}
            {tools.map((tool, index) => {
              const pos = getPosition(index, tools.length);
              const isSelected = selectedTool === tool.id;
              const isHovered = hoveredTool === tool.id && !isMobile;
              const circleRadius = isMobile ? 24 : 34;
              const iconSize = isMobile ? 24 : 36;

              return (
                <g key={tool.id}>
                  {/* Outer glow on selection */}
                  {isSelected && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={circleRadius + 8}
                      fill="none"
                      stroke={tool.color}
                      strokeWidth="2"
                      opacity="0.3"
                      style={{
                        animation: 'pulse 2s infinite'
                      }}
                    />
                  )}
                  
                  {/* Main circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? circleRadius + 4 : isHovered ? circleRadius + 2 : circleRadius}
                    fill="#ffffff"
                    stroke={isSelected ? tool.color : isHovered ? tool.color : '#e0e0e0'}
                    strokeWidth={isSelected ? "3" : "2"}
                    filter="url(#shadow)"
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setSelectedTool(tool.id)}
                    onMouseEnter={() => !isMobile && setHoveredTool(tool.id)}
                    onMouseLeave={() => !isMobile && setHoveredTool(null)}
                  />
                  
                  {/* Icon background */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isMobile ? 18 : 28}
                    fill={`${tool.color}10`}
                    style={{ pointerEvents: 'none' }}
                  />
                  
                  {/* Product icon */}
                  <image
                    href={tool.icon}
                    x={pos.x - iconSize/2}
                    y={pos.y - iconSize/2}
                    width={iconSize}
                    height={iconSize}
                    style={{ 
                      pointerEvents: 'none',
                      opacity: isSelected || isHovered ? 1 : 0.85,
                      transition: 'opacity 0.3s ease'
                    }}
                  />
                  
                  {/* Tooltip on hover (desktop only) */}
                  {isHovered && !isSelected && !isMobile && (
                    <g>
                      <rect
                        x={pos.x - 60}
                        y={pos.y + 50}
                        width="120"
                        height="36"
                        rx="6"
                        fill="#2b2b2b"
                        opacity="0.95"
                        filter="url(#shadow)"
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 65}
                        textAnchor="middle"
                        style={{
                          fontSize: '0.875rem',
                          fill: '#ffffff',
                          fontWeight: '500',
                          pointerEvents: 'none'
                        }}
                      >
                        {tool.name}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 79}
                        textAnchor="middle"
                        style={{
                          fontSize: '0.7rem',
                          fill: tool.color,
                          fontWeight: '600',
                          pointerEvents: 'none',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {tool.category}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* SVG Definitions */}
            <defs>
              <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7b5fa6" />
                <stop offset="100%" stopColor="#6d4f96" />
              </linearGradient>
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15"/>
              </filter>
            </defs>
          </svg>
        </div>

        {/* Details Panel */}
        {selected && (
          <div className="product-details-panel">
            <div 
              className="product-color-bar"
              style={{
                background: `linear-gradient(90deg, ${selected.color} 0%, ${selected.color}80 100%)`
              }}
            />

            <div className="product-details-content">
              {/* Header */}
              <div className="product-details-header">
                <div 
                  className="product-icon-wrapper"
                  style={{
                    background: `linear-gradient(135deg, ${selected.color}15 0%, ${selected.color}05 100%)`,
                    border: `3px solid ${selected.color}25`
                  }}
                >
                  <img 
                    src={selected.icon} 
                    alt={selected.name}
                    className="product-icon-img"
                  />
                </div>
                
                <div className="product-info">
                  <div 
                    className="product-category-badge"
                    style={{
                      background: `${selected.color}15`,
                      color: selected.color
                    }}
                  >
                    {selected.category}
                  </div>
                  <h3 className="product-name">{selected.name}</h3>
                </div>

                <calcite-action
                  icon="x"
                  text="Close"
                  scale="l"
                  onClick={() => setSelectedTool(null)}
                  className="product-close-button"
                />
              </div>

              {/* Description */}
              <p className="product-description">{selected.description}</p>

              {/* Features */}
              <div className="product-features">
                <h4 className="product-features-title">
                  <calcite-icon icon="lightbulb" scale="s" style={{ color: selected.color }} />
                  Key Features
                </h4>
                <div className="product-features-grid">
                  {selected.features.map((feature, idx) => (
                    <div key={idx} className="product-feature-item">
                      <calcite-icon 
                        icon="check-circle-f" 
                        scale="s" 
                        style={{ color: selected.color }}
                        className="product-feature-icon"
                      />
                      <span className="product-feature-text">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="product-actions">
                <calcite-button
                  width="full"
                  appearance="solid"
                  icon-end="arrow-right"
                  onClick={() => window.open(selected.learnMoreUrl, '_blank')}
                  style={{
                    '--calcite-button-background': selected.color,
                    '--calcite-button-text-color': '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  Learn More
                </calcite-button>
                <calcite-button
                  appearance="outline"
                  icon-start="information"
                  onClick={() => window.open(selected.docsUrl, '_blank')}
                  style={{
                    '--calcite-button-border-color': selected.color,
                    '--calcite-button-text-color': selected.color,
                    cursor: 'pointer'
                  
                  }}
                >
                  Documentation
                </calcite-button>
              </div>
            </div>
          </div>
        )}

        {/* Empty state when nothing selected */}
        {!selected && (
          <div className="product-empty-state">
            <div className="empty-state-icon">
              <calcite-icon icon="cursor-click" scale="l" style={{ color: '#7b5fa6' }} />
            </div>
            <h4 className="empty-state-title">Select a Product</h4>
            <p className="empty-state-description">
              Click on any product icon in the circle to explore its features, capabilities, and learn how it can transform your GIS workflows
            </p>
          </div>
        )}
      </div>
    </div>
  );
}