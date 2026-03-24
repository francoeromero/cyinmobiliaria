import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  ShoppingCart,
  Key,
  Grid3X3,
  Users,
  Phone,
  Settings,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/venta', label: 'Venta', icon: ShoppingCart },
    { path: '/alquiler', label: 'Alquiler', icon: Key },
    { path: '/propiedades', label: 'Propiedades', icon: Grid3X3 },
    { path: '/nosotros', label: 'Nosotros', icon: Users },
    { path: '/contacto', label: 'Contacto', icon: Phone },
    { path: '/admin', label: 'Administración', icon: Settings }
  ];

  const contactInfo = [
    { icon: Mail, label: 'cydesarrollosinmobiliarios@gmail.com' },
    { icon: Phone, label: '+54 11 5148-7328' },
    { icon: MapPin, label: 'Buenos Aires, Argentina' }
  ];

  const socialIcons = [
    // { icon: Instagram, link: 'https://www.instagram.com/estudio__rc/' },
    // { icon: Facebook, link: 'https://www.facebook.com/estudioRC.ArqyDesarrollos' },
    { icon: Linkedin, link: '#' },
    // { icon: Twitter, link: '#' },
    // { icon: Youtube, link: '#' }
  ];

  return (
    <footer className="glass-effect border-t border-black/20 mt-16">
      
      {/* Franja superior con logo y texto */}
      <div className="bg-white/0 backdrop-blur-sm py-8 flex flex-col items-center justify-center">
        <img src="/img/logo_nuevo.png" alt="Logo CY Desarrollos" className="w-32 h-auto mb-2" />
        {/* <span className="text-sm tracking-widest text-gray-500 mb-4">PROPIEDADES</span> */}

        {/* Íconos de redes sociales */}
        <div className="flex space-x-6 mt-2">
          {socialIcons.map(({ icon: Icon, link }, index) => (
            <a key={index} href={link} target="_blank" rel="noopener noreferrer">
              <Icon className="w-5 h-5 text-black/80 hover:text-black transition-colors duration-300" />
            </a>
          ))}
        </div>
      </div>

      {/* Cuerpo del footer */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo + texto institucional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <Link to="/" className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                <img src="/img/logo_nuevo.png" alt="Logo CY Desarrollos" className="w-12" />
              </div>
            </Link>
            <p className="text-black/70 text-sm max-w-xs mx-auto md:mx-0">
              CY Desarrollos Inmobiliarios: soluciones de calidad superior, materiales de primeras marcas y financiación accesible para tu vivienda.
            </p>
          </motion.div>

          {/* Navegación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <h3 className="text-black font-semibold mb-4">Navegación</h3>
            <div className="grid grid-cols-2 gap-2 w-max mx-auto">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center justify-start space-x-4 text-black/70 hover:text-black transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h3 className="text-black font-semibold mb-4">Contacto</h3>
            <div className="space-y-2">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-center md:justify-end space-x-2 text-black/70"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{contact.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Pie legal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-black/20 mt-8 pt-6 text-center"
        >
          <p className="text-black/60 text-sm">
            © {currentYear} CY Desarrollos Inmobiliarios. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
