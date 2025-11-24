import React, { useState } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';

const categories = [
  'Conservation',
  'Climate Change', 
  'Racial Equity',
  'Education',
  'Science',
  'Disaster Response',
  'Sustainability'
];

const people = [
  {
    id: 1,
    category: 'Conservation',
    name: "JANE GOODALL, SCIENTIST AND ACTIVIST",
    title: "Mapping our way out of extinction",
    description: "Jane Goodall championed the use of GIS to understand deforestation and see where communities can come together to better care for our planet.",
    background: "linear-gradient(to right, rgba(26, 77, 46, 0.85), rgba(26, 77, 46, 0.7)), url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80')",
    buttonPrimary: "Watch Jane's story",
    buttonSecondary: "More on conservation"
  },
  {
    id: 2,
    category: 'Climate Change',
    name: "MOLLY BURHANS, CATHOLIC CHURCH GIS CONSULTANT",
    title: "Helping the Pope cool the climate",
    description: "Catholic Church leaders realized they could impact climate change by managing their land sustainably. But first, Molly Burhans had to map it.",
    background: "linear-gradient(to right, rgba(139, 69, 19, 0.85), rgba(139, 69, 19, 0.7)), url('https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&q=80')",
    buttonPrimary: "Watch Molly's story",
    buttonSecondary: "More on climate change"
  },
  {
    id: 3,
    category: 'Racial Equity',
    name: "DR. MAYA JOHNSON, URBAN PLANNER",
    title: "Mapping equity in our cities",
    description: "Using spatial analysis to identify and address systemic inequalities in urban development and resource distribution across communities.",
    background: "linear-gradient(to right, rgba(94, 53, 177, 0.85), rgba(94, 53, 177, 0.7)), url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80')",
    buttonPrimary: "Watch Maya's story",
    buttonSecondary: "More on racial equity"
  },
  {
    id: 4,
    category: 'Education',
    name: "PROF. JAMES CHEN, EDUCATOR",
    title: "Teaching the next generation of mapmakers",
    description: "Empowering students with geospatial technology to solve real-world problems and build a more informed, connected global community.",
    background: "linear-gradient(to right, rgba(0, 119, 182, 0.85), rgba(0, 119, 182, 0.7)), url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80')",
    buttonPrimary: "Watch James's story",
    buttonSecondary: "More on education"
  },
  {
    id: 5,
    category: 'Science',
    name: "DR. SARAH PARCAK, ARCHAEOLOGIST",
    title: "Discovering ancient civilizations from space",
    description: "Using satellite imagery and GIS technology, Dr. Parcak reveals hidden archaeological sites and protects our shared human heritage.",
    background: "linear-gradient(to right, rgba(139, 115, 85, 0.85), rgba(139, 115, 85, 0.7)), url('https://images.unsplash.com/photo-1451847251646-8a6c0dd1510c?w=1200&q=80')",
    buttonPrimary: "Watch Sarah's story",
    buttonSecondary: "More on science"
  },
  {
    id: 6,
    category: 'Disaster Response',
    name: "COMANDANTE ROSA HERNÁNDEZ, FIREFIGHTER",
    title: "Fighting wildfires with real-time intelligence",
    description: "Leading emergency response teams with live mapping data to protect communities and coordinate disaster response efforts across regions.",
    background: "linear-gradient(to right, rgba(139, 37, 0, 0.85), rgba(139, 37, 0, 0.7)), url('https://images.unsplash.com/photo-1525873020571-08690094e301?w=1200&q=80')",
    buttonPrimary: "Watch Rosa's story",
    buttonSecondary: "More on disaster response"
  },
  {
    id: 7,
    category: 'Sustainability',
    name: "KANISHKA NADEESHAN , GIS SUPPORT ANALYST",
    title: "Governing states sustainably",
    description: "Martin O'Malley maps a way to save the Chesapeake Bay from pollution while supporting continued economic growth and development.",
    background: "linear-gradient(to right, rgba(20, 20, 20, 0.9), rgba(30, 30, 30, 0.85)), url('https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&q=80')",
    buttonPrimary: "Watch Martin's story",
    buttonSecondary: "More on sustainability"
  }
];

