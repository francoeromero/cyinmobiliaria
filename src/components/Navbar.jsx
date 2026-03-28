
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Key, Grid3X3, Users, Phone, Settings, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'INICIO', icon: Home },
    { path: '/venta', label: 'VENTA', icon: ShoppingCart },
    { path: '/alquiler', label: 'ALQUILER', icon: Key },
    { path: '/propiedades', label: 'PROPIEDADES', icon: Grid3X3 },
    { path: '/nosotros', label: 'NOSOTROS', icon: Users },
    { path: '/contacto', label: 'CONTACTO', icon: Phone },
    // { path: '/admin', label: 'ADMIN', icon: Settings }
  ];

  return (
  <nav
    className="navbar overflow-visible py-1"
    style={{ borderBottom: '2px solid var(--brand-accent)' }}
  >

      <div className="container mx-auto overflow-visible px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between overflow-visible">
          <Link to="/" className="relative flex items-center space-x-2 overflow-visible">
            <div className="relative z-10 h-[82px] w-[82px] shrink-0 overflow-visible bg-white-lg">
              <img
                src="/img/logo_header.png"
                alt="Logo CY Desarrollos"
                className="absolute left-1/2 top-1/2 h-72 w-72 max-h-none max-w-none object-contain"
                style={{ transform: 'translate(calc(-50% + 80px), -50%) scale(.8)' }}
              />
            </div>
            {/* <span className="text-lg md:text-xl font-bold text-gray-500">RC PROPIEDADES</span> */}
          </Link>

          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path} className="relative">
                  <motion.div
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-black/20 text-black' 
                        : 'text-gray-700/70 hover:text-gray hover:bg-gray/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* <Icon className="w-4 h-4" /> */}
                    <Icon className="w-6 h-6" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </motion.div>
                  
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-accent)]"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="xl:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[color:var(--brand-accent)] hover:text-[color:var(--brand-accent-hover)]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden mt-4 flex flex-col items-center space-y-2"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`w-full text-center py-3 rounded-lg flex items-center justify-center space-x-3 transition-colors duration-300 ${
                      isActive ? 'bg-black/20 text-black' : 'text-black/80 hover:bg-white/10'
                    }`}
                  >
                    {/* <Icon className="w-5 h-5" /> */}
                    <Icon className="w-5 h-5" />
                      <span className={`${isActive ? 'font-bold' : 'font-normal'}`}>{item.label}</span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
