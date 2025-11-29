import React, { useState, useEffect } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';

const products = [
  {
    id: 1,
    name: "Safety Helmets",
    icon: "https://cdn-icons-png.flaticon.com/512/2913/2913133.png",
    description: "High-quality safety helmets available in multiple colors for different worker types. ABS material construction with adjustable fit and ventilation.",
    features: ["ABS Material", "Adjustable Fit", "Multiple Colors", "Ventilated Design"],
    category: "Head Protection",
    color: "#ff6b00",
    sketchfabModel: "47a4490dc6024782a057e529a266dba0",
    modelTitle: "Construction Helmet"
  },
  {
    id: 2,
    name: "Safety Vests",
    icon: "https://cdn-icons-png.flaticon.com/512/2553/2553645.png",
    description: "Hi-visibility safety vests with reflective strips for maximum visibility. Available in various colors for different roles and work environments.",
    features: ["High Visibility", "Reflective Strips", "Breathable Material", "Multi-Pocket"],
    category: "Body Protection",
    color: "#ffd700",
    sketchfabModel: "b9d8b5c5e6f84d2fa2c8e0b3c5d7f8a9",
    modelTitle: "Safety Vest"
  },
  {
    id: 3,
    name: "Gum Boots",
    icon: "https://cdn-icons-png.flaticon.com/512/2329/2329897.png",
    description: "Industrial waterproof boots with steel toe protection. Chemical resistant and anti-slip sole for maximum safety in harsh conditions.",
    features: ["Steel Toe", "Waterproof", "Anti-Slip", "Chemical Resistant"],
    category: "Foot Protection",
    color: "#2b2b2b",
    sketchfabModel: "c3a4b6c8d9e1f2a3b4c5d6e7f8a9b0c1",
    modelTitle: "Safety Boots"
  },
  {
    id: 4,
    name: "Safety Hand Gloves",
    icon: "https://cdn-icons-png.flaticon.com/512/2738/2738055.png",
    description: "Durable work gloves for various applications. Available in leather, cut-resistant, and insulated varieties for different work environments.",
    features: ["Multiple Types", "Reinforced Palm", "Breathable", "Grip Enhanced"],
    category: "Hand Protection",
    color: "#8b4513",
    sketchfabModel: "d4b5c7d8e9f0a1b2c3d4e5f6a7b8c9d0",
    modelTitle: "Work Gloves"
  },
  {
    id: 5,
    name: "Safety Goggles",
    icon: "https://cdn-icons-png.flaticon.com/512/2785/2785482.png",
    description: "Protective eyewear with anti-fog coating and UV protection. Impact resistant lenses suitable for various industrial applications.",
    features: ["Anti-Fog", "UV Protection", "Impact Resistant", "Comfortable Fit"],
    category: "Eye Protection",
    color: "#0073e6",
    sketchfabModel: "e5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0",
    modelTitle: "Safety Goggles"
  },
  {
    id: 6,
    name: "Ear Muffs",
    icon: "https://cdn-icons-png.flaticon.com/512/2920/2920235.png",
    description: "Noise reduction ear protection with 30dB sound reduction. Adjustable headband with cushioned ear cups for all-day comfort.",
    features: ["30dB Reduction", "Adjustable", "Padded Cups", "Durable"],
    category: "Hearing Protection",
    color: "#f44336",
    sketchfabModel: "f6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1",
    modelTitle: "Ear Protection"
  },
  {
    id: 7,
    name: "First Aid Boxes",
    icon: "https://cdn-icons-png.flaticon.com/512/2913/2913126.png",
    description: "Comprehensive first aid kits with essential medical supplies. Portable and wall-mountable options available for workplace safety.",
    features: ["50-Piece Kit", "Portable", "Wall Mountable", "Complete Supplies"],
    category: "Emergency Care",
    color: "#e63946",
    sketchfabModel: "a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
    modelTitle: "First Aid Kit"
  },
  {
    id: 8,
    name: "Dust Masks",
    icon: "https://cdn-icons-png.flaticon.com/512/2785/2785819.png",
    description: "N95 respirator masks providing 95% filtration efficiency. Comfortable fit with adjustable nose piece and ear loops.",
    features: ["95% Filtration", "Comfortable", "Adjustable", "Disposable"],
    category: "Respiratory Protection",
    color: "#ffffff",
    sketchfabModel: "b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3",
    modelTitle: "Respirator Mask"
  },
  {
    id: 9,
    name: "Safety Belts",
    icon: "https://cdn-icons-png.flaticon.com/512/3293/3293457.png",
    description: "Full body safety harness with 5-point attachment system. Includes shock absorber and adjustable straps for fall protection.",
    features: ["5-Point System", "Shock Absorber", "Adjustable", "High Strength"],
    category: "Fall Protection",
    color: "#ffd700",
    sketchfabModel: "c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
    modelTitle: "Safety Harness"
  },
  {
    id: 10,
    name: "Face Shields",
    icon: "https://cdn-icons-png.flaticon.com/512/4185/4185850.png",
    description: "Full face protection shields with anti-fog coating. Provides splash and impact protection for various work environments.",
    features: ["Anti-Fog", "Full Coverage", "Adjustable", "Clear Vision"],
    category: "Face Protection",
    color: "#00acc1",
    sketchfabModel: "d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5",
    modelTitle: "Face Shield"
  },
  {
    id: 11,
    name: "Welding Gloves",
    icon: "https://cdn-icons-png.flaticon.com/512/4145/4145809.png",
    description: "Heavy-duty welding gloves with heat-resistant material. Long cuff design with reinforced palm for maximum protection.",
    features: ["Heat Resistant", "Long Cuff", "Reinforced", "Flexible"],
    category: "Hand Protection",
    color: "#ff6b00",
    sketchfabModel: "e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6",
    modelTitle: "Welding Gloves"
  },
  {
    id: 12,
    name: "Safety Sign Boards",
    icon: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
    description: "Weather-proof safety signage with reflective surface. Complete set of warning and instruction signs for workplace safety.",
    features: ["Weather Proof", "Reflective", "Multi-Purpose", "Durable"],
    category: "Signage",
    color: "#2a9d8f",
    sketchfabModel: "f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7",
    modelTitle: "Safety Signs"
  }
];

