import React, { useState, useRef, useEffect } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '../../styles/clientStyles/solutionsComponent.css';

const sections = [
  {
    id: 'mission',
    layout: 'media-left',
    title: 'Mapping the way to a better future',
    content: [
      "Our greatest challenges—including climate change, sustainability, and social and economic inequality—are interrelated and inherently tied to issues of geography. A science-based, geographic approach can help us understand these interconnected problems holistically by integrating all kinds of information.",
      "At GIS Solutions, we envision empowering all organizations to embrace this approach. By collectively creating and sharing multidisciplinary knowledge, we can make smarter decisions about managing our world—building a collaborative digital geospatial system for our entire planet. Together, we have the power to transform society and design a better, more sustainable future."
    ],
    media: {
      background: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=80',
      foregroundVideo: 'https://assets.mixkit.co/videos/preview/mixkit-wind-farm-in-the-countryside-4388-large.mp4',
      foregroundPoster: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80',
      caption: 'Wind direction flow',
      description: 'Analyzing wind flow and speed can help planners determine where to place wind farms that provide renewable energy.'
    }
  },
{
  id: 'future',
  layout: 'media-right',
  title: 'Mapping the Way Forward',
  content: [
    "GIS Solutions (Pvt) Ltd is dedicated to advancing sustainable development through a science-based, geographic approach. Our Location Analytics solution equips organizations with the ability to interpret spatial patterns, evaluate emerging trends, and make informed decisions grounded in reliable geospatial insight.",
    "Complementing this, our Geospatial Data Integration solution brings together diverse datasets into a unified analytical environment. This comprehensive framework supports holistic evaluations of environmental, social, and economic conditions, enabling institutions to address complex challenges with confidence.",
    "Through these capabilities, we continue to empower organizations across Sri Lanka to adopt multidisciplinary geospatial practices—building a smarter, more resilient, and more sustainable future."
  ],
  media: {
    background: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
    foregroundImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    caption: 'GIS Solutions Sri Lanka',
    description: 'Advancing geospatial intelligence to support national development and sustainable decision-making.'
  },
  buttons: [
    { text: "Our Vision", icon: "sparkles", variant: "solid" },
    { text: "Explore Solutions", icon: "arrow-right", variant: "outline" }
  ]
}
,
  {
    id: 'partners',
    layout: 'media-left',
    title: 'Partners make the most of GIS Solutions technology',
    content: [
      "We work with a global ecosystem of thousands of partners who support customers through their knowledge and expertise, solutions, implementation services, and content. We are committed to keeping GIS technology open and interoperable. We pursue strategic partnerships to continue advancing geospatial technology."
    ],
    media: {
      background: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80',
      foregroundVideo: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-port-with-containers-4358-large.mp4',
      foregroundPoster: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1200&q=80',
      caption: 'Sri Lanka logistics and trade',
      description: 'GIS Solutions partners use ArcGIS to create interactive maps and analytics for trade, logistics and infrastructure planning.'
    },
    buttons: [
      { text: "Learn more about our partners", icon: "arrow-right", variant: "solid" }
    ]
  }
];

export default function SolutionsComponent() {
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    // Intersection observer for auto-play
    const observers = {};
    
    Object.keys(videoRefs.current).forEach(videoId => {
      const video = videoRefs.current[videoId];
      if (video) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                video.play().catch(() => {});
              } else {
                video.pause();
              }
            });
          },
          { threshold: 0.3 }
        );
        observer.observe(video);
        observers[videoId] = observer;
      }
    });

    return () => {
      Object.values(observers).forEach(observer => observer.disconnect());
    };
  }, []);

  const handleVideoHover = (videoId, isHovering) => {
    setHoveredVideo(isHovering ? videoId : null);
    const video = videoRefs.current[videoId];
    if (video && isHovering) {
      video.play().catch(() => {});
    }
  };

  const renderMedia = (section) => {
    const hasVideo = section.media.foregroundVideo;
    const hasImage = section.media.foregroundImage;
    const videoId = `${section.id}-video`;

    return (
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '700px',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}>
          <img 
            src={section.media.background}
            alt="Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Foreground Video or Image Overlay */}
        {hasVideo && (
          <div 
            style={{
              position: 'absolute',
              top: '10%',
              right: '5%',
              width: '55%',
              height: '50%',
              zIndex: 2,
              cursor: 'pointer',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
            onMouseEnter={() => handleVideoHover(videoId, true)}
            onMouseLeave={() => handleVideoHover(videoId, false)}
          >
            <video
              ref={el => videoRefs.current[videoId] = el}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              poster={section.media.foregroundPoster}
              muted
              loop
              playsInline
            >
              <source src={section.media.foregroundVideo} type="video/mp4" />
            </video>

            {/* Play button overlay */}
            {!hoveredVideo && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease'
              }}>
                <calcite-icon icon="play" scale="l" style={{ color: '#2b2b2b', marginLeft: '3px' }} />
              </div>
            )}
          </div>
        )}

        {hasImage && (
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: '45%',
            height: '60%',
            zIndex: 2,
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <img 
              src={section.media.foregroundImage}
              alt={section.media.caption}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        )}

        {/* Caption Box */}
        <div style={{
          position: 'absolute',
          bottom: hasVideo ? '12%' : '8%',
          left: hasVideo ? '8%' : 'auto',
          right: hasVideo ? 'auto' : '8%',
          width: '400px',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '2rem',
          borderRadius: '4px',
          backdropFilter: 'blur(10px)',
          zIndex: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '500',
            marginBottom: '0.75rem',
            color: '#2b2b2b'
          }}>
            {section.media.caption}
          </h3>
          <p style={{
            fontSize: '0.95rem',
            color: '#555',
            margin: 0,
            lineHeight: '1.6'
          }}>
            {section.media.description}
          </p>
        </div>
      </div>
    );
  };

  const renderSection = (section, index) => {
    const isMediaLeft = section.layout === 'media-left';

    const textContent = (
      <div style={{
        padding: 'clamp(2.5rem, 6vw, 5rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: index % 2 === 0 ? '#fff' : '#f8f8f8'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: '400',
          lineHeight: '1.2',
          marginBottom: '2rem',
          color: '#2b2b2b'
        }}>
          {section.title}
        </h2>

        {section.content.map((paragraph, idx) => (
          <p key={idx} style={{
            fontSize: '1.0625rem',
            lineHeight: '1.8',
            color: '#444',
            marginBottom: '1.5rem',
            maxWidth: '650px'
          }}>
            {paragraph}
          </p>
        ))}

        {section.buttons && (
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {section.buttons.map((button, idx) => (
              <calcite-button
                key={idx}
                appearance={button.variant === 'solid' ? 'solid' : 'outline'}
                icon-end={button.icon}
                scale="l"
                style={button.variant === 'solid' ? {
                  '--calcite-button-background': '#2b2b2b',
                  '--calcite-button-text-color': '#fff'
                } : {
                  '--calcite-button-border-color': '#2b2b2b',
                  '--calcite-button-text-color': '#2b2b2b'
                }}
              >
                {button.text}
              </calcite-button>
            ))}
          </div>
        )}
      </div>
    );

    const mediaContent = renderMedia(section);

    return (
      <div 
        key={section.id} 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
          minHeight: '700px'
        }}
      >
        {isMediaLeft ? (
          <>
            {mediaContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {mediaContent}
          </>
        )}
      </div>
    );
  };

  return (
    <div style={{ background: '#fff' }}>
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  );
}