export default function AboutPeople() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Conservation');

  const handleCategoryClick = (category, index) => {
    setActiveCategory(category);
    setCurrentSlide(index);
  };

  const handlePrevious = () => {
    const newSlide = currentSlide === 0 ? people.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
    setActiveCategory(people[newSlide].category);
  };

  const handleNext = () => {
    const newSlide = currentSlide === people.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
    setActiveCategory(people[newSlide].category);
  };

  const handleSlideIndicatorClick = (index) => {
    setCurrentSlide(index);
    setActiveCategory(people[index].category);
  };

  const currentPerson = people[currentSlide];

  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh' }}>
      {/* Navigation Tabs */}
      <calcite-navigation slot="header" style={{ background: '#2b2b2b' }}>
        <calcite-navigation-logo 
          slot="logo" 
          heading="About Esri"
          style={{ color: '#fff' }}
        />
        <div slot="content-end" style={{ display: 'flex', gap: '2rem', padding: '0 2rem' }}>
          <calcite-button appearance="transparent" style={{ color: '#fff' }}>Overview</calcite-button>
          <calcite-button appearance="transparent" style={{ color: '#fff' }}>Company</calcite-button>
          <calcite-button appearance="transparent" style={{ color: '#fff' }}>Technology</calcite-button>
          <calcite-button appearance="transparent" style={{ color: '#fff' }}>Locations</calcite-button>
        </div>
      </calcite-navigation>

{/* Category Tabs */}
      <div style={{ 
        background: 'transparent', 
        borderBottom: 'none',
        padding: '0 3rem',
        display: 'flex',
        gap: '3rem',
        justifyContent: 'center'
      }}>
        {categories.map((cat, idx) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat, idx)}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeCategory === cat ? '#fff' : '#999',
              padding: '1.5rem 0',
              borderBottom: activeCategory === cat ? '3px solid #007ac2' : '3px solid transparent',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== cat) {
                e.target.style.color = '#ccc';
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== cat) {
                e.target.style.color = '#999';
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Hero Carousel */}
      <div style={{ 
        position: 'relative',
        height: 'calc(100vh - 140px)',
        background: currentPerson.background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        transition: 'background 0.6s ease'
      }}>
        {/* Content */}
        <div style={{
          flex: 1,
          padding: '0 5rem',
          color: '#fff',
          maxWidth: '650px',
          zIndex: 2
        }}>
          <div style={{
            fontSize: '0.875rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            opacity: 0.9,
            fontWeight: '500'
          }}>
            {currentPerson.name}
          </div>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '300',
            lineHeight: '1.2',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}>
            {currentPerson.title}
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            lineHeight: '1.7',
            marginBottom: '2.5rem',
            opacity: 0.95,
            maxWidth: '550px'
          }}>
            {currentPerson.description}
          </p>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <calcite-button 
              appearance="solid"
              icon-end="play"
              style={{ 
                '--calcite-button-background': 'rgba(255, 255, 255, 0.95)',
                '--calcite-button-text-color': '#2b2b2b'
              }}
            >
              {currentPerson.buttonPrimary}
            </calcite-button>
            
            <calcite-button 
              appearance="outline"
              icon-end="arrow-right"
              style={{ 
                '--calcite-button-border-color': 'rgba(255, 255, 255, 0.9)',
                '--calcite-button-text-color': '#fff'
              }}
            >
              {currentPerson.buttonSecondary}
            </calcite-button>
          </div>
        </div>

      {/* Portrait */}
        <div style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          paddingRight: 'clamp(1rem, 5vw, 5rem)',
          position: 'relative',
          minWidth: 0
        }}>
          {currentPerson.category === 'Sustainability' ? (
            <img 
              src="/assets/kanishka2.png"
              alt={currentPerson.name}
              style={{
                width: '100%',
                maxWidth: '800px',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center bottom',
                borderRadius: '8px 8px 0 0',
                filter: 'grayscale(30%) brightness(0.9)',
                margin: '0 auto'
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              maxWidth: '450px',
              height: '90%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)',
              borderRadius: '8px 8px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '1.5rem',
              fontWeight: '300',
              margin: '0 auto'
            }}>
              Portrait {currentSlide + 1}
            </div>
          )}
        </div>

        

        {/* Navigation Arrows */}
        <calcite-button
          appearance="transparent"
          icon-start="chevron-left"
          scale="l"
          onClick={handlePrevious}
          style={{
            position: 'absolute',
            left: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            '--calcite-button-text-color': '#fff',
            zIndex: 3
          }}
        />

        <calcite-button
          appearance="transparent"
          icon-start="chevron-right"
          scale="l"
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            '--calcite-button-text-color': '#fff',
            zIndex: 3
          }}
        />

        {/* Slide Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.75rem',
          zIndex: 3
        }}>
          {people.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSlideIndicatorClick(idx)}
              style={{
                width: idx === currentSlide ? '2.5rem' : '0.75rem',
                height: '0.75rem',
                borderRadius: '1rem',
                border: 'none',
                background: idx === currentSlide ? '#fff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}