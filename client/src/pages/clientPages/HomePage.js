// HomePage.js

import React, { useEffect } from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import HomeHero from '../../components/clientComponents/HomeHero';
import Footer from '../../components/clientComponents/Footer';
import HomeInitiatives from '../../components/clientComponents/HomeInitiatives';
import HomeSectors from '../../components/clientComponents/HomeSectors';
import HomeChooseUs from '../../components/clientComponents/HomeChooseUs'
import { trackPageView } from '../../utils/analytics';
export default function HomePage() {
    useEffect(() => {
    trackPageView();
  }, []);
  return (

    <div className="home-page" style={{ 
      margin: 0, 
      padding: 0, 
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Navbar />
      <HomeHero />
      <HomeInitiatives />
      <HomeChooseUs/>
      <HomeSectors/>
      <Footer />
    </div>
  );
}