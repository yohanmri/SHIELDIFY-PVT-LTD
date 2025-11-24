import React from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import ServicesComponent from '../../components/clientComponents/ServicesComponent';
import Footer from '../../components/clientComponents/Footer';
import '@esri/calcite-components/dist/calcite/calcite.css';

export default function ServicesPage({ setPage }) {
  return (
    <div className="services-page">
      <Navbar setPage={setPage} activePage="services" />
      <ServicesComponent />
     <Footer setPage={setPage} />
    </div>
  );
}