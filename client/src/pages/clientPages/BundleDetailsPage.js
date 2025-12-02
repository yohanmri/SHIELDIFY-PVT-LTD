// ============================================
// FILE: ProductDetailsPage.js
// Path: src/pages/clientPages/BundleDetailsPage.js
// ============================================
import React from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import Footer from '../../components/clientComponents/Footer';
import BundleDetails from '../../components/clientComponents/BundleDetails';
import '@esri/calcite-components/dist/calcite/calcite.css';


export default function BundleDetailsPage() {
  return (
    <div 
      
      style={{
        marginTop: '4%',
        padding: 0,
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Navbar activePage="bundle-detais" />
      <BundleDetails />
      <Footer />
    </div>
  );
}