export default function ShieldifyProductCircle() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setModelLoading(true);
      const timer = setTimeout(() => setModelLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [selectedProduct]);

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

  const selected = products.find((p) => p.id === selectedProduct);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'transparent',
      fontFamily: '"Avenir Next", -apple-system, sans-serif',
      padding: '2rem 1rem'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <img 
          src="assets/images/picture-logo.png"
          alt="SHIELDIFY Logo"
          style={{
            maxWidth: '200px',
            marginBottom: '1.5rem',
            filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))'
          }}
          onError={(e) => {
            e.target.src = 'https://i.ibb.co/zQYzQZb/Whats-App-Image-2024-12-24-at-10-24-24-AM-removebg-preview.png';
          }}
        />
        <div style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #ff6b00 0%, #e56000 100%)',
          color: '#fff',
          padding: '0.5rem 1.5rem',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '1rem',
          boxShadow: '0 4px 12px rgba(255, 107, 0, 0.3)'
        }}>
          Interactive Explorer
        </div>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '600',
          color: '#2b2b2b',
          marginBottom: '0.5rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          SHIELDIFY Safety Products
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#6a6a6a',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Click on any product icon to explore 3D models and detailed specifications
        </p>
      </div>

      {/* Main Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selected ? '1fr 1fr' : '1fr',
        gap: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        alignItems: 'start'
      }}>
        {/* Circle Visualization */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <svg 
            width={svgSize} 
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            style={{ maxWidth: '100%', height: 'auto' }}
          >
            {/* Connection lines */}
            {products.map((product, index) => {
              const pos = getPosition(index, products.length);
              const isSelected = selectedProduct === product.id;
              return (
                <line
                  key={`line-${product.id}`}
                  x1={centerX}
                  y1={centerY}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isSelected ? product.color : '#e0e0e0'}
                  strokeWidth={isSelected ? "3" : "1.5"}
                  opacity={isSelected ? "0.6" : "0.3"}
                  style={{ transition: 'all 0.3s ease' }}
                />
              );
            })}

            {/* Center Circle */}
            <g style={{ cursor: 'pointer' }} onClick={() => setSelectedProduct(null)}>
              <circle
                cx={centerX}
                cy={centerY}
                r={isMobile ? "40" : "50"}
                fill="url(#shieldifyGradient)"
                filter="url(#shadow)"
              />
              <text
                x={centerX}
                y={centerY - 5}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                  fill: '#ffffff',
                  fontWeight: '700',
                  pointerEvents: 'none'
                }}
              >
                SHIELDIFY
              </text>
              <text
                x={centerX}
                y={centerY + 12}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: isMobile ? '0.65rem' : '0.75rem',
                  fill: '#ffffff',
                  fontWeight: '400',
                  pointerEvents: 'none'
                }}
              >
                Safety Products
              </text>
            </g>

            {/* Product Circles */}
            {products.map((product, index) => {
              const pos = getPosition(index, products.length);
              const isSelected = selectedProduct === product.id;
              const isHovered = hoveredProduct === product.id && !isMobile;
              const circleRadius = isMobile ? 28 : 38;

              return (
                <g key={product.id}>
                  {isSelected && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={circleRadius + 10}
                      fill="none"
                      stroke={product.color}
                      strokeWidth="3"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="r"
                        values={`${circleRadius + 8};${circleRadius + 12};${circleRadius + 8}`}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.4;0.1;0.4"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? circleRadius + 5 : isHovered ? circleRadius + 3 : circleRadius}
                    fill="#ffffff"
                    stroke={isSelected ? product.color : isHovered ? product.color : '#d0d0d0'}
                    strokeWidth={isSelected ? "4" : "2"}
                    filter="url(#shadow)"
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setSelectedProduct(product.id)}
                    onMouseEnter={() => !isMobile && setHoveredProduct(product.id)}
                    onMouseLeave={() => !isMobile && setHoveredProduct(null)}
                  />
                  
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isMobile ? 22 : 32}
                    fill={`${product.color}15`}
                    style={{ pointerEvents: 'none' }}
                  />
                  
                  <image
                    href={product.icon}
                    x={pos.x - (isMobile ? 16 : 24)}
                    y={pos.y - (isMobile ? 16 : 24)}
                    width={isMobile ? 32 : 48}
                    height={isMobile ? 32 : 48}
                    style={{ 
                      pointerEvents: 'none',
                      opacity: isSelected || isHovered ? 1 : 0.85
                    }}
                  />
                  
                  {isHovered && !isSelected && !isMobile && (
                    <g>
                      <rect
                        x={pos.x - 70}
                        y={pos.y + 55}
                        width="140"
                        height="40"
                        rx="8"
                        fill="#2b2b2b"
                        opacity="0.95"
                        filter="url(#shadow)"
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 72}
                        textAnchor="middle"
                        style={{
                          fontSize: '0.875rem',
                          fill: '#ffffff',
                          fontWeight: '600'
                        }}
                      >
                        {product.name}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 87}
                        textAnchor="middle"
                        style={{
                          fontSize: '0.7rem',
                          fill: product.color,
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}
                      >
                        {product.category}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            <defs>
              <linearGradient id="shieldifyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b00" />
                <stop offset="100%" stopColor="#e56000" />
              </linearGradient>
              <filter id="shadow">
                <feDropShadow dx="0" dy="3" stdDeviation="6" floodOpacity="0.2"/>
              </filter>
            </defs>
          </svg>
        </div>

        {/* 3D Model Panel */}
        {selected && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            backdropFilter: 'blur(10px)',
            border: `3px solid ${selected.color}30`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Color Bar */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: `linear-gradient(90deg, ${selected.color} 0%, ${selected.color}80 100%)`
            }} />

            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${selected.color}20 0%, ${selected.color}10 100%)`,
                  border: `2px solid ${selected.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img src={selected.icon} alt={selected.name} style={{ width: '40px', height: '40px' }} />
                </div>
                <div>
                  <div style={{
                    display: 'inline-block',
                    background: `${selected.color}20`,
                    color: selected.color,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    {selected.category}
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#2b2b2b',
                    margin: 0
                  }}>
                    {selected.name}
                  </h3>
                </div>
              </div>
              <calcite-action
                icon="x"
                text="Close"
                scale="l"
                onClick={() => setSelectedProduct(null)}
                style={{ cursor: 'pointer' }}
              />
            </div>

            {/* 3D Model */}
            <div style={{
              width: '100%',
              height: '400px',
              background: '#f8f8f8',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              position: 'relative',
              overflow: 'hidden',
              border: '2px solid #e0e0e0'
            }}>
              {modelLoading ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  gap: '1rem'
                }}>
                  <calcite-loader scale="l" />
                  <p style={{ color: '#6a6a6a', fontSize: '0.875rem' }}>Loading 3D Model...</p>
                </div>
              ) : (
                <iframe
                  title={selected.modelTitle}
                  frameBorder="0"
                  allowFullScreen
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  xr-spatial-tracking="true"
                  execution-while-out-of-viewport="true"
                  execution-while-not-rendered="true"
                  web-share="true"
                  src={`https://sketchfab.com/models/${selected.sketchfabModel}/embed?transparent=1&autostart=1`}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                />
              )}
            </div>

            {/* Description */}
            <p style={{
              fontSize: '0.9375rem',
              color: '#4a4a4a',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              {selected.description}
            </p>

            {/* Features */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#2b2b2b',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <calcite-icon icon="lightbulb" scale="s" style={{ color: selected.color }} />
                Key Features
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem'
              }}>
                {selected.features.map((feature, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    background: '#f8f8f8',
                    borderRadius: '6px'
                  }}>
                    <calcite-icon 
                      icon="check-circle-f" 
                      scale="s" 
                      style={{ color: selected.color, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: '0.875rem', color: '#4a4a4a' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <calcite-button
                width="full"
                appearance="solid"
                icon-end="shopping-cart"
                style={{
                  '--calcite-button-background': selected.color,
                  '--calcite-button-text-color': '#ffffff',
                  cursor: 'pointer'
                }}
              >
                Request Quote
              </calcite-button>
              <calcite-button
                appearance="outline"
                icon-start="information"
                style={{
                  '--calcite-button-border-color': selected.color,
                  '--calcite-button-text-color': selected.color,
                  cursor: 'pointer'
                }}
              >
                Learn More
              </calcite-button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selected && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem',
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff6b00 0%, #e56000 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              boxShadow: '0 8px 24px rgba(255, 107, 0, 0.3)'
            }}>
              <calcite-icon icon="cursor-click" scale="l" style={{ color: '#fff' }} />
            </div>
            <h4 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#2b2b2b',
              marginBottom: '0.75rem'
            }}>
              Select a Product
            </h4>
            <p style={{
              fontSize: '1rem',
              color: '#6a6a6a',
              maxWidth: '400px',
              lineHeight: '1.6'
            }}>
              Click on any product icon in the circle to view its 3D model, detailed features, and specifications
            </p>
          </div>
        )}
      </div>
    </div>
  );
}