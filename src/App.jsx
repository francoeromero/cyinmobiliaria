
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import PropertiesPage from '@/pages/PropertiesPage';
import SalePage from '@/pages/SalePage';
import RentPage from '@/pages/RentPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import AdminPage from '@/pages/AdminPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>RC PROPIEDADES - Sistema de Gestión Inmobiliaria</title>
          <meta name="description" content="Sistema completo de gestión de propiedades inmobiliarias con carousel, galería y panel administrativo" />
        </Helmet>
        
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/propiedades" element={<PropertiesPage />} />
            <Route path="/venta" element={<SalePage />} />
            <Route path="/alquiler" element={<RentPage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
