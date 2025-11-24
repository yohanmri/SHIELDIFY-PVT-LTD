import React from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import AboutDetails from '../../components/clientComponents/AboutDetails';
import AboutExperts from '../../components/clientComponents/AboutExperts';
import AboutPeople from '../../components/clientComponents/AboutPeople';
import Footer from '../../components/clientComponents/Footer';   

export default function AboutPage({ setPage }) {  
  return (
    <div className="about-page">
      <Navbar setPage={setPage} activePage="about" /> 
       <AboutDetails />
       {/* <AboutExperts/>
       <AboutPeople /> */}
      <Footer />
    </div>
  );
}