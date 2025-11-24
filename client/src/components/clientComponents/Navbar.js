import React, { useState, useEffect } from 'react';
import '@esri/calcite-components/components/calcite-navigation';
import '@esri/calcite-components/components/calcite-navigation-logo';
import '@esri/calcite-components/components/calcite-menu';
import '@esri/calcite-components/components/calcite-menu-item';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-action';
import '../../styles/clientStyles/navbar.css';

export default function Navbar({ setPage, activePage = 'home' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const menuItems = [
    { page: 'home', text: 'Home' },
    { page: 'products', text: 'Products' },
    { page: 'services', text: 'Services' },
    { page: 'solutions', text: 'Solutions' },
    { page: 'projects', text: 'Projects' },
    { page: 'about', text: 'About' },
    { page: 'contact', text: 'Contact' }
  ];

  const handleNavClick = (page) => {
    if (setPage) {
      setPage(page);
      setMobileMenuOpen(false);
      window.scrollTo(0, 0);
    }
  };

  const handleSearch = () => {
    setSearchOpen(!searchOpen);
    // Implement search functionality
  };

  const handleEsriWebsite = () => {
    window.open('https://www.esri.com', '_blank');
  };

  const handleSignIn = () => {
    if (setPage) {
      setPage('signin');
    }
  };

  return (
    <>
      <calcite-navigation 
        slot="header" 
        className={`main-nav ${scrolled ? 'scrolled' : ''}`}
      >
        <calcite-navigation-logo
          slot="logo"
          heading="GIS Solutions"
          description="Professional GIS Services"
          thumbnail="/assets/logoGIS.png"
          onClick={() => handleNavClick('home')}
          style={{
            '--calcite-navigation-logo-width': '100px',   
            '--calcite-navigation-logo-height': '100px',
            cursor: 'pointer'
          }}
        />

        <div slot="content-end" className="nav-menu">
          <calcite-menu className="desktop-menu">
            {menuItems.map((item, index) => (
              <calcite-menu-item 
                key={index}
                text={item.text}
                active={activePage === item.page}
                onClick={() => handleNavClick(item.page)}
              ></calcite-menu-item>
            ))}
          </calcite-menu>
          
          <div className="nav-action-group">
            <calcite-action 
              className="nav-action-button"
              icon="search"
              text="Search"
              scale="l"
              onClick={handleSearch}
            ></calcite-action>

            <calcite-action 
              className="nav-action-button"
              icon="globe"
              text="Esri Website"
              scale="l"
              onClick={handleEsriWebsite}
            ></calcite-action>

            <calcite-action 
              className="nav-action-button"
              icon="user"
              text="Sign In"
              scale="l"
              onClick={handleSignIn}
            ></calcite-action>
          </div>

          <div className="mobile-actions">
            <calcite-action 
              className="mobile-action-button"
              icon="search"
              text="Search"
              scale="l"
              onClick={handleSearch}
            ></calcite-action>

            <calcite-action 
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
              icon={mobileMenuOpen ? 'x' : 'hamburger'}
              text="Menu"
              scale="l"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            ></calcite-action>
          </div>
        </div>
      </calcite-navigation>

      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <nav className="mobile-nav-links">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className={`mobile-nav-item ${activePage === item.page ? 'active' : ''}`}
                onClick={() => handleNavClick(item.page)}
              >
                <span>{item.text}</span>
                <calcite-icon icon="chevron-right" scale="s"></calcite-icon>
              </div>
            ))}
          </nav>

          <div className="mobile-bottom-actions">
            <calcite-action 
              className="mobile-bottom-action"
              icon="globe"
              text="Esri Website"
              scale="l"
              onClick={handleEsriWebsite}
            ></calcite-action>

            <calcite-action 
              className="mobile-bottom-action"
              icon="user"
              text="Sign In"
              scale="l"
              onClick={handleSignIn}
            ></calcite-action>
          </div>
        </div>
      </div>
    </>
  );
}