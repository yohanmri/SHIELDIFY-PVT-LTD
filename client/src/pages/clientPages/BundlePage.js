import React from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import Footer from '../../components/clientComponents/Footer';
import ProductsComponent from '../../components/clientComponents/ProductsCard'; 
import '@esri/calcite-components/dist/calcite/calcite.css';
import BundleCard from '../../components/clientComponents/BundleCard';

export default function BundlesPage({ setPage }) {
  return (
    <div className="bundles-page" style={{
      margin: 0,
      padding: 0,
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <Navbar setPage={setPage} activePage="products" />
      
     <BundleCard/>
      <Footer />
    </div>
  );